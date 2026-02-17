"use client";

import { useParams } from "next/navigation";

export default function SessionViewer() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  // The orchestrator labels the container so Traefik routes /s/<id> -> container:8006
  const viewerUrl = `/s/${id}`;

  return (
    <div style={{ 
      height: "100vh", 
      margin: 0, 
      display: "flex", 
      flexDirection: "column",
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        padding: "12px 20px", 
        borderBottom: "1px solid #e2e4e9", 
        background: "white",
        display: "flex", 
        alignItems: "center",
        gap: 16,
        flexShrink: 0
      }}>
        <a 
          href="/desktop" 
          style={{ 
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#6D4AFF", 
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 14
          }}
        >
          ← Back to Desktop
        </a>
        <div style={{ 
          height: 20, 
          width: 1, 
          background: "#e2e4e9" 
        }} />
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 8 
        }}>
          <span style={{ fontSize: 20 }}>🍎</span>
          <span style={{ 
            fontWeight: 700, 
            color: "#1a1a2e",
            fontSize: 15
          }}>
            {id}
          </span>
          <span style={{ 
            background: "#ECFDF5", 
            color: "#14B8A6", 
            padding: "4px 10px", 
            borderRadius: 20, 
            fontSize: 12,
            fontWeight: 600
          }}>
            ● Running
          </span>
        </div>
        <div style={{ flex: 1 }} />
        <a 
          href={viewerUrl} 
          target="_blank" 
          rel="noreferrer"
          style={{ 
            background: "#6D4AFF", 
            color: "white", 
            padding: "8px 16px", 
            borderRadius: 8, 
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 13
          }}
        >
          Open Fullscreen ↗
        </a>
      </header>
      
      {/* Viewer iframe */}
      <iframe 
        src={viewerUrl} 
        style={{ 
          flex: 1, 
          width: "100%", 
          border: "none",
          background: "#1a1a2e"
        }} 
        allow="clipboard-read; clipboard-write; fullscreen" 
      />
    </div>
  );
}
