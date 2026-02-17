# Craig-O-Systems MVP Catalog

## MVP-0: Single-user Web OS (macOS sessions)
- Login (username only)
- Create/Stop/Delete macOS session
- Open viewer in portal
- Persist session metadata in Postgres

## MVP-1: Multi-user + quotas
- Real auth (OIDC)
- Per-user quotas, max sessions, resource caps
- Audit log of actions

## MVP-2: App store
- Add dockur/windows and linux desktop images
- Curated templates (dev workstation, QA box, demo box)

## MVP-3: Billing + tenancy
- Stripe metering per hour per session
- Tenant isolation (separate hosts/pools)