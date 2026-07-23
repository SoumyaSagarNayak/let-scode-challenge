# 🚀 Deployment Guide - Vercel Serverless (100% Free Full-Stack)

This application is fully optimized to deploy as a **single unified full-stack application on Vercel** using **Vercel Serverless Functions** for the backend API and **Vercel Edge CDN** for the React frontend.

---

## ⚡ Why Vercel Serverless?

- **100% Free Tier**: No credit card required.
- **Zero Cold Delay**: Faster response times than Render free tier spin-downs.
- **Unified Deployment**: Frontend (`frontend/dist`) and Backend Express API (`api/index.js`) deployed simultaneously from 1 GitHub repository.

---

## 🛠️ Step-by-Step Vercel Deployment

### Step 1: Push Project to GitHub
Ensure all repository files (`frontend/`, `backend/`, `api/index.js`, `vercel.json`) are committed to your GitHub repository.

### Step 2: Import Project in Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Select and import your GitHub repository.
4. Vercel will automatically read `vercel.json`:
   - **Framework Preset**: `Vite` (or `Other`)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`

### Step 3: Add Environment Variables (Optional)
Under **Environment Variables**:
- `OPENAI_API_KEY`: *(Optional)* Your OpenAI API key for live AI summaries. If omitted, the intelligent built-in mock AI engine generates rich contextual summaries.

### Step 4: Click Deploy!
Vercel will compile the React frontend bundle and deploy `/api/*` routes as Vercel Serverless Functions automatically.

---

## 🔍 Verification

Once deployed:
- Visit `https://<your-app>.vercel.app/` -> Renders React UI
- Visit `https://<your-app>.vercel.app/api/dashboard` -> Returns JSON API response from Vercel Serverless Function
- Visit `https://<your-app>.vercel.app/api/compare?country=USA` -> Returns country comparison JSON
