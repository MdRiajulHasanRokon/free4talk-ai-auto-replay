import React from "react";

export function Header({ botEnabled, onToggle, isScrolled }) {
  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      style={{
        width: isScrolled ? "82%" : "100%",
        margin: isScrolled ? "0 auto 6px auto" : "0 0 8px 0",
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: isScrolled ? "rgba(14, 24, 38, 0.94)" : "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: isScrolled ? "999px" : "24px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: isScrolled
          ? "0 8px 24px rgba(0, 0, 0, 0.65), 0 0 16px rgba(2, 132, 199, 0.25)"
          : "var(--glass-highlight), 0 8px 24px rgba(0, 0, 0, 0.35)",
        transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
      }}
    >
      <div
        className="brand"
        style={{
          display: "flex",
          alignItems: "center",
          gap: isScrolled ? "8px" : "12px",
          transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
        }}
      >
        <div
          className="logo"
          style={{
            width: "36px",
            height: "36px",
            flexShrink: 0,
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
            transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
          }}
        >
          <img src="icons/icon64.png" alt="Free4Talk AI Logo" className="slow-spin-logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div
          className="brand-text"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <span
            className="brand-title"
            style={{
              fontSize: isScrolled ? "13px" : "15.5px",
              fontWeight: "800",
              letterSpacing: "-0.01em",
              color: "#fff",
              lineHeight: 1.2,
              transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
            }}
          >
            Free4Talk AI
          </span>
          <span
            className="brand-sub"
            style={{
              fontSize: isScrolled ? "9.5px" : "10.5px",
              color: "var(--text-dim)",
              fontWeight: "600",
              marginTop: "2px",
              display: "block",
              opacity: 1,
              transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
            }}
          >
            {isScrolled ? "v3.0.6" : "v3.0.6 · Smart AI Assistant"}
          </span>
        </div>
      </div>

      <div
        className="header-status-action"
        style={{
          display: "flex",
          alignItems: "center",
          gap: isScrolled ? "6px" : "12px",
          transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            className="dot"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: botEnabled ? "var(--success)" : "var(--text-mute)",
              boxShadow: botEnabled ? "0 0 10px var(--success)" : "none",
              transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
            }}
          />
          <span
            style={{
              fontSize: isScrolled ? "11.5px" : "13px",
              fontWeight: "700",
              color: botEnabled ? "#fff" : "var(--text-dim)",
              whiteSpace: "nowrap",
              transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
            }}
          >
            {botEnabled ? "AI Active" : "AI Paused"}
          </span>
        </div>

        <div
          className={`glass-switch ${botEnabled ? "on" : ""}`}
          onClick={onToggle}
          title={botEnabled ? "Pause AI" : "Activate AI"}
          style={{
            transform: isScrolled ? "scale(0.88)" : "scale(1)",
            transformOrigin: "right center",
            transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
          }}
        />
      </div>
    </header>
  );
}

