import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { NavigationTabs } from "./components/NavigationTabs";
import { ApiKeysPanel } from "./components/ApiKeysPanel";
import { BehaviorPanel } from "./components/BehaviorPanel";
import { WelcomePanel } from "./components/WelcomePanel";
import { LogsPanel } from "./components/LogsPanel";
import { MemoryPanel } from "./components/MemoryPanel";
import { Toast } from "./components/Toast";

const DEFAULTS = {
  botEnabled: true,
  chatRepliesEnabled: true,

  openaiApiKey: "",
  geminiApiKey: "",
  openrouterApiKey: "",
  nvidiaApiKey: "",
  groqApiKey: "",

  openaiModel: "gpt-4o-mini",
  geminiModel: "gemini-2.0-flash",
  nvidiaModel: "meta/llama-3.3-70b-instruct",
  groqModel: "llama-3.3-70b-versatile",
  autoSwitch: true,
  longReplyThreshold: 140,

  botUsername: "Bot",
  botPersona:
    "You are a friendly, sharp, helpful chat partner on Free4Talk. Reply naturally like a real person — warm, human, never robotic. Never mention being an AI or bot.",

  shortCharLimit: 160,
  longCharLimit: 600,
  replyDelayMs: 120,

  ignoreSelfMessages: true,
  mentionUserInReply: false,
  onlyReplyWhenMentioned: false,
  replyToPM: true,
  excludedUsernames: [],

  welcomeEnabled: true,
  welcomeTemplate: "Welcome {username}",
  welcomeCooldownMs: 4 * 60 * 60 * 1000,
  welcomeDelaySec: 0,
};

export function App() {
  const [config, setConfig] = useState(DEFAULTS);
  const [activeTab, setActiveTab] = useState("apiKeys");
  const [botEnabled, setBotEnabled] = useState(true);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const showToastMessage = (message, kind = "success", duration = 4500) => {
    setToast({ message, kind });
    if (window.toastTimer) clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      setToast(null);
    }, duration);
  };

  useEffect(() => {
    chrome.storage.local.get(Object.keys(DEFAULTS), (stored) => {
      const merged = { ...DEFAULTS, ...stored };
      setConfig(merged);
      setBotEnabled(merged.botEnabled !== false);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (document && document.body) {
      document.body.classList.toggle("bot-off", !botEnabled);
    }
  }, [botEnabled]);

  const handleToggleBot = async () => {
    const next = !botEnabled;
    setBotEnabled(next);
    await chrome.storage.local.set({ botEnabled: next });
    chrome.runtime.sendMessage({ type: "UPDATE_BOT_STATUS", enabled: next });
    showToastMessage(next ? "AI Activated" : "AI Paused", "success");
  };

  const handleSaveConfig = (partial) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop > 15 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollTop <= 15 && isScrolled) {
      setIsScrolled(false);
    }
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsScrolled(false);
  };

  if (loading) {
    return (
      <div className="app-container" style={{ alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
        <div style={{ color: "var(--accent-violet)", fontWeight: "700" }}>Loading Free4Talk AI...</div>
      </div>
    );
  }

  return (
    <div className={`app-container ${!botEnabled ? "bot-off" : ""}`}>
      <Header botEnabled={botEnabled} onToggle={handleToggleBot} isScrolled={isScrolled} />

      <NavigationTabs activeTab={activeTab} onSelectTab={handleSelectTab} isScrolled={isScrolled} />

      <div
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "2px",
          scrollBehavior: "smooth"
        }}
      >
        {activeTab === "apiKeys" && (
          <ApiKeysPanel
            config={config}
            onSaveConfig={handleSaveConfig}
            showToast={showToastMessage}
            isScrolled={isScrolled}
          />
        )}

        {activeTab === "behavior" && (
          <BehaviorPanel
            config={config}
            onSaveConfig={handleSaveConfig}
            showToast={showToastMessage}
            isScrolled={isScrolled}
          />
        )}

        {activeTab === "welcome" && (
          <WelcomePanel
            config={config}
            onSaveConfig={handleSaveConfig}
            showToast={showToastMessage}
            isScrolled={isScrolled}
          />
        )}

        {activeTab === "logs" && (
          <LogsPanel showToast={showToastMessage} isScrolled={isScrolled} />
        )}

        {activeTab === "memory" && (
          <MemoryPanel showToast={showToastMessage} isScrolled={isScrolled} />
        )}
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
