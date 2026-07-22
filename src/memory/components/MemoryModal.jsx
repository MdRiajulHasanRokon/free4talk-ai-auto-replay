import React from "react";

export function MemoryModal({ memory, onClose, onDelete }) {
  if (!memory) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "540px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "rgba(22, 22, 32, 0.95)",
          borderColor: "var(--border-glass-strong)",
          padding: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.9)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--border-glass)" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>
            Memory Message Inspection
          </h2>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "var(--text-dim)", fontSize: "18px", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        <div className="field-group">
          <label className="field-label">Sender</label>
          <div style={{ fontSize: "14px", fontWeight: "700", color: memory.fromAI ? "var(--accent-magenta)" : "var(--accent-violet)" }}>
            {memory.fromAI ? "🤖 Bot" : memory.username || "User"}
          </div>
        </div>

        <div className="field-group" style={{ marginTop: "12px" }}>
          <label className="field-label">Message Content</label>
          <div style={{ padding: "12px", background: "rgba(0,0,0,0.5)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-glass)", fontSize: "13px", lineHeight: "1.6" }}>
            {memory.content}
          </div>
        </div>

        <div className="field-group" style={{ marginTop: "12px" }}>
          <label className="field-label">Raw Object JSON</label>
          <pre
            style={{
              padding: "12px",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-glass)",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#cbd5e1",
              overflowX: "auto"
            }}
          >
            {JSON.stringify(memory, null, 2)}
          </pre>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "20px" }}>
          <button className="btn-glass btn-danger" onClick={() => onDelete(memory)}>
            Delete Item
          </button>
          <button className="btn-glass btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
