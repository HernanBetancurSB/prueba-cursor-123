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
        // Paleta Seguros Bolívar
        primary: {
          50: "#e8f5ec",
          100: "#c6e7cf",
          200: "#9fd8b0",
          300: "#6fc98f",
          400: "#4cbc76",
          500: "#00A859", // Verde Bolívar principal
          600: "#009950",
          700: "#006B3F", // Verde Bolívar oscuro
          800: "#005a35",
          900: "#004a2b",
          950: "#002d1a",
        },
        bolivar: {
          green: "#006B3F",
          greenLight: "#00A859",
          greenBright: "#00C853",
          accent: "#4CAF50",
        },
        dark: {
          50: "#f5f7f6",
          100: "#e0e5e2",
          200: "#c2cbc5",
          300: "#9ba8a0",
          400: "#75857b",
          500: "#5a6b60",
          600: "#47544c",
          700: "#3a453e",
          800: "#252d28",
          900: "#1a201c",
          950: "#0f1410",
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

