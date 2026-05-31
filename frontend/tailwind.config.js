/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px",
			},
			animation: {
				"fade-in": "fadeIn 0.2s ease-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(4px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["dark"],
	},
};
