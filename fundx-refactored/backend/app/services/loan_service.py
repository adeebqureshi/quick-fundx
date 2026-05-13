from datetime import datetime
from decimal import Decimal
from secrets import randbelow
from uuid import UUID, uuid4

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.commission import Commission
from app.models.enums import (
    CommissionStatus,
    CommissionType,
    KycDocType,
    KycDocVerificationStatus,
    LoanApplicationStatus,
    UserRole,
)
from app.models.kyc import KycDocument
from app.models.loan import LoanApplication, LoanProduct
from app.models.user import User
from app.schemas.common import LoanApplicationCreateIn


def _application_number() -> str:
    year = datetime.now().year
    n = randbelow(90000) + 10000
    return f"QFX-{year}-{n}"


async def list_products(db: AsyncSession) -> list[LoanProduct]:
    r = await db.execute(select(LoanProduct).where(LoanProduct.is_active.is_(True)))
    return list(r.scalars().all())


async def run_eligibility(
    db: AsyncSession,
    *,
    loan_product_id: UUID,
    monthly_income: Decimal,
    requested_amount: Decimal,
    tenure_months: int,
    cibil_score: int | None,
) -> tuple[bool, float, list[str], int | None]:
    r = await db.execute(select(LoanProduct).where(LoanProduct.id == loan_product_id))
    product = r.scalar_one_or_none()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "NOT_FOUND", "message": "Loan product not found"},
        )
    reasons: list[str] = []
    eligible = True
    if requested_amount < product.min_amount or requested_amount > product.max_amount:
        eligible = False
        reasons.append("amount_out_of_range")
    if tenure_months < product.min_tenure_months or tenure_months > product.max_tenure_months:
        eligible = False
        reasons.append("tenure_out_of_range")
    emi_estimate = float(requested_amount) / max(tenure_months, 1)
    if emi_estimate > float(monthly_income) * 0.55:
        eligible = False
        reasons.append("emi_too_high_vs_income")
    if cibil_score is not None and cibil_score < 650:
        eligible = False
        reasons.append("cibil_below_threshold")
    score = 72.0 if eligible else 38.0
    if cibil_score:
        score = min(99.0, score + (cibil_score - 650) * 0.05)
    suggested = tenure_months if eligible else max(product.min_tenure_months, tenure_months - 6)
    return eligible, score, reasons, suggested


async def create_application(
    db: AsyncSession,
    *,
    customer: User,
    body: LoanApplicationCreateIn,
) -> LoanApplication:
    r = await db.execute(select(LoanProduct).where(LoanProduct.id == body.loan_product_id))
    if not r.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "NOT_FOUND", "message": "Loan product not found"},
        )
    for _ in range(5):
        app_no = _application_number()
        exists = await db.execute(select(LoanApplication).where(LoanApplication.application_number == app_no))
        if exists.scalar_one_or_none() is None:
            break
    else:
        app_no = f"QFX-{datetime.now().year}-{uuid4().hex[:8].upper()}"

    eligible, score, _, _ = await run_eligibility(
        db,
        loan_product_id=body.loan_product_id,
        monthly_income=body.monthly_income,
        requested_amount=body.requested_amount,
        tenure_months=body.tenure_months,
        cibil_score=body.cibil_score,
    )
    app_row = LoanApplication(
        id=uuid4(),
        application_number=app_no,
        customer_id=customer.id,
        dsa_id=body.dsa_id,
        loan_product_id=body.loan_product_id,
        requested_amount=body.requested_amount,
        tenure_months=body.tenure_months,
        status=LoanApplicationStatus.submitted,
        ai_eligibility_score=Decimal(str(round(score, 2))),
    )
    if not eligible:
        app_row.status = LoanApplicationStatus.under_review
    db.add(app_row)
    await db.flush()
    return app_row


