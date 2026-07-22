import React from "react";

const TABS = [
  { id: "apiKeys", label: "API Keys" },
  { id: "behavior", label: "Behavior" },
  { id: "welcome", label: "Welcome" },
  { id: "logs", label: "Logs" },
  { id: "memory", label: "Memory" },
];

export function NavigationTabs({ activeTab, onSelectTab, isScrolled }) {
  return (
    <div
      className="glass-tabs"
      style={{
        marginBottom: isScrolled ? "6px" : "12px",
        padding: isScrolled ? "2px" : "4px",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onSelectTab(tab.id)}
          style={{
            padding: isScrolled ? "5px 2px" : "8px 4px",
            fontSize: isScrolled ? "10.5px" : "11px",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
