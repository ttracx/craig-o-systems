import docker
import secrets
from typing import dict

from .config import settings

client = docker.from_env()


def _safe_id(prefix: str = "sess") -> str:
    return f"{prefix}_{secrets.token_urlsafe(16)}"


def create_macos_session(
    owner: str,
    version: str = "14",
    disk_size: str = "64G",
    ram_size: str = "4G",
    cpu_cores: str = "1",
) -> dict:
    session_id = _safe_id("macos")
    name = f"craigos-{session_id}"

    # Persistent storage per session
    storage_vol = f"{name}-storage"

    env = {
        "VERSION": version,
        "DISK_SIZE": disk_size,
        "RAM_SIZE": ram_size,
        "CPU_CORES": cpu_cores,
    }

    labels = {
        "traefik.enable": "true",
        # Route /s/<id>/* -> container:8006, then strip /s/<id>
        f"traefik.http.routers.{session_id}.rule": f"PathPrefix(`/s/{session_id}`)",
        f"traefik.http.routers.{session_id}.entrypoints": "web",
        f"traefik.http.routers.{session_id}.middlewares": "strip-s-prefix@file",
        f"traefik.http.services.{session_id}.loadbalancer.server.port": "8006",
        "craigos.session_id": session_id,
        "craigos.owner": owner,
        "craigos.kind": "macos",
    }

    # Security note: this requires KVM + tun + NET_ADMIN like upstream examples.
    # Keep this isolated to trusted hosts.
    container = client.containers.run(
        image=settings.vm_image_default,
        name=name,
        detach=True,
        environment=env,
        network=settings.docker_network,
        devices=["/dev/kvm:/dev/kvm", "/dev/net/tun:/dev/net/tun"],
        cap_add=["NET_ADMIN"],
        volumes={storage_vol: {"bind": "/storage", "mode": "rw"}},
        stop_timeout=120,
        restart_policy={"Name": "unless-stopped"},
    )

    return {
        "id": session_id,
        "container_id": container.id,
        "viewer_path": f"/s/{session_id}",  # proxied to 8006
        "vnc_port": None,  # optional to map later if you want raw VNC
        "image": settings.vm_image_default,
        "env": env,
    }


def stop_session(container_id: str) -> None:
    c = client.containers.get(container_id)
    c.stop(timeout=120)


def delete_session(container_id: str) -> None:
    c = client.containers.get(container_id)
    c.remove(force=True)