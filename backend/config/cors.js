import { CLIENT_URLS } from "../config/env.js";

export const corsOptions = {
	origin: CLIENT_URLS.length > 0 ? CLIENT_URLS : false,
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	optionsSuccessStatus: 204,
};
