import React, { useState, useEffect } from "react";

export function LogsPanel({ showToast }) {
  const [logs, setLogs] = useState([]);

  const loadLogs = () => {
    chrome.storage.local.get("botActivityLogs", (res) => {
      setLogs(res.botActivityLogs || []);
    });
  };

  useEffect(() => {
    loadLogs();
    const interval = setInterval(loadLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClearLogs = () => {
    chrome.storage.local.set({ botActivityLogs: [] }, () => {
      setLogs([]);
      showToast("Activity logs cleared", "success");
    });
  };

  return (
    <div className="panel-logs">
      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">Bot Activity Log</span>
          <span className="card-badge">{logs.length} EVENTS</span>
        </div>

        <div
          style={{
            maxHeight: "320px",
            overflowY: "auto",
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: "var(--radius-sm)",
            padding: "8px 10px",
            fontSize: "11px",
            fontFamily: "'JetBrains Mono', monospace",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: "var(--text-mute)", textAlign: "center", padding: "20px 0" }}>
              No recent activity recorded.
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  paddingBottom: "4px",
                  lineHeight: "1.4"
                }}
              >
                <span style={{ color: "var(--text-mute)", marginRight: "6px" }}>
                  [{new Date(log.ts || Date.now()).toLocaleTimeString()}]
                </span>
                <span style={{ color: log.type === "error" ? "var(--danger)" : "#fff" }}>
                  {log.message || JSON.stringify(log)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        className="btn-glass btn-ghost btn-block"
        onClick={handleClearLogs}
        disabled={logs.length === 0}
      >
        Clear Activity Logs
      </button>
    </div>
  );
}
