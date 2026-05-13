from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.commission import Commission
from app.models.enums import CommissionStatus, KycDocVerificationStatus, LoanApplicationStatus
from app.models.kyc import KycDocument
from app.models.loan import LoanApplication


async def dashboard_metrics(db: AsyncSession) -> dict[str, int]:
    active = await db.execute(
        select(func.count())
        .select_from(LoanApplication)
        .where(
            LoanApplication.status.in_(
                [
                    LoanApplicationStatus.submitted,
                    LoanApplicationStatus.under_review,
                ]
            )
        )
    )
    pending_kyc = await db.execute(
        select(func.count())
        .select_from(KycDocument)
        .where(KycDocument.verification_status == KycDocVerificationStatus.pending)
    )
    pending_comm = await db.execute(
        select(func.count())
        .select_from(Commission)
        .where(Commission.status == CommissionStatus.pending)
    )
    from app.models.user import User

    users = await db.execute(select(func.count()).select_from(User))
    return {
        "active_applications": int(active.scalar_one() or 0),
        "pending_kyc": int(pending_kyc.scalar_one() or 0),
        "pending_commissions": int(pending_comm.scalar_one() or 0),
        "users_total": int(users.scalar_one() or 0),
    }


async def kyc_queue(db: AsyncSession, *, limit: int = 100) -> list[KycDocument]:
    r = await db.execute(
        select(KycDocument)
        .where(
            KycDocument.verification_status.in_(
                [
                    KycDocVerificationStatus.pending,
                    KycDocVerificationStatus.processing,
                    KycDocVerificationStatus.flagged,
                ]
            )
        )
        .order_by(KycDocument.created_at.asc())
        .limit(limit)
    )
    return list(r.scalars().all())
