from fastapi import FastAPI, Header
from pydantic import BaseModel
from sqlalchemy import select
import datetime as dt

from .db import Base, engine, SessionLocal
from .models import Session as DbSession
from .docker_runtime import create_macos_session, stop_session, delete_session
from .auth import mint_token, require_user

app = FastAPI(title="Craig-O-Systems Orchestrator")


class LoginReq(BaseModel):
    username: str


class CreateReq(BaseModel):
    kind: str = "macos"
    version: str = "14"
    disk_size: str = "64G"
    ram_size: str = "4G"
    cpu_cores: str = "1"


@app.on_event("startup")
def _startup():
    Base.metadata.create_all(bind=engine)


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/login")
def login(req: LoginReq):
    # MVP: username-only; replace with real auth (OIDC) before production.
    return {"token": mint_token(req.username)}


@app.post("/api/sessions")
def create(req: CreateReq, authorization: str | None = Header(default=None)):
    user = require_user(authorization)
    if req.kind != "macos":
        return {"error": "only macos supported in MVP"}

    created = create_macos_session(
        owner=user,
        version=req.version,
        disk_size=req.disk_size,
        ram_size=req.ram_size,
        cpu_cores=req.cpu_cores,
    )

    db = SessionLocal()
    try:
        db.add(
            DbSession(
                id=created["id"],
                image=created["image"],
                container_id=created["container_id"],
                owner=user,
                status="running",
            )
        )
        db.commit()
    finally:
        db.close()

    return created


@app.get("/api/sessions")
def list_sessions(authorization: str | None = Header(default=None)):
    user = require_user(authorization)
    db = SessionLocal()
    try:
        rows = db.execute(
            select(DbSession).where(
                DbSession.owner == user, DbSession.is_deleted == False
            )
        ).scalars().all()
        return [
            {
                "id": r.id,
                "status": r.status,
                "viewer_path": f"/s/{r.id}",
                "created_at": r.created_at.isoformat(),
            }
            for r in rows
        ]
    finally:
        db.close()


@app.post("/api/sessions/{session_id}/stop")
def stop(session_id: str, authorization: str | None = Header(default=None)):
    user = require_user(authorization)
    db = SessionLocal()
    try:
        r = db.get(DbSession, session_id)
        if not r or r.owner != user or r.is_deleted:
            return {"error": "not found"}
        stop_session(r.container_id)
        r.status = "stopped"
        r.stopped_at = dt.datetime.utcnow()
        db.commit()
        return {"ok": True}
    finally:
        db.close()


@app.delete("/api/sessions/{session_id}")
def remove(session_id: str, authorization: str | None = Header(default=None)):
    user = require_user(authorization)
    db = SessionLocal()
    try:
        r = db.get(DbSession, session_id)
        if not r or r.owner != user or r.is_deleted:
            return {"error": "not found"}
        delete_session(r.container_id)
        r.is_deleted = True
        r.status = "deleted"
        db.commit()
        return {"ok": True}
    finally:
        db.close()