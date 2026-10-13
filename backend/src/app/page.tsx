export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", padding: "2rem", backgroundColor: "#0b0f19", color: "#e2e8f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#38bdf8", fontSize: "1.5rem", marginBottom: "0.5rem" }}>CRM Backend API Server</h1>
      <p style={{ color: "#4ade80", marginBottom: "1.5rem" }}>● Status: Operational</p>
      <pre style={{ backgroundColor: "#1e293b", padding: "1.25rem", borderRadius: "0.5rem", overflow: "auto", border: "1px solid #334155", color: "#94a3b8" }}>
        {JSON.stringify(
          {
            status: "OK",
            message: "Backend server is running",
            endpoints: {
              health: "/api/health",
              api: "/api/v1",
            },
          },
          null,
          2
        )}
      </pre>
    </main>
  );
}
