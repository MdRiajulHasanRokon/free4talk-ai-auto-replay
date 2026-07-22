import React, { useState, useEffect } from "react";
import { ConfirmModal } from "./ConfirmModal";

export function MemoryPanel({ showToast, isScrolled }) {
  const [memories, setMemories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => { }
  });

  const loadMemories = async () => {
    try {
      const [liveRes, persistentRes] = await Promise.allSettled([
        chrome.storage.session.get("botRuntimeState"),
        chrome.storage.local.get("botPersistentHistory"),
      ]);

      let live = [];
      let persistent = [];

      if (liveRes.status === "fulfilled" && liveRes.value?.botRuntimeState?.chatHistory) {
        live = liveRes.value.botRuntimeState.chatHistory;
      }
      if (persistentRes.status === "fulfilled" && persistentRes.value?.botPersistentHistory) {
        persistent = persistentRes.value.botPersistentHistory;
      }

      // Merge and deduplicate by key
      const map = new Map();
      const combined = [...persistent, ...live];

      combined.forEach((m) => {
        if (!m || !m.content) return;
        const key = `${m.username || ""}_${m.content}_${m.fromAI ? "1" : "0"}`;
        map.set(key, m);
      });

      const list = Array.from(map.values()).reverse(); // Newest first
      setMemories(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const openMemoryManager = () => {
    chrome.tabs.create({ url: "memory.html" });
  };

  const handleResetHistory = () => {
    setConfirmModal({
      isOpen: true,
      title: "Clear Chat History?",
      message: "Are you sure you want to clear all current conversation memory history?",
      onConfirm: () => {
        chrome.runtime.sendMessage({ type: "RESET_HISTORY" }, () => {
          loadMemories();
          showToast("Chat memory cleared", "success");
        });
      }
    });
  };

  const handleResetAll = () => {
    setConfirmModal({
      isOpen: true,
      title: "Reset All Settings?",
      message: "Reset settings and memory to defaults? Your API keys will be preserved.",
      onConfirm: async () => {
        // Preserve API Keys
        const apiKeys = await chrome.storage.local.get([
          "groqApiKey",
          "nvidiaApiKey",
          "openaiApiKey",
          "geminiApiKey",
          "openrouterApiKey"
        ]);

        // Clear local storage
        await chrome.storage.local.clear();

        // Restore preserved API keys
        await chrome.storage.local.set({
          groqApiKey: apiKeys.groqApiKey || "",
          nvidiaApiKey: apiKeys.nvidiaApiKey || "",
          openaiApiKey: apiKeys.openaiApiKey || "",
          geminiApiKey: apiKeys.geminiApiKey || "",
          openrouterApiKey: apiKeys.openrouterApiKey || ""
        });

        loadMemories();
        showToast("Settings reset (API keys preserved)", "success");
      }
    });
  };

  const filtered = memories.filter((m) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (m.username || "").toLowerCase().includes(q) ||
      (m.content || "").toLowerCase().includes(q)
    );
  });

  const uniqueUsers = new Set(memories.map((m) => m.username).filter(Boolean)).size;

  return (
    <div className="panel-memory">
      {/* Stat Cards Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "10px" }}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-sm)",
            padding: "8px",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#fff" }}>{memories.length}</div>
          <div style={{ fontSize: "9px", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Total Messages</div>
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-sm)",
            padding: "8px",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--accent-violet)" }}>{uniqueUsers}</div>
          <div style={{ fontSize: "9px", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Users</div>
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-sm)",
            padding: "8px",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "800", color: "var(--accent-magenta)" }}>
            {memories.filter((m) => m.fromAI).length}
          </div>
          <div style={{ fontSize: "9px", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: "700" }}>Bot Replies</div>
        </div>
      </div>

      {/* Memory Search */}
      <div className="glass-card" style={{ padding: "8px" }}>
        <input
          type="text"
          className="glass-input"
          placeholder="Search conversation memory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Memory List */}
      <div className="glass-card" style={{ padding: "6px" }}>
        <div
          style={{
            maxHeight: "180px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "4px"
          }}
        >
          {loading ? (
            <div style={{ color: "var(--text-mute)", textAlign: "center", padding: "16px" }}>Loading memory...</div>
          ) : filtered.length === 0 ? (
            <div style={{ color: "var(--text-mute)", textAlign: "center", padding: "16px" }}>No memory records found.</div>
          ) : (
            filtered.slice(0, 30).map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border-glass)",
                  borderRadius: "6px",
                  padding: "6px 8px",
                  fontSize: "11px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                  <span style={{ fontWeight: "700", color: item.fromAI ? "var(--accent-magenta)" : "var(--accent-violet)" }}>
                    {item.fromAI ? "🤖 Bot" : `👤 ${item.username || "User"}`}
                  </span>
                  <span style={{ fontSize: "9.5px", color: "var(--text-mute)" }}>
                    {item.timestamp ? String(item.timestamp) : ""}
                  </span>
                </div>
                <div style={{ color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {item.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Open Full Memory Manager */}
      <button
        className="btn-glass btn-primary btn-block"
        onClick={openMemoryManager}
        style={{ marginBottom: "8px" }}
      >
        Open Memory Manager App ↗
      </button>

      {/* Non-scrolling Sticky Bottom Action Buttons Bar */}
      <div
        className="btn-row"
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          width: isScrolled ? "82%" : "100%",
          margin: isScrolled ? "10px auto 0 auto" : "10px 0 0 0",
          padding: isScrolled ? "8px 12px" : "8px 0 4px 0",
          background: isScrolled ? "rgba(14, 24, 38, 0.94)" : "rgba(14, 14, 20, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: isScrolled ? "1px solid var(--border-glass-strong)" : "none",
          borderTop: "1px solid var(--border-glass)",
          borderRadius: isScrolled ? "20px" : "0",
          boxShadow: isScrolled
            ? "0 8px 24px rgba(0, 0, 0, 0.65), 0 0 16px rgba(2, 132, 199, 0.25)"
            : "none",
          transition: "all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)"
        }}
      >
        <button className="btn-glass btn-danger" onClick={handleResetHistory}>
          Clear History
        </button>
        <button className="btn-glass btn-danger" onClick={handleResetAll}>
          Reset All Settings
        </button>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
