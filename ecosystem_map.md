# Craig-O-Systems Ecosystem Map

## Core idea
A browser-based "web operating system" that provisions and manages OS containers (starting with dockur/macos) and streams the desktop via web VNC.

## Components

- **apps/portal** (Next.js) - Desktop UI, session list, session viewer
- **services/orchestrator** (FastAPI) - Auth (JWT), session lifecycle, labels for routing, persistence
- **infra/traefik** - Routes /api -> orchestrator, / -> portal, /s/<id> -> VM viewer (8006)
- **Runtime images** - dockurr/macos (macOS VM-in-container, browser viewer on 8006, VNC on 5900)

## External dependencies

- Docker Engine on Linux with /dev/kvm available
- PostgreSQL