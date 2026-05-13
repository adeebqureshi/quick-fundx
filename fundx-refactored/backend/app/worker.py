"""Celery application instance (broker: Redis)."""

from celery import Celery

from app.core.config import get_settings

settings = get_settings()

celery_app = Celery(
    "quickfundx",
    broker=settings.redis_url,
    backend=settings.redis_url,
)
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_routes={
        "app.tasks.otp.send_otp_sms": {"queue": "high_priority"},
        "app.tasks.notifications.send_whatsapp_notification": {"queue": "notifications"},
        "app.tasks.kyc.process_kyc_ocr": {"queue": "ai_processing"},
        "app.tasks.kyc.run_fraud_detection": {"queue": "ai_processing"},
        "app.tasks.commission.calculate_commission": {"queue": "financial"},
        "app.tasks.commission.send_payout_razorpay": {"queue": "financial"},
        "app.tasks.external.generate_credit_report": {"queue": "external_apis"},
        "app.tasks.scheduled.send_email_report": {"queue": "scheduled"},
    },
    task_default_queue="high_priority",
)

# Ensure task modules are imported so workers register them
import app.tasks.commission  # noqa: E402, F401
import app.tasks.external  # noqa: E402, F401
import app.tasks.kyc  # noqa: E402, F401
import app.tasks.notifications  # noqa: E402, F401
import app.tasks.otp  # noqa: E402, F401
import app.tasks.scheduled  # noqa: E402, F401
