import hashlib
import hmac
import time
from typing import Optional

from app.config import settings


def verify_proxy_signature(app_id: str, timestamp: str, nonce: str, signature: str, secret: str) -> bool:
    """Verify the HMAC signature for proxy login requests."""
    expected_sig = hmac.new(
        secret.encode(),
        f"{app_id}{timestamp}{nonce}".encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected_sig)


def generate_proxy_token(app_id: str, secret: str) -> str:
    """Generate a temporary proxy token."""
    timestamp = str(int(time.time()))
    token_data = f"{app_id}:{timestamp}"
    token = hmac.new(
        secret.encode(),
        token_data.encode(),
        hashlib.sha256
    ).hexdigest()
    return token
