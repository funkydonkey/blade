# Quick Start Guide

## Prerequisites

- **Node.js** 18+ and npm
- **Microsoft Excel** 2016+ (Windows) or Microsoft 365
- **AI Provider API Key** (OpenAI, Anthropic, Google, or local Ollama)

## Installation

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/funkydonkey/blade.git
cd blade

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Backend

```bash
# Navigate to backend folder
cd backend

# Create environment file
cp .env.example .env

# Edit .env and add your API keys
# Example:
# OPENAI_API_KEY=sk-your-key-here
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Terminal 3 - Load in Excel:**
```bash
npm start
```

This will:
- Generate HTTPS certificates
- Start webpack dev server on https://localhost:3000
- Open Excel and sideload the add-in

## First Use

1. **Excel opens** with the add-in loaded
2. Look for **"AI Optimizer"** tab in the ribbon
3. Click **"Show Optimizer"** to open the task pane
4. Go to **Settings** tab:
   - Select AI provider (OpenAI, Anthropic, Google, or Ollama)
   - Enter your API key
   - Set backend endpoint (default: http://localhost:5000)

## Quick Test

1. In Excel, create a formula in any cell:
   ```
   =SUM(A1:A10)/COUNT(A1:A10)
   ```

2. Select the cell

3. Press **Ctrl+Shift+O** or click "Optimize Formula" button

4. Review the optimized formula:
   ```
   =AVERAGE(A1:A10)
   ```

5. Click **Apply** to replace the formula

## Common Issues

### Issue: Add-in doesn't appear in Excel

**Solution:**
- Ensure dev server is running on https://localhost:3000
- Trust the SSL certificate when prompted
- Clear Office cache:
  - Windows: Delete `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`
  - Mac: `~/Library/Containers/com.microsoft.Excel/Data/Library/Application Support/Microsoft/Office/16.0/Wef/`
- Restart Excel

### Issue: "API error" when optimizing

**Solution:**
- Check backend is running (http://localhost:5000/health should return OK)
- Verify API key is correct in Settings
- Check internet connection
- Look at backend console for error details

### Issue: npm install warnings about deprecated packages

**Solution:**
- These are transitive dependencies (inflight, glob, rimraf)
- They come from office-addin packages
- Safe to ignore - no production vulnerabilities detected
- Run `npm audit --omit=dev` to verify

### Issue: CORS errors in browser console

**Solution:**
- Ensure backend CORS_ORIGIN matches frontend URL
- Check backend/.env has `CORS_ORIGIN=https://localhost:3000`
- Restart backend server after .env changes

## Production Build

### Build Frontend
```bash
npm run build
```
Output in `dist/` folder

### Build Backend
```bash
cd backend
npm run build
```
Output in `backend/dist/` folder

### Deploy Backend
See [DEPLOYMENT.md](DEPLOYMENT.md) for Render.com deployment instructions.

## API Keys Setup

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and add to Settings in Excel add-in

### Anthropic (Claude)
1. Go to https://console.anthropic.com/
2. Get API key from settings
3. Copy and add to Settings

### Google (Gemini)
1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Copy and add to Settings

### Ollama (Local - No API Key)
1. Install Ollama from https://ollama.ai/
2. Run: `ollama pull llama2`
3. Select "Ollama" in Settings (no API key needed)

## Next Steps

- Read [USER_GUIDE.md](docs/USER_GUIDE.md) for detailed usage
- Check [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
- Review [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## Support

- **Issues**: https://github.com/funkydonkey/blade/issues
- **Documentation**: See `docs/` folder
- **Examples**: See USER_GUIDE.md for formula optimization examples

## Project Structure

```
blade/
├── src/                    # Frontend source
│   ├── taskpane/          # React UI
│   └── commands/          # Ribbon commands
├── backend/               # Backend API
│   └── src/
│       ├── routes/        # API endpoints
│       └── services/      # AI providers
├── dist/                  # Build output (after npm run build)
├── manifest.xml           # Office add-in manifest
└── docs/                  # Documentation
```

## Troubleshooting Tips

1. **Check backend health**: Visit http://localhost:5000/health
2. **Check frontend**: Visit https://localhost:3000/taskpane.html
3. **View logs**: Backend logs appear in console where `npm run dev` is running
4. **Browser DevTools**: Open in Excel (F12) to see frontend errors
5. **Clear cache**: Delete node_modules and reinstall if issues persist

## Security Notes

- API keys are stored locally in browser localStorage
- Formulas are sent to your chosen AI provider
- No formula data is stored on backend server
- All communication uses HTTPS/TLS
- Review your AI provider's privacy policy

## Performance

- First optimization: 2-5 seconds (AI processing)
- Subsequent optimizations: Similar times (no caching by default)
- Rate limit: 1000 requests/day (configurable in backend)
- Recommended: Use Ollama for unlimited free optimizations
