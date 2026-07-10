import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#0B0B0B",
        dark: "#0B0B0B",
        blue: "#0E4FFF",
        orange: "#FF8A00",
        border: "rgba(11, 11, 11, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 30px 100px rgba(11, 11, 11, 0.12)",
        glass: "0 24px 80px rgba(14, 79, 255, 0.12)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
