# Free4Talk AI - Automated Chat & Auto-Replay Chrome Extension (v3.1.0)

[![Open Source](https://img.shields.io/badge/Open%20Source-100%25-brightgreen.svg)](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay)
[![Security](https://img.shields.io/badge/Security-Client--Side%20Direct%20API-blue.svg)](#security-and-privacy-architecture)
[![Chrome Extension](https://img.shields.io/badge/Extension-Manifest%20V3-orange.svg)](manifest.json)
[![Platform](https://img.shields.io/badge/Platform-free4talk.com-purple.svg)](https://www.free4talk.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Free4Talk AI is an open-source browser extension designed for automated message processing, real-time chat replies, and context-aware interaction on [free4talk.com](https://www.free4talk.com).

Built on Manifest V3, the extension integrates multi-provider Large Language Model (LLM) inference engines including NVIDIA NIM, OpenAI ChatGPT, Google Gemini, Groq, and OpenRouter into an automated workflow.

---

> [!IMPORTANT]
> **Domain Restriction**: This extension operates exclusively on [free4talk.com](https://www.free4talk.com). Content scripts and background processes are isolated strictly to Free4Talk origins.

---

## Technical Overview & Core Architecture

### 1. Real-Time Chat Listener and Context Engine
* **DOM Event Parsing**: Monitors room DOM mutations to detect incoming chat events without page reloads.
* **Context Preservation**: Maintains rolling chat history tokens to inform down-stream LLM prompts for relevant, coherent responses.
* **Asynchronous Dispatch**: Executes non-blocking background workers to format and transmit inference requests.

### 2. Multi-Provider Inference Architecture
* **NVIDIA NIM Integration**: Connects to high-throughput open weights models (Meta Llama 3, Mistral, DeepSeek) using free API endpoints.
* **OpenAI Integration**: Directly invokes standard chat completion endpoints (`gpt-4o`, `gpt-4o-mini`).
* **Google Gemini API**: Native integration with Gemini 1.5 Flash and Pro models.
* **Groq and OpenRouter Support**: Direct connection for low-latency LPU execution and aggregated model routing.

### 3. Failover and Resilience Module
* Implements dynamic provider switching upon detecting quota depletion, rate-limiting (HTTP 429), or transient network timeouts (HTTP 5xx).
* Automatically redirects execution to designated secondary model providers to preserve continuous operation.

### 4. Memory State & Persona Configuration
* **System Persona**: Custom system prompts allow users to define behavioral profiles, language complexity levels, and interaction tones.
* **Local Memory Persistence**: User-defined knowledge nodes and vocabulary items persist locally across sessions.

### 5. Frontend Architecture
* Built with React 19 and custom dark glassmorphic interface components bundled via `esbuild`.
* Isolated state management for API credential validation, real-time logging, and hotkey control toggles.

---

## Security and Privacy Architecture

Free4Talk AI adheres to zero-trust client-side design principles.

```
[ Browser Context (free4talk.com) ] ─── (Direct HTTPS Request) ───> [ AI Provider Endpoint ]
                               (No Intermediate Proxy Server)
```

1. **Client-Side Execution**: All network traffic is transmitted directly from the client browser to authorized provider APIs (`api.nvidia.com`, `api.openai.com`, `generativelanguage.googleapis.com`). No intermediary telemetry or backend proxy servers are deployed.
2. **Local Credential Storage**: Sensitive credentials and API tokens are encrypted and isolated within `chrome.storage.local`.
3. **Zero Telemetry Policy**: No tracking, analytics collection, or session monitoring scripts exist within the codebase.
4. **Scoped Permission Boundary**: Manifest permissions are strictly limited to `*://*.free4talk.com/*`.

---

## Release Notes and System Roadmap

### Version 3.1.0 Release
* Updated NVIDIA NIM endpoint handling for Llama 3 and DeepSeek model variants.
* Optimised DOM query selectors for reduced latency during chat parsing.
* Enhanced memory management interface with filterable item states and deletion controls.
* Refined exception handling for HTTP 429 and 503 response codes.

### Future Development Objectives and Technical Roadmap

1. **Real-Time Multilingual Text Translation Engine**
   - **Bi-Directional In-Line Translation**: Automatic real-time translation of incoming room messages into your target learning language and reverse translation of generated replies.
   - **Language Pair Detection**: Automatic identification of written text languages in Free4Talk chat rooms to dynamically adjust language complexity.

2. **Automated Chat Topic & Icebreaker Engine**
   - **Interactive Topic Generator**: Programmatic prompt generation to suggest engaging discussion topics directly in room text chat when conversation lulls occur.
   - **Automated Participant Welcome Handler**: Configurable greeting dispatch for new users joining active text chat rooms.

3. **Text Conversation Analytics & Vocabulary Tracker**
   - **Vocabulary Extraction**: Automatic tracking and categorization of new words and idioms used during text auto-reply sessions.
   - **Grammar & Syntax Tutor Mode**: Real-time grammatical feedback and optional corrections in room text chat.

4. **Vector Database Memory Index**
   - **Semantic Search Vector Store**: Client-side IndexedDB vector embeddings storage for searching and retrieving past text conversation memories across multiple room sessions.

---

## Complete Installation Guide

### 1. Mobile Phone Installation (Android)

#### Method A: Lemur Browser
1. Download and install **Lemur Browser** from the [Google Play Store](https://play.google.com/store/apps/details?id=com.lemur.open.browser).
2. Download `free4talk-ai-v3.1.0.zip` from [GitHub Releases](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/tag/v3.1.0).
3. Open Lemur Browser, tap the Extension icon, and navigate to `chrome://extensions`.
4. Enable **Developer Mode**.
5. Select **Load unpacked** or **+ (from .zip/.crx/.user.js)** and choose the downloaded file.
6. Navigate to [free4talk.com](https://www.free4talk.com), configure your API key, and enable automated chat.

#### Method B: Kiwi Browser
1. Install **Kiwi Browser** from the Google Play Store.
2. Download `free4talk-ai-v3.1.0.zip` from [GitHub Releases](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/tag/v3.1.0).
3. Open Kiwi Browser, tap the menu (three dots), and select **Extensions**.
4. Enable **Developer Mode**.
5. Tap **+ (from .zip / .crx / .user.js)** and select the zip archive.
6. Open [free4talk.com](https://www.free4talk.com) and launch Free4Talk AI from the extension menu.

---

### 2. Desktop Installation (Chrome, Brave, Edge, Opera)

1. Download and extract `free4talk-ai-v3.1.0.zip` from [GitHub Releases](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/tag/v3.1.0).
2. Open the extensions manager (`chrome://extensions` or browser equivalent).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extracted project directory.
5. Access [free4talk.com](https://www.free4talk.com) to activate the extension.

---

## Official Platform Reference

This extension is built specifically for users of **[free4talk.com](https://www.free4talk.com)**.

* Website: [https://www.free4talk.com](https://www.free4talk.com)

---

## Technology Stack

* **UI Layer**: React 19, Vanilla CSS
* **Build Tooling**: esbuild
* **Extension Standard**: Chrome Extension Manifest V3
* **API Integrations**: NVIDIA NIM API, OpenAI REST API, Google Gemini API, Groq SDK, OpenRouter API

---

## License and Governance

Distributed under the MIT License. See `LICENSE` for details.

Developed by [MdRiajulHasanRokon](https://github.com/MdRiajulHasanRokon) for the [Free4Talk](https://www.free4talk.com) community.
