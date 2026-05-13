import logging

from app.worker import celery_app

log = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.external.generate_credit_report")
def generate_credit_report(application_id: str) -> str:
    log.info("generate_credit_report application_id=%s (stub)", application_id)
    return "stub"
