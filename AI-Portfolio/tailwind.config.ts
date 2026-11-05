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
        // Wope Design Tokens wired via CSS variables for dynamic dark/light switching
        "night-violet": "var(--color-night-violet)",
        "void-plum": "var(--color-void-plum)",
        "soft-quartz": "var(--color-soft-quartz)",
        "muted-steel": "var(--color-muted-steel)",
        "ash-lilac": "var(--color-ash-lilac)",
        "dim-fog": "var(--color-dim-fog)",
        "ultraviolet-core": "var(--color-ultraviolet-core)",
        "lilac-beam": "var(--color-lilac-beam)",
        "horizon-glow": "var(--color-horizon-glow)",
        // Backward-compatible semantic aliases
        obsidian: "var(--color-night-violet)",
        bone: "var(--color-soft-quartz)",
        char: "var(--color-glass-border)",
        slate: "var(--color-ash-lilac)",
      },
      backgroundImage: {
        "ultraviolet-horizon":
          "linear-gradient(180deg, rgba(183, 164, 251, 0) 0%, rgba(183, 164, 251, 0.5) 50%, rgba(133, 98, 255, 0.5) 75%, rgba(133, 98, 255, 0) 100%)",
        "violet-beam":
          "linear-gradient(180deg, rgba(183, 164, 251, 0) 0%, rgb(183, 164, 251) 50%, rgb(133, 98, 255) 75%, rgba(133, 98, 255, 0) 100%)",
        "deep-fade-veil":
          "linear-gradient(180deg, rgba(11, 2, 23, 0) 22.69%, rgba(22, 9, 42, 0.5) 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
        card: "16px",
        overlay: "10px",
        input: "0px",
      },
      maxWidth: {
        container: "1248px",
      },
      letterSpacing: {
        display: "-1.44px",
        "heading-lg": "-1.12px",
        "heading-sm": "-0.48px",
        body: "-0.16px",
      },
    },
  },
  plugins: [],
};

export default config;
