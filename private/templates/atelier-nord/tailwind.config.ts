import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Atelier Nord — three colours: white, cobalt and butter.
        // `green` is the bright cobalt accent (the key name is kept so
        // existing utilities keep working); `ink` is the deep cobalt used
        // for type and dark surfaces; `sage` is the butter used on cobalt.
        green: {
          DEFAULT: "#2242F5",
          400: "#4D69FF",
          500: "#2242F5",
          600: "#1A35D9",
          700: "#132AB3",
        },
        ink: {
          DEFAULT: "#0F1E8F",
          800: "#0C1874",
          900: "#091259",
        },
        paper: "#FFFFFF",
        sage: {
          DEFAULT: "#F7E27E",
          light: "#FFF6CF",
          dark: "#EDD35C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        // Looser than before: a serif display with tight tracking closes up.
        tightest: "-0.02em",
      },
      maxWidth: {
        shell: "1680px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
