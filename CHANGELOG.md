# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-15

### Added
- Initial release of Excel AI Formula Optimizer
- Support for multiple AI providers:
  - OpenAI GPT-4 Turbo
  - Anthropic Claude 3.5 Sonnet
  - Google Gemini Pro
  - Ollama (local models)
- Task pane UI with React and Fluent UI
- Formula optimization with AI
- Optimization history (last 50 operations)
- Settings panel for configuration
- Hotkey support (Ctrl+Shift+O)
- Auto-replace option
- Formula parser and complexity analyzer
- Rate limiting (1000 requests/day)
- HTTPS/TLS encryption
- Backend API with Express.js
- Error handling and logging
- CORS support
- Privacy-focused design (no server-side storage)

### Security
- All data transmitted via HTTPS
- API keys stored locally only
- Rate limiting to prevent abuse
- Input validation on all endpoints

## [Unreleased]

### Planned
- Batch optimization for multiple cells
- Offline mode with cached optimizations
- Excel Online support
- Custom hotkey configuration
- Advanced formula analytics
- Export optimization reports
- Formula templates library