async def get_application(db: AsyncSession, *, app_id: UUID, user: User) -> LoanApplication:
    r = await db.execute(select(LoanApplication).where(LoanApplication.id == app_id))
    row = r.scalar_one_or_none()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "NOT_FOUND", "message": "Application not found"},
        )
    if user.role == UserRole.customer:
        if row.customer_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"code": "NOT_FOUND", "message": "Application not found"},
            )
        return row
    if user.role in (UserRole.dsa, UserRole.partner):
        if row.dsa_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"code": "NOT_FOUND", "message": "Application not found"},
            )
        return row
    if user.role in (
        UserRole.admin,
        UserRole.superadmin,
        UserRole.manager,
        UserRole.banking_partner,
    ):
        return row
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail={"code": "FORBIDDEN", "message": "Insufficient permissions"},
    )


async def list_my_applications(db: AsyncSession, *, user: User) -> list[LoanApplication]:
    if user.role == UserRole.customer:
        r = await db.execute(
            select(LoanApplication)
            .where(LoanApplication.customer_id == user.id)
            .order_by(LoanApplication.created_at.desc())
        )
        return list(r.scalars().all())
    if user.role in (UserRole.dsa, UserRole.partner):
        r = await db.execute(
            select(LoanApplication)
            .where(LoanApplication.dsa_id == user.id)
            .order_by(LoanApplication.created_at.desc())
        )
        return list(r.scalars().all())
    r = await db.execute(select(LoanApplication).order_by(LoanApplication.created_at.desc()).limit(200))
    return list(r.scalars().all())


async def approve_application(
    db: AsyncSession,
    *,
    app_id: UUID,
    admin: User,
    approved_amount: Decimal | None,
    interest_rate: Decimal | None,
    assigned_bank_id: UUID | None,
) -> LoanApplication:
    _ = admin
    r = await db.execute(select(LoanApplication).where(LoanApplication.id == app_id))
    row = r.scalar_one_or_none()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "NOT_FOUND", "message": "Application not found"},
        )
    row.status = LoanApplicationStatus.approved
    row.approved_amount = approved_amount or row.requested_amount
    row.interest_rate = interest_rate
    row.assigned_bank_id = assigned_bank_id
    await db.flush()
    return row


async def mark_disbursed_and_commission(
    db: AsyncSession,
    *,
    app_id: UUID,
    dsa_commission_rate: Decimal = Decimal("0.015"),
) -> LoanApplication:
    """Internal: move to disbursed and create commission row (DSA path)."""
    r = await db.execute(select(LoanApplication).where(LoanApplication.id == app_id))
    row = r.scalar_one_or_none()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "NOT_FOUND", "message": "Application not found"},
        )
    row.status = LoanApplicationStatus.disbursed
    amt = row.approved_amount or row.requested_amount
    if row.dsa_id:
        gross = (amt * dsa_commission_rate).quantize(Decimal("0.01"))
        pan_r = await db.execute(
            select(func.count())
            .select_from(KycDocument)
            .where(
                KycDocument.user_id == row.dsa_id,
                KycDocument.doc_type == KycDocType.pan,
                KycDocument.verification_status == KycDocVerificationStatus.verified,
            )
        )
        has_verified_pan = (pan_r.scalar_one() or 0) > 0
        tds_rate = Decimal("0") if has_verified_pan else Decimal("0.10")
        tds = (gross * tds_rate).quantize(Decimal("0.01"))
        net = gross - tds
        key = f"payout-{row.id}"
        existing = await db.execute(select(Commission).where(Commission.payout_idempotency_key == key))
        if existing.scalar_one_or_none() is None:
            db.add(
                Commission(
                    id=uuid4(),
                    dsa_id=row.dsa_id,
                    application_id=row.id,
                    commission_type=CommissionType.disbursement,
                    gross_amount=gross,
                    tds_amount=tds,
                    net_amount=net,
                    status=CommissionStatus.pending,
                    payout_idempotency_key=key,
                )
            )
    await db.flush()
    return row
