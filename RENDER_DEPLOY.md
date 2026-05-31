# Deploy MERN Chat App on Render (Frontend + Backend)

This project uses **one Render Web Service** for both frontend and backend:

- Vite builds the React app into `frontend/dist`
- Express serves the API at `/api/*` and the React app at `/`

## Prerequisites

1. GitHub repo: https://github.com/Tejass17x/MernApp.git
2. [Render](https://render.com) account (free tier works)
3. MongoDB Atlas cluster with network access enabled

---

## Step 1: MongoDB Atlas setup

1. Open [MongoDB Atlas](https://cloud.mongodb.com)
2. Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
3. Go to **Database Access** and confirm your database user exists
4. Copy your connection string and add a database name before the `?`:

```
mongodb+srv://USER:PASSWORD@cluster0.cpickdt.mongodb.net/chatapp?retryWrites=true&w=majority
```

Use your real username/password. Do **not** commit this string to GitHub.

---

## Step 2: Push latest code to GitHub

```bash
git add .
git commit -m "Fix production build and Render deployment"
git push origin main
```

---

## Step 3: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect GitHub and select **MernApp**
4. Use these settings:

| Setting | Value |
|---------|-------|
| **Name** | `mern-chat-app` (or any name) |
| **Region** | Oregon (or nearest) |
| **Branch** | `main` |
| **Root Directory** | *(leave empty)* |
| **Runtime** | Node |
| **Build Command** | `npm install && npm install --prefix frontend && npm run build --prefix frontend` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

---

## Step 4: Add environment variables on Render

In your service → **Environment** → add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | Your full MongoDB connection string (with `/chatapp` database name) |
| `JWT_SECRET` | A long random string (32+ characters) |

Example JWT secret (generate your own):

```
a8f3c91e2b7d4f6a9c1e5b8d2f7a4c6e9b1d3f5a7c9e2b4d6f8a1c3e5b7d9f2
```

Do **not** set `CLIENT_URL` or `VITE_BACKEND_URL` for this single-service setup.

---

## Step 5: Deploy

1. Click **Create Web Service** (or **Manual Deploy** if already created)
2. Wait 10–15 minutes for the first build
3. Open your live URL: `https://mern-chat-app-xxxx.onrender.com`

---

## Step 6: Verify deployment

1. **Health check:** visit `https://YOUR-URL.onrender.com/api/health` → should return `{"status":"ok"}`
2. **Frontend:** open `https://YOUR-URL.onrender.com` → login/signup page loads
3. **Signup/Login:** create an account and log in
4. **Real-time chat:** open two browser windows, log in as different users, send messages

---

## How frontend connects to backend

| Feature | Connection |
|---------|------------|
| Login / Signup / API | Relative paths like `/api/auth/login` → same Render URL |
| Auth cookies | `httpOnly` JWT cookie, `secure` in production |
| Socket.io | Connects to same origin automatically |
| Static files | Served from `frontend/dist` by Express |

---

## Local development

1. Copy `.env.example` to `.env` in the project root
2. Fill in `MONGO_URI` and `JWT_SECRET`
3. Run:

```bash
npm install
npm install --prefix frontend
npm run dev
```

4. In another terminal for frontend hot reload (optional):

```bash
npm run dev --prefix frontend
```

Or build and run production mode locally:

```bash
npm run build --prefix frontend
npm start
```

Visit `http://localhost:5000`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Build fails on Render | Check Logs tab; ensure `frontend/src/utils/api.js` exists |
| `MONGO_URI not set` | Add `MONGO_URI` in Render Environment |
| MongoDB connection error | Allow `0.0.0.0/0` in Atlas Network Access |
| Login works but API returns 401 | Hard refresh; cookies require HTTPS on Render (automatic) |
| App sleeps on free tier | First request after idle takes ~30–60 seconds (Render free tier) |
| Blank page | Build may have failed; check that `frontend/dist` was created in logs |

---

## Optional: separate frontend + backend on Render

Only use this if you want two services:

**Backend Web Service**
- Build: `npm install`
- Start: `npm start`
- Env: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL=https://your-frontend.onrender.com`

**Frontend Static Site**
- Build: `npm install && npm run build`
- Publish directory: `dist`
- Env at build time: `VITE_BACKEND_URL=https://your-backend.onrender.com`

The single-service setup above is simpler and recommended for this project.
