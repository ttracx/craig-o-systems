from pydantic import BaseModel
import os


class Settings(BaseModel):
    database_url: str = os.getenv("DATABASE_URL", "")
    jwt_secret: str = os.getenv("JWT_SECRET", "")
    docker_network: str = os.getenv("DOCKER_NETWORK", "craigos_net")
    vm_image_default: str = os.getenv("VM_IMAGE_DEFAULT", "dockurr/macos")


settings = Settings()

if not settings.database_url:
    raise RuntimeError("DATABASE_URL is required")

if len(settings.jwt_secret) < 24:
    raise RuntimeError("JWT_SECRET must be at least 24 chars")