import React from "react";

export function StatGrid({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "20px" }}>
      {/* Total Messages Card */}
      <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(139, 92, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          💬
        </div>
        <div>
          <div style={{ fontSize: "11px", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Total Messages</div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}>{stats.totalMessages}</div>
        </div>
      </div>

      {/* Unique Users Card */}
      <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(236, 72, 153, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          👥
        </div>
        <div>
          <div style={{ fontSize: "11px", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Unique Users</div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--accent-magenta)" }}>{stats.uniqueUsers}</div>
        </div>
      </div>

      {/* Bot Replies Card */}
      <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          🤖
        </div>
        <div>
          <div style={{ fontSize: "11px", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Bot Replies</div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--accent-emerald)" }}>{stats.botReplies}</div>
        </div>
      </div>
    </div>
  );
}
