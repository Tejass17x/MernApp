# Render Deployment - Frontend & Backend Connected

## ✅ Setup Complete for Render

Both frontend and backend are deployed on **Render** on the same domain.

- Frontend is served as static files from backend
- Both share the same Render domain
- Socket.io connects automatically to same domain

## 🚀 Steps to Deploy on Render

### 1. Render Environment Variables

Go to **Render Dashboard** → Your Web Service → **Settings** → **Environment** → Add these variables:

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://tejaspatil9028_db_user:OmCjMziVmac4BjDN@cluster0.cpickdt.mongodb.net/?appName=Cluster0
JWT_SECRET=bc2c789a7508878c2660782566f56c14958c989110b6d9720891c2fd84d95e82
```

### 2. Build Command on Render

Make sure your Render service has:
- **Build Command**: 
  ```
  npm install && cd frontend && npm install && npm run build && cd ..
  ```
- **Start Command**: 
  ```
  npm start
  ```

Or update `package.json` in root:
```json
"scripts": {
  "start": "node backend/server.js",
  "build": "cd frontend && npm install && npm run build"
}
```

### 3. Push to GitHub & Deploy

```bash
git add .
git commit -m "Fix frontend-backend connection for Render deployment"
git push origin main
```

Render will automatically redeploy!

## ✨ How It Works

1. **Backend** serves frontend static files from `/frontend/dist`
2. **Socket.io** connects to the same domain automatically
3. **API calls** use relative paths `/api/...` 
4. **Frontend & Backend** are fully connected on same Render domain

## ✅ Verification Checklist

- [ ] `npm run build` completes without errors locally
- [ ] `frontend/dist` folder is created
- [ ] Backend serves frontend (check Render URL loads app)
- [ ] Socket.io shows "connected" in browser DevTools
- [ ] Can send/receive messages in app
- [ ] Online users show up correctly

## 🐛 If Still Not Connected

1. **Check Render logs**: Render Dashboard → Logs
2. **Check browser console**: DevTools → Console
3. **Verify MONGO_URI**: Make sure MongoDB URI is correct
4. **Check Node version**: Render should have Node 16+
