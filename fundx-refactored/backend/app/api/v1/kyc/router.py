from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.responses import success_json
from app.models.enums import KycDocType
from app.models.user import User
from app.schemas.common import KycStatusOut, KycUploadOut
from app.services import kyc_service

router = APIRouter()


@router.post("/upload")
async def kyc_upload(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
    doc_type: KycDocType = Form(...),
    file: UploadFile = File(...),
):
    row, presigned = await kyc_service.save_upload(db, user=user, doc_type=doc_type, file=file)
    return success_json(
        KycUploadOut(
            document_id=row.id,
            storage_key=row.storage_key,
            presigned_put_url=presigned,
        ).model_dump(),
        status_code=201,
    )


@router.get("/status")
async def kyc_status(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    st, docs = await kyc_service.kyc_status_for_user(db, user=user)
    return success_json(KycStatusOut(user_kyc_status=st, documents=docs).model_dump())
