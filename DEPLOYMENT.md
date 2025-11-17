# Deployment Guide

## Backend Deployment to Render.com

### Prerequisites
- Render.com account
- GitHub repository connected to Render

### Option 1: Using render.yaml (Recommended - Easiest)

The repository includes `render.yaml` which automatically configures everything.

1. **Push render.yaml to your repository** (already included)

2. **Create Blueprint on Render**
   - Go to https://render.com/
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

3. **Add Secret Environment Variables**
   In Render dashboard, add:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `ANTHROPIC_API_KEY` - Your Anthropic API key
   - `GOOGLE_API_KEY` - Your Google API key

4. **Click "Apply"** - Render will automatically build and deploy!

### Option 2: Manual Web Service Configuration

1. **Create a new Web Service on Render**
   - Go to https://render.com/
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - **Name**: excel-ai-optimizer-backend
   - **Environment**: Node
   - **Root Directory**: *(leave empty)*

   - **Build Command** (⚠️ COPY CAREFULLY - use Latin "c" not Cyrillic "с"):
   ```
   cd backend && npm install && npm run build
   ```

   - **Start Command**:
   ```
   cd backend && npm start
   ```

   - **Plan**: Free

   ⚠️ **IMPORTANT**: Make sure you copy-paste these commands! If you type manually, ensure your keyboard is in English mode. The error "сd: command not found" means you typed Cyrillic "с" instead of Latin "c".

3. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   OPENAI_API_KEY=your_key_here
   ANTHROPIC_API_KEY=your_key_here
   GOOGLE_API_KEY=your_key_here
   CORS_ORIGIN=*
   ```

   **Note**: Render uses port 10000 by default. Don't change PORT.

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes first time)
   - Note your service URL (e.g., https://excel-ai-optimizer-backend.onrender.com)

5. **Update Frontend Configuration**
   - Update `src/taskpane/components/App.tsx`
   - Change default `apiEndpoint` to your Render service URL

## Frontend Deployment

### Option 1: GitHub Pages (Static Hosting)

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Update manifest.xml**
   - Replace all `https://localhost:3000` URLs with your GitHub Pages URL
   - Example: `https://yourusername.github.io/blade`

3. **Deploy to GitHub Pages**
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

### Option 2: Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Update manifest.xml** with Netlify URL

## Installing the Add-in

### Development/Testing

1. **Load from file system**
   - Open Excel
   - File → Options → Trust Center → Trust Center Settings
   - Trusted Add-in Catalogs → Add folder path
   - Add the manifest.xml location

2. **Sideloading**
   ```bash
   npm run start
   ```

### Production Distribution

#### Option 1: Office Store (AppSource)
- Register as Microsoft Partner
- Submit add-in for validation
- Once approved, users can install from Office Store

#### Option 2: Centralized Deployment (Enterprise)
- Microsoft 365 Admin Center
- Settings → Integrated apps
- Upload manifest.xml
- Deploy to specific users/groups

#### Option 3: Network Share
- Place manifest.xml on network share
- Configure as Trusted Catalog in Excel
- Users can install from Insert → My Add-ins

## Post-Deployment

### Monitoring
- Set up logging with service like Sentry or LogRocket
- Monitor API usage and errors
- Track performance metrics

### Updates
- Backend: Push to main branch (auto-deploys on Render)
- Frontend: Update version in manifest.xml and redeploy

### Security
- Rotate API keys regularly
- Monitor rate limits
- Review access logs

## Troubleshooting

### CORS Errors
- Ensure CORS_ORIGIN includes your frontend domain
- Check Render service logs

### SSL Certificate Issues
- Manifest URLs must use HTTPS
- Verify certificates are valid

### Add-in Not Loading
- Clear Office cache
- Verify manifest URL is accessible
- Check browser console for errors
