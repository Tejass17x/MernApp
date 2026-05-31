import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Proper __dirname for ES6 modules
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 3000;

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

// Fallback route for React Router
app.get("*", (req, res) => {
	res.sendFile(path.join(distPath, "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
