# Render Deployment — Separate Frontend & Backend

Deploy **two services** from the same GitHub repo:

| Service | Type | URL example |
|---------|------|-------------|
| `mern-chat-backend` | Web Service (Node) | `https://mern-chat-backend.onrender.com` |
| `mern-chat-frontend` | Static Site (React) | `https://mern-chat-frontend.onrender.com` |

---

## Option A: Deploy with Blueprint (recommended)

1. Push this repo to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com) → **New +** → **Blueprint**
3. Connect repo `Tejass17x/MernApp`
4. Render reads `render.yaml` and creates both services
5. When prompted, set these secrets manually:
   - `MONGO_URI`
   - `JWT_SECRET`
6. Wait for both services to deploy (~10–15 min)

`render.yaml` automatically links:
- `VITE_BACKEND_URL` on frontend → backend URL
- `CLIENT_URL` on backend → frontend URL

---

## Option B: Manual setup (two services)

### 1. Deploy backend first

**New +** → **Web Service** → connect repo

| Setting | Value |
|---------|-------|
| Name | `mern-chat-backend` |
| Root Directory | *(empty)* |
| Build Command | `npm install` |
| Start Command | `npm start` |

**Environment variables:**

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `SERVE_FRONTEND` | `false` |
| `MONGO_URI` | `mongodb+srv://USER:PASSWORD@cluster0.cpickdt.mongodb.net/chatapp?retryWrites=true&w=majority` |
| `JWT_SECRET` | long random string (32+ chars) |
| `CLIENT_URL` | *(add after frontend deploys)* `https://mern-chat-frontend.onrender.com` |

After deploy, note backend URL: `https://mern-chat-backend.onrender.com`

Test: open `https://mern-chat-backend.onrender.com/api/health`

---

### 2. Deploy frontend

**New +** → **Static Site** → same repo

| Setting | Value |
|---------|-------|
| Name | `mern-chat-frontend` |
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

**Environment variable (required at build time):**

| Key | Value |
|-----|-------|
| `VITE_BACKEND_URL` | `https://mern-chat-backend.onrender.com` |

Add SPA rewrite rule: **Redirects/Rewrites** → `/*` → `/index.html` (200)

---

### 3. Link backend to frontend

Go back to **mern-chat-backend** → **Environment** → set:

```
CLIENT_URL=https://mern-chat-frontend.onrender.com
```

Save → backend redeploys automatically.

---

## MongoDB Atlas

1. **Network Access** → allow `0.0.0.0/0`
2. Use connection string with database name:

```
mongodb+srv://USER:PASSWORD@cluster0.cpickdt.mongodb.net/chatapp?retryWrites=true&w=majority
```

---

## How frontend connects to backend

```
Frontend (Static)                    Backend (Web Service)
mern-chat-frontend.onrender.com  →  mern-chat-backend.onrender.com
     │                                      │
     ├── fetch(VITE_BACKEND_URL/api/...)    ├── Express API
     └── Socket.io(VITE_BACKEND_URL)       └── Socket.io
```

- API calls use `VITE_BACKEND_URL` (baked in at build time)
- Auth uses `httpOnly` cookies with `SameSite=None; Secure`
- Backend CORS allows only `CLIENT_URL` (your frontend URL)

---

## Local development (separate mode)

**Root `.env`:**
```
PORT=5000
NODE_ENV=development
SERVE_FRONTEND=false
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
```

**`frontend/.env.local`:**
```
VITE_BACKEND_URL=http://localhost:5000
```

Terminal 1: `npm start`  
Terminal 2: `npm run dev --prefix frontend`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| CORS error | Set `CLIENT_URL` on backend to exact frontend URL (with `https://`) |
| Login fails / 401 | Redeploy frontend after setting `VITE_BACKEND_URL`; hard refresh browser |
| Socket not connecting | Check `CLIENT_URL` on backend matches frontend URL |
| Blank page on refresh | Add SPA rewrite `/* → /index.html` on static site |
| Build fails | Check Render logs; ensure env vars are set before build |
