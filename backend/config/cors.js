import { CLIENT_URLS, isAllowedOrigin } from "../config/env.js";

export const corsOptions = {
	origin(origin, callback) {
		if (isAllowedOrigin(origin)) {
			callback(null, true);
			return;
		}
		console.warn(`CORS blocked request from origin: ${origin || "unknown"}`);
		console.warn(`Allowed origins: ${CLIENT_URLS.join(", ") || "none — set CLIENT_URL on Render"}`);
		callback(new Error("Not allowed by CORS"));
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};
