import React from "react";

export function TopBar({ onRefresh, onDeleteAll }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: "rgba(22, 22, 32, 0.75)",
        borderBottom: "1px solid var(--border-glass-strong)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src="icons/icon64.png"
          alt="Logo"
          className="slow-spin-logo"
          style={{ width: "38px", height: "38px", borderRadius: "10px" }}
        />
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: "800", color: "#fff", letterSpacing: "-0.01em" }}>
            Memory Manager
          </h1>
          <p style={{ fontSize: "11px", color: "var(--text-dim)", fontWeight: "500" }}>
            Free4Talk AI · Storage & Conversation History
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button className="btn-glass btn-ghost" onClick={onRefresh}>
          🔄 Refresh
        </button>
        <button className="btn-glass btn-danger" onClick={onDeleteAll}>
          🗑 Delete All Memory
        </button>
      </div>
    </header>
  );
}
