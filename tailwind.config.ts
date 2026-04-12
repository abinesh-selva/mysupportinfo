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
        "primary": "#4E2780", // Deep Purple
        "secondary": "#AB1D79", // Magenta
        "accent": "#D0C3F1", // Lavender
        "highlight": "#EF94CA", // Pink
        "background": "#EFEBE2", // Off-white/Beige
        "foreground": "#353534", // Dark Charcoal
        "chart-stable": "#4E2780",
        "chart-erratic": "#AB1D79",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-inter)", "sans-serif"],
        mono: ["monospace"],
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
        "block": "4px 4px 0px 0px #353534",
        "block-sm": "2px 2px 0px 0px #353534",
        "block-lg": "8px 8px 0px 0px #353534",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
