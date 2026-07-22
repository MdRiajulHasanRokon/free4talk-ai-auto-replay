import React from "react";

export function Toast({ toast, onClose }) {
  if (!toast || !toast.message) return null;

  const lines = String(toast.message).split("\n");

  return (
    <div className={`toast-box ${toast.kind || "success"}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
        {lines.map((line, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {line}
          </div>
        ))}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#10b981",
            opacity: 0.7,
            cursor: "pointer",
            fontSize: "14px",
            padding: "0 0 0 8px",
            lineHeight: 1,
            alignSelf: "flex-start"
          }}
          title="Dismiss notification"
        >
          ✕
        </button>
      )}
    </div>
  );
}

