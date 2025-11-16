# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-16

### Fixed
- Fixed macOS compatibility issues with HTTP requests from Office.js
- Removed unsupported `alert()` calls that caused runtime errors in Office Add-ins
- Fixed `window.alert is not supported` error on macOS Excel
- Improved error handling with detailed network error messages
- Fixed naming conflict in rate limiter middleware
- Updated TypeScript-ESLint to v8 for ESLint 9 compatibility

### Added
- Diagnostic panel in Settings to verify current configuration
- Detailed fetch error handling for better debugging
- Safari Web Inspector instructions for macOS debugging
- Comprehensive logging for optimization requests
- HTTPS support documentation using ngrok
- macOS-specific setup guide in QUICKSTART.md

### Changed
- Updated all deprecated dependencies to latest versions
- Migrated from .eslintrc.json to eslint.config.mjs (ESLint 9 flat config)
- Improved CORS configuration for development
- Enhanced backend logging with request/response tracking
- Updated documentation with macOS troubleshooting steps

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
