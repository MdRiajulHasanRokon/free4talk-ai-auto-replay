import React, { useState, useEffect } from "react";

const GroqIcon = () => (
  <img src="icons/groq.png" alt="Groq Logo" style={{ width: "28px", height: "28px", borderRadius: "7px", flexShrink: 0, objectFit: "contain", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }} />
);

const NvidiaIcon = () => (
  <img src="icons/nvidia.png" alt="NVIDIA Logo" style={{ width: "28px", height: "28px", borderRadius: "7px", flexShrink: 0, objectFit: "contain", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }} />
);

const OpenAIIcon = () => (
  <img src="icons/openai.png" alt="OpenAI Logo" style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#ffffff", padding: "2px", flexShrink: 0, objectFit: "contain", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }} />
);

const GeminiIcon = () => (
  <img src="icons/gemini.png" alt="Gemini Logo" style={{ width: "28px", height: "28px", borderRadius: "7px", flexShrink: 0, objectFit: "contain", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }} />
);

const OpenRouterIcon = () => (
  <img src="icons/openrouter.png" alt="OpenRouter Logo" style={{ width: "28px", height: "28px", borderRadius: "7px", flexShrink: 0, objectFit: "contain", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }} />
);

const ALL_ENGINES = [
  {
    id: "groq",
    name: "Groq LLaMA 3.3 70B",
    desc: "Ultra-Fast LPU Engine",
    logo: "icons/groq.png",
    badge: "FASTEST",
    bg: "#F05A28"
  },
  {
    id: "nvidia",
    name: "NVIDIA NIM Llama 3.3",
    desc: "Unlimited Intelligence",
    logo: "icons/nvidia.png",
    badge: "RECOMMENDED",
    bg: "#76B900"
  },
  {
    id: "openai",
    name: "ChatGPT (GPT-4o)",
    desc: "High Accuracy Reasoning",
    logo: "icons/openai.png",
    badge: "CHATGPT",
    bg: "#ffffff"
  },
  {
    id: "gemini",
    name: "Google Gemini 2.0 Flash",
    desc: "Multimodal Fast AI",
    logo: "icons/gemini.png",
    badge: "GOOGLE AI",
    bg: "#1E1A2E"
  },
  {
    id: "openrouter",
    name: "OpenRouter Auto Switch",
    desc: "Universal Fallback Router",
    logo: "icons/openrouter.png",
    badge: "AUTO ROUTE",
    bg: "#6366F1"
  }
];

