import "dotenv/config";

export function normalizeUrl(url) {
	if (!url) return null;
	const trimmed = url.trim().replace(/\/$/, "");
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
		return trimmed;
	}
	return `https://${trimmed}`;
}

export const CLIENT_URL = normalizeUrl(process.env.CLIENT_URL);
export const SERVE_FRONTEND = process.env.SERVE_FRONTEND !== "false";
