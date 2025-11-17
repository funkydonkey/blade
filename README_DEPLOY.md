# 🚀 Ready to Publish Your Add-in!

Your backend is already deployed on Render. Now let's deploy the frontend and make it available to users!

## Quick Deploy Steps

### 1. Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/funkydonkey/blade
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: **`gh-pages`**
   - Folder: **`/ (root)`**
4. Click **Save**

### 2. Trigger First Deployment

The GitHub Action will automatically deploy when you push to `main`, but you can trigger it manually:

1. Go to **Actions** tab in your GitHub repo
2. Click **"Deploy Frontend to GitHub Pages"** workflow
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 2-3 minutes

Your add-in will be available at:
```
https://funkydonkey.github.io/blade/manifest.xml
```

### 3. Test the Installation

Try installing it yourself:

1. Open Excel
2. **Insert** → **Get Add-ins** → **My Add-ins**
3. **Add from URL...** and paste:
   ```
   https://funkydonkey.github.io/blade/manifest.xml
   ```
4. The add-in should load!

### 4. Share with Users

Share the **[INSTALL_INSTRUCTIONS.md](INSTALL_INSTRUCTIONS.md)** file with your users. It has simple step-by-step instructions.

Or create a simple landing page with the manifest URL.

---

## What's Already Done ✅

- ✅ Backend deployed on Render: `https://blade-ywau.onrender.com`
- ✅ Frontend code ready for GitHub Pages
- ✅ Production manifest.xml configured
- ✅ GitHub Actions workflow set up
- ✅ User installation instructions created

## Next Steps (Optional)

### Option A: Publish to Office Store (AppSource)

For maximum reach, submit to Microsoft's Office Store. See **[docs/PUBLISHING.md](docs/PUBLISHING.md)** for detailed steps.

**Benefits:**
- Appears in Excel Add-ins Store
- Discoverable by millions of Excel users
- Microsoft handles hosting

**Timeline:** 1-2 weeks for validation

### Option B: Keep Direct Distribution

Stay with the direct manifest URL approach:

**Benefits:**
- No validation needed
- Available immediately
- Full control

**Share this URL with users:**
```
https://funkydonkey.github.io/blade/manifest.xml
```

---

## Troubleshooting

### GitHub Pages not working?

1. Check **Settings** → **Pages** is enabled
2. Make sure `gh-pages` branch exists (created by GitHub Action)
3. Wait 2-3 minutes after deployment
4. Check https://funkydonkey.github.io/blade/taskpane.html loads

### Add-in not loading?

1. Check all URLs in `manifest-production.xml` are correct
2. Verify GitHub Pages is live
3. Try clearing Excel cache and reinstalling

### Need Help?

See full documentation:
- [Publishing Guide](docs/PUBLISHING.md)
- [User Install Instructions](INSTALL_INSTRUCTIONS.md)

---

**You're all set!** 🎉

Users can now install your add-in without any technical knowledge - just a URL!
