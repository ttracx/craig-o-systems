"use client";

import { useParams } from "next/navigation";

export default function SessionViewer() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  // The orchestrator labels the container so Traefik routes /s/<id> -> container:8006
  const viewerUrl = `/s/${id}`;

  return (
    <div style={{ height: "100vh", margin: 0 }}>
      <div style={{ padding: 8, borderBottom: "1px solid #ccc", fontFamily: "system-ui", display: "flex", gap: 12 }}>
        <a href="/desktop">Back</a>
        <div style={{ fontWeight: 700 }}>{id}</div>
        <a href={viewerUrl} target="_blank" rel="noreferrer">Open Viewer</a>
      </div>
      <iframe src={viewerUrl} style={{ width: "100%", height: "calc(100vh - 42px)", border: "none" }} allow="clipboard-read; clipboard-write; fullscreen" />
    </div>
  );
}