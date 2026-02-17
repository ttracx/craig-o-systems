import time
import jwt
from fastapi import HTTPException

from .config import settings

ALG = "HS256"


def mint_token(sub: str, ttl_seconds: int = 3600) -> str:
    now = int(time.time())
    payload = {"sub": sub, "iat": now, "exp": now + ttl_seconds}
    return jwt.encode(payload, settings.jwt_secret, algorithm=ALG)


def require_user(auth_header: str | None) -> str:
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="missing bearer token")
    token = auth_header.split(" ", 1)[1].strip()
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALG])
        return str(payload["sub"])
    except Exception:
        raise HTTPException(status_code=401, detail="invalid token")