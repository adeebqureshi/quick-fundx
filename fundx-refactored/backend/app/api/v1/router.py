from fastapi import APIRouter

from app.api.v1.admin.router import router as admin_router
from app.api.v1.ai.router import router as ai_router
from app.api.v1.auth.router import router as auth_router
from app.api.v1.dsa.router import router as dsa_router
from app.api.v1.kyc.router import router as kyc_router
from app.api.v1.loans.router import router as loans_router
from app.api.v1.notifications.router import router as notifications_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(loans_router, prefix="/loans", tags=["loans"])
api_router.include_router(kyc_router, prefix="/kyc", tags=["kyc"])
api_router.include_router(ai_router, prefix="/ai", tags=["ai"])
api_router.include_router(dsa_router, prefix="/dsa", tags=["dsa"])
api_router.include_router(admin_router, prefix="/admin", tags=["admin"])
api_router.include_router(notifications_router, prefix="/notifications", tags=["notifications"])
