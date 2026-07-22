# Contributing to Free4Talk AI

Thank you for your interest in contributing to Free4Talk AI! This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Bugs

1. Check the [existing issues](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/issues) to avoid duplicates.
2. Use the [bug report template](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/issues/new?template=bug_report.yml) to file a new issue.
3. Include your browser name and version, extension version, and the AI provider you were using.
4. Provide clear steps to reproduce the issue.

### Suggesting Features

1. Open a [feature request](https://github.com/MdRiajulHasanRokon/free4talk-ai-auto-replay/issues/new?template=feature_request.yml).
2. Describe the feature, the use case, and any alternatives you considered.

### Submitting Code Changes

1. **Fork** the repository and create a new branch from `main`.
2. Make your changes in the new branch.
3. Follow the existing code style — match the formatting and conventions already used in the project.
4. Write clear, descriptive commit messages using [Conventional Commits](https://www.conventionalcommits.org/):
   - `fix:` for bug fixes
   - `feat:` for new features
   - `docs:` for documentation changes
   - `chore:` for maintenance tasks
   - `security:` for security-related changes
5. Test your changes locally by loading the unpacked extension in your browser.
6. Open a pull request against `main` and fill out the PR template.

## Development Setup

### Prerequisites

- Node.js (for building the UI)
- A Chromium-based browser (Chrome, Edge, Brave, or Opera)

### Building the Extension

```bash
# Install dependencies
npm install

# Build the popup and memory manager UI
npm run build
```

### Loading for Development

1. Open `chrome://extensions` (or your browser's equivalent).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the project directory.
4. Navigate to [free4talk.com](https://www.free4talk.com) to test.

## Code Style

- Match the existing formatting and conventions in the codebase.
- Use `"use strict"` in JavaScript files.
- Prefer `const` over `let` where possible.
- Use descriptive variable and function names.

## License

By contributing to Free4Talk AI, you agree that your contributions will be licensed under the [MIT License](LICENSE).
