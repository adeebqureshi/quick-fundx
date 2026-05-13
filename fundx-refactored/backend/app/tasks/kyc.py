import logging

from app.worker import celery_app

log = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.kyc.process_kyc_ocr")
def process_kyc_ocr(document_id: str) -> str:
    log.info("process_kyc_ocr document_id=%s (stub)", document_id)
    return "queued"


@celery_app.task(name="app.tasks.kyc.run_fraud_detection")
def run_fraud_detection(document_id: str) -> str:
    log.info("run_fraud_detection document_id=%s (stub)", document_id)
    return "queued"