export function ApiKeysPanel({ config, onSaveConfig, showToast, isScrolled }) {
  const [nvidiaApiKey, setNvidiaApiKey] = useState(config.nvidiaApiKey || "");
  const [groqApiKey, setGroqApiKey] = useState(config.groqApiKey || "");
  const [openaiApiKey, setOpenaiApiKey] = useState(config.openaiApiKey || "");
  const [geminiApiKey, setGeminiApiKey] = useState(config.geminiApiKey || "");
  const [openrouterApiKey, setOpenrouterApiKey] = useState(config.openrouterApiKey || "");

  const [nvidiaModel, setNvidiaModel] = useState(config.nvidiaModel || "meta/llama-3.3-70b-instruct");
  const [groqModel, setGroqModel] = useState(config.groqModel || "llama-3.3-70b-versatile");
  const [openaiModel, setOpenaiModel] = useState(config.openaiModel || "gpt-4o-mini");
  const [geminiModel, setGeminiModel] = useState(config.geminiModel || "gemini-2.0-flash");
  const [autoSwitch, setAutoSwitch] = useState(config.autoSwitch !== false);

  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [btnClick, setBtnClick] = useState(false);
  const [activeEngineIdx, setActiveEngineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEngineIdx((prev) => (prev + 1) % ALL_ENGINES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Auto-save key to chrome.storage.local on change/blur
  const handleKeyBlur = (keyName, value) => {
    chrome.storage.local.set({ [keyName]: value.trim() }).catch(() => { });
  };

  const handleSave = async () => {
    setBtnClick(true);
    setSaving(true);
    const payload = {
      nvidiaApiKey: nvidiaApiKey.trim(),
      groqApiKey: groqApiKey.trim(),
      openaiApiKey: openaiApiKey.trim(),
      geminiApiKey: geminiApiKey.trim(),
      openrouterApiKey: openrouterApiKey.trim(),
      nvidiaModel,
      groqModel,
      openaiModel,
      geminiModel,
      autoSwitch,
    };
    try {
      await chrome.storage.local.set(payload);
      onSaveConfig(payload);
      showToast("Saved API settings successfully!", "success");
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
    } catch (err) {
      showToast(err.message || "Failed to save settings", "error");
    } finally {
      setSaving(false);
      setTimeout(() => setBtnClick(false), 500);
    }
  };

  const handleTestKeys = async () => {
    setTesting(true);
    const nk = nvidiaApiKey.trim();
    const grk = groqApiKey.trim();
    const ok = openaiApiKey.trim();
    const gk = geminiApiKey.trim();
    const ork = openrouterApiKey.trim();

    if (!nk && !grk && !ok && !gk && !ork) {
      showToast("Please enter at least one API key to test!", "error");
      setTesting(false);
      return;
    }

    await chrome.storage.local.set({
      nvidiaApiKey: nk,
      groqApiKey: grk,
      openaiApiKey: ok,
      geminiApiKey: gk,
      openrouterApiKey: ork,
    });

    const results = [];

    if (nk) {
      try {
        const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${nk}`,
          },
          body: JSON.stringify({
            model: nvidiaModel,
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 5,
          }),
        });
        if (res.ok) results.push("✅ NVIDIA Key Working");
        else results.push(`❌ NVIDIA Key Failed (HTTP ${res.status})`);
      } catch (e) {
        results.push(`❌ NVIDIA Error: ${e.message}`);
      }
    }

    if (grk) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${grk}`,
          },
          body: JSON.stringify({
            model: groqModel,
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 5,
          }),
        });
        if (res.ok) {
          results.push("✅ Groq Key Working");
        } else {
          const txt = await res.text().catch(() => "");
          let msg = `HTTP ${res.status}`;
          try {
            const p = JSON.parse(txt);
            msg = p?.error?.message || p?.detail || msg;
          } catch { }
          results.push(`❌ Groq: ${msg.slice(0, 80)}`);
        }
      } catch (e) {
        results.push(`❌ Groq Error: ${e.message}`);
      }
    }

    if (ok) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ok}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 5,
          }),
        });
        if (res.ok) results.push("✅ ChatGPT Key Working");
        else results.push(`❌ ChatGPT Key Failed (HTTP ${res.status})`);
      } catch (e) {
        results.push(`❌ ChatGPT Error: ${e.message}`);
      }
    }

    if (gk) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(gk)}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] }),
        });
        if (res.ok) results.push("✅ Gemini Key Working");
        else results.push(`❌ Gemini Key Failed (HTTP ${res.status})`);
      } catch (e) {
        results.push(`❌ Gemini Error: ${e.message}`);
      }
    }

    if (ork) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ork}`,
            "HTTP-Referer": "https://free4talk.com",
            "X-Title": "Free4Talk AI Bot",
          },
          body: JSON.stringify({
            model: "openrouter/auto",
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 5,
          }),
        });
        if (res.ok) {
          results.push("✅ OpenRouter Key Working");
        } else {
          const txt = await res.text().catch(() => "");
          let msg = `HTTP ${res.status}`;
          try {
            const p = JSON.parse(txt);
            msg = p?.error?.message || p?.detail || msg;
          } catch { }
          results.push(`❌ OpenRouter: ${msg.slice(0, 80)}`);
        }
      } catch (e) {
        results.push(`❌ OpenRouter Error: ${e.message}`);
      }
    }

    setTesting(false);
    const hasSuccess = results.some((r) => r.startsWith("✅"));
    showToast(results.join("\n"), hasSuccess ? "success" : "error", 8000);
  };

  const curr = ALL_ENGINES[activeEngineIdx];

  return (
    <div className="panel-api-keys">
      {/* Sleek Compact AI Engine Ticker Bar */}
      <div
        style={{
          background: "rgba(10, 20, 34, 0.65)",
          border: "1px solid rgba(2, 132, 199, 0.22)",
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          padding: "4px 10px",
          position: "relative",
          overflow: "hidden",
          minHeight: "32px",
          marginBottom: "10px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)"
        }}
      >
        <div
          key={curr.id}
          className="engine-animated-ticker"
          style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}
        >
          <img
            src={curr.logo}
            alt={curr.name}
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "5px",
              background: curr.bg,
              padding: curr.id === "openai" ? "1px" : "0px",
              objectFit: "contain",
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "9px", color: "var(--accent-amber)", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
              Active ({activeEngineIdx + 1}/{ALL_ENGINES.length}):
            </span>
            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {curr.name}
            </span>
          </div>
          <span
            style={{
              fontSize: "8px",
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "2px 7px",
              borderRadius: "999px",
              background: "rgba(13, 148, 136, 0.2)",
              color: "#2dd4bf",
              border: "1px solid rgba(13, 148, 136, 0.35)",
              flexShrink: 0
            }}
          >
            {curr.badge}
          </span>
        </div>
      </div>

      {/* Groq Key */}
      <div className="glass-card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
            <GroqIcon />
            <span className="card-title">Groq (Ultra-Fast LPU Inference)</span>
          </div>
          <span className="card-badge">FASTEST</span>
        </div>
        <div className="field-group">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <label className="field-label" style={{ margin: 0 }}>Groq API Key</label>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "10.5px",
                fontWeight: "700",
                color: "#38bdf8",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: "2px 8px",
                borderRadius: "6px",
                background: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.3)"
              }}
            >
              Get Groq Key ↗
            </a>
          </div>
          <input
            type="password"
            className="glass-input"
            placeholder="gsk_..."
            value={groqApiKey}
            onChange={(e) => setGroqApiKey(e.target.value)}
            onBlur={(e) => handleKeyBlur("groqApiKey", e.target.value)}
          />
        </div>
        <div className="field-group">
          <label className="field-label">Model</label>
          <select
            className="glass-select"
            value={groqModel}
            onChange={(e) => setGroqModel(e.target.value)}
          >
            <option value="llama-3.3-70b-versatile">LLaMA 3.3 70B Versatile (Recommended)</option>
            <option value="deepseek-r1-distill-llama-70b">DeepSeek R1 Distill LLaMA 70B (Fast Reasoning)</option>
            <option value="llama-3.1-8b-instant">LLaMA 3.1 8B Instant (Lightning Speed)</option>
            <option value="qwen-2.5-72b-instruct">Qwen 2.5 72B Instruct (High Accuracy)</option>
            <option value="mixtral-8x7b-32768">Mixtral 8x7B 32k</option>
            <option value="gemma2-9b-it">Gemma 2 9B IT</option>
          </select>
        </div>
      </div>

      {/* NVIDIA Key */}
      <div className="glass-card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
            <NvidiaIcon />
            <span className="card-title">NVIDIA NIM (Free Unlimited)</span>
          </div>
          <span className="card-badge">RECOMMENDED</span>
        </div>
        <div className="field-group">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <label className="field-label" style={{ margin: 0 }}>NVIDIA API Key</label>
            <a
              href="https://build.nvidia.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "10.5px",
                fontWeight: "700",
                color: "#76B900",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: "2px 8px",
                borderRadius: "6px",
                background: "rgba(118, 185, 0, 0.12)",
                border: "1px solid rgba(118, 185, 0, 0.3)"
              }}
            >
              Get NVIDIA Key ↗
            </a>
          </div>
          <input
            type="password"
            className="glass-input"
            placeholder="nvapi-..."
            value={nvidiaApiKey}
            onChange={(e) => setNvidiaApiKey(e.target.value)}
            onBlur={(e) => handleKeyBlur("nvidiaApiKey", e.target.value)}
          />
        </div>
        <div className="field-group">
          <label className="field-label">Model</label>
          <select
            className="glass-select"
            value={nvidiaModel}
            onChange={(e) => setNvidiaModel(e.target.value)}
          >
            <option value="meta/llama-3.3-70b-instruct">Llama 3.3 70B Instruct (Recommended - Fast & Smart)</option>
            <option value="deepseek-ai/deepseek-r1">DeepSeek R1 (Reasoning Master)</option>
            <option value="deepseek-ai/deepseek-v3">DeepSeek V3 (671B Open MoE)</option>
            <option value="meta/llama-3.1-405b-instruct">Llama 3.1 405B (Ultra Intelligence)</option>
            <option value="nvidia/llama-3.1-nemotron-70b-instruct">Nemotron 70B Instruct</option>
            <option value="mistralai/mistral-large-2-instruct">Mistral Large 2</option>
          </select>
        </div>
      </div>

      {/* OpenAI Key */}
      <div className="glass-card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
            <OpenAIIcon />
            <span className="card-title">OpenAI (ChatGPT)</span>
          </div>
          <span className="card-badge gold">PAID API ONLY</span>
        </div>
        <div className="field-group">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <label className="field-label" style={{ margin: 0 }}>OpenAI API Key</label>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "10.5px",
                fontWeight: "700",
                color: "#10b981",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: "2px 8px",
                borderRadius: "6px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)"
              }}
            >
              Get OpenAI Key ↗
            </a>
          </div>
          <input
            type="password"
            className="glass-input"
            placeholder="sk-..."
            value={openaiApiKey}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            onBlur={(e) => handleKeyBlur("openaiApiKey", e.target.value)}
          />
          <div className="card-notice">
            <span>💳</span>
            <span><strong>Paid API Key Required:</strong> Requires paid API credits on platform.openai.com. (ChatGPT Plus subscription is not API credit).</span>
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Model</label>
          <select
            className="glass-select"
            value={openaiModel}
            onChange={(e) => setOpenaiModel(e.target.value)}
          >
            <option value="gpt-4o">GPT-4o (Flagship Omnimodal - Recommended)</option>
            <option value="gpt-4o-mini">GPT-4o Mini (Ultra Fast & Lightweight)</option>
            <option value="o3-mini">OpenAI o3-mini (Latest Reasoning Engine)</option>
            <option value="o1">OpenAI o1 (Advanced Reasoning)</option>
            <option value="o1-mini">OpenAI o1-mini (Fast Reasoning)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>
      </div>

      {/* Gemini Key */}
      <div className="glass-card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
            <GeminiIcon />
            <span className="card-title">Google Gemini</span>
          </div>
          <span className="card-badge gold">PAID API ONLY</span>
        </div>
        <div className="field-group">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <label className="field-label" style={{ margin: 0 }}>Gemini API Key</label>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "10.5px",
                fontWeight: "700",
                color: "#a855f7",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: "2px 8px",
                borderRadius: "6px",
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.3)"
              }}
            >
              Get Gemini Key ↗
            </a>
          </div>
          <input
            type="password"
            className="glass-input"
            placeholder="AIzaSy..."
            value={geminiApiKey}
            onChange={(e) => setGeminiApiKey(e.target.value)}
            onBlur={(e) => handleKeyBlur("geminiApiKey", e.target.value)}
          />
          <div className="card-notice">
            <span>💳</span>
            <span><strong>Paid API Key Required:</strong> Will only work with an active paid API key with billing setup enabled.</span>
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Model</label>
          <select
            className="glass-select"
            value={geminiModel}
            onChange={(e) => setGeminiModel(e.target.value)}
          >
            <option value="gemini-2.0-flash">Gemini 2.0 Flash (Recommended - Next-Gen Speed)</option>
            <option value="gemini-2.0-flash-lite-preview-02-05">Gemini 2.0 Flash-Lite (Ultra Fast & Low Latency)</option>
            <option value="gemini-2.0-pro-exp-02-05">Gemini 2.0 Pro Experimental (Complex Reasoning)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Multimodal Intelligence)</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash (Lightweight & Fast)</option>
          </select>
        </div>
      </div>

      {/* OpenRouter Key */}
      <div className="glass-card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
            <OpenRouterIcon />
            <span className="card-title">OpenRouter</span>
          </div>
        </div>
        <div className="field-group">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <label className="field-label" style={{ margin: 0 }}>OpenRouter API Key</label>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "10.5px",
                fontWeight: "700",
                color: "#6366f1",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: "2px 8px",
                borderRadius: "6px",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px solid rgba(99, 102, 241, 0.3)"
              }}
            >
              Get OpenRouter Key ↗
            </a>
          </div>
          <input
            type="password"
            className="glass-input"
            placeholder="sk-or-..."
            value={openrouterApiKey}
            onChange={(e) => setOpenrouterApiKey(e.target.value)}
            onBlur={(e) => handleKeyBlur("openrouterApiKey", e.target.value)}
          />
        </div>
      </div>

      {/* Auto Switch */}
      <div
        className="glass-switch-row"
        onClick={() => {
          const next = !autoSwitch;
          setAutoSwitch(next);
          chrome.storage.local.set({ autoSwitch: next }).catch(() => { });
        }}
      >
        <div>
          <div className="switch-title">Auto Model Fallback</div>
          <div className="switch-desc">Auto-switch provider if primary provider hits quota limit</div>
        </div>
        <div className={`glass-switch ${autoSwitch ? "on" : ""}`} />
      </div>

      {/* Sticky Action Buttons */}
      <div
        className="btn-row"
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
          className="btn-glass btn-ghost"
          onClick={handleTestKeys}
          disabled={testing}
        >
          {testing ? "Testing..." : "Test API Keys"}
        </button>
        <button
          className={`btn-glass btn-primary ${btnClick ? "btn-click-anim" : ""} ${justSaved ? "btn-saved" : ""}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : justSaved ? "✓ Saved Settings!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
