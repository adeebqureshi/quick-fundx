import logging

import httpx

from app.core.config import get_settings

log = logging.getLogger(__name__)


class Msg91Client:
    """MSG91 SMS / WhatsApp adapter — mock when MSG91_AUTHKEY is unset."""

    def __init__(self) -> None:
        self.settings = get_settings()

    def send_otp(self, phone: str, code: str) -> str:
        if not self.settings.msg91_authkey:
            log.info("[mock MSG91] OTP for %s: %s", phone, code)
            return "mock_sent"
        payload = {"mobile": phone, "otp": code}
        with httpx.Client(timeout=30.0) as client:
            r = client.post(
                "https://api.msg91.com/api/v5/otp",
                json=payload,
                headers={"authkey": self.settings.msg91_authkey},
            )
            r.raise_for_status()
            return "sent"

    def send_whatsapp_stub(self, phone: str, message: str) -> str:
        if not self.settings.msg91_authkey:
            log.info("[mock WhatsApp] to=%s msg=%s", phone, message[:80])
            return "mock_whatsapp"
        return "queued"
