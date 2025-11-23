# Publishing Guide for End Users

This guide explains how to make your Excel Add-in available to end users without requiring them to run npm or perform technical setup.

## Overview

To publish the add-in, you need to:
1. Deploy the frontend (React UI) to a static hosting service
2. Update manifest.xml with production URLs
3. Publish the add-in via Office Store or direct distribution

---

## Step 1: Deploy Frontend to GitHub Pages

### 1.1 Build the Frontend

```bash
# Make sure you're in the project root
npm run build
```

This creates a `dist/` folder with compiled files.

### 1.2 Update manifest.xml for Production

Before deploying, we need to update the manifest with your production URLs.

**Edit `manifest.xml`:**

Find and replace ALL occurrences of `https://localhost:3000` with your GitHub Pages URL:
- If your repo is `https://github.com/funkydonkey/blade`
- Your GitHub Pages URL will be: `https://funkydonkey.github.io/blade`

Replace:
```xml
<SourceLocation DefaultValue="https://localhost:3000/taskpane.html"/>
```

With:
```xml
<SourceLocation DefaultValue="https://funkydonkey.github.io/blade/taskpane.html"/>
```

Do this for ALL URLs in manifest.xml (there are about 5-6 places).

### 1.3 Deploy to GitHub Pages

```bash
# Create gh-pages branch and push dist folder
git subtree push --prefix dist origin gh-pages
```

Or use GitHub Actions (automated):

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 1.4 Enable GitHub Pages

1. Go to GitHub repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** → **/root**
4. Click **Save**
5. Wait 2-3 minutes for deployment

Your add-in UI will be available at: `https://funkydonkey.github.io/blade/`

---

## Step 2: Update Default Backend URL

Update the default backend endpoint in the app to your Render URL:

**Edit `src/taskpane/components/App.tsx`:**

```typescript
const [settings, setSettings] = useState({
  apiKey: '',
  provider: 'openai',
  autoReplace: false,
  hotkey: 'Ctrl+Shift+O',
  apiEndpoint: 'https://blade-ywau.onrender.com' // Your Render URL
});
```

Rebuild and redeploy:
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

---

## Step 3: Publish the Add-in

Now you have three options for distribution:

### Option A: Office Store (AppSource) - Recommended for Public Release

**Pros:**
- Appears in Office Add-ins Store
- Accessible to all Excel users worldwide
- Microsoft handles hosting and updates
- Users can install with one click

**Cons:**
- Requires validation (1-2 weeks)
- Must meet Microsoft certification requirements
- Need a Microsoft Partner account

**Steps:**

1. **Register as Microsoft Partner**
   - Go to: https://partner.microsoft.com/
   - Create account (free)

2. **Prepare for Submission**
   - Update `manifest.xml`:
     - Change `<Id>` to a unique GUID (generate at https://guidgenerator.com/)
     - Add high-quality icons (16x16, 32x32, 80x80, 128x128 PNG)
     - Write detailed description

3. **Create Submission**
   - Go to Partner Center: https://partner.microsoft.com/dashboard
   - **Office Store** → **New Product** → **Office Add-in**
   - Upload manifest.xml
   - Fill in product details:
     - Name: "AI Formula Optimizer"
     - Description: Detailed description of features
     - Screenshots: 5 high-quality screenshots
     - Category: Productivity
     - Support URL
     - Privacy Policy URL

4. **Submit for Validation**
   - Microsoft will test your add-in (1-2 weeks)
   - They check security, functionality, and guidelines compliance
   - Once approved, it appears in Office Store

### Option B: Direct Manifest Distribution - Quick Start

**Pros:**
- No validation required
- Available immediately
- Full control over updates

**Cons:**
- Users must manually load manifest
- Not discoverable in Office Store
- Requires instructions for users

**Steps:**

1. **Host manifest.xml publicly**

Upload `manifest.xml` to a publicly accessible URL:

**Option 1: GitHub Raw URL**
```
https://raw.githubusercontent.com/funkydonkey/blade/main/manifest.xml
```

**Option 2: GitHub Pages**
Copy manifest.xml to dist folder before deploying:
```bash
cp manifest.xml dist/
npm run build
git subtree push --prefix dist origin gh-pages
```

URL will be: `https://funkydonkey.github.io/blade/manifest.xml`

2. **Create Installation Instructions for Users**

Create a simple webpage or README with these steps:

```markdown
# Install AI Formula Optimizer for Excel

## Installation Steps

1. Open Excel
2. Go to **Insert** → **Get Add-ins**
3. Click **My Add-ins** tab
4. At the bottom, click **Add a custom add-in** → **Add from URL**
5. Paste this URL:
   ```
   https://funkydonkey.github.io/blade/manifest.xml
   ```
6. Click **OK**
7. The add-in will appear in your Excel ribbon under "AI Optimizer"

## First Time Setup

1. Click "Show Optimizer" in the ribbon
2. Go to Settings tab
3. Enter your OpenAI API key (get one at https://platform.openai.com/)
4. Backend endpoint should be: https://blade-ywau.onrender.com

That's it! Now you can optimize formulas with Ctrl+Shift+O
```

3. **Share the manifest URL**

Users can load your add-in directly from URL:
```
https://funkydonkey.github.io/blade/manifest.xml
```

### Option C: Centralized Deployment (For Organizations)

If you're deploying within a company/organization:

**Pros:**
- Admin can deploy to all users automatically
- Users don't need to do anything
- Controlled rollout

**Cons:**
- Requires Microsoft 365 admin access
- Only for organizations with M365

**Steps:**

1. **Admin opens Microsoft 365 Admin Center**
   - Go to: https://admin.microsoft.com/

2. **Navigate to Integrated Apps**
   - Settings → **Integrated apps** → **Get apps**

3. **Upload Custom App**
   - Click **Upload custom apps**
   - Upload your `manifest.xml`

4. **Assign to Users**
   - Select which users or groups get the add-in
   - Users will see it automatically in their Excel

---

## Step 4: Update Your Add-in

When you make changes:

1. **Update code and version**
   ```bash
   # Update version in manifest.xml
   <Version>1.0.2.0</Version>
   ```

2. **Rebuild and deploy**
   ```bash
   npm run build
   git subtree push --prefix dist origin gh-pages
   ```

3. **For Office Store:**
   - Submit update in Partner Center
   - Microsoft validates again (faster than initial)

4. **For Direct Distribution:**
   - Users automatically get updates when they restart Excel
   - Or they can remove and re-add the add-in

---

## Recommended Approach

**For a public product:**
1. Start with **Direct Distribution** (Option B) to get quick feedback
2. After testing with real users, submit to **AppSource** (Option A)

**For internal/company use:**
- Use **Centralized Deployment** (Option C)

---

## Next Steps

1. Deploy frontend to GitHub Pages
2. Update manifest.xml with production URLs
3. Test the add-in from the public URL
4. Choose distribution method
5. Create user documentation

Would you like me to help with any of these steps?
