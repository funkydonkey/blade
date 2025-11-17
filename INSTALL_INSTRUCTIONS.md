# How to Install AI Formula Optimizer

Simple installation guide for end users.

## What You'll Need

1. **Excel 2016 or newer** (Windows or Mac), or **Excel Online**
2. **OpenAI API Key** - Get one free at https://platform.openai.com/api-keys
   - Create account → API Keys → Create new secret key
   - Copy and save it somewhere safe

## Installation Steps

### Step 1: Add the Add-in to Excel

1. **Open Microsoft Excel**

2. Go to the **Insert** tab

3. Click **Get Add-ins** (or **Office Add-ins**)

4. Click the **My Add-ins** tab

5. At the bottom, find **"Add a custom add-in"** dropdown

6. Select **"Add from URL..."**

7. Paste this URL:
   ```
   https://funkydonkey.github.io/blade/manifest.xml
   ```

8. Click **OK** and accept the prompt

9. The add-in will install - you should see it in your ribbon!

### Step 2: Configure Your API Key

1. In Excel, you'll see a new **"AI Optimizer"** tab in the ribbon

2. Click **"Show Optimizer"** - a panel opens on the right

3. Click the **Settings** tab in the panel

4. Fill in:
   - **AI Provider**: Select "OpenAI (GPT-4)"
   - **API Key**: Paste your OpenAI API key
   - **Backend API Endpoint**: Should already be set to:
     ```
     https://excel-ai-optimizer-backend.onrender.com
     ```
   - Leave other settings as default

5. Your settings save automatically!

### Step 3: Try It Out!

1. In any Excel cell, type a formula:
   ```
   =SUM(A1:A10)/COUNT(A1:A10)
   ```

2. Click the cell to select it

3. Press **Ctrl+Shift+O** (Windows) or **Cmd+Shift+O** (Mac)

   *Or click "Optimize Selected Formula" button in the panel*

4. Wait 2-5 seconds - the AI will suggest:
   ```
   =AVERAGE(A1:A10)
   ```

5. Review the explanation, then click **Apply**!

## Troubleshooting

### "Load failed" error

**On Mac:**
The backend needs HTTPS. Use ngrok:
```bash
brew install ngrok
ngrok http 5001
```
Then use the ngrok HTTPS URL in Settings.

**Or:** Contact support for a permanent HTTPS backend.

### "API error"

- Check your OpenAI API key is correct
- Make sure you have credits in your OpenAI account
- Try a different formula

### Add-in doesn't appear

1. Close Excel completely
2. Open Excel again
3. Check Insert → My Add-ins → it should be listed
4. If not, try reinstalling from URL

## Need Help?

- **Documentation**: https://github.com/funkydonkey/blade
- **Issues**: https://github.com/funkydonkey/blade/issues
- **Email**: your-email@example.com

## Privacy & Security

- Your API key is stored locally on your computer only
- Formulas are sent to OpenAI for analysis (see their privacy policy)
- No data is stored on our servers
- You can revoke API access anytime at https://platform.openai.com/

## Uninstalling

1. Insert → Get Add-ins → My Add-ins
2. Find "AI Formula Optimizer"
3. Click the three dots → Remove

---

**Enjoy optimizing your formulas with AI!** 🚀
