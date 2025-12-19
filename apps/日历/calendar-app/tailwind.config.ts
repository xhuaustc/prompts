import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                glass: "0 20px 50px rgba(0,0,0,0.25)"
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" }
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.98)" },
                    "100%": { opacity: "1", transform: "scale(1)" }
                }
            },
            animation: {
                "fade-up": "fade-up 450ms ease-out both",
                "scale-in": "scale-in 180ms ease-out both"
            }
        }
    },
    plugins: []
};

export default config;


