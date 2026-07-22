import React from "react";

const FILTERS = [
  { id: "all", label: "All Messages" },
  { id: "user", label: "Users Only" },
  { id: "bot", label: "Bot Replies Only" },
];

export function FilterToolbar({ search, onSearchChange, activeFilter, onFilterChange, totalCount }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className="glass-input"
          placeholder="Search memories by username or content..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ paddingLeft: "36px", paddingRight: search ? "36px" : "12px", height: "42px", fontSize: "14px" }}
        />
        <span style={{ position: "absolute", left: "12px", top: "11px", color: "var(--text-mute)", fontSize: "16px" }}>🔍</span>
        {search && (
          <button
            onClick={() => onSearchChange("")}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              color: "#fff",
              width: "22px",
              height: "22px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid var(--border-glass)",
                background: activeFilter === f.id ? "linear-gradient(135deg, var(--accent-violet), var(--accent-magenta))" : "rgba(255,255,255,0.05)",
                color: activeFilter === f.id ? "#fff" : "var(--text-dim)",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "var(--t-normal)"
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-dim)", fontWeight: "600" }}>
          Showing <span style={{ color: "#fff", fontWeight: "800" }}>{totalCount}</span> results
        </div>
      </div>
    </div>
  );
}
