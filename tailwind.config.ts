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
        "primary": "#FF8E60",
        "primary-dark": "#FF7D54",
        "secondary": "#009E52",
        "accent": "#FFC4B7",
        "background": "#FAF6F0",
        "background-dark": "#00473E",
        "foreground": "#002924",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["monospace"],
      },
      fontSize: {
        "2xs":        ["11px", { lineHeight: "1.4" }],
        "3xs":        ["10px", { lineHeight: "1.4" }],
        "4xs":        ["9px",  { lineHeight: "1.4" }],
        "5xs":        ["8px",  { lineHeight: "1.4" }],
        "display":    ["5.5rem", { lineHeight: "1" }],
        "display-lg": ["7rem",   { lineHeight: "1" }],
      },
      letterSpacing: {
        "micro":      "0.18em",
        "ui":         "0.2em",
        "ui-wide":    "0.25em",
        "ui-wider":   "0.3em",
        "ui-widest":  "0.35em",
      },
      maxWidth: {
        "orb":  "560px",
        "site": "1200px",
      },
      minHeight: {
        "card": "260px",
      },
      scale: {
        "101": "1.01",
        "102": "1.02",
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "none": "0",
        "sm": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "block":          "4px 4px 0px 0px #00473E",
        "block-sm":       "2px 2px 0px 0px #00473E",
        "block-lg":       "8px 8px 0px 0px #00473E",
        "glow-green":     "0 0 30px rgba(0,158,82,0.4)",
        "glow-green-md":  "0 0 30px rgba(0,158,82,0.3)",
        "glow-green-sm":  "0 0 20px rgba(0,158,82,0.4)",
        "glow-orange":    "0 0 30px rgba(255,142,96,0.4)",
        "glow-orange-md": "0 0 30px rgba(255,142,96,0.3)",
        "glow-orange-sm": "0 0 20px rgba(255,142,96,0.4)",
        "glow-red":       "0 0 30px rgba(239,68,68,0.4)",
        "glow-red-sm":    "0 0 20px rgba(239,68,68,0.4)",
      },
      dropShadow: {
        "orange": "0 2px 4px rgba(255,142,96,0.3)",
      },
      transitionProperty: {
        "max-height": "max-height",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
