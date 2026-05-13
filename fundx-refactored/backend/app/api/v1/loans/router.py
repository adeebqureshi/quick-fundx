from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.responses import success_json
from app.models.user import User
from app.schemas.common import (
    EligibilityIn,
    EligibilityOut,
    LoanApplicationCreateIn,
    LoanApplicationOut,
    LoanProductOut,
)
from app.services import loan_service

router = APIRouter()


@router.get("/products")
async def list_products(db: AsyncSession = Depends(get_db)):
    rows = await loan_service.list_products(db)
    return success_json([LoanProductOut.model_validate(r).model_dump() for r in rows])


@router.post("/eligibility")
async def eligibility(
    body: EligibilityIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _ = user
    eligible, score, reasons, suggested = await loan_service.run_eligibility(
        db,
        loan_product_id=body.loan_product_id,
        monthly_income=body.monthly_income,
        requested_amount=body.requested_amount,
        tenure_months=body.tenure_months,
        cibil_score=body.cibil_score,
    )
    return success_json(
        EligibilityOut(
            eligible=eligible,
            score=score,
            reasons=reasons,
            suggested_tenure_months=suggested,
        ).model_dump(),
    )


@router.post("/applications")
async def create_application(
    body: LoanApplicationCreateIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    row = await loan_service.create_application(db, customer=user, body=body)
    return success_json(LoanApplicationOut.model_validate(row).model_dump(), status_code=201)


@router.get("/applications")
async def list_applications(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    rows = await loan_service.list_my_applications(db, user=user)
    return success_json([LoanApplicationOut.model_validate(r).model_dump() for r in rows])


@router.get("/applications/{application_id}")
async def get_application(
    application_id: str,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    from uuid import UUID

    row = await loan_service.get_application(db, app_id=UUID(application_id), user=user)
    return success_json(LoanApplicationOut.model_validate(row).model_dump())
