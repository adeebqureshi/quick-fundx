"""Import all models for Alembic and metadata registration."""

from app.models.base import Base
from app.models.commission import Commission
from app.models.kyc import KycDocument
from app.models.lead import Lead, LeadActivity
from app.models.loan import BankingPartner, LoanApplication, LoanProduct
from app.models.system import AuditLog, Notification
from app.models.user import OtpChallenge, RefreshToken, User

__all__ = [
    "Base",
    "AuditLog",
    "BankingPartner",
    "Commission",
    "KycDocument",
    "Lead",
    "LeadActivity",
    "LoanApplication",
    "LoanProduct",
    "Notification",
    "OtpChallenge",
    "RefreshToken",
    "User",
]
