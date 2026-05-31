# Render Deployment Guide - MERN Chat App

## 📋 Prerequisites

Before deploying, make sure you have:

1. **GitHub Account** - Project pushed to https://github.com/Tejass17x/MernApp
2. **Render Account** - Free account at https://render.com
3. **MongoDB Atlas** - Cluster created with connection string ready
4. **Environment Variables** - Ready to add on Render

---

## 🚀 Step 1: Push Code to GitHub

Run this command in your project directory:

```bash
cd c:\Users\tejas\Desktop\mern\mernChatApplication
git add .
git commit -m "Final deployment setup for Render"
git push origin main
```

---

## 🔧 Step 2: Deploy on Render

### 2.1 Create a New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy existing repository"**
4. Search for **"MernApp"** repository
5. Click **"Connect"**

### 2.2 Configure the Service

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `mern-chat-app` |
| **Environment** | `Node` |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |
| **Build Command** | `npm install && npm install --prefix frontend && npm run build --prefix frontend` |
| **Start Command** | `npm start` |

### 2.3 Add Environment Variables

Click **"Add Environment Variable"** for each:

```
NODE_ENV = production
PORT = 5000
MONGO_URI = mongodb+srv://tejaspatil9028_db_user:OmCjMziVmac4BjDN@cluster0.cpickdt.mongodb.net/?appName=Cluster0
JWT_SECRET = bc2c789a7508878c2660782566f56c14958c989110b6d9720891c2fd84d95e82
```

### 2.4 Set Billing Plan

- Select **"Free"** plan (or upgrade if needed)
- Click **"Create Web Service"**

---

## ⏳ Step 3: Wait for Deployment

The deployment will start automatically. You should see:

```
Building...
► npm install
► npm install --prefix frontend
► npm run build --prefix frontend
► Deployment successful! Your app is live at: https://mern-chat-app-xxxx.onrender.com
```

**Check Logs:**
1. Go to your service
2. Click **"Logs"** tab
3. Look for `Server Running on port 5000` message

---

## ✅ Step 4: Test Your App

1. Visit your Render URL: `https://mern-chat-app-xxxx.onrender.com`
2. You should see the login page
3. Try signing up with a new account
4. Try logging in
5. Try sending messages

---

## 🔄 Redeploying After Code Changes

When you make code changes:

```bash
git add .
git commit -m "Your changes here"
git push origin main
```

Render automatically redeploys when you push to main branch.

**Manual Redeploy:**
- Go to service → **"Deploy"** button → **"Manual Deploy"** → **"Latest Commit"**

---

## 🐛 Troubleshooting

### Issue: "Unexpected end of JSON"
**Solution:** Check Render logs for MongoDB connection errors

### Issue: "Cannot GET /"
**Solution:** 
1. Wait 2-3 minutes for build to complete
2. Check if frontend/dist folder was created in logs
3. Clear build cache and redeploy

### Issue: Login not working
**Solution:**
1. Check MONGO_URI is correct in Render Environment Variables
2. Check MongoDB Atlas allows connections from Render
3. Check browser console for errors

### Issue: 404 on /api endpoints
**Solution:** Restart the service (click "Restart" in top menu)

---

## 📊 Your Service URL

Your app will be live at:
```
https://mern-chat-app-xxxx.onrender.com
```

Replace `xxxx` with your actual service ID (shown in Render dashboard)

---

## 🎯 Final Checklist

- [ ] Code pushed to GitHub main branch
- [ ] Render service created with correct build command
- [ ] All 4 environment variables set on Render
- [ ] Build completed successfully (check logs)
- [ ] App loads at Render URL
- [ ] Can sign up successfully
- [ ] Can log in successfully
- [ ] Can send and receive messages
- [ ] Online users show correctly
- [ ] Socket.io connected in DevTools

---

## 💡 Keep Your App Running

Render free tier services spin down after 15 minutes of inactivity. To keep it running:

1. Visit your app URL every 15 minutes
2. OR upgrade to a paid plan
3. OR use a uptime monitor service

---

## 📞 Support

If you encounter issues:
1. Check Render Logs (Dashboard → Service → Logs)
2. Check browser DevTools Console (F12)
3. Verify all environment variables are set
4. Verify MongoDB connection string is correct
