import "dotenv/config";

export function normalizeUrl(url) {
	if (!url) return null;
	const trimmed = url.trim().replace(/\/$/, "");
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
		return trimmed;
	}
	return `https://${trimmed}`;
}

export const CLIENT_URLS = (process.env.CLIENT_URL || "")
	.split(",")
	.map((url) => normalizeUrl(url))
	.filter(Boolean);

export const CLIENT_URL = CLIENT_URLS[0] || null;
export const SERVE_FRONTEND = process.env.SERVE_FRONTEND !== "false";

export function isAllowedOrigin(origin) {
	if (!origin) return true;
	if (CLIENT_URLS.length === 0) return false;
	return CLIENT_URLS.some((allowed) => allowed === normalizeUrl(origin));
}
