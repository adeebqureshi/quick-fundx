"""Seed loan products and banking partners (run after migrations)."""

import asyncio
from decimal import Decimal
from uuid import uuid4

from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.models.loan import BankingPartner, LoanProduct


async def seed() -> None:
    async with AsyncSessionLocal() as session:
        existing = await session.execute(select(LoanProduct).limit(1))
        if existing.scalar_one_or_none():
            return
        products = [
            LoanProduct(
                id=uuid4(),
                code="PL_STD",
                name="Personal Loan Standard",
                category="personal",
                min_amount=Decimal("50000"),
                max_amount=Decimal("5000000"),
                min_tenure_months=12,
                max_tenure_months=60,
                interest_rate_min=Decimal("10.500"),
                interest_rate_max=Decimal("24.000"),
            ),
            LoanProduct(
                id=uuid4(),
                code="BL_STD",
                name="Business Loan Standard",
                category="business",
                min_amount=Decimal("100000"),
                max_amount=Decimal("50000000"),
                min_tenure_months=12,
                max_tenure_months=84,
                interest_rate_min=Decimal("13.000"),
                interest_rate_max=Decimal("26.000"),
            ),
            LoanProduct(
                id=uuid4(),
                code="HL_STD",
                name="Home Loan Standard",
                category="home",
                min_amount=Decimal("1000000"),
                max_amount=Decimal("100000000"),
                min_tenure_months=120,
                max_tenure_months=360,
                interest_rate_min=Decimal("8.350"),
                interest_rate_max=Decimal("11.000"),
            ),
        ]
        for p in products:
            session.add(p)
        banks = [
            BankingPartner(id=uuid4(), name="Sample Bank A", code="BANK_A"),
            BankingPartner(id=uuid4(), name="Sample NBFC B", code="NBFC_B"),
        ]
        for b in banks:
            session.add(b)
        await session.commit()


def main() -> None:
    asyncio.run(seed())


if __name__ == "__main__":
    main()
