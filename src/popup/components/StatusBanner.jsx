import React from "react";

export function StatusBanner({ botEnabled, onToggle, isScrolled }) {
  return (
    <div
      className="status-banner"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isScrolled ? "6px 10px" : "10px 14px",
        background: "var(--surface-glass-1)",
        border: "1px solid var(--border-glass-strong)",
        borderRadius: isScrolled ? "var(--radius-sm)" : "var(--radius-md)",
        marginBottom: isScrolled ? "6px" : "10px",
        boxShadow: "var(--glass-highlight)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: isScrolled ? "6px" : "10px" }}>
        <span
          className="dot"
          style={{
            width: isScrolled ? "8px" : "10px",
            height: isScrolled ? "8px" : "10px",
            borderRadius: "50%",
            backgroundColor: botEnabled ? "var(--success)" : "var(--text-mute)",
            boxShadow: botEnabled ? "0 0 12px var(--success)" : "none",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: isScrolled ? "11.5px" : "12.5px", fontWeight: "700", color: "#fff", transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            {botEnabled ? "Bot Active" : "Bot Paused"}
          </span>
          <span style={{ fontSize: "10px", color: "var(--text-dim)", fontWeight: "500", display: isScrolled ? "none" : "block", transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            {botEnabled ? "Listening on Free4Talk rooms" : "Tap toggle to resume"}
          </span>
        </div>
      </div>

      <div
        className={`glass-switch ${botEnabled ? "on" : ""}`}
        onClick={onToggle}
        title={botEnabled ? "Pause Bot" : "Activate Bot"}
        style={{
          transform: isScrolled ? "scale(0.85)" : "scale(1)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      />
    </div>
  );
}
