from typing import Any
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.integrations.s3_client import build_storage_key, ensure_local_dir, presigned_put_url
from app.models.enums import KycDocType, KycDocVerificationStatus, UserKycStatus
from app.models.kyc import KycDocument
from app.models.user import User
from app.tasks.kyc import process_kyc_ocr, run_fraud_detection


async def save_upload(
    db: AsyncSession,
    *,
    user: User,
    doc_type: KycDocType,
    file: UploadFile,
) -> tuple[KycDocument, str | None]:
    settings = get_settings()
    raw_name = file.filename or "upload.bin"
    key = build_storage_key(str(user.id), doc_type.value, raw_name)
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail={"code": "FILE_TOO_LARGE", "message": "Max 5MB"},
        )
    presigned = presigned_put_url(
        storage_key=key, content_type=file.content_type or "application/octet-stream"
    )
    if presigned is None:
        base = ensure_local_dir(settings.kyc_local_storage_path)
        dest = base / key.replace("/", "_")
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(content)
        storage_key = str(dest)
        presigned_out: str | None = None
    else:
        storage_key = key
        presigned_out = presigned
    row = KycDocument(
        id=uuid4(),
        user_id=user.id,
        doc_type=doc_type,
        storage_key=storage_key,
        mime_type=file.content_type,
        verification_status=KycDocVerificationStatus.pending,
    )
    db.add(row)
    user.kyc_status = UserKycStatus.submitted
    await db.flush()
    if settings.testing:
        process_kyc_ocr.run(str(row.id))
        run_fraud_detection.run(str(row.id))
    else:
        process_kyc_ocr.delay(str(row.id))
        run_fraud_detection.delay(str(row.id))
    return row, presigned_out


async def kyc_status_for_user(db: AsyncSession, *, user: User) -> tuple[UserKycStatus, list[dict[str, Any]]]:
    r = await db.execute(select(KycDocument).where(KycDocument.user_id == user.id))
    docs = []
    for d in r.scalars().all():
        docs.append(
            {
                "id": str(d.id),
                "doc_type": d.doc_type.value,
                "verification_status": d.verification_status.value,
                "fraud_score": float(d.fraud_score) if d.fraud_score is not None else None,
            }
        )
    return user.kyc_status, docs
