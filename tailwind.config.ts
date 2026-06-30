import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#FAFAFA",
        "text-primary": "#1d1916",
        "text-secondary": "#595959",
        "text-muted": "#949494",
        brand: {
          orange: "#ff7c00",
          "orange-text": "#ff7c00",
          purple: "#4229d5",
          blue: "#1677ff",
          gold: "#f59337",
          green: "#2EAD6B",
        },
        soft: {
          purple: "#ECE9FA",
          blue: "#E6F0FF",
          orange: "#FFF5EB",
          gold: "#FFF9F0",
        },
      },
      boxShadow: {
        card: "0 8px 32px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 16px 48px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(30px, -20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "orb-drift": "orb-drift 20s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
