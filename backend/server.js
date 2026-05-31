import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const distPath = path.join(__dirname, "..", "frontend", "dist");

app.set("trust proxy", 1);

if (process.env.CLIENT_URL) {
	app.use(
		cors({
			origin: process.env.CLIENT_URL,
			credentials: true,
		})
	);
}

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if (fs.existsSync(distPath)) {
	app.use(express.static(distPath));

	app.get("*", (req, res, next) => {
		if (req.path.startsWith("/api")) {
			return next();
		}
		res.sendFile(path.join(distPath, "index.html"));
	});
} else {
	console.warn("Frontend build not found. Run: npm run build");
}

const startServer = async () => {
	try {
		await connectToMongoDB();
		server.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
