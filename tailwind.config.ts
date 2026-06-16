import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#020817',
          surface: '#0D1117',
          green: '#00FF94',
          blue: '#0EA5E9',
          purple: '#A855F7',
          text: '#F8FAFC',
          muted: '#94A3B8',
          border: 'rgba(0, 255, 148, 0.2)'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;

