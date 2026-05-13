import logging

from app.worker import celery_app

log = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.scheduled.send_email_report")
def send_email_report(recipient: str) -> str:
    log.info("send_email_report recipient=%s (stub)", recipient)
    return "stub"
