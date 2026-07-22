# Free4Talk AI Auto Reply – AI Browser Extension for Free4Talk for phone and desktop
Free4Talk AI Auto Reply is an AI-powered browser extension that automatically generates and sends intelligent chat replies on Free4Talk. It supports Chrome, Microsoft Edge, Brave, Opera, and compatible Android browsers.
[![GitHub release](https://img.shields.io/github/v/release/MdRiajulHasanRokon/free4talk-ai-auto-replay)](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/latest)
[![GitHub downloads](https://img.shields.io/github/downloads/MdRiajulHasanRokon/free4talk-ai-auto-replay/total)](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases)
[![GitHub stars](https://img.shields.io/github/stars/MdRiajulHasanRokon/free4talk-ai-auto-replay)](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/stargazers)
[![GitHub license](https://img.shields.io/github/license/MdRiajulHasanRokon/free4talk-ai-auto-replay)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-blue)](#)

Free4Talk AI is an open-source browser extension designed for automated message processing, real-time chat replies, and context-aware interaction on [free4talk.com](https://www.free4talk.com).

Built on Manifest V3, the extension integrates multi-provider Large Language Model (LLM) inference engines including NVIDIA NIM, OpenAI ChatGPT, Google Gemini, Groq, and OpenRouter into an automated workflow.

---

> [!IMPORTANT]
> **Domain Restriction**: This extension operates exclusively on [free4talk.com](https://www.free4talk.com). Content scripts and background processes are isolated strictly to Free4Talk origins.

---

## Complete Installation Guide

### 1. Mobile Phone Installation

#### Download Lemur Browser

Lemur Browser can be downloaded from the appropriate app store:

* **Android — Google Play Store:**
  [Download Lemur Browser for Android](https://play.google.com/store/apps/details?id=com.lemurbrowser.exts&pcampaignid=web_share)

* **iPhone/iPad — Apple App Store:**
  [Find Lemur Browser on the Apple App Store](https://apps.apple.com/us/app/狐猴浏览器/id1662756821)

> **Important:** The Chrome extension ZIP installation method is supported only on compatible Android browsers. iPhone and iPad browsers generally cannot manually install Chrome extensions from `.zip` or `.crx` files.

---

## Method A: Android Installation Using Lemur Browser

### Step 1: Install Lemur Browser

1. Open the [Google Play Store](https://play.google.com/store/apps/details?id=com.lemur.open.browser).
2. Tap **Install**.
3. Wait for the installation to complete.
4. Open **Lemur Browser**.

### Step 2: Download the Extension

1. Open Lemur Browser.

2. Visit the following GitHub release page:

   [Free4Talk AI v3.1.0 GitHub Release](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/tag/v3.1.0)

3. Download the following file:

```text
free4talk-ai-v3.1.0.zip
```

4. Wait until the file has completely downloaded.

The ZIP file will normally be saved in your phone’s **Downloads** folder.

### Step 3: Open the Lemur Extensions Menu

You do not need to enter `chrome://extensions`.

Instead:

1. Open Lemur Browser.
2. Tap the browser’s **Extensions** icon or open the browser menu.
3. Select **Extensions**.
4. Tap the **+** button.

Depending on the Lemur Browser version, the installation option may appear as:

* **Install extension**
* **Load extension**
* **Import extension**
* **From local file**
* **From .zip/.crx/.user.js**

### Step 4: Select the Extension ZIP File

1. Tap **+** or the available local installation option.
2. Select the option for installing from a ZIP or local file.
3. Open your phone’s **Downloads** folder.
4. Select:

```text
free4talk-ai-v3.1.0.zip
```

5. Approve the requested permissions.
6. Wait for the installation to complete.

### Step 5: Enable the Extension

1. Open Lemur Browser’s **Extensions** menu again.
2. Find the installed **Free4Talk AI** extension.
3. Make sure the extension is enabled.
4. Allow the extension to access:

```text
https://www.free4talk.com
```

### Step 6: Open Free4Talk

1. Visit [free4talk.com](https://www.free4talk.com) using Lemur Browser.
2. Sign in to your Free4Talk account.
3. Join or open a chat room.
4. Tap the Lemur Browser **Extensions** icon.
5. Select the installed Free4Talk AI extension.

### Step 7: Configure the Extension

1. Open the extension panel.

2. Enter your supported AI provider API key.

3. Save the API key.

4. Configure the available options, such as:

   * AI model
   * Reply language
   * Response delay
   * Reply instructions
   * Automated chat mode

5. Enable automated chat.

6. Refresh the Free4Talk page after saving the configuration.

> Keep your API key private. Do not share it publicly or include it in screenshots.

---

## iPhone and iPad Installation

You may download Lemur Browser from the Apple App Store when it is available:

[Find Lemur Browser on the Apple App Store](https://apps.apple.com/us/app/狐猴浏览器/id1662756821)

However, iPhone and iPad do not support manually loading this Chrome extension from a `.zip` or `.crx` file using the same Android method.

The following Android options are generally unavailable on iOS:

* Installing extensions from ZIP files
* Installing `.crx` files
* Using **Load unpacked**
* Importing Chrome extensions from local storage

To support iPhone and iPad properly, the extension would need to be converted into a compatible **Safari Web Extension** and distributed through an iOS application or the Apple App Store.

Therefore:

* **Android:** ZIP extension installation is supported through a compatible browser such as Lemur Browser.
* **iPhone/iPad:** The current ZIP extension cannot be manually installed.



### 2. Desktop Installation

Download and extract `free4talk-ai-v3.1.0.zip` from the [GitHub Releases page](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/tag/v3.1.0).

#### Chrome, Microsoft Edge, Brave, Opera, Vivaldi, and Other Chromium-Based Browsers

1. Open your browser’s extension-management page:

   * Google Chrome: `chrome://extensions`
   * Microsoft Edge: `edge://extensions`
   * Brave: `brave://extensions`
   * Opera: `opera://extensions`
   * Vivaldi: `vivaldi://extensions`

2. Enable **Developer mode**.

3. Click **Load unpacked**.

4. Select the extracted extension project folder containing the `manifest.json` file.

5. Open [free4talk.com](https://www.free4talk.com) to activate and use the extension.

#### Mozilla Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Open the extracted project folder.
4. Select the `manifest.json` file.
5. Open [free4talk.com](https://www.free4talk.com) to activate and use the extension.

> **Note:** Firefox temporary extensions are removed when the browser is restarted. Permanent Firefox installation requires a signed Firefox-compatible extension package.

#### Safari

Safari requires a separately converted and signed Safari Web Extension. The downloaded ZIP package cannot be installed directly through Safari unless a Safari-compatible version is provided.


#### Method B: Kiwi Browser
1. Install **Kiwi Browser** from the Google Play Store.
2. Download `free4talk-ai-v3.1.0.zip` from [GitHub Releases](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/releases/tag/v3.1.0).
3. Open Kiwi Browser, tap the menu (three dots), and select **Extensions**.
4. Enable **Developer Mode**.
5. Tap **+ (from .zip / .crx / .user.js)** and select the zip archive.
6. Open [free4talk.com](https://www.free4talk.com) and launch Free4Talk AI from the extension menu.

---

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


## Supported Browsers

| Browser | Platform | Support |
|---|---|---|
| Google Chrome | Windows, macOS, Linux | Supported |
| Microsoft Edge | Windows, macOS | Supported |
| Brave | Windows, macOS, Linux | Supported |
| Opera | Windows, macOS, Linux | Supported |
| Lemur Browser | Android | Supported |
| Kiwi Browser | Android | Test before installation |
| Safari | iPhone, iPad, macOS | Not currently supported |
| Firefox | Desktop and Android | Not currently supported |

<img width="488" height="765" alt="image" src="https://github.com/user-attachments/assets/d38cf195-ab77-44e3-a918-f31dedb5e197" />

## Table of Contents

- [Features](#features)
- [Supported Browsers](#supported-browsers)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Privacy and Security](#privacy-and-security)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)


## Frequently Asked Questions

### What is Free4Talk AI Auto Reply?

Free4Talk AI Auto Reply is a browser extension that uses artificial intelligence to generate chat replies on Free4Talk.

### Does the extension work with Google Chrome?

Yes. The extension supports Google Chrome and other Chromium-based browsers such as Microsoft Edge, Brave, and Opera.

### Does it work on Android?

The extension can be installed on Android browsers that support Chrome extensions, such as Lemur Browser. Browser behavior may vary by version.

### Does it work on iPhone or iPad?

No. Chrome extensions cannot normally be installed in Chrome on iPhone or iPad. A separate Safari extension would be required.

### Is an API key required?

An API key may be required depending on the AI provider configured in the extension.

### Is the extension officially associated with Free4Talk?

No. This is an independent project and is not officially affiliated with Free4Talk.



## Privacy and Security

- API keys are stored according to the extension's documented storage method.
- Users should never share their API keys publicly.
- The extension only requests permissions required for its documented features.
- Review the source code and privacy policy before installation.
- Conversation data may be sent to the selected AI provider when generating responses.


## Disclaimer

Free4Talk AI Auto Reply is an independent open-source project. It is not affiliated with, endorsed by, or officially connected to Free4Talk.

Users are responsible for complying with Free4Talk's terms of service and the terms of the selected AI provider. Automated messaging should be used responsibly and should not be used for spam, harassment, impersonation, or abuse.


README.md
LICENSE
CONTRIBUTING.md
SECURITY.md
PRIVACY.md
CHANGELOG.md
CODE_OF_CONDUCT.md

free4talk-ai-auto-replay/
├── src/
├── assets/
├── docs/
│   └── images/
├── manifest.json
├── README.md
├── PRIVACY.md
├── SECURITY.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── package.json



