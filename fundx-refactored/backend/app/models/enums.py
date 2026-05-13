import enum


class UserRole(enum.StrEnum):
    customer = "customer"
    dsa = "dsa"
    partner = "partner"
    manager = "manager"
    admin = "admin"
    superadmin = "superadmin"
    banking_partner = "banking_partner"


class UserKycStatus(enum.StrEnum):
    pending = "pending"
    submitted = "submitted"
    verified = "verified"
    rejected = "rejected"


class DsaTier(enum.StrEnum):
    bronze = "bronze"
    silver = "silver"
    gold = "gold"
    platinum = "platinum"


class LoanApplicationStatus(enum.StrEnum):
    draft = "draft"
    submitted = "submitted"
    under_review = "under_review"
    approved = "approved"
    rejected = "rejected"
    disbursed = "disbursed"


class AiRiskTier(enum.StrEnum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"


class CommissionType(enum.StrEnum):
    disbursement = "disbursement"
    processing = "processing"
    referral = "referral"
    bonus = "bonus"


class CommissionStatus(enum.StrEnum):
    pending = "pending"
    approved = "approved"
    processing = "processing"
    paid = "paid"
    failed = "failed"


class LeadStatus(enum.StrEnum):
    new = "new"
    contacted = "contacted"
    document_submitted = "document_submitted"
    under_review = "under_review"
    approved = "approved"
    disbursed = "disbursed"
    rejected = "rejected"


class KycDocType(enum.StrEnum):
    pan = "pan"
    aadhaar = "aadhaar"
    selfie = "selfie"
    bank_statement = "bank_statement"
    other = "other"


class KycDocVerificationStatus(enum.StrEnum):
    pending = "pending"
    processing = "processing"
    verified = "verified"
    rejected = "rejected"
    flagged = "flagged"
