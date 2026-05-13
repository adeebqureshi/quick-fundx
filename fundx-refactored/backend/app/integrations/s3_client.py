import logging
import uuid
from pathlib import Path

import boto3
from botocore.exceptions import ClientError

from app.core.config import get_settings

log = logging.getLogger(__name__)


def build_storage_key(user_id: str, doc_type: str, filename: str) -> str:
    safe = filename.replace("/", "_")[:120]
    return f"kyc/{user_id}/{doc_type}/{uuid.uuid4().hex}_{safe}"


def ensure_local_dir(path: str) -> Path:
    p = Path(path)
    p.mkdir(parents=True, exist_ok=True)
    return p


def presigned_put_url(*, storage_key: str, content_type: str, expires_in: int = 900) -> str | None:
    settings = get_settings()
    if not (settings.aws_access_key_id and settings.s3_bucket_kyc):
        return None
    try:
        s3 = boto3.client(
            "s3",
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
        )
        return s3.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": settings.s3_bucket_kyc,
                "Key": storage_key,
                "ContentType": content_type,
            },
            ExpiresIn=expires_in,
        )
    except ClientError as e:
        log.warning("presigned_put_url failed: %s", e)
        return None
