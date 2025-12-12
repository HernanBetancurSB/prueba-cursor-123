import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#dfe8ff",
          200: "#b8cfff",
          300: "#7aa8ff",
          400: "#3478ff",
          500: "#0a4fff",
          600: "#0037f5",
          700: "#002ae0",
          800: "#0025b6",
          900: "#00228e",
          950: "#001456",
        },
        dark: {
          50: "#f6f6f7",
          100: "#e2e3e5",
          200: "#c5c6cb",
          300: "#a0a2a9",
          400: "#7c7e87",
          500: "#61636c",
          600: "#4d4e56",
          700: "#3f4047",
          800: "#27282d",
          900: "#1a1b1f",
          950: "#0d0e10",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "typing": "typing 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        typing: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

