import React from "react";

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  isDanger = true
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "fadeInSlide 0.2s ease-out"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "310px",
          background: "linear-gradient(160deg, rgba(26, 26, 38, 0.98) 0%, rgba(16, 16, 24, 0.99) 100%)",
          border: "1px solid var(--border-glass-strong)",
          borderRadius: "16px",
          padding: "16px 18px",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          animation: "fadeInSlide 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: isDanger ? "rgba(239, 68, 68, 0.18)" : "rgba(139, 92, 246, 0.18)",
              border: `1px solid ${isDanger ? "rgba(239, 68, 68, 0.4)" : "rgba(139, 92, 246, 0.4)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              flexShrink: 0
            }}
          >
            {isDanger ? "⚠️" : "❓"}
          </div>
          <h4 style={{ fontSize: "13.5px", fontWeight: "800", color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>
            {title || "Confirm Action"}
          </h4>
        </div>

        <p style={{ fontSize: "11.5px", color: "var(--text-dim)", lineHeight: "1.45", marginBottom: "16px" }}>
          {message}
        </p>

        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button
            className="btn-glass btn-ghost"
            style={{ padding: "6px 14px", fontSize: "11.5px", borderRadius: "8px" }}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`btn-glass ${isDanger ? "btn-danger" : "btn-primary"}`}
            style={{ padding: "6px 14px", fontSize: "11.5px", borderRadius: "8px" }}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
