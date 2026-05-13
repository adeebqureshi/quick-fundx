from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.responses import success_json
from app.models.system import Notification
from app.models.user import User

router = APIRouter()


@router.get("")
async def list_notifications(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
    limit: int = 50,
):
    r = await db.execute(
        select(Notification)
        .where(Notification.user_id == user.id)
        .order_by(Notification.created_at.desc())
        .limit(limit)
    )
    rows = r.scalars().all()
    return success_json(
        [
            {
                "id": str(n.id),
                "title": n.title,
                "body": n.body,
                "is_read": n.is_read,
                "created_at": n.created_at.isoformat(),
            }
            for n in rows
        ]
    )
