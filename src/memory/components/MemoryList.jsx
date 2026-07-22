import React from "react";

export function MemoryList({ memories, onSelectMemory, onDeleteItem }) {
  if (memories.length === 0) {
    return (
      <div className="glass-card" style={{ padding: "40px", textAlign: "center", color: "var(--text-mute)" }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>📭</div>
        <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>No memories found</div>
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Start chatting on Free4Talk or adjust your filter query.</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {memories.map((m, index) => {
        const isBot = !!m.fromAI;
        return (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: "12px 16px",
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              transition: "transform 0.15s ease, border-color 0.15s ease"
            }}
            onClick={() => onSelectMemory(m)}
          >
            {/* Avatar */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: isBot
                  ? "linear-gradient(135deg, var(--accent-magenta), #f43f5e)"
                  : "linear-gradient(135deg, var(--accent-violet), #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "800",
                fontSize: "14px",
                flexShrink: 0
              }}
            >
              {isBot ? "🤖" : (m.username ? m.username.slice(0, 2).toUpperCase() : "?")}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontWeight: "800", fontSize: "13px", color: isBot ? "var(--accent-magenta)" : "#fff" }}>
                    {isBot ? "Bot Reply" : m.username || "Anonymous"}
                  </span>
                  {m.isPM && <span className="card-badge pink">PRIVATE PM</span>}
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-mute)" }}>
                  {m.timestamp ? String(m.timestamp) : ""}
                </span>
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-main)",
                  lineHeight: "1.5",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word"
                }}
              >
                {m.content}
              </div>
            </div>

            {/* Quick Actions */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(m);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-mute)",
                cursor: "pointer",
                padding: "4px",
                fontSize: "14px",
                opacity: 0.7,
                transition: "opacity 0.2s ease"
              }}
              title="Delete this message"
            >
              🗑
            </button>
          </div>
        );
      })}
    </div>
  );
}
