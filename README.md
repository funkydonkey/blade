# Excel AI Formula Optimizer

AI-powered Excel Add-in for optimizing and simplifying Excel formulas using multiple AI providers (OpenAI GPT-4, Anthropic Claude, Google Gemini, Ollama).

**🚀 [Quick Start Guide](QUICKSTART.md)** | [User Guide](docs/USER_GUIDE.md) | [Architecture](docs/ARCHITECTURE.md) | [Deployment](DEPLOYMENT.md)

## Features

- **AI-Powered Optimization**: Automatically optimize Excel formulas using state-of-the-art AI models
- **Formula Beautifier**: Format complex formulas with proper indentation and line breaks (works offline, no AI needed)
- **Multiple AI Providers**: Choose between OpenAI, Anthropic Claude, Google Gemini, or local Ollama
- **Hotkey Support**: Quick access with Ctrl+Shift+O
- **Formula History**: Keep track of all optimizations with a searchable history
- **Privacy-Focused**: Formulas are processed securely and not stored on servers
- **Modern UI**: Clean, responsive interface built with Fluent UI

## Installation

### Prerequisites

- Windows 10/11 or macOS
- Microsoft Excel 2016 or newer (including Microsoft 365)
- Node.js 18+ and npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/funkydonkey/blade.git
cd blade
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Configure backend**
```bash
cd backend
cp .env.example .env
# Edit .env and add your AI provider API keys
```

5. **Build the project**
```bash
npm run build
cd backend
npm run build
cd ..
```

## Development

### Running in Development Mode

1. **Start the backend server**
```bash
cd backend
npm run dev
```

2. **Start the frontend dev server** (in a new terminal)
```bash
npm run dev
```

3. **Load the add-in in Excel**
```bash
npm start
```

This will:
- Generate SSL certificates for localhost
- Start webpack dev server on https://localhost:3000
- Open Excel and sideload the add-in

