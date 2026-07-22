import React, { useState } from "react";

export function BehaviorPanel({ config, onSaveConfig, showToast, isScrolled }) {
  const [botUsername, setBotUsername] = useState(config.botUsername || "Bot");
  const [botPersona, setBotPersona] = useState(config.botPersona || "");

  const [chatRepliesEnabled, setChatRepliesEnabled] = useState(config.chatRepliesEnabled !== false);
  const [ignoreSelfMessages, setIgnoreSelfMessages] = useState(config.ignoreSelfMessages !== false);
  const [mentionUserInReply, setMentionUserInReply] = useState(config.mentionUserInReply === true);
  const [onlyReplyWhenMentioned, setOnlyReplyWhenMentioned] = useState(config.onlyReplyWhenMentioned === true);
  const [replyToPM, setReplyToPM] = useState(config.replyToPM !== false);

  const [shortCharLimit, setShortCharLimit] = useState(config.shortCharLimit ?? 160);
  const [longCharLimit, setLongCharLimit] = useState(config.longCharLimit ?? 600);
  const [replyDelayMs, setReplyDelayMs] = useState(config.replyDelayMs ?? 120);
  const [longReplyThreshold, setLongReplyThreshold] = useState(config.longReplyThreshold ?? 140);
  const [excludedUsernames, setExcludedUsernames] = useState(
    Array.isArray(config.excludedUsernames)
      ? config.excludedUsernames.join(", ")
      : config.excludedUsernames || ""
  );

  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [btnClick, setBtnClick] = useState(false);

  const toggleInstantSetting = (key, value, setter) => {
    setter(value);
    chrome.storage.local.set({ [key]: value }).then(() => {
      showToast("Saved settings successfully!", "success");
    }).catch(() => { });
  };

  const handleSave = async () => {
    setBtnClick(true);
    setSaving(true);
    const ex = excludedUsernames
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      botUsername: botUsername.trim() || "Bot",
      botPersona: botPersona.trim(),
      chatRepliesEnabled,
      ignoreSelfMessages,
      mentionUserInReply,
      onlyReplyWhenMentioned,
      replyToPM,
      shortCharLimit: Number(shortCharLimit) || 160,
      longCharLimit: Number(longCharLimit) || 600,
      replyDelayMs: Number(replyDelayMs) || 120,
      longReplyThreshold: Number(longReplyThreshold) || 140,
      excludedUsernames: ex,
    };

    try {
      await chrome.storage.local.set(payload);
      onSaveConfig(payload);
      showToast("Saved behavior settings successfully!", "success");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      showToast(err.message || "Save failed", "error");
    } finally {
      setSaving(false);
      setTimeout(() => setBtnClick(false), 500);
    }
  };

  return (
    <div className="panel-behavior">
      {/* Identity & Persona */}
      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">Bot Identity & Persona</span>
        </div>
        <div className="field-group">
          <label className="field-label">Bot Display Name</label>
          <input
            type="text"
            className="glass-input"
            value={botUsername}
            onChange={(e) => setBotUsername(e.target.value)}
          />
        </div>
        <div className="field-group">
          <label className="field-label">System Persona & Prompt</label>
          <textarea
            className="glass-textarea"
            rows={3}
            value={botPersona}
            onChange={(e) => setBotPersona(e.target.value)}
          />
        </div>
      </div>

      {/* Reply Rules */}
      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">Reply Rules & Filters</span>
        </div>

        <div
          className="glass-switch-row"
          onClick={() => toggleInstantSetting("chatRepliesEnabled", !chatRepliesEnabled, setChatRepliesEnabled)}
        >
          <div>
            <div className="switch-title">Auto Chat Replies</div>
            <div className="switch-desc">Automatically answer room messages</div>
          </div>
          <div className={`glass-switch ${chatRepliesEnabled ? "on" : ""}`} />
        </div>

        <div
          className="glass-switch-row"
          onClick={() => toggleInstantSetting("onlyReplyWhenMentioned", !onlyReplyWhenMentioned, setOnlyReplyWhenMentioned)}
        >
          <div>
            <div className="switch-title">Only When Mentioned</div>
            <div className="switch-desc">Only reply if message mentions bot name</div>
          </div>
          <div className={`glass-switch ${onlyReplyWhenMentioned ? "on" : ""}`} />
        </div>

        <div
          className="glass-switch-row"
          onClick={() => toggleInstantSetting("ignoreSelfMessages", !ignoreSelfMessages, setIgnoreSelfMessages)}
        >
          <div>
            <div className="switch-title">Ignore Self Messages</div>
            <div className="switch-desc">Prevent bot from replying to its own messages</div>
          </div>
          <div className={`glass-switch ${ignoreSelfMessages ? "on" : ""}`} />
        </div>

        <div
          className="glass-switch-row"
          onClick={() => toggleInstantSetting("mentionUserInReply", !mentionUserInReply, setMentionUserInReply)}
        >
          <div>
            <div className="switch-title">Mention User @name</div>
            <div className="switch-desc">Include user handle when posting reply</div>
          </div>
          <div className={`glass-switch ${mentionUserInReply ? "on" : ""}`} />
        </div>

        <div
          className="glass-switch-row"
          onClick={() => toggleInstantSetting("replyToPM", !replyToPM, setReplyToPM)}
        >
          <div>
            <div className="switch-title">Private Messages (PM)</div>
            <div className="switch-desc">Auto reply to direct private chat messages</div>
          </div>
          <div className={`glass-switch ${replyToPM ? "on" : ""}`} />
        </div>
      </div>

      {/* Timing & Limits */}
      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">Timing & Message Limits</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div className="field-group">
            <label className="field-label">Short Limit</label>
            <input
              type="number"
              className="glass-input"
              value={shortCharLimit}
              onChange={(e) => setShortCharLimit(e.target.value)}
            />
          </div>
          <div className="field-group">
            <label className="field-label">Long Limit</label>
            <input
              type="number"
              className="glass-input"
              value={longCharLimit}
              onChange={(e) => setLongCharLimit(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div className="field-group">
            <label className="field-label">Delay (ms)</label>
            <input
              type="number"
              className="glass-input"
              value={replyDelayMs}
              onChange={(e) => setReplyDelayMs(e.target.value)}
            />
          </div>
          <div className="field-group">
            <label className="field-label">Long Threshold</label>
            <input
              type="number"
              className="glass-input"
              value={longReplyThreshold}
              onChange={(e) => setLongReplyThreshold(e.target.value)}
            />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Excluded Usernames (Comma separated)</label>
          <input
            type="text"
            className="glass-input"
            placeholder="User1, Admin, SpamBot"
            value={excludedUsernames}
            onChange={(e) => setExcludedUsernames(e.target.value)}
          />
        </div>
      </div>

      {/* Sticky Action Button */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
          width: isScrolled ? "82%" : "100%",
          margin: isScrolled ? "12px auto 0 auto" : "12px 0 0 0",
          padding: isScrolled ? "8px 12px" : "10px 0 4px 0",
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
        <button
          className={`btn-glass btn-primary btn-block ${btnClick ? "btn-click-anim" : ""} ${justSaved ? "btn-saved" : ""}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : justSaved ? "✓ Saved Behavior Settings!" : "Save Behavior Settings"}
        </button>
      </div>
    </div>
  );
}
