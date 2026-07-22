# Privacy Policy

**Free4Talk AI** — AI Auto-Reply Browser Extension

Last updated: 2026-07-23

## Overview

Free4Talk AI is an open-source browser extension that provides automated AI-powered chat replies on [free4talk.com](https://www.free4talk.com). This policy describes what data the extension accesses, how it is used, and where it is sent.

## Data Collection

The extension does not collect, transmit, or store user data on any server operated by the project. There is no analytics, telemetry, or tracking code in the codebase.

## Data Stored Locally

The following data is stored locally within the browser using Chrome extension storage APIs:

### `chrome.storage.local` (persistent)

- **API keys** for configured AI providers (stored as plaintext strings, isolated by Chrome's extension sandboxing)
- **User preferences** (selected AI provider, model, persona prompt, reply settings)
- **Chat history** (persistent conversation log for the Memory Manager feature)
- **Bot activity logs**
- **Welcome message template**

### `chrome.storage.session` (volatile, cleared on browser close)

- **Runtime chat state** (in-session conversation history)

The extension does **not** use `localStorage` or `sessionStorage`.

## Data Sent to Third Parties

When an AI-generated reply is requested, the extension sends data directly from the browser to the AI provider configured by the user. No intermediate server is involved.

### What is sent

- A **system prompt** containing the user-defined persona configuration
- Up to **6 recent chat messages** from the active Free4Talk room, including the sender's username and message text
- The **current message** being replied to, including the sender's username

### Where it is sent

Data is sent directly to one of the following provider APIs, depending on user configuration:

| Provider | API Endpoint |
|----------|-------------|
| OpenAI (ChatGPT) | `api.openai.com` |
| Google Gemini | `generativelanguage.googleapis.com` |
| NVIDIA NIM | `integrate.api.nvidia.com` |
| Groq | `api.groq.com` |
| OpenRouter | `openrouter.ai` |

Each provider has its own privacy policy and data retention practices. Users should review the privacy policy of their chosen provider.

## Permissions

The extension requests the following browser permissions:

- **`storage`** — to save settings, API keys, and chat history locally
- **`alarms`** — for scheduled internal operations
- **`tabs`** — for tab-related functionality

Host permissions are limited to `free4talk.com` and the five AI provider API domains.

## Domain Scope

The extension's content scripts run exclusively on `free4talk.com`. The extension does not access, read, or modify content on any other website.

## User Control

- Users can clear all stored data through the extension's reset function
- Users choose which AI provider to use and provide their own API keys
- The extension can be uninstalled at any time, which removes all locally stored data

## Open Source

The complete source code is available at [github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay) for independent review.

## Contact

For privacy-related questions, open an issue on the [GitHub repository](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/issues) or contact the maintainer through their [GitHub profile](https://github.com/MdRiajulHasanRokon).
