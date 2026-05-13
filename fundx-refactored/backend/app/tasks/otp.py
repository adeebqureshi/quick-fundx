import logging

from app.integrations.msg91 import Msg91Client
from app.worker import celery_app

log = logging.getLogger(__name__)


@celery_app.task(name="app.tasks.otp.send_otp_sms")
def send_otp_sms(phone: str, code: str) -> str:
    client = Msg91Client()
    result = client.send_otp(phone, code)
    log.info("send_otp_sms phone=%s result=%s", phone, result)
    return result
