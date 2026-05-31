import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

if (process.env.CLIENT_URL) {
	app.use(
		cors({
			origin: process.env.CLIENT_URL,
			credentials: true,
		})
	);
}

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend static files
const distPath = path.join(__dirname, "..", "frontend", "dist");
console.log("Serving static files from:", distPath);

// Check if dist folder exists
if (!fs.existsSync(distPath)) {
	console.warn("⚠️  WARNING: Frontend dist folder not found at", distPath);
	console.warn("Make sure to run: npm run build");
}

app.use(express.static(distPath));

// Fallback route for React Router (skip API routes)
app.get("*", (req, res, next) => {
	if (req.path.startsWith("/api")) {
		return next();
	}
	res.sendFile(path.join(distPath, "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
