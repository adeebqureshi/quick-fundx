import logging

import httpx

from app.core.config import get_settings

log = logging.getLogger(__name__)


class RazorpayClient:
    """Razorpay payouts adapter — stub when keys unset."""

    def __init__(self) -> None:
        self.settings = get_settings()

    def payout_stub(self, commission_id: str, idempotency_key: str) -> str:
        if not (self.settings.razorpay_key_id and self.settings.razorpay_key_secret):
            log.info(
                "[mock Razorpay] payout commission_id=%s idempotency=%s",
                commission_id,
                idempotency_key,
            )
            return f"mock_payout_{commission_id}"
        # Real integration: Razorpay X payouts API
        with httpx.Client(timeout=30.0) as client:
            r = client.post(
                "https://api.razorpay.com/v1/payouts",
                auth=(self.settings.razorpay_key_id, self.settings.razorpay_key_secret),
                headers={"X-Payout-Idempotency": idempotency_key},
                json={"commission_id": commission_id},
            )
            r.raise_for_status()
            return "sent"
