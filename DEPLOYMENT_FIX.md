# Frontend & Backend Connection Fix Guide

## Current Deployment Setup
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render

## ✅ Issues Fixed

1. ✅ Removed space from Socket.io connection URL in `SocketContext.jsx`
2. ✅ Updated backend CORS to accept production frontend URL
3. ✅ Added `CLIENT_URL` environment variable support
4. ✅ Created environment configuration files

## 🚀 Deployment Instructions

### Step 1: Update Backend Environment Variables on Render

Go to your Render dashboard and set these environment variables:

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://tejaspatil9028_db_user:OmCjMziVmac4BjDN@cluster0.cpickdt.mongodb.net/?appName=Cluster0
JWT_SECRET=bc2c789a7508878c2660782566f56c14958c989110b6d9720891c2fd84d95e82
CLIENT_URL=https://YOUR-VERCEL-FRONTEND-URL.vercel.app
```

Replace `YOUR-VERCEL-FRONTEND-URL` with your actual Vercel app URL.

### Step 2: Update Frontend Environment on Vercel

Create or update a `.env.production` file in Vercel's environment variables:

```
VITE_BACKEND_URL=https://YOUR-RENDER-BACKEND-URL.onrender.com
```

Replace `YOUR-RENDER-BACKEND-URL` with your actual Render service name.

Or use Vercel's dashboard:
1. Go to Settings → Environment Variables
2. Add new variable: `VITE_BACKEND_URL`
3. Set value to: `https://your-render-service.onrender.com`

### Step 3: Deploy Changes to Git

```bash
git add .
git commit -m "Fix frontend-backend connection for production deployment"
git push origin main
```

## 🔍 How It Works

### Frontend (Vercel)
- Reads `VITE_BACKEND_URL` from environment
- Uses this URL to connect to Socket.io
- Falls back to `https://mernapp-xgyc.onrender.com` if not set

### Backend (Render)
- Reads `CLIENT_URL` from environment
- Accepts CORS requests only from the frontend URL
- In production, ignores localhost URLs

### Local Development
- Frontend `.env.local`: `VITE_BACKEND_URL=http://localhost:5000`
- Backend `.env`: `CLIENT_URL=http://localhost:3000`

## 🐛 Testing Connection

1. **Check Socket.io connection**: Open browser DevTools → Network tab → WS (WebSocket)
2. **Check CORS**: If you see CORS errors, verify `CLIENT_URL` is set correctly on Render
3. **Check API calls**: API calls use relative paths, so they work automatically on same domain

## 📝 Key Changes Made

- `frontend/src/context/SocketContext.jsx`: Removed space from URL
- `backend/socket/socket.js`: Updated CORS to use environment-based URLs
- `backend/.env`: Added `CLIENT_URL` for local development
- Created `.env.example` files for reference

## ⚠️ Important Notes

- **Do NOT commit `.env` files** - they contain secrets
- Add `.env` to `.gitignore` if not already present
- Always use `.env.local` for local development
- Use dashboard environment variables for production
