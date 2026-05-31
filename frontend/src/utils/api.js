function normalizeUrl(url) {
	if (!url) return "";
	const trimmed = url.trim().replace(/\/$/, "");
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
		return trimmed;
	}
	return `https://${trimmed}`;
}

export const API_BASE = normalizeUrl(import.meta.env.VITE_BACKEND_URL || "");

export const apiUrl = (path) => {
	if (!API_BASE) {
		if (import.meta.env.PROD) {
			throw new Error(
				"Backend URL missing. On Render, set VITE_BACKEND_URL to your backend URL and redeploy the frontend."
			);
		}
		return path;
	}
	return `${API_BASE}${path}`;
};

export async function apiFetch(path, options = {}) {
	const url = apiUrl(path);

	let res;
	try {
		res = await fetch(url, {
			credentials: "include",
			...options,
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
		});
	} catch {
		throw new Error(
			`Cannot reach backend at ${url}. Check VITE_BACKEND_URL on frontend and CLIENT_URL on backend, then redeploy both.`
		);
	}

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
