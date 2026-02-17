"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Sess = { id: string; status: string; viewer_path: string; created_at: string };

export default function Desktop() {
  const [sessions, setSessions] = useState<Sess[]>([]);
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await api("/api/sessions", {
        method: "POST",
        body: JSON.stringify({ kind: "macos", version: "14", disk_size: "64G", ram_size: "4G", cpu_cores: "1" })
      });
      await refresh();
    } catch (e: any) {
      setErr(e.message || "create failed");
    }
    setLoading(false);
  }

  useEffect(() => { refresh(); }, []);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f8f9fc", 
      fontFamily: "'Inter', system-ui, sans-serif" 
    }}>
      {/* Header */}
      <header style={{ 
        background: "white", 
        borderBottom: "1px solid #e2e4e9", 
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            background: "linear-gradient(135deg, #6D4AFF, #14B8A6)", 
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{ fontSize: 20 }}>🖥️</span>
          </div>
          <h1 style={{ 
            margin: 0, 
            fontSize: 22, 
            fontWeight: 700, 
            color: "#1a1a2e" 
          }}>
            Craig-O-Systems
          </h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button 
            onClick={quickLogin}
            style={{ 
              background: "#f8f9fc", 
              color: "#4a4a68", 
              border: "1px solid #e2e4e9",
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            Quick Login
          </button>
          <button 
            onClick={createMac}
            disabled={loading}
            style={{ 
              background: "#6D4AFF", 
              color: "white", 
              border: "none",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Creating..." : "+ New macOS Session"}
          </button>
          <button 
            onClick={refresh}
            style={{ 
              background: "#14B8A6", 
              color: "white", 
              border: "none",
              padding: "10px 16px",
              borderRadius: 8,
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        {err && (
          <div style={{ 
            background: "#FEF2F2", 
            border: "1px solid #FECACA", 
            color: "#DC2626", 
            padding: 16, 
            borderRadius: 10, 
            marginBottom: 20,
            fontFamily: "monospace",
            fontSize: 14
          }}>
            {err}
          </div>
        )}

        <h2 style={{ 
          margin: "0 0 20px 0", 
          fontSize: 18, 
          fontWeight: 600, 
          color: "#1a1a2e" 
        }}>
          Your Sessions
        </h2>

        {sessions.length === 0 ? (
          <div style={{ 
            background: "white", 
            border: "1px solid #e2e4e9", 
            borderRadius: 12, 
            padding: 48, 
            textAlign: "center" 
          }}>
            <p style={{ color: "#6b6b8a", margin: "0 0 16px 0" }}>
              No sessions yet. Create your first macOS session!
            </p>
            <button 
              onClick={createMac}
              style={{ 
                background: "#6D4AFF", 
                color: "white", 
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              + Create macOS Session
            </button>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: 16 
          }}>
            {sessions.map(s => (
              <a 
                key={s.id} 
                href={`/sessions/${s.id}`} 
                style={{ 
                  background: "white",
                  border: "1px solid #e2e4e9", 
                  borderRadius: 12, 
                  padding: 20, 
                  textDecoration: "none", 
                  color: "#1a1a2e",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 12, 
                  marginBottom: 12 
                }}>
                  <span style={{ fontSize: 28 }}>🍎</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e" }}>
                      {s.id}
                    </div>
                    <div style={{ 
                      fontSize: 13, 
                      color: s.status === "running" ? "#14B8A6" : "#FF8C00",
                      fontWeight: 500
                    }}>
                      ● {s.status}
                    </div>
                  </div>
                </div>
                <div style={{ 
                  fontSize: 12, 
                  color: "#6b6b8a",
                  borderTop: "1px solid #f0f1f3",
                  paddingTop: 12
                }}>
                  Created: {new Date(s.created_at).toLocaleString()}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer style={{ 
          marginTop: 48, 
          textAlign: "center", 
          color: "#6b6b8a", 
          fontSize: 13 
        }}>
          © 2026 Craig-O-Systems powered by{" "}
          <a href="https://vibecaas.com" style={{ color: "#6D4AFF" }}>VibeCaaS.com</a>
          {" "}a division of{" "}
          <a href="https://neuralquantum.ai" style={{ color: "#6D4AFF" }}>NeuralQuantum.ai</a> LLC
        </footer>
      </main>
    </div>
  );
}
