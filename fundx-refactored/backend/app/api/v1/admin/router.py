from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import require_roles
from app.core.responses import success_json
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.common import AdminApproveIn, AdminMetricsOut
from app.services import admin_service, loan_service

router = APIRouter()


@router.get("/dashboard/metrics")
async def metrics(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_roles(UserRole.admin, UserRole.superadmin, UserRole.manager)),
):
    m = await admin_service.dashboard_metrics(db)
    return success_json(AdminMetricsOut(**m).model_dump())


@router.put("/loans/{loan_id}/approve")
async def approve_loan(
    loan_id: str,
    body: AdminApproveIn,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_roles(UserRole.admin, UserRole.superadmin, UserRole.manager)),
):
    from uuid import UUID

    from app.schemas.common import LoanApplicationOut

    row = await loan_service.approve_application(
        db,
        app_id=UUID(loan_id),
        admin=admin,
        approved_amount=body.approved_amount,
        interest_rate=body.interest_rate,
        assigned_bank_id=body.assigned_bank_id,
    )
    return success_json(LoanApplicationOut.model_validate(row).model_dump())


@router.post("/loans/{loan_id}/disburse")
async def disburse_loan(
    loan_id: str,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_roles(UserRole.admin, UserRole.superadmin, UserRole.manager)),
):
    """Mark disbursed and create commission (admin workflow; not in public PRD table)."""
    from uuid import UUID

    from app.schemas.common import LoanApplicationOut

    row = await loan_service.mark_disbursed_and_commission(db, app_id=UUID(loan_id))
    return success_json(LoanApplicationOut.model_validate(row).model_dump())


@router.get("/kyc/queue")
async def kyc_queue(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_roles(UserRole.admin, UserRole.superadmin, UserRole.manager)),
):
    rows = await admin_service.kyc_queue(db)
    out = [
        {
            "id": str(r.id),
            "user_id": str(r.user_id),
            "doc_type": r.doc_type.value,
            "verification_status": r.verification_status.value,
            "created_at": r.created_at.isoformat(),
        }
        for r in rows
    ]
    return success_json(out)
