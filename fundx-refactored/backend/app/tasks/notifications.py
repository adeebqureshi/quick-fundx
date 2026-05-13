import logging

from app.integrations.msg91 import Msg91Client
from app.worker import celery_app

log = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.notifications.send_whatsapp_notification")
def send_whatsapp_notification(phone: str, message: str) -> str:
    client = Msg91Client()
    out = client.send_whatsapp_stub(phone, message)
    log.info("whatsapp notification phone=%s", phone)
    return out
