from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import KycDocType, KycDocVerificationStatus

if TYPE_CHECKING:
    from app.models.user import User


class KycDocument(Base):
    __tablename__ = "kyc_documents"

    id: Mapped[UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True
    )
    doc_type: Mapped[KycDocType] = mapped_column(Enum(KycDocType), nullable=False, index=True)
    storage_key: Mapped[str] = mapped_column(String(512), nullable=False)
    mime_type: Mapped[str | None] = mapped_column(String(128), nullable=True)
    verification_status: Mapped[KycDocVerificationStatus] = mapped_column(
        Enum(KycDocVerificationStatus),
        default=KycDocVerificationStatus.pending,
        nullable=False,
    )
    fraud_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 4), nullable=True)
    ocr_payload: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="kyc_documents", foreign_keys=[user_id])