**Note for macOS users:** If you encounter "Load failed" errors when testing, see the [macOS Specific Setup](QUICKSTART.md#macos-specific-setup) section in QUICKSTART.md. You may need to use ngrok to create an HTTPS tunnel for the backend.

### Project Structure

```
blade/
├── src/                    # Frontend source code
│   ├── taskpane/          # Task pane UI (React)
│   │   ├── components/    # React components
│   │   ├── index.tsx      # Entry point
│   │   ├── taskpane.html  # HTML template
│   │   └── taskpane.css   # Styles
│   └── commands/          # Ribbon commands
├── backend/               # Backend API
│   └── src/
│       ├── routes/        # API routes
│       ├── services/      # Business logic
│       │   └── providers/ # AI provider integrations
│       ├── middleware/    # Express middleware
│       └── utils/         # Utilities
├── manifest.xml           # Office Add-in manifest
├── package.json           # Frontend dependencies
└── webpack.config.js      # Webpack configuration
```

## Usage

### Basic Workflow

1. **Open Excel** and select a cell containing a formula
2. **Press Ctrl+Shift+O** or click the "Optimize Formula" button in the ribbon
3. **Review** the AI-suggested optimized formula
4. **Apply** the optimized formula or copy it to clipboard

### Configuration

Access settings through the Settings tab in the task pane:

- **AI Provider**: Choose your preferred AI service
- **API Key**: Enter your API key for the selected provider
- **Backend Endpoint**: Configure the backend API URL (e.g., http://localhost:5001 or your ngrok URL)
- **Auto-Replace**: Enable automatic formula replacement without confirmation

**Tip:** Use the "Current Settings (Diagnostic)" panel in Settings to verify all configurations are correct.

### Example Optimizations

**Simple Aggregation**
- Original: `=SUM(A1:A10)/COUNT(A1:A10)`
- Optimized: `=AVERAGE(A1:A10)`

**Nested IFs**
- Original: `=IF(A1>10,IF(A1>20,IF(A1>30,"High","Medium"),"Low"),"Very Low")`
- Optimized: `=IFS(A1>30,"High",A1>20,"Medium",A1>10,"Low",TRUE,"Very Low")`

**Complex VLOOKUP**
- Original: `=IFERROR(VLOOKUP(A1,Sheet2!A:B,2,FALSE),"")`
- Optimized: `=XLOOKUP(A1,Sheet2!A:A,Sheet2!B:B,"")`

### Formula Beautifier (Offline Mode)

The beautifier feature formats formulas for better readability without using AI:

**Simple IF**
- Original: `=IF(A1>0,"Yes","No")`
- Beautified:
```
=IF(
    A1>0,
    "Yes",
    "No"
)
```

**Nested IF**
- Original: `=IF(A1>100,IF(A1<200,"Medium","High"),"Low")`
- Beautified:
```
=IF(
    A1>100,
    IF(
        A1<200,
        "Medium",
        "High"
    ),
    "Low"
)
```

**Complex Multi-Criteria**
- Original: `=SUMIFS(C1:C1000,A1:A1000,">0",B1:B1000,"Yes")`
- Beautified:
```
=SUMIFS(
    C1:C1000,
    A1:A1000,
    ">0",
    B1:B1000,
    "Yes"
)
```

**Features:**
- Works 100% offline (no API calls)
- Instant formatting
- Handles nested functions correctly
- Preserves quoted strings
- Supports all Excel functions
- Configurable indentation

**How to use:**
1. Select a cell with a formula
2. Click "Make Readable (No AI)" button
3. Review the formatted formula
4. Apply or copy the result

## AI Providers

### OpenAI (GPT-4)
- **Model**: gpt-4-turbo-preview
- **API Key**: Get from https://platform.openai.com/api-keys
- **Best for**: Complex formula restructuring

### Anthropic (Claude)
- **Model**: claude-3-5-sonnet
- **API Key**: Get from https://console.anthropic.com/
- **Best for**: Detailed explanations and optimization reasoning

### Google (Gemini)
- **Model**: gemini-pro
- **API Key**: Get from https://makersuite.google.com/app/apikey
- **Best for**: Fast responses

### Ollama (Local)
- **Model**: llama2 (customizable)
- **Setup**: Install Ollama from https://ollama.ai/
- **Best for**: Privacy-focused users, no API costs

## API Reference

### POST /api/optimize

Optimize an Excel formula using AI.

**Request Body**
```json
{
  "formula": "=SUM(A1:A10)/COUNT(A1:A10)",
  "provider": "openai",
  "apiKey": "sk-...",
  "context": "Optional context about the data"
}
```

**Response**
```json
{
  "optimized": "=AVERAGE(A1:A10)",
  "explanation": "Replaced SUM/COUNT with AVERAGE function for simplicity",
  "improvementPercentage": 60
}
```

## Security & Privacy

- All data transmission uses HTTPS/TLS 1.3
- API keys are stored locally in browser localStorage
- Formulas are sent only to your selected AI provider
- No formula data is permanently stored on our servers
- Rate limiting: 1000 requests per day (configurable)

## Troubleshooting

### Add-in not loading
- Ensure webpack dev server is running on https://localhost:3000
- Check that SSL certificates are trusted
- Clear Office cache: Delete `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`

### Backend connection errors
- Verify backend is running on the configured port
- Check CORS settings in backend/.env
- Ensure firewall allows connections to localhost:5000

### AI optimization fails
- Verify API key is correct and has sufficient credits
- Check internet connection
- Review backend logs for detailed error messages

## Development Roadmap

- [ ] Batch optimization for multiple cells
- [ ] Offline mode with cached optimizations
- [ ] Custom AI model training
- [ ] Excel Online support
- [ ] Mobile app integration
- [ ] Advanced formula analytics

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details

## Support

- GitHub Issues: https://github.com/funkydonkey/blade/issues
- Documentation: https://github.com/funkydonkey/blade/wiki

## Acknowledgments

- Built with Office.js and React
- UI components from Fluent UI
- AI providers: OpenAI, Anthropic, Google, Ollama

---

**Note**: This is a desktop application. For Excel Online support, please check our roadmap.
