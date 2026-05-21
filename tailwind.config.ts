import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05060f",
        plasma: "#7c3aed",
        aurora: "#15f5ba",
        solar: "#f8d66d",
        coral: "#ff6b6b"
      },
      boxShadow: {
        glow: "0 0 80px rgba(21, 245, 186, 0.2)",
        luxe: "0 24px 100px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
