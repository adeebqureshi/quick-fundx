from datetime import UTC, datetime, timedelta
from secrets import randbelow
from uuid import UUID, uuid4

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    hash_token,
    new_refresh_jti,
    verify_password,
)
from app.integrations.msg91 import Msg91Client
from app.models.enums import UserKycStatus, UserRole
from app.models.user import OtpChallenge, RefreshToken, User
from app.tasks.otp import send_otp_sms


def _otp_code() -> str:
    return f"{randbelow(900000) + 100000:06d}"


async def register_user(
    db: AsyncSession,
    *,
    phone: str,
    full_name: str,
    email: str | None,
    password: str | None,
    role: UserRole = UserRole.customer,
) -> User:
    if role != UserRole.customer:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"code": "FORBIDDEN", "message": "Only self-service customer registration is public"},
        )
    existing = await db.execute(select(User).where(User.phone == phone))
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"code": "PHONE_EXISTS", "message": "Phone already registered"},
        )
    if email:
        ex_email = await db.execute(select(User).where(User.email == email))
        if ex_email.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"code": "EMAIL_EXISTS", "message": "Email already registered"},
            )
    user = User(
        id=uuid4(),
        phone=phone,
        email=email,
        full_name=full_name,
        password_hash=hash_password(password) if password else None,
        role=role,
        is_verified=False,
        kyc_status=UserKycStatus.pending,
    )
    db.add(user)
    await db.flush()
    return user


async def send_otp_challenge(db: AsyncSession, *, phone: str) -> None:
    code = _otp_code()
    expires = datetime.now(UTC) + timedelta(minutes=10)
    challenge = OtpChallenge(
        id=uuid4(),
        phone=phone,
        code_hash=hash_token(code),
        expires_at=expires,
        attempts=0,
        consumed=False,
    )
    db.add(challenge)
    await db.flush()
    if get_settings().testing:
        Msg91Client().send_otp(phone, code)
    else:
        send_otp_sms.delay(phone, code)


async def verify_otp_and_login(
    db: AsyncSession,
    *,
    phone: str,
    code: str,
) -> tuple[str, str, User]:
    result = await db.execute(
        select(OtpChallenge)
        .where(
            OtpChallenge.phone == phone,
            OtpChallenge.consumed.is_(False),
        )
        .order_by(OtpChallenge.created_at.desc())
        .limit(1)
    )
    ch = result.scalar_one_or_none()
    if not ch:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "OTP_INVALID", "message": "No active OTP for this phone"},
        )
    if ch.expires_at < datetime.now(UTC):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "OTP_EXPIRED", "message": "OTP expired"},
        )
    if ch.attempts >= 5:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={"code": "OTP_LOCKED", "message": "Too many attempts"},
        )
    ch.attempts += 1
    if ch.code_hash != hash_token(code):
        await db.flush()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "OTP_MISMATCH", "message": "Invalid OTP"},
        )
    ch.consumed = True
    user_result = await db.execute(select(User).where(User.phone == phone))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "USER_NOT_FOUND", "message": "Register before verifying OTP"},
        )
    user.is_verified = True
    user.last_login_at = datetime.now(UTC)
    jti = new_refresh_jti()
    raw_refresh = create_refresh_token(subject=str(user.id), jti=jti)
    rt = RefreshToken(
        id=uuid4(),
        user_id=user.id,
        token_hash=hash_token(raw_refresh),
        jti=jti,
        revoked=False,
        expires_at=datetime.now(UTC)
        + timedelta(days=get_settings().jwt_refresh_expire_days),
    )
    db.add(rt)
    await db.flush()
    access = create_access_token(subject=str(user.id), role=user.role.value)
    return access, raw_refresh, user


async def refresh_tokens(db: AsyncSession, *, refresh_token: str) -> tuple[str, str]:
    from app.core.security import decode_refresh_token

    try:
        payload = decode_refresh_token(refresh_token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_REFRESH", "message": "Invalid refresh token"},
        ) from e
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_REFRESH", "message": "Wrong token type"},
        )
    jti = payload.get("jti")
    sub = payload.get("sub")
    if not jti or not sub:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_REFRESH", "message": "Malformed refresh token"},
        )
    uid = UUID(sub)
    r = await db.execute(
        select(RefreshToken).where(
            RefreshToken.jti == jti,
            RefreshToken.revoked.is_(False),
        )
    )
    row = r.scalar_one_or_none()
    if not row or row.token_hash != hash_token(refresh_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_REFRESH", "message": "Refresh token revoked or unknown"},
        )
    if row.expires_at < datetime.now(UTC):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_REFRESH", "message": "Refresh token expired"},
        )
    user_r = await db.execute(select(User).where(User.id == uid, User.is_active.is_(True)))
    user = user_r.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "USER_INACTIVE", "message": "User not found"},
        )
    row.revoked = True
    new_jti = new_refresh_jti()
    raw_refresh = create_refresh_token(subject=str(user.id), jti=new_jti)
    new_row = RefreshToken(
        id=uuid4(),
        user_id=user.id,
        token_hash=hash_token(raw_refresh),
        jti=new_jti,
        revoked=False,
        expires_at=datetime.now(UTC)
        + timedelta(days=get_settings().jwt_refresh_expire_days),
    )
    db.add(new_row)
    await db.flush()
    access = create_access_token(subject=str(user.id), role=user.role.value)
    return access, raw_refresh


async def login_with_password(db: AsyncSession, *, email: str, password: str) -> tuple[str, str, User]:
    r = await db.execute(select(User).where(User.email == email))
    user = r.scalar_one_or_none()
    if not user or not user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_CREDENTIALS", "message": "Invalid email or password"},
        )
    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_CREDENTIALS", "message": "Invalid email or password"},
        )
    user.last_login_at = datetime.now(UTC)
    jti = new_refresh_jti()
    raw_refresh = create_refresh_token(subject=str(user.id), jti=jti)
    rt = RefreshToken(
        id=uuid4(),
        user_id=user.id,
        token_hash=hash_token(raw_refresh),
        jti=jti,
        revoked=False,
        expires_at=datetime.now(UTC)
        + timedelta(days=get_settings().jwt_refresh_expire_days),
    )
    db.add(rt)
    await db.flush()
    access = create_access_token(subject=str(user.id), role=user.role.value)
    return access, raw_refresh, user
