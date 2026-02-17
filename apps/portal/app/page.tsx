export default function Home() {
  return (
    <main>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 16px 0", fontSize: 32, fontWeight: 700 }}>Craig-O-Systems</h1>
          <p style={{ margin: "0 0 24px 0", color: "#666" }}>Browser-based Web OS with Containerized macOS</p>
          <a href="/desktop" style={{ display: "inline-block", padding: "12px 32px", background: "#667eea", color: "white", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
            Launch Desktop
          </a>
        </div>
      </div>
    </main>
  );
}