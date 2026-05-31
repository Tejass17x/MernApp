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
import { CLIENT_URL, SERVE_FRONTEND } from "./config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const distPath = path.join(__dirname, "..", "frontend", "dist");
const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

if (CLIENT_URL) {
	app.use(
		cors({
			origin: CLIENT_URL,
			credentials: true,
		})
	);
} else if (isProduction && !SERVE_FRONTEND) {
	console.error("CLIENT_URL is required when SERVE_FRONTEND=false in production");
	process.exit(1);
}

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
	res.status(200).json({ status: "ok", clientUrl: CLIENT_URL || null });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if (SERVE_FRONTEND && fs.existsSync(distPath)) {
	app.use(express.static(distPath));

	app.get("*", (req, res, next) => {
		if (req.path.startsWith("/api")) {
			return next();
		}
		res.sendFile(path.join(distPath, "index.html"));
	});
} else if (SERVE_FRONTEND) {
	console.warn("Frontend build not found. Run: npm run build");
}

const startServer = async () => {
	try {
		await connectToMongoDB();
		server.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
			if (CLIENT_URL) console.log(`CORS enabled for: ${CLIENT_URL}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error.message);
		process.exit(1);
	}
};

startServer();
