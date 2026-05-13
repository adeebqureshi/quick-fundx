from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import require_roles
from app.core.responses import success_json
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.common import CommissionOut, LeadCreateIn, LeadOut
from app.services import dsa_service

router = APIRouter()


@router.get("/leads")
async def list_leads(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_roles(UserRole.dsa, UserRole.partner, UserRole.manager)),
):
    rows = await dsa_service.list_leads(db, dsa=user)
    return success_json([LeadOut.model_validate(r).model_dump() for r in rows])


@router.post("/leads")
async def create_lead(
    body: LeadCreateIn,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_roles(UserRole.dsa, UserRole.partner, UserRole.manager)),
):
    row = await dsa_service.create_lead(
        db,
        dsa=user,
        name=body.name,
        phone=body.phone,
        email=str(body.email) if body.email else None,
        loan_type=body.loan_type,
        amount=body.amount,
        employment_type=body.employment_type,
        income_monthly=body.income_monthly,
        city=body.city,
    )
    return success_json(LeadOut.model_validate(row).model_dump(), status_code=201)


@router.get("/commissions")
async def commissions(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_roles(UserRole.dsa, UserRole.partner, UserRole.manager)),
):
    rows = await dsa_service.list_commissions(db, dsa=user)
    return success_json([CommissionOut.model_validate(r).model_dump() for r in rows])
