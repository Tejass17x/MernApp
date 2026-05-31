import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	if (mode === "production" && !env.VITE_BACKEND_URL) {
		console.warn(
			"\n⚠️  VITE_BACKEND_URL is not set. API calls will fail on Render.\n" +
				"   Set it in Render → Static Site → Environment before building.\n"
		);
	}

	return {
		plugins: [react()],
		server: {
			port: 3000,
			proxy: {
				"/api": {
					target: "http://localhost:5000",
				},
			},
		},
		build: {
			outDir: "dist",
		},
	};
});
