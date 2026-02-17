# Craig-O-Systems

A browser-based "web operating system" that provisions and manages OS containers (starting with dockur/macos) and streams the desktop via web VNC.

## Architecture

```
┌─────────────────┐
│  Next.js Portal  │ (Desktop UI, session viewer)
└────────┬────────┘
         │
         ├─────────────────────┐
         │                     │
    ┌────▼────────┐     ┌─────▼─────────┐
    │  Traefik    │────▶│  Orchestrator │
    │  (Reverse   │     │  (FastAPI    │
    │   Proxy)    │     │   Session MGMT)│
    └────┬────────┘     └─────┬─────────┘
         │                   │
         │          ┌────────▼─────────┐
         │          │   PostgreSQL     │
         │          │ (Session Store)  │
         │          └────────┬─────────┘
         │                   │
    ┌────▼──────────────────▼────────┐
    │  Docker Containers             │
    │  ┌──────────────────────────┐  │
    │  │ dockur/macos (VM #1)     │  │  → Web Viewer (8006)
    │  │ dockur/macos (VM #2)     │  │  → VNC (5900)
    │  └──────────────────────────┘  │
    └───────────────────────────────┘
```

## Quick Start

### Local Development

```bashcd infra
docker compose up -d --build
```

Access:
- Portal: http://localhost/
- Traefik Dashboard: http://localhost:8080
- Orchestrator API: http://localhost/api

### Creating a macOS Session

1. Click "Quick Login (MVP)" on the desktop
2. Click "New macOS Session"
3. Wait for the VM to boot (~1-2 minutes)
4. Click on the session tile to open the web viewer

## Features

- **Web-based VNC** - No client installation required
- **Dynamic Routing** - Traefik automatically routes to session containers
- **Session Management** - Create, stop, delete sessions from the UI
- **Persistent Storage** - Each session has dedicated disk storage
- **macOS 14** - Latest macOS Sonoma in containers

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: FastAPI, Python 3.12
- **Database**: PostgreSQL 16
- **Reverse Proxy**: Traefik v3.1
- **Container Runtime**: Docker
- **VM Image**: dockur/macos (macOS 14)

## Deployment

### Frontend (Vercel)
```bashcd apps/portal
vercel --prod
```

### Backend (Render/Railway)
Deploy the orchestrator as a service:
1. Connect your GitHub repo
2. Configure environment variables
3. Deploy

### Production Notes

- Requires Linux host with KVM support
- `/dev/kvm` must be available to the orchestrator
- NET_ADMIN capability needed for networking
- Store JWT_SECRET in production secrets
- Add proper authentication (OIDC) for multi-user

## Security Constraints

**Apple EULA**: macOS may only be run on Apple hardware. An acknowledgment gate is shown before creating sessions.

**Docker Socket**: The orchestrator has access to Docker API. In production, use:
- Docker socket proxy
- Resource limits
- Per-tenant isolation

## Roadmap

- [ ] OAuth/OIDC authentication
- [ ] Per-user quotas
- [ ] Windows containers
- [ ] Linux containers
- [ ] Billing by session hour
- [ ] Multi-tenancy

## License

- Craig-O-Systems: MIT
- dockur/macos: See upstream license

---

**© 2026 Craig-O-Systems powered by VibeCaaS.com a division of NeuralQuantum.ai LLC. All rights reserved.**