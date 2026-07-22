import React, { useState, useEffect } from "react";
import { TopBar } from "./components/TopBar";
import { StatGrid } from "./components/StatGrid";
import { FilterToolbar } from "./components/FilterToolbar";
import { MemoryList } from "./components/MemoryList";
import { MemoryModal } from "./components/MemoryModal";
import { ConfirmModal } from "../popup/components/ConfirmModal";
import "../styles/theme.css";

export function App() {
  const [rawMemories, setRawMemories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });

  const loadMemories = async () => {
    setLoading(true);
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

      const map = new Map();
      [...persistent, ...live].forEach((m) => {
        if (!m || !m.content) return;
        const key = `${m.username || ""}_${m.content}_${m.fromAI ? "1" : "0"}`;
        map.set(key, m);
      });

      const list = Array.from(map.values()).reverse();
      setRawMemories(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const handleDeleteAll = () => {
    setConfirmModal({
      isOpen: true,
      title: "Delete All Memories?",
      message: "Are you sure you want to delete ALL conversation memories? This action cannot be undone.",
      onConfirm: async () => {
        await chrome.storage.local.set({ botPersistentHistory: [] });
        if (chrome.storage.session) {
          await chrome.storage.session.set({ botRuntimeState: { chatHistory: [] } });
        }
        chrome.runtime.sendMessage({ type: "RESET_HISTORY" }, () => {
          loadMemories();
        });
      }
    });
  };

  const handleDeleteItem = async (targetItem) => {
    const next = rawMemories.filter((m) => m !== targetItem);
    setRawMemories(next);
    await chrome.storage.local.set({ botPersistentHistory: next });
    if (selectedMemory === targetItem) setSelectedMemory(null);
  };

  const filtered = rawMemories.filter((m) => {
    if (activeFilter === "user" && m.fromAI) return false;
    if (activeFilter === "bot" && !m.fromAI) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (m.username || "").toLowerCase().includes(q) ||
      (m.content || "").toLowerCase().includes(q)
    );
  });

  const uniqueUsers = new Set(rawMemories.map((m) => m.username).filter(Boolean)).size;
  const botReplies = rawMemories.filter((m) => m.fromAI).length;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar onRefresh={loadMemories} onDeleteAll={handleDeleteAll} />

      <main style={{ flex: 1, maxWidth: "1000px", width: "100%", margin: "0 auto", padding: "24px 20px" }}>
        <StatGrid
          stats={{
            totalMessages: rawMemories.length,
            uniqueUsers,
            botReplies
          }}
        />

        <FilterToolbar
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalCount={filtered.length}
        />

        {loading ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center", color: "var(--accent-violet)" }}>
            Loading memory database...
          </div>
        ) : (
          <MemoryList
            memories={filtered}
            onSelectMemory={setSelectedMemory}
            onDeleteItem={handleDeleteItem}
          />
        )}
      </main>

      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        onDelete={handleDeleteItem}
      />

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
