from decimal import Decimal
from uuid import uuid4

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.commission import Commission
from app.models.enums import LeadStatus, UserRole
from app.models.lead import Lead
from app.models.user import User


async def list_leads(db: AsyncSession, *, dsa: User) -> list[Lead]:
    r = await db.execute(select(Lead).where(Lead.dsa_id == dsa.id).order_by(Lead.created_at.desc()))
    return list(r.scalars().all())


async def create_lead(
    db: AsyncSession,
    *,
    dsa: User,
    name: str,
    phone: str,
    email: str | None,
    loan_type: str,
    amount: Decimal | None,
    employment_type: str | None,
    income_monthly: Decimal | None,
    city: str | None,
) -> Lead:
    if dsa.role not in (UserRole.dsa, UserRole.partner, UserRole.manager):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"code": "FORBIDDEN", "message": "DSA role required"},
        )
    row = Lead(
        id=uuid4(),
        dsa_id=dsa.id,
        name=name,
        phone=phone,
        email=email,
        loan_type=loan_type,
        amount=amount,
        employment_type=employment_type,
        income_monthly=income_monthly,
        city=city,
        status=LeadStatus.new,
    )
    db.add(row)
    await db.flush()
    return row


async def list_commissions(db: AsyncSession, *, dsa: User) -> list[Commission]:
    r = await db.execute(
        select(Commission).where(Commission.dsa_id == dsa.id).order_by(Commission.created_at.desc())
    )
    return list(r.scalars().all())
