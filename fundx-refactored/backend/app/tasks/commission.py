import logging

from app.worker import celery_app

log = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.commission.calculate_commission")
def calculate_commission(application_id: str) -> str:
    log.info("calculate_commission application_id=%s (stub)", application_id)
    return "ok"


@celery_app.task(name="app.tasks.commission.send_payout_razorpay")
def send_payout_razorpay(commission_id: str, idempotency_key: str) -> str:
    from app.integrations.razorpay_client import RazorpayClient

    client = RazorpayClient()
    out = client.payout_stub(commission_id, idempotency_key)
    log.info("send_payout_razorpay commission_id=%s", commission_id)
    return out
