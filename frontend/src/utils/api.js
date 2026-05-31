// Empty string = same origin (single Render service serves both frontend + API).
// Set VITE_BACKEND_URL only when frontend and backend are on different domains.
export const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export const apiUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);
