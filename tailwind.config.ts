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
        "block": "4px 4px 0px 0px #00473E",
        "block-sm": "2px 2px 0px 0px #00473E",
        "block-lg": "8px 8px 0px 0px #00473E",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
