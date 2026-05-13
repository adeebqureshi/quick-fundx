from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import LeadStatus

if TYPE_CHECKING:
    from app.models.user import User


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    dsa_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str] = mapped_column(String(15), nullable=False, index=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    loan_type: Mapped[str] = mapped_column(String(64), nullable=False)
    amount: Mapped[Decimal | None] = mapped_column(Numeric(15, 2), nullable=True)
    employment_type: Mapped[str | None] = mapped_column(String(64), nullable=True)
    income_monthly: Mapped[Decimal | None] = mapped_column(Numeric(15, 2), nullable=True)
    city: Mapped[str | None] = mapped_column(String(128), nullable=True)
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus), default=LeadStatus.new, nullable=False, index=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    dsa: Mapped["User"] = relationship(back_populates="leads_owned", foreign_keys=[dsa_id])
    activities: Mapped[list["LeadActivity"]] = relationship(back_populates="lead")


class LeadActivity(Base):
    __tablename__ = "lead_activities"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    lead_id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("leads.id"), index=True)
    actor_user_id: Mapped[UUID | None] = mapped_column(PGUUID(as_uuid=True), ForeignKey("users.id"))
    note: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    lead: Mapped["Lead"] = relationship(back_populates="activities")
