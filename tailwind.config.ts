import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "oklch(95% 0.035 78)",
        "cream-card": "oklch(92.5% 0.04 75)",
        edge: "oklch(82% 0.045 68)",
        "edge-card": "oklch(83% 0.045 68)",
        "edge-strong": "oklch(80% 0.045 65)",
        ink: "oklch(24% 0.08 22)",
        "ink-2": "oklch(35% 0.07 25)",
        "ink-3": "oklch(46% 0.05 25)",
        "ink-4": "oklch(50% 0.05 25)",
        "ink-5": "oklch(52% 0.05 25)",
        maroon: "oklch(28% 0.09 22)",
        "maroon-deep": "oklch(24% 0.09 22)",
        "maroon-card": "oklch(29% 0.09 22)",
        coral: "oklch(58% 0.15 10)",
        cloud: "oklch(98% 0.008 60)",
        blush: "oklch(90% 0.05 55)",
      },
      fontFamily: {
        display: ['"Baloo 2"', "sans-serif"],
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
