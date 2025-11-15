# User Guide - Excel AI Formula Optimizer

## Quick Start

### Installation

1. Download and install the Excel Add-in
2. Open Excel
3. The "AI Optimizer" tab should appear in the ribbon
4. Click "Show Optimizer" to open the task pane

### First Time Setup

1. **Open Settings**
   - Click the Settings tab in the task pane

2. **Choose AI Provider**
   - Select from: OpenAI, Anthropic, Google, or Ollama
   - Each has different pricing and capabilities

3. **Enter API Key**
   - Get your API key from your provider's website
   - Paste it into the API Key field
   - Keys are stored securely on your computer only

4. **Configure Backend** (if self-hosting)
   - Enter your backend API endpoint
   - Default: http://localhost:5000

## Using the Optimizer

### Method 1: Hotkey (Recommended)

1. Select a cell containing a formula
2. Press **Ctrl+Shift+O**
3. Wait for AI analysis (2-5 seconds)
4. Review the optimized formula
5. Click "Apply" to replace, or "Cancel" to keep original

### Method 2: Ribbon Button

1. Select a cell containing a formula
2. Click "Optimize Formula" in the AI Optimizer ribbon tab
3. Review and apply as above

### Method 3: Task Pane Button

1. Open the task pane (if not already open)
2. Select a cell with a formula
3. Click "Optimize Selected Formula"
4. Review and apply

## Understanding Results

### Optimized Formula
The AI-suggested improvement to your formula. You can edit it before applying.

### Explanation
Why the AI made these changes. Common improvements:
- Using newer/better functions
- Removing redundant calculations
- Simplifying nested logic
- Improving readability

### Improvement Percentage
Estimated improvement (0-100%). Based on:
- Formula length reduction
- Complexity reduction
- Performance gains
- Readability improvement

## Common Use Cases

### Simplifying Nested IFs

**Before:**
```excel
=IF(A1>100,"High",IF(A1>50,"Medium",IF(A1>10,"Low","None")))
```

**After:**
```excel
=IFS(A1>100,"High",A1>50,"Medium",A1>10,"Low",TRUE,"None")
```

### Improving Lookups

**Before:**
```excel
=IFERROR(VLOOKUP(A1,Data!A:B,2,FALSE),"Not Found")
```

**After:**
```excel
=XLOOKUP(A1,Data!A:A,Data!B:B,"Not Found")
```

### Replacing Manual Averages

**Before:**
```excel
=SUM(A1:A10)/COUNT(A1:A10)
```

**After:**
```excel
=AVERAGE(A1:A10)
```

### Combining Conditions

**Before:**
```excel
=IF(AND(A1>10,A1<100),"Valid","Invalid")
```

**After:**
```excel
=IF((A1>10)*(A1<100),"Valid","Invalid")
```
*Note: AI might suggest different approaches based on context*

## Using History

### Viewing Past Optimizations

1. Go to the History tab
2. See your last 50 optimizations
3. Each entry shows:
   - Original formula
   - Optimized formula
   - Date/time

### Reapplying from History

1. Select a cell where you want the formula
2. Find the optimization in history
3. Click "Apply to selected"

### Clearing History

1. Click "Clear" button in History tab
2. Confirm the action

## Settings & Configuration

### AI Providers

**OpenAI (GPT-4)**
- Best for: Complex formula restructuring
- Speed: Fast (2-4 seconds)
- Cost: ~$0.03 per 1K tokens
- Get key: https://platform.openai.com/

**Anthropic (Claude)**
- Best for: Detailed explanations
- Speed: Medium (3-5 seconds)
- Cost: ~$0.015 per 1K tokens
- Get key: https://console.anthropic.com/

**Google (Gemini)**
- Best for: Quick responses
- Speed: Very fast (1-3 seconds)
- Cost: Free tier available
- Get key: https://makersuite.google.com/

**Ollama (Local)**
- Best for: Privacy, no costs
- Speed: Variable (depends on hardware)
- Cost: Free (runs locally)
- Setup: https://ollama.ai/

### Auto-Replace

When enabled:
- Optimized formulas apply automatically
- No confirmation dialog
- Can still use Ctrl+Z to undo

When disabled (default):
- Review each optimization
- Manually click "Apply"
- Safer for learning/testing

## Tips & Best Practices

### Formula Selection
- Works best with formulas that have:
  - Nested functions
  - Multiple conditions
  - Repeated calculations
  - Old-style functions (VLOOKUP, nested IF)

### What to Review
Before applying, check:
- Does it produce the same result?
- Are cell references correct?
- Is it actually simpler?
- Do you understand the new formula?

### When NOT to Optimize
- Formula is already simple (e.g., =A1+B1)
- You don't understand the optimization
- Formula uses custom VBA functions
- Legacy compatibility required

### Cost Management
- Each optimization costs 1 API call
- Default limit: 1000/day
- Use Ollama for unlimited free optimizations
- Cache common patterns in History

## Troubleshooting

### "Selected cell does not contain a formula"
- Make sure the cell starts with =
- Select the cell, not the formula bar
- Check for errors in the original formula

### "API error" or "Failed to optimize"
- Check your API key is correct
- Verify internet connection
- Check API provider status
- Ensure you have credits/quota remaining

### "Too many requests"
- You've hit the rate limit (1000/day)
- Wait 24 hours or upgrade plan
- Use Ollama for unlimited requests

### Optimization doesn't make sense
- AI can make mistakes
- Always review before applying
- You can edit the formula
- Report issues on GitHub

### Add-in not loading
- Restart Excel
- Check manifest.xml is valid
- Clear Office cache
- Reinstall the add-in

## Privacy & Security

### What data is sent?
- Only the formula text
- Your selected AI provider
- Your API key (encrypted in transit)

### What is NOT sent?
- Cell values/data
- Other worksheet content
- Personal information
- File names or metadata

### Where is data stored?
- API keys: Local computer only (browser localStorage)
- History: Local computer only
- Formulas: Not stored on our servers
- Logs: Backend logs IPs only (for rate limiting)

### Can others see my formulas?
- No, formulas go directly to your chosen AI provider
- Review your AI provider's privacy policy
- For maximum privacy, use Ollama (local)

## Keyboard Shortcuts

- **Ctrl+Shift+O**: Optimize selected formula
- **Ctrl+Z**: Undo formula change
- **Alt+F11**: Open VBA editor (not related, but useful)

## Getting Help

- **Documentation**: https://github.com/funkydonkey/blade
- **Issues**: https://github.com/funkydonkey/blade/issues
- **Email**: support@example.com (update this)

## Advanced Features (Coming Soon)

- Batch optimization (multiple cells at once)
- Custom optimization rules
- Formula performance benchmarking
- Team sharing of optimizations
- Excel Online support
