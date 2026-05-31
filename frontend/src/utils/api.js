function normalizeUrl(url) {
	if (!url) return "";
	const trimmed = url.trim().replace(/\/$/, "");
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
		return trimmed;
	}
	return `https://${trimmed}`;
}

export const API_BASE = normalizeUrl(import.meta.env.VITE_BACKEND_URL || "");

export const apiUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);

export async function apiFetch(path, options = {}) {
	const res = await fetch(apiUrl(path), {
		credentials: "include",
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!res.ok) {
		const contentType = res.headers.get("content-type");
		if (contentType?.includes("application/json")) {
			const data = await res.json();
			throw new Error(data.error || `Request failed (${res.status})`);
		}
		throw new Error(`Server error (${res.status})`);
	}

	return res.json();
}
