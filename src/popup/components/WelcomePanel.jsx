import React, { useState } from "react";

export function WelcomePanel({ config, onSaveConfig, showToast, isScrolled }) {
  const [welcomeEnabled, setWelcomeEnabled] = useState(config.welcomeEnabled !== false);
  const [welcomeTemplate, setWelcomeTemplate] = useState(
    config.welcomeTemplate || "Welcome {username}"
  );
  const [welcomeCooldownMs, setWelcomeCooldownMs] = useState(config.welcomeCooldownMs ?? (4 * 60 * 60 * 1000));
  const [welcomeDelaySec, setWelcomeDelaySec] = useState(config.welcomeDelaySec ?? 0);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [btnClick, setBtnClick] = useState(false);

  const toggleWelcome = (val) => {
    setWelcomeEnabled(val);
    chrome.storage.local.set({ welcomeEnabled: val }).catch(() => { });
    showToast(val ? "Welcome message enabled!" : "Welcome message disabled", "success");
  };

  const handleTemplateChange = (val) => {
    setWelcomeTemplate(val);
    chrome.storage.local.set({ welcomeTemplate: val }).catch(() => { });
  };

  const previewText = (welcomeTemplate || "").replace(/\{username\}/gi, "Alex");

  const handleSave = async () => {
    setBtnClick(true);
    setSaving(true);
    const payload = {
      welcomeEnabled,
      welcomeTemplate: welcomeTemplate.trim(),
      welcomeCooldownMs: Number(welcomeCooldownMs) || (4 * 60 * 60 * 1000),
      welcomeDelaySec: Number(welcomeDelaySec) || 0,
    };
    try {
      await chrome.storage.local.set(payload);
      onSaveConfig(payload);
      showToast("Saved welcome settings successfully!", "success");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      showToast(err.message || "Failed to save welcome settings", "error");
    } finally {
      setSaving(false);
      setTimeout(() => setBtnClick(false), 500);
    }
  };

  return (
    <div className="panel-welcome">
      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">Auto Welcome Greeting</span>
          <span className="card-badge pink">GREETING</span>
        </div>

        <div
          className="glass-switch-row"
          onClick={() => toggleWelcome(!welcomeEnabled)}
        >
          <div>
            <div className="switch-title">Enable Welcome Message</div>
            <div className="switch-desc">Greet new users when they join the room</div>
          </div>
          <div className={`glass-switch ${welcomeEnabled ? "on" : ""}`} />
        </div>

        <div className="field-group" style={{ marginTop: "10px" }}>
          <label className="field-label">Greeting Template</label>
          <textarea
            className="glass-textarea"
            rows={3}
            value={welcomeTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
          />
          <div style={{ fontSize: "10.5px", color: "var(--text-dim)", marginTop: "2px" }}>
            Use <code>{"{username}"}</code> as a placeholder for the user's name.
          </div>
        </div>

        {/* Live Preview */}
        <div className="field-group">
          <label className="field-label">Live Greeting Preview</label>
          <div
            style={{
              padding: "9px 11px",
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid var(--border-glass-strong)",
              borderRadius: "var(--radius-sm)",
              fontSize: "12px",
              color: "var(--text-main)",
              opacity: welcomeEnabled ? 1 : 0.5,
              transition: "opacity 0.2s ease"
            }}
          >
            {previewText || "(Empty greeting)"}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
          <div className="field-group">
            <label className="field-label">Cooldown</label>
            <select
              className="glass-select"
              value={welcomeCooldownMs}
              onChange={(e) => setWelcomeCooldownMs(Number(e.target.value))}
            >
              <option value={0}>No Cooldown</option>
              <option value={15 * 60 * 1000}>15 Minutes</option>
              <option value={60 * 60 * 1000}>1 Hour</option>
              <option value={4 * 60 * 60 * 1000}>4 Hours (Default)</option>
              <option value={24 * 60 * 60 * 1000}>24 Hours</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Delay (Seconds)</label>
            <input
              type="number"
              className="glass-input"
              value={welcomeDelaySec}
              onChange={(e) => setWelcomeDelaySec(Number(e.target.value))}
            />
          </div>
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
          {saving ? "Saving..." : justSaved ? "✓ Saved Welcome Settings!" : "Save Welcome Settings"}
        </button>
      </div>
    </div>
  );
}
