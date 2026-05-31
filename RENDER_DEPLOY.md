# Fix "Failed to fetch" on Login (Separate Render Deploy)

This error means the **frontend cannot reach the backend**. Fix both services below.

---

## Step 1 — Get your exact URLs

From Render dashboard, copy the full URLs (with `https://`):

- **Backend:** `https://mern-chat-backend.onrender.com` (your actual name)
- **Frontend:** `https://mern-chat-frontend.onrender.com` (your actual name)

Open backend health check in browser:

```
https://YOUR-BACKEND-URL.onrender.com/api/health
```

Must return: `{"status":"ok","clientUrl":"...","allowedOrigins":[...]}`

If this fails → fix backend first (MONGO_URI, JWT_SECRET, backend logs).

---

## Step 2 — Backend environment variables

Go to **mern-chat-backend** → **Environment**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `SERVE_FRONTEND` | `false` |
| `MONGO_URI` | your MongoDB connection string |
| `JWT_SECRET` | long random secret |
| `CLIENT_URL` | **`https://YOUR-FRONTEND-URL.onrender.com`** ← exact frontend URL |

Save → backend redeploys.

**Important:** `CLIENT_URL` must match your frontend URL exactly (no trailing slash).

---

## Step 3 — Frontend environment variable (most common fix)

Go to **mern-chat-frontend** → **Environment**:

| Key | Value |
|-----|-------|
| `VITE_BACKEND_URL` | **`https://YOUR-BACKEND-URL.onrender.com`** ← exact backend URL |

---

## Step 4 — Redeploy frontend (required)

`VITE_BACKEND_URL` is baked in at **build time**. After setting it:

1. Go to **mern-chat-frontend** → **Manual Deploy**
2. Click **Clear build cache & deploy**

Wait for build to finish.

---

## Step 5 — Test login

1. Open frontend URL
2. Try login
3. If it still fails, open browser **DevTools → Network** tab
4. Click the failed `login` request and check:
   - **Request URL** should be `https://YOUR-BACKEND.onrender.com/api/auth/login`
   - If URL is `https://YOUR-FRONTEND.onrender.com/api/...` → `VITE_BACKEND_URL` was not set; redo Step 3 & 4

---

## Quick checklist

- [ ] Backend `/api/health` works in browser
- [ ] `CLIENT_URL` on backend = frontend URL
- [ ] `VITE_BACKEND_URL` on frontend = backend URL
- [ ] Frontend redeployed **after** setting `VITE_BACKEND_URL`
- [ ] MongoDB Atlas allows `0.0.0.0/0` in Network Access
- [ ] Both URLs use `https://` (not `http://`)

---

## Example (replace with your real URLs)

**Backend env:**
```
CLIENT_URL=https://mern-chat-frontend.onrender.com
SERVE_FRONTEND=false
MONGO_URI=mongodb+srv://user:pass@cluster0.cpickdt.mongodb.net/chatapp?retryWrites=true&w=majority
JWT_SECRET=your_secret_here
NODE_ENV=production
PORT=5000
```

**Frontend env:**
```
VITE_BACKEND_URL=https://mern-chat-backend.onrender.com
```

Then **Clear build cache & deploy** frontend.
