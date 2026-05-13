from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import AiRiskTier, LoanApplicationStatus

if TYPE_CHECKING:
    from app.models.commission import Commission
    from app.models.user import User


class LoanProduct(Base):
    __tablename__ = "loan_products"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    code: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    min_amount: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False)
    max_amount: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False)
    min_tenure_months: Mapped[int] = mapped_column(Integer, nullable=False)
    max_tenure_months: Mapped[int] = mapped_column(Integer, nullable=False)
    interest_rate_min: Mapped[Decimal | None] = mapped_column(Numeric(5, 3), nullable=True)
    interest_rate_max: Mapped[Decimal | None] = mapped_column(Numeric(5, 3), nullable=True)
    attributes: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    applications: Mapped[list["LoanApplication"]] = relationship(back_populates="loan_product")


class BankingPartner(Base):
    __tablename__ = "banking_partners"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    code: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    applications: Mapped[list["LoanApplication"]] = relationship(back_populates="assigned_bank")


class LoanApplication(Base):
    __tablename__ = "loan_applications"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    application_number: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, index=True)
    customer_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), index=True)
    dsa_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True
    )
    loan_product_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("loan_products.id"), nullable=False
    )
    requested_amount: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False)
    approved_amount: Mapped[Decimal | None] = mapped_column(Numeric(15, 2), nullable=True)
    tenure_months: Mapped[int] = mapped_column(Integer, nullable=False)
    interest_rate: Mapped[Decimal | None] = mapped_column(Numeric(5, 3), nullable=True)
    status: Mapped[LoanApplicationStatus] = mapped_column(
        Enum(LoanApplicationStatus), default=LoanApplicationStatus.draft, nullable=False, index=True
    )
    ai_eligibility_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 2), nullable=True)
    ai_risk_tier: Mapped[AiRiskTier | None] = mapped_column(Enum(AiRiskTier), nullable=True)
    fraud_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 4), nullable=True)
    assigned_bank_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("banking_partners.id"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    customer: Mapped["User"] = relationship(
        back_populates="applications", foreign_keys=[customer_id]
    )
    dsa: Mapped["User | None"] = relationship(
        back_populates="dsa_applications", foreign_keys=[dsa_id]
    )
    loan_product: Mapped["LoanProduct"] = relationship(back_populates="applications")
    assigned_bank: Mapped["BankingPartner | None"] = relationship(back_populates="applications")
    commissions: Mapped[list["Commission"]] = relationship(back_populates="application")
