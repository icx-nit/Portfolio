import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#000000",
        bone: "#f6f6f4",
        slate: "#7d7d7d",
        paper: "#ffffff",
        char: "#1a1a1a",
      },
      backgroundImage: {
        "solstice-gradient": "linear-gradient(90deg, #feed7a 0%, #ff8400 48.96%, #df91f7 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        pill: "100px",
        card: "16px",
        link: "12px",
        input: "4px",
        panel: "38px",
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
      },
    },
  },
  plugins: [],
};

export default config;
