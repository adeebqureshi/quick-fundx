from datetime import datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from app.models.enums import (
    AiRiskTier,
    CommissionStatus,
    CommissionType,
    LeadStatus,
    LoanApplicationStatus,
    UserKycStatus,
    UserRole,
)
from pydantic import BaseModel, ConfigDict, EmailStr, Field, computed_field


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    phone: str
    email: str | None
    full_name: str
    role: UserRole
    kyc_status: UserKycStatus
    is_verified: bool

    @computed_field  # type: ignore[prop-decorator]
    @property
    def api_role(self) -> str:
        if self.role == UserRole.banking_partner:
            return "lender"
        return self.role.value


class RegisterIn(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    full_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8, max_length=128)


class OtpSendIn(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)


class OtpVerifyIn(BaseModel):
    phone: str
    code: str = Field(..., min_length=4, max_length=10)


class RefreshIn(BaseModel):
    refresh_token: str


class TokenPairOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserOut


class LoanProductOut(BaseModel):
    id: UUID
    code: str
    name: str
    category: str
    min_amount: Decimal
    max_amount: Decimal
    min_tenure_months: int
    max_tenure_months: int
    interest_rate_min: Decimal | None
    interest_rate_max: Decimal | None

    model_config = {"from_attributes": True}


class LoanApplicationOut(BaseModel):
    id: UUID
    application_number: str
    loan_product_id: UUID
    requested_amount: Decimal
    approved_amount: Decimal | None
    tenure_months: int
    interest_rate: Decimal | None
    status: LoanApplicationStatus
    ai_eligibility_score: Decimal | None
    assigned_bank_id: UUID | None
    created_at: datetime

    model_config = {"from_attributes": True}


class EligibilityIn(BaseModel):
    loan_product_id: UUID
    monthly_income: Decimal = Field(gt=0)
    requested_amount: Decimal = Field(gt=0)
    tenure_months: int = Field(ge=1)
    cibil_score: int | None = Field(default=None, ge=300, le=900)


class EligibilityOut(BaseModel):
    eligible: bool
    score: float
    reasons: list[str]
    suggested_tenure_months: int | None = None


class LoanApplicationCreateIn(BaseModel):
    loan_product_id: UUID
    requested_amount: Decimal = Field(gt=0)
    tenure_months: int = Field(ge=1)
    monthly_income: Decimal = Field(default=Decimal("50000"), gt=0)
    cibil_score: int | None = Field(default=None, ge=300, le=900)
    dsa_id: UUID | None = None


class LoanApplicationOut(BaseModel):
    id: UUID
    application_number: str
    customer_id: UUID
    dsa_id: UUID | None
    loan_product_id: UUID
    requested_amount: Decimal
    approved_amount: Decimal | None
    tenure_months: int
    interest_rate: Decimal | None
    status: LoanApplicationStatus
    ai_eligibility_score: Decimal | None
    ai_risk_tier: AiRiskTier | None
    fraud_score: Decimal | None
    assigned_bank_id: UUID | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class KycUploadOut(BaseModel):
    document_id: UUID
    storage_key: str
    presigned_put_url: str | None = None
    message: str = "Upload complete or use presigned URL"


class KycStatusOut(BaseModel):
    user_kyc_status: UserKycStatus
    documents: list[dict[str, Any]]


class LeadCreateIn(BaseModel):
    name: str
    phone: str
    email: EmailStr | None = None
    loan_type: str
    amount: Decimal | None = None
    employment_type: str | None = None
    income_monthly: Decimal | None = None
    city: str | None = None


class LeadOut(BaseModel):
    id: UUID
    name: str
    phone: str
    email: str | None
    loan_type: str
    amount: Decimal | None
    status: LeadStatus
    created_at: datetime

    model_config = {"from_attributes": True}


class CommissionOut(BaseModel):
    id: UUID
    application_id: UUID
    commission_type: CommissionType
    gross_amount: Decimal
    tds_amount: Decimal
    net_amount: Decimal
    status: CommissionStatus
    created_at: datetime

    model_config = {"from_attributes": True}


class AdminMetricsOut(BaseModel):
    active_applications: int
    pending_kyc: int
    pending_commissions: int
    users_total: int


class AdminApproveIn(BaseModel):
    approved_amount: Decimal | None = None
    interest_rate: Decimal | None = None
    assigned_bank_id: UUID | None = None


class AiEligibilityIn(BaseModel):
    loan_product_id: UUID
    monthly_income: Decimal
    requested_amount: Decimal
    tenure_months: int
    cibil_score: int | None = None


class AiRecommendIn(BaseModel):
    loan_product_id: UUID
    eligibility_score: float


class AiOcrPanIn(BaseModel):
    document_id: UUID
