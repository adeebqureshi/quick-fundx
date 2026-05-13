from collections.abc import Callable, Coroutine
from typing import Annotated, Any
from uuid import UUID

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.enums import UserRole
from app.models.user import User

security_scheme = HTTPBearer(auto_error=False)


async def get_current_user_optional(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(security_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User | None:
    if credentials is None or credentials.scheme.lower() != "bearer":
        return None
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
    except jwt.PyJWTError:
        return None
    if payload.get("type") != "access":
        return None
    sub = payload.get("sub")
    if not sub:
        return None
    try:
        uid = UUID(sub)
    except ValueError:
        return None
    result = await db.execute(select(User).where(User.id == uid, User.is_active.is_(True)))
    return result.scalar_one_or_none()


async def get_current_user(
    user: Annotated[User | None, Depends(get_current_user_optional)],
) -> User:
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "UNAUTHORIZED", "message": "Invalid or missing access token"},
        )
    return user


def require_roles(*roles: UserRole) -> Callable[..., Coroutine[Any, Any, User]]:
    allowed = set(roles)

    async def _dep(user: Annotated[User, Depends(get_current_user)]) -> User:
        if user.role not in allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={"code": "FORBIDDEN", "message": "Insufficient permissions"},
            )
        return user

    return _dep
