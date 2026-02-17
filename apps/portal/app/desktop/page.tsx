"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Sess = { id: string; status: string; viewer_path: string; created_at: string };

export default function Desktop() {
  const [sessions, setSessions] = useState<Sess[]>([]);
  const [err, setErr] = useState<string>("");

  async function refresh() {
    setErr("");
    try {
      const data = await api<Sess[]>("/api/sessions");
      setSessions(data);
    } catch (e: any) {
      setErr(e.message || "failed");
    }
  }

  async function quickLogin() {
    const r = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "tommy" })
    });
    const j = await r.json();
    localStorage.setItem("craigos_token", j.token);
    await refresh();
  }

  async function createMac() {
    setErr("");
    try {
      await api("/api/sessions", {
        method: "POST",
        body: JSON.stringify({ kind: "macos", version: "14", disk_size: "64G", ram_size: "4G", cpu_cores: "1" })
      });
      await refresh();
    } catch (e: any) {
      setErr(e.message || "create failed");
    }
  }

  useEffect(() => { refresh(); }, []);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui" }}>
      <h1>Craig-O-Systems</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={quickLogin}>Quick Login (MVP)</button>
        <button onClick={createMac}>New macOS Session</button>
        <button onClick={refresh}>Refresh</button>
      </div>
      {err ? <pre style={{ whiteSpace: "pre-wrap" }}>{err}</pre> : null}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {sessions.map(s => (
          <a key={s.id} href={`/sessions/${s.id}`} style={{ border: "1px solid #ccc", borderRadius: 10, padding: 12, textDecoration: "none", color: "inherit" }}>
            <div style={{ fontWeight: 700 }}>{s.id}</div>
            <div>Status: {s.status}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{s.created_at}</div>
          </a>
        ))}
      </div>
    </div>
  );
}