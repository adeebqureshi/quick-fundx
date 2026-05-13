from decimal import Decimal
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import AiRiskTier
from app.services.loan_service import run_eligibility


async def score_eligibility(
    db: AsyncSession,
    *,
    loan_product_id: UUID,
    monthly_income: Decimal,
    requested_amount: Decimal,
    tenure_months: int,
    cibil_score: int | None,
) -> dict:
    eligible, score, reasons, suggested = await run_eligibility(
        db,
        loan_product_id=loan_product_id,
        monthly_income=monthly_income,
        requested_amount=requested_amount,
        tenure_months=tenure_months,
        cibil_score=cibil_score,
    )
    tier = AiRiskTier.A if score >= 80 else AiRiskTier.B if score >= 60 else AiRiskTier.C
    return {
        "score": round(score, 2),
        "eligible": eligible,
        "risk_tier": tier.value,
        "reasons": reasons,
        "suggested_tenure_months": suggested,
    }


async def recommend_banks(
    db: AsyncSession,
    *,
    loan_product_id: UUID,
    eligibility_score: float,
) -> list[dict]:
    from sqlalchemy import select

    from app.models.loan import BankingPartner

    r = await db.execute(
        select(BankingPartner).where(BankingPartner.is_active.is_(True)).limit(10)
    )
    partners = list(r.scalars().all())
    out = []
    for i, p in enumerate(partners):
        match_pct = min(99.0, eligibility_score - i * 3)
        out.append(
            {
                "bank_id": str(p.id),
                "name": p.name,
                "match_score": round(match_pct, 1),
                "estimated_rate_band": "10.5% - 14%" if eligibility_score > 70 else "14% - 18%",
            }
        )
    return out


def ocr_pan_stub(_image_bytes: bytes) -> dict:
    return {
        "name": "SAMPLE NAME",
        "pan_number": "ABCDE1234F",
        "dob": "1990-01-01",
        "father_name": "SAMPLE FATHER",
        "confidence": 0.91,
    }
