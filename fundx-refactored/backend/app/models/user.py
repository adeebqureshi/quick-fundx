from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import DsaTier, UserKycStatus, UserRole

if TYPE_CHECKING:
    from app.models.commission import Commission
    from app.models.kyc import KycDocument
    from app.models.lead import Lead
    from app.models.loan import LoanApplication


class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    phone: Mapped[str] = mapped_column(String(15), unique=True, nullable=False, index=True)
    email: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True, index=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, index=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    kyc_status: Mapped[UserKycStatus] = mapped_column(
        Enum(UserKycStatus), default=UserKycStatus.pending, nullable=False
    )
    referred_by: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True
    )
    dsa_tier: Mapped[DsaTier | None] = mapped_column(Enum(DsaTier), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    applications: Mapped[list["LoanApplication"]] = relationship(
        back_populates="customer", foreign_keys="LoanApplication.customer_id"
    )
    dsa_applications: Mapped[list["LoanApplication"]] = relationship(
        back_populates="dsa", foreign_keys="LoanApplication.dsa_id"
    )
    leads_owned: Mapped[list["Lead"]] = relationship(back_populates="dsa", foreign_keys="Lead.dsa_id")
    commissions: Mapped[list["Commission"]] = relationship(back_populates="dsa")
    kyc_documents: Mapped[list["KycDocument"]] = relationship(
        back_populates="user", foreign_keys="KycDocument.user_id"
    )


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), index=True)
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    jti: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    revoked: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)


class OtpChallenge(Base):
    __tablename__ = "otp_challenges"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    phone: Mapped[str] = mapped_column(String(15), index=True, nullable=False)
    code_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    attempts: Mapped[int] = mapped_column(default=0, nullable=False)
    consumed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
