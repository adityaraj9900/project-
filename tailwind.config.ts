import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        cream: "#F5F0E8",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          dim: "#8A6F2E",
        },
        surface: {
          1: "#0F0F0F",
          2: "#161616",
          3: "#1E1E1E",
        },
        // kept for any legacy usage
        aurora: "#15f5ba",
        plasma: "#7c3aed",
        solar: "#f8d66d",
        coral: "#ff6b6b",
      },
      borderColor: {
        "gold-subtle": "rgba(201,168,76,0.15)",
        "gold-hover": "rgba(201,168,76,0.35)",
        "gold-active": "rgba(201,168,76,0.55)",
      },
      boxShadow: {
        "gold-glow": "0 0 40px rgba(201,168,76,0.12)",
        "gold-glow-lg": "0 0 80px rgba(201,168,76,0.18)",
        luxe: "0 24px 100px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C, #E8C97A, #8A6F2E)",
        "gold-shimmer": "linear-gradient(90deg, #8A6F2E, #C9A84C, #E8C97A, #C9A84C, #8A6F2E)",
        "grid-gold":
          "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-48": "48px 48px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
