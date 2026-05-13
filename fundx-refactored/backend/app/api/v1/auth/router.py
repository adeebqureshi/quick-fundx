from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.responses import success_json
from app.schemas.common import OtpSendIn, OtpVerifyIn, RefreshIn, RegisterIn, TokenPairOut, UserOut
from app.services import auth_service

router = APIRouter()


@router.post("/register")
async def register(body: RegisterIn, db: AsyncSession = Depends(get_db)):
    user = await auth_service.register_user(
        db,
        phone=body.phone,
        full_name=body.full_name,
        email=str(body.email) if body.email else None,
        password=body.password,
    )
    return success_json(
        {"user": UserOut.model_validate(user)},
        message="Registered. Verify OTP to activate.",
        status_code=status.HTTP_201_CREATED,
    )


@router.post("/otp/send")
async def otp_send(body: OtpSendIn, db: AsyncSession = Depends(get_db)):
    await auth_service.send_otp_challenge(db, phone=body.phone)
    return success_json({"sent": True}, message="OTP sent")


@router.post("/otp/verify")
async def otp_verify(body: OtpVerifyIn, db: AsyncSession = Depends(get_db)):
    access, refresh, user = await auth_service.verify_otp_and_login(db, phone=body.phone, code=body.code)
    return success_json(
        TokenPairOut(
            access_token=access,
            refresh_token=refresh,
            user=UserOut.model_validate(user),
        ).model_dump(),
    )


@router.post("/refresh")
async def refresh(body: RefreshIn, db: AsyncSession = Depends(get_db)):
    access, refresh_tok = await auth_service.refresh_tokens(db, refresh_token=body.refresh_token)
    return success_json({"access_token": access, "refresh_token": refresh_tok, "token_type": "bearer"})
