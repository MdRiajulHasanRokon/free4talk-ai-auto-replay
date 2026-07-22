# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 3.1.x   | :white_check_mark: |

## Architecture Overview

### Client-Side Execution

The extension runs primarily in the browser. All AI inference requests are sent directly from the browser to the configured AI provider's API endpoint over HTTPS. The project does not operate an intermediate proxy server or backend.

```
[ Browser (free4talk.com) ] ── Direct HTTPS ──> [ AI Provider API ]
```

Supported provider endpoints:

- `api.openai.com` (OpenAI / ChatGPT)
- `generativelanguage.googleapis.com` (Google Gemini)
- `integrate.api.nvidia.com` (NVIDIA NIM)
- `api.groq.com` (Groq)
- `openrouter.ai` (OpenRouter)

### API Key Storage

API keys are stored using **`chrome.storage.local`**. This storage mechanism is:

- Sandboxed to the extension by Chrome's built-in isolation
- Not accessible to web pages or other extensions
- Stored as plaintext strings within the browser's extension storage
- Not synchronized across devices (unlike `chrome.storage.sync`)

Volatile runtime state (such as in-session chat history) uses **`chrome.storage.session`**, which is cleared when the browser session ends.

The extension does **not** use `localStorage` or `sessionStorage`.

### Data Sent to AI Providers

When an AI response is requested, the extension sends the following to the configured provider:

- The **system prompt** (persona configuration defined by the user)
- Up to **6 recent chat messages** from the Free4Talk room, including usernames and message text
- The **current message** being replied to

This data is transmitted directly to the provider's API. Each provider has its own privacy policy and data retention practices.

### Permissions

The extension requests the following Chrome permissions:

- `storage` — to persist settings and API keys
- `alarms` — for scheduled operations
- `tabs` — for tab-related functionality

Host permissions are scoped to:

- `*://www.free4talk.com/*` and `*://free4talk.com/*`
- The five AI provider API domains listed above

### Telemetry

No analytics, telemetry, tracking scripts, or session monitoring code exists in the codebase.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities.
2. Send an email to the repository owner via their [GitHub profile](https://github.com/MdRiajulHasanRokon).
3. Include a description of the vulnerability, steps to reproduce, and the potential impact.
4. Allow reasonable time for a fix before public disclosure.

We aim to acknowledge reports within 48 hours and provide a fix or mitigation plan within 7 days.
