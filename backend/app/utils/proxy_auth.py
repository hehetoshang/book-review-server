import hashlib
import hmac
import time
import json
import base64
from typing import Optional

def verify_proxy_token(secret: str, token: str) -> Optional[dict]:
    """Verify the HMAC-SHA256 signature for proxy login tokens."""
    try:
        parts = token.split('.')
        if len(parts) != 2:
            return None
            
        encoded_payload, signature = parts
        
        # Calculate expected signature
        expected_sig = hmac.new(
            secret.encode('utf-8'),
            encoded_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        if not hmac.compare_digest(signature, expected_sig):
            return None
            
        # Add padding if needed for base64url decode
        padding = '=' * (4 - (len(encoded_payload) % 4))
        decoded_bytes = base64.urlsafe_b64decode(encoded_payload + padding)
        payload = json.loads(decoded_bytes.decode('utf-8'))
        
        if 'exp' in payload and int(time.time() * 1000) > payload['exp']:
            return None
            
        return payload
    except Exception:
        return None
