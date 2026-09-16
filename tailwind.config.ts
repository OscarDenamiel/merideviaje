import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Único breakpoint del diseño: nav de escritorio vs. menú móvil a 900px.
    screens: {
      sm: "640px",
      nav: "900px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        paper: "oklch(98% 0.006 60)",
        sand: "oklch(95.5% 0.02 55)",
        hairline: "oklch(89% 0.008 50)",
        "hairline-strong": "oklch(85% 0.01 50)",
        ink: "oklch(20% 0.02 40)",
        "ink-2": "oklch(30% 0.02 40)",
        "ink-3": "oklch(44% 0.015 40)",
        "ink-4": "oklch(52% 0.015 40)",
        "ink-5": "oklch(56% 0.015 40)",
        coral: "oklch(62% 0.17 22)",
        "ink-deep": "oklch(17% 0.02 40)",
        cloud: "oklch(98% 0.006 60)",
      },
      fontFamily: {
        display: ["Lora", "serif"],
        sans: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
