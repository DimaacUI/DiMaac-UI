import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial palette — bright ivory / near-black ink / electric cobalt.
        paper: "#FAF9F6", // bright warm-white base
        ink: "#101014", // near-black, slightly cool, text
        accent: "#2F50F2", // electric cobalt accent
        moss: "#E8ECFF", // soft cobalt tint, for subtle fills
      },
      fontFamily: {
        // Wired up in globals.css via next/font CSS variables.
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.22em", // tiny uppercase mono labels
      },
      fontSize: {
        // Fluid display sizing — print-spread scale.
        mega: "clamp(4.5rem, 18vw, 16rem)",
        huge: "clamp(3rem, 9vw, 8rem)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.76, 0, 0.24, 1)", // symmetric — reveals, wipes
        expo: "cubic-bezier(0.16, 1, 0.3, 1)", // out only — hover feedback
      },
    },
  },
  plugins: [],
};

export default config;
