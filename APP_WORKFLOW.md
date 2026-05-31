# MERN Chat App — Complete Workflow Guide

This document explains **everything** about your chat application — from project setup to deployment and how each feature works internally.

**GitHub Repo:** https://github.com/Tejass17x/MernApp.git

**Live URLs (Render):**
- Frontend: `https://mern-chat-frontend-isum.onrender.com`
- Backend:  `https://mern-chat-backend-xzqr.onrender.com`

---

## Table of Contents

1. [What This App Does](#1-what-this-app-does)
2. [Tech Stack](#2-tech-stack)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Prerequisites (Before You Start)](#4-prerequisites-before-you-start)
5. [Local Setup — Step by Step](#5-local-setup--step-by-step)
6. [Environment Variables Explained](#6-environment-variables-explained)
7. [How the App Starts (Boot Flow)](#7-how-the-app-starts-boot-flow)
8. [User Journey — Screen by Screen](#8-user-journey--screen-by-screen)
9. [Authentication Flow (Signup / Login / Logout)](#9-authentication-flow-signup--login--logout)
10. [Chat & Messaging Flow](#10-chat--messaging-flow)
11. [Real-Time Features (Socket.io)](#11-real-time-features-socketio)
12. [Database Models (MongoDB)](#12-database-models-mongodb)
13. [API Endpoints Reference](#13-api-endpoints-reference)
14. [Frontend Architecture](#14-frontend-architecture)
15. [Backend Architecture](#15-backend-architecture)
16. [Render Deployment — Full Guide](#16-render-deployment--full-guide)
17. [How Frontend Connects to Backend on Render](#17-how-frontend-connects-to-backend-on-render)
18. [Testing Checklist](#18-testing-checklist)
19. [Common Errors & Fixes](#19-common-errors--fixes)
20. [Quick Command Reference](#20-quick-command-reference)

---

## 1. What This App Does

This is a **real-time chat application** where:

- Users can **sign up** with name, username, password, and gender
- Users can **log in** and **log out**
- After login, users see a **list of all other users** in the sidebar
- Users can **click a person** to open a chat
- Users can **send and receive messages** in real time
- Users can see who is **online** (green dot on avatar)
- New messages play a **notification sound**

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, DaisyUI |
| Routing | React Router DOM |
| State | React Context + Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas cloud) |
| ODM | Mongoose |
| Auth | JWT stored in HTTP-only cookies |
| Real-time | Socket.io |
| Password | bcryptjs (hashed before saving) |
| Hosting | Render (separate frontend + backend) |

---

## 3. Project Folder Structure

```
mernChatApplication/
│
├── backend/                    # Server-side code
│   ├── config/
│   │   ├── env.js              # Reads & normalizes env variables
│   │   └── cors.js             # CORS settings for cross-origin requests
│   ├── controllers/
│   │   ├── auth.controller.js  # Signup, login, logout logic
│   │   ├── message.controller.js # Send & get messages
│   │   └── user.controller.js  # Get users list for sidebar
│   ├── db/
│   │   └── connectToMongoDB.js # MongoDB connection
│   ├── middleware/
│   │   └── protectRoute.js     # JWT cookie verification
│   ├── models/
│   │   ├── user.model.js       # User schema
│   │   ├── message.model.js    # Message schema
│   │   └── conversation.model.js # Conversation schema
│   ├── routes/
│   │   ├── auth.routes.js      # /api/auth/*
│   │   ├── message.routes.js   # /api/messages/*
│   │   └── user.routes.js      # /api/users/*
│   ├── socket/
│   │   └── socket.js           # Socket.io server & online users
│   ├── utils/
│   │   └── generateToken.js    # JWT creation + cookie setting
│   └── server.js               # Main Express server entry point
│
├── frontend/                   # Client-side code
│   ├── public/
│   │   └── _redirects          # SPA routing for Render static site
│   ├── src/
│   │   ├── components/
│   │   │   ├── messages/       # Chat UI (messages, input, container)
│   │   │   ├── sidebar/        # User list, search, logout
│   │   │   └── skeletons/      # Loading placeholders
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # Logged-in user state
│   │   │   └── SocketContext.jsx # Socket.io connection
│   │   ├── hooks/              # API calls (login, signup, messages...)
│   │   ├── pages/
│   │   │   ├── home/           # Main chat page
│   │   │   ├── login/          # Login page
│   │   │   └── signup/         # Signup page
│   │   ├── utils/
│   │   │   └── api.js          # apiFetch helper + backend URL
│   │   ├── zustand/
│   │   │   └── useConversation.js # Selected chat + messages state
│   │   ├── App.jsx             # Routes
│   │   └── main.jsx            # React entry point
│   ├── package.json
│   └── vite.config.js
│
├── package.json                # Root scripts (start, dev, build)
├── render.yaml                 # Render Blueprint (both services)
├── .env.example                # Backend env template
└── RENDER_DEPLOY.md            # Deployment troubleshooting
```

---

## 4. Prerequisites (Before You Start)

Install these on your computer:

| Tool | Purpose | Download |
|------|---------|----------|
| **Node.js** (v18+) | Run JavaScript server & build tools | https://nodejs.org |
| **Git** | Clone and push code | https://git-scm.com |
| **MongoDB Atlas account** | Cloud database (free) | https://cloud.mongodb.com |
| **Render account** | Hosting (free tier) | https://render.com |
| **Code editor** | VS Code / Cursor | — |

Verify installation:
```bash
node -v
npm -v
git -v
```

---

## 5. Local Setup — Step by Step

### Step 1 — Clone the repository

```bash
git clone https://github.com/Tejass17x/MernApp.git
cd MernApp
```

### Step 2 — Install dependencies

```bash
# Install backend (root) dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### Step 3 — Create backend `.env` file

Copy the example file:
```bash
copy .env.example .env
```

Edit `.env` in the project root:

```env
PORT=5000
NODE_ENV=development
SERVE_FRONTEND=false
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.cpickdt.mongodb.net/chatapp?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_at_least_32_characters
CLIENT_URL=http://localhost:3000
```

### Step 4 — Create frontend `.env.local` file

Create `frontend/.env.local`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Step 5 — MongoDB Atlas setup

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (if not already created)
3. Go to **Database Access** → create a database user
4. Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Go to **Database** → **Connect** → copy connection string
6. Replace `<password>` with your password and add `/chatapp` before `?`:

```
mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
```

### Step 6 — Run locally (two terminals)

**Terminal 1 — Backend:**
```bash
npm start
```
You should see:
```
Connected to MongoDB
Server running on port 5000
CORS enabled for: http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
npm run dev --prefix frontend
```
Open: `http://localhost:3000`

### Step 7 — Test locally

1. Go to `http://localhost:3000/signup` → create an account
2. You are redirected to the home chat page
3. Open a second browser (or incognito) → sign up as another user
4. Send messages between the two users

---

## 6. Environment Variables Explained

### Backend variables (root `.env` or Render backend service)

| Variable | Required | Example | What it does |
|----------|----------|---------|--------------|
| `PORT` | Yes | `5000` | Port the server listens on |
| `NODE_ENV` | Yes | `production` | Enables production cookie settings |
| `MONGO_URI` | Yes | `mongodb+srv://...` | MongoDB connection string |
| `JWT_SECRET` | Yes | random 32+ char string | Signs authentication tokens |
| `SERVE_FRONTEND` | Yes | `false` | `false` = API only; `true` = also serve React build |
| `CLIENT_URL` | Yes (separate deploy) | `https://mern-chat-frontend-isum.onrender.com` | Frontend URL for CORS & cookies |

### Frontend variables (`frontend/.env.local` or Render frontend service)

| Variable | Required | Example | What it does |
|----------|----------|---------|--------------|
| `VITE_BACKEND_URL` | Yes (separate deploy) | `https://mern-chat-backend-xzqr.onrender.com` | Backend URL for API & Socket.io |

> **Important:** `VITE_BACKEND_URL` is embedded at **build time**. After changing it on Render, you must **Clear build cache & redeploy** the frontend.

---

## 7. How the App Starts (Boot Flow)

### Backend startup (`npm start` → `backend/server.js`)

```
1. Load environment variables (.env / Render env)
2. Configure CORS (allow CLIENT_URL origin)
3. Connect to MongoDB Atlas
4. Start Express server on PORT
5. Attach Socket.io to the same HTTP server
6. Register API routes:
   - /api/auth
   - /api/messages
   - /api/users
   - /api/health (health check)
```

### Frontend startup (`npm run dev` or built static files)

```
1. React loads in browser
2. AuthContext reads user from localStorage ("chat-user")
3. SocketContext connects to backend if user is logged in
4. React Router shows the correct page:
   - Not logged in → /login or /signup
   - Logged in     → / (Home chat page)
```

---

## 8. User Journey — Screen by Screen

```
┌─────────────────────────────────────────────────────────────┐
│                     USER OPENS APP                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │  Logged in? (localStorage) │
              └────────────┬────────────┘
                    No     │     Yes
              ┌────────────┴────────────┐
              ▼                         ▼
        /login page               / home page
              │                         │
    ┌─────────┴─────────┐     ┌────────┴────────┐
    │                   │     │                 │
 /signup            Login form   Sidebar    Message area
    │                   │     (user list)  (chat window)
    │                   │         │              │
    └───── Register ────┘    Click user    Send message
              │                   │              │
              └──── Login ────────┴──────────────┘
                           │
                    Home chat page
```

### Page details

| Route | Page | Who can access |
|-------|------|----------------|
| `/login` | Login form | Not logged in |
| `/signup` | Registration form | Not logged in |
| `/` | Chat home (sidebar + messages) | Logged in only |

---

## 9. Authentication Flow (Signup / Login / Logout)

### Signup flow

```
User fills form → useSignup hook → POST /api/auth/signup
                                        │
                              Backend validates input
                              Hashes password (bcrypt)
                              Creates user in MongoDB
                              Generates JWT token
                              Sets httpOnly cookie "jwt"
                              Returns user data (no password)
                                        │
                              Frontend saves user in localStorage
                              Sets authUser in AuthContext
                              Redirects to home page
                              Socket.io connects automatically
```

**Signup form fields:**
- Full Name
- Username (must be unique)
- Password (min 6 characters)
- Confirm Password (must match)
- Gender (male / female) → auto profile picture assigned

### Login flow

```
User enters username + password → useLogin hook → POST /api/auth/login
                                                        │
                                              Backend finds user by username
                                              Compares password (bcrypt)
                                              Generates JWT + cookie
                                              Returns user data
                                                        │
                                              Frontend saves to localStorage
                                              Redirects to home
```

### Logout flow

```
User clicks Logout → useLogout hook → POST /api/auth/logout
                                              │
                                    Backend clears jwt cookie
                                              │
                                    Frontend removes localStorage
                                    Clears authUser
                                    Socket.io disconnects
                                    Redirects to /login
```

### How JWT protection works

Every protected API route uses `protectRoute` middleware:

```
1. Read "jwt" cookie from request
2. Verify token with JWT_SECRET
3. Find user in MongoDB
4. Attach user to req.user
5. Allow request to continue

If no cookie or invalid token → 401 Unauthorized
```

---

## 10. Chat & Messaging Flow

### Step 1 — Load user list (sidebar)

```
Home page loads → useGetConversations hook → GET /api/users
                                                    │
                                          Returns all users except logged-in user
                                          Shows in sidebar with online status
```

### Step 2 — Select a user to chat

```
User clicks a name in sidebar
        │
Zustand store saves selectedConversation
        │
useGetMessages hook runs → GET /api/messages/:userId
        │
Backend finds Conversation between two users
        │
Returns all messages (or empty array if new chat)
        │
Messages displayed in chat window
```

### Step 3 — Send a message

```
User types message → clicks Send → useSendMessage hook
        │
POST /api/messages/send/:receiverId  { message: "Hello" }
        │
Backend:
  1. Find or create Conversation
  2. Save Message to MongoDB
  3. Link message to conversation
  4. If receiver is online → emit "newMessage" via Socket.io
  5. Return saved message to sender
        │
Sender sees message immediately in chat
Receiver gets real-time message + notification sound
```

---

## 11. Real-Time Features (Socket.io)

### Connection

When user logs in, `SocketContext.jsx` connects:

```
io(VITE_BACKEND_URL, {
  query: { userId: authUser._id },
  withCredentials: true
})
```

### Online users

```
User connects    → backend stores { userId: socketId } in memory
                 → broadcasts "getOnlineUsers" to all clients

User disconnects → removes from map
                 → broadcasts updated list

Frontend         → Conversation component shows green dot if user._id in onlineUsers
```

### New message notification

```
Sender POSTs message → backend saves to DB
                     → io.to(receiverSocketId).emit("newMessage", message)

Receiver's useListenMessages hook hears "newMessage"
                     → adds message to chat
                     → plays notification.mp3 sound
                     → shows shake animation on message bubble
```

---

## 12. Database Models (MongoDB)

Database name: `chatapp`

### User collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique user ID |
| `fullName` | String | Display name |
| `username` | String | Unique login name |
| `password` | String | Hashed (never returned to frontend) |
| `gender` | String | `"male"` or `"female"` |
| `profilePic` | String | Auto-generated avatar URL |
| `createdAt` | Date | Account creation time |

### Message collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique message ID |
| `senderId` | ObjectId | Who sent it |
| `receiverId` | ObjectId | Who receives it |
| `message` | String | Message text |
| `createdAt` | Date | When sent |

### Conversation collection

| Field | Type | Description |
|-------|------|-------------|
| `_id` | ObjectId | Unique conversation ID |
| `participants` | [ObjectId] | Two user IDs |
| `messages` | [ObjectId] | References to Message documents |
| `createdAt` | Date | When conversation started |

**Relationship:**
```
User A ←── Conversation ──→ User B
              │
         [Message, Message, Message...]
```

---

## 13. API Endpoints Reference

Base URL (local): `http://localhost:5000`  
Base URL (Render): `https://mern-chat-backend-xzqr.onrender.com`

### Auth routes — `/api/auth`

| Method | Endpoint | Auth required | Body | Response |
|--------|----------|---------------|------|----------|
| POST | `/signup` | No | `{ fullName, username, password, confirmPassword, gender }` | User object |
| POST | `/login` | No | `{ username, password }` | User object |
| POST | `/logout` | No | — | `{ message: "Logged out successfully" }` |

### User routes — `/api/users`

| Method | Endpoint | Auth required | Response |
|--------|----------|---------------|----------|
| GET | `/` | Yes (cookie) | Array of all other users |

### Message routes — `/api/messages`

| Method | Endpoint | Auth required | Body | Response |
|--------|----------|---------------|------|----------|
| GET | `/:userId` | Yes | — | Array of messages |
| POST | `/send/:userId` | Yes | `{ message }` | Saved message object |

### Health check

| Method | Endpoint | Auth required | Response |
|--------|----------|---------------|----------|
| GET | `/api/health` | No | `{ status: "ok", clientUrl, allowedOrigins }` |

---

## 14. Frontend Architecture

### Context providers (wrap entire app)

```
BrowserRouter
  └── AuthContextProvider     ← stores logged-in user
        └── SocketContextProvider  ← manages Socket.io connection
              └── App (routes)
```

### Custom hooks (API logic)

| Hook | Purpose |
|------|---------|
| `useSignup` | Register new user |
| `useLogin` | Authenticate user |
| `useLogout` | Clear session |
| `useGetConversations` | Fetch user list for sidebar |
| `useGetMessages` | Fetch messages for selected chat |
| `useSendMessage` | Send a new message |
| `useListenMessages` | Listen for real-time incoming messages |

### State management

| Store | Tool | Stores |
|-------|------|--------|
| Auth user | React Context + localStorage | Current logged-in user |
| Selected chat + messages | Zustand (`useConversation`) | Active conversation & message list |
| Online users | Socket Context | Array of online user IDs |

### API helper (`frontend/src/utils/api.js`)

All API calls go through `apiFetch()`:
- Prepends `VITE_BACKEND_URL` to every request
- Sends cookies with `credentials: "include"`
- Handles errors with clear messages

---

## 15. Backend Architecture

### Request flow

```
Browser request
      │
      ▼
CORS middleware (checks CLIENT_URL origin)
      │
      ▼
Express JSON parser + Cookie parser
      │
      ▼
Route handler (/api/auth, /api/messages, /api/users)
      │
      ▼
protectRoute middleware (if protected route)
      │
      ▼
Controller (business logic)
      │
      ▼
MongoDB (Mongoose)
      │
      ▼
JSON response + Set-Cookie (if auth)
```

### Cookie settings (production, separate deploy)

```
httpOnly: true       → JavaScript cannot read cookie (XSS protection)
secure: true         → HTTPS only
sameSite: "none"     → Allows cross-origin (frontend ≠ backend domain)
maxAge: 15 days      → Token expires after 15 days
```

---

## 16. Render Deployment — Full Guide

Your app uses **two separate Render services** from one GitHub repo.

### Overview

| | Backend | Frontend |
|--|---------|----------|
| **Type** | Web Service | Static Site |
| **Name** | `mern-chat-backend-xzqr` | `mern-chat-frontend-isum` |
| **URL** | `https://mern-chat-backend-xzqr.onrender.com` | `https://mern-chat-frontend-isum.onrender.com` |

---

### PART A — Deploy Backend

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect GitHub → select **MernApp** repo
4. Fill in settings:

| Setting | Value |
|---------|-------|
| Name | `mern-chat-backend` |
| Region | Oregon |
| Branch | `main` |
| Root Directory | *(leave empty)* |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

5. Add **Environment Variables**:

```
NODE_ENV=production
PORT=5000
SERVE_FRONTEND=false
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster0.cpickdt.mongodb.net/chatapp?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret_here
CLIENT_URL=https://mern-chat-frontend-isum.onrender.com
```

6. Click **Create Web Service**
7. Wait for deploy (~5–10 min)
8. Test: open `https://mern-chat-backend-xzqr.onrender.com/api/health`

---

### PART B — Deploy Frontend

1. Click **New +** → **Static Site**
2. Connect same **MernApp** repo
3. Fill in settings:

| Setting | Value |
|---------|-------|
| Name | `mern-chat-frontend` |
| Branch | `main` |
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

4. Add **Environment Variable**:

```
VITE_BACKEND_URL=https://mern-chat-backend-xzqr.onrender.com
```

5. Add **Redirect/Rewrite Rule** (for React Router):

| Source | Destination | Action |
|--------|-------------|--------|
| `/*` | `/index.html` | Rewrite (200) |

6. Click **Create Static Site**
7. Wait for build (~5–10 min)
8. Open: `https://mern-chat-frontend-isum.onrender.com`

---

### PART C — Link Both Services

After both are live:

1. Copy your **exact frontend URL** from Render dashboard
2. Go to **backend** → **Environment** → set/update:
   ```
   CLIENT_URL=https://mern-chat-frontend-isum.onrender.com
   ```
3. Save → backend redeploys
4. Go to **frontend** → **Manual Deploy** → **Clear build cache & deploy**

---

### Deploy order summary

```
Step 1: Deploy BACKEND first
Step 2: Test /api/health
Step 3: Deploy FRONTEND with VITE_BACKEND_URL
Step 4: Set CLIENT_URL on backend = frontend URL
Step 5: Redeploy frontend (clear cache)
Step 6: Test signup/login/chat
```

---

## 17. How Frontend Connects to Backend on Render

```
┌──────────────────────────────────────────────────────────────────┐
│  Browser opens: https://mern-chat-frontend-isum.onrender.com     │
└───────────────────────────────┬──────────────────────────────────┘
                                │
          ┌─────────────────────▼─────────────────────┐
          │  React app (static files from Render)      │
          │  VITE_BACKEND_URL baked in at build time  │
          └─────────────────────┬─────────────────────┘
                                │
         API calls              │         Socket.io
         ────────────────────── │ ──────────────────────
                                │
          ┌─────────────────────▼─────────────────────┐
          │  https://mern-chat-backend-xzqr.onrender.com │
          │                                              │
          │  CORS checks: Origin = CLIENT_URL ✓          │
          │  Cookie: SameSite=None; Secure ✓             │
          │                                              │
          │  /api/auth/*     → Auth controllers          │
          │  /api/messages/* → Message controllers       │
          │  /api/users/*    → User controllers          │
          │  Socket.io       → Real-time events          │
          └─────────────────────┬─────────────────────┘
                                │
          ┌─────────────────────▼─────────────────────┐
          │  MongoDB Atlas (chatapp database)            │
          └─────────────────────────────────────────────┘
```

---

## 18. Testing Checklist

### Local testing

- [ ] Backend starts: `Connected to MongoDB` + `Server running on port 5000`
- [ ] Frontend opens at `http://localhost:3000`
- [ ] Signup works
- [ ] Login works
- [ ] User list appears in sidebar
- [ ] Can select a user and see chat window
- [ ] Messages send and appear
- [ ] Real-time messages work (two browser windows)
- [ ] Online green dot shows for connected users
- [ ] Logout works and redirects to login

### Render testing

- [ ] `https://mern-chat-backend-xzqr.onrender.com/api/health` returns JSON
- [ ] Frontend URL loads login page
- [ ] Signup creates account
- [ ] Login works (no "Cannot reach backend" error)
- [ ] Messages send between two users
- [ ] Real-time chat works
- [ ] Logout works

---

## 19. Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot reach backend at ...` | Wrong `VITE_BACKEND_URL` or backend sleeping | Set correct URL; wait 60s for free tier wake-up; redeploy frontend |
| CORS error in browser console | `CLIENT_URL` wrong or missing on backend | Set `CLIENT_URL` to exact frontend URL; redeploy backend |
| Login URL goes to frontend domain | `VITE_BACKEND_URL` not set at build time | Set env var → Clear build cache & redeploy frontend |
| `MONGO_URI not set` | Missing env var on Render | Add `MONGO_URI` in backend Environment |
| MongoDB connection error | Atlas IP not whitelisted | Atlas → Network Access → allow `0.0.0.0/0` |
| 401 Unauthorized on API calls | Cookie not sent or expired | Check CORS + credentials; log in again |
| Blank page on refresh | Missing SPA rewrite rule | Add `/* → /index.html` on Render static site |
| Backend exits on start | `CLIENT_URL` missing with `SERVE_FRONTEND=false` | Add `CLIENT_URL` env var |
| App slow first load | Render free tier sleeps after 15 min idle | Wait 30–60 seconds; first request wakes server |

---

## 20. Quick Command Reference

### Local development

```bash
# Install all dependencies
npm install
npm install --prefix frontend

# Start backend
npm start

# Start frontend (separate terminal)
npm run dev --prefix frontend

# Build frontend for production
npm run build --prefix frontend
```

### Git commands

```bash
# Check status
git status

# Add and commit changes
git add .
git commit -m "Your message here"

# Push to GitHub (triggers Render auto-deploy)
git push origin main
```

### Useful URLs

| What | URL |
|------|-----|
| GitHub repo | https://github.com/Tejass17x/MernApp.git |
| Render dashboard | https://dashboard.render.com |
| MongoDB Atlas | https://cloud.mongodb.com |
| Frontend (live) | https://mern-chat-frontend-isum.onrender.com |
| Backend (live) | https://mern-chat-backend-xzqr.onrender.com |
| Backend health | https://mern-chat-backend-xzqr.onrender.com/api/health |

---

## End-to-End Flow Summary

```
1. Developer pushes code to GitHub
2. Render auto-deploys backend + frontend
3. User opens frontend URL in browser
4. User signs up / logs in
5. JWT cookie stored (secure, httpOnly)
6. User data saved in localStorage
7. Socket.io connects for real-time features
8. User sees all other users in sidebar
9. User clicks someone → messages load from MongoDB
10. User sends message → saved to DB → pushed via Socket.io
11. Receiver gets message instantly + notification sound
12. User logs out → cookie cleared → socket disconnected
```

---

*Last updated: May 2026 | MERN Chat App by Tejass17x*
