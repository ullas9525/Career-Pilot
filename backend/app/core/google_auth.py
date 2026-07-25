from google.oauth2 import id_token
from google.auth.transport import requests

from app.config import settings


def verify_google_token(token: str) -> dict | None:
    try:
        info = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
        if info["iss"] not in {"accounts.google.com", "https://accounts.google.com"}:
            return None
        return info
    except ValueError:
        return None
