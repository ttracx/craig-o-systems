export default function Home() {
  return (
    <main>
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        fontFamily: "'Inter', system-ui, sans-serif", 
        background: "linear-gradient(135deg, #6D4AFF 0%, #14B8A6 100%)" 
      }}>
        <div style={{ 
          background: "white", 
          padding: 48, 
          borderRadius: 20, 
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)", 
          textAlign: "center",
          maxWidth: 480
        }}>
          <div style={{ 
            width: 80, 
            height: 80, 
            background: "linear-gradient(135deg, #6D4AFF, #14B8A6)", 
            borderRadius: 20, 
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{ fontSize: 36 }}>🖥️</span>
          </div>
          <h1 style={{ 
            margin: "0 0 12px 0", 
            fontSize: 36, 
            fontWeight: 700, 
            color: "#1a1a2e" 
          }}>
            Craig-O-Systems
          </h1>
          <p style={{ 
            margin: "0 0 32px 0", 
            color: "#4a4a68", 
            fontSize: 16, 
            lineHeight: 1.6 
          }}>
            Browser-based Web OS with Containerized macOS Sessions
          </p>
          <a 
            href="/desktop" 
            style={{ 
              display: "inline-block", 
              padding: "14px 40px", 
              background: "#6D4AFF", 
              color: "white", 
              textDecoration: "none", 
              borderRadius: 10, 
              fontWeight: 600,
              fontSize: 16,
              transition: "all 0.2s"
            }}
          >
            Launch Desktop →
          </a>
          <p style={{ 
            marginTop: 32, 
            fontSize: 13, 
            color: "#6b6b8a" 
          }}>
            © 2026 Craig-O-Systems powered by{" "}
            <a href="https://vibecaas.com" style={{ color: "#6D4AFF" }}>VibeCaaS.com</a>
            {" "}a division of{" "}
            <a href="https://neuralquantum.ai" style={{ color: "#6D4AFF" }}>NeuralQuantum.ai</a> LLC
          </p>
        </div>
      </div>
    </main>
  );
}
