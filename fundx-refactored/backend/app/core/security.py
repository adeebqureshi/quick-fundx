import hashlib
import secrets
from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import UUID

import jwt
from passlib.context import CryptContext

from app.core.config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def hash_token(raw: str) -> str:
    return hashlib.sha256(raw.encode()).hexdigest()


def create_access_token(
    *,
    subject: str,
    role: str,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    settings = get_settings()
    now = datetime.now(UTC)
    exp = now + timedelta(minutes=settings.jwt_access_expire_minutes)
    payload: dict[str, Any] = {
        "sub": subject,
        "role": role,
        "type": "access",
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.jwt_access_secret, algorithm=settings.jwt_algorithm)


def create_refresh_token(*, subject: str, jti: str) -> str:
    settings = get_settings()
    now = datetime.now(UTC)
    exp = now + timedelta(days=settings.jwt_refresh_expire_days)
    payload = {
        "sub": subject,
        "jti": jti,
        "type": "refresh",
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
    }
    return jwt.encode(payload, settings.jwt_refresh_secret, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict[str, Any]:
    settings = get_settings()
    return jwt.decode(
        token,
        settings.jwt_access_secret,
        algorithms=[settings.jwt_algorithm],
        options={"require": ["exp", "sub"]},
    )


def decode_refresh_token(token: str) -> dict[str, Any]:
    settings = get_settings()
    return jwt.decode(
        token,
        settings.jwt_refresh_secret,
        algorithms=[settings.jwt_algorithm],
        options={"require": ["exp", "sub", "jti"]},
    )


def new_refresh_jti() -> str:
    return secrets.token_urlsafe(32)


def parse_uuid(value: str) -> UUID:
    return UUID(value)
