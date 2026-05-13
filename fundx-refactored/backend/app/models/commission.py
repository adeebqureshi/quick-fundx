from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import CommissionStatus, CommissionType

if TYPE_CHECKING:
    from app.models.loan import LoanApplication
    from app.models.user import User


class Commission(Base):
    __tablename__ = "commissions"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    dsa_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), index=True)
    application_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("loan_applications.id"), index=True
    )
    commission_type: Mapped[CommissionType] = mapped_column(Enum(CommissionType), nullable=False)
    gross_amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    tds_amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), default=Decimal("0"), nullable=False)
    net_amount: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    status: Mapped[CommissionStatus] = mapped_column(
        Enum(CommissionStatus), default=CommissionStatus.pending, nullable=False, index=True
    )
    payout_reference: Mapped[str | None] = mapped_column(String(100), nullable=True)
    payout_idempotency_key: Mapped[str | None] = mapped_column(String(64), unique=True, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    paid_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    dsa: Mapped["User"] = relationship(back_populates="commissions", foreign_keys=[dsa_id])
    application: Mapped["LoanApplication"] = relationship(back_populates="commissions")
