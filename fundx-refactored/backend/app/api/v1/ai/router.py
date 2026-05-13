from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.ai import pipelines
from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.responses import success_json
from app.models.kyc import KycDocument
from app.models.user import User
from app.schemas.common import AiEligibilityIn, AiOcrPanIn, AiRecommendIn

router = APIRouter()


@router.post("/eligibility-score")
async def ai_eligibility(
    body: AiEligibilityIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _ = user
    result = await pipelines.score_eligibility(
        db,
        loan_product_id=body.loan_product_id,
        monthly_income=body.monthly_income,
        requested_amount=body.requested_amount,
        tenure_months=body.tenure_months,
        cibil_score=body.cibil_score,
    )
    return success_json(result)


@router.post("/recommend-banks")
async def recommend_banks(
    body: AiRecommendIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _ = user
    banks = await pipelines.recommend_banks(
        db,
        loan_product_id=body.loan_product_id,
        eligibility_score=body.eligibility_score,
    )
    return success_json(banks)


@router.post("/ocr/pan")
async def ocr_pan(
    body: AiOcrPanIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    r = await db.execute(select(KycDocument).where(KycDocument.id == body.document_id))
    doc = r.scalar_one_or_none()
    if not doc or doc.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": "NOT_FOUND", "message": "Document not found"},
        )
    from pathlib import Path

    data = b""
    p = Path(doc.storage_key)
    if p.exists():
        data = p.read_bytes()
    result = pipelines.ocr_pan_stub(data)
    return success_json(result)
