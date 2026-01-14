import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8F1',
          100: '#F5EED9',
          200: '#EAD8AA',
          300: '#DFC27A',
          400: '#D4AF37', // Primary Gold
          500: '#B5952F',
          600: '#967C27',
          700: '#78621F',
          800: '#5A4917',
          900: '#3C310F',
        },
        bronze: {
          400: '#CD7F32',
          900: '#4B2E12',
        },
        obsidian: {
          DEFAULT: '#050505',
          card: '#0A0A0A',
          border: '#1A1A1A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-sheen': 'linear-gradient(135deg, #996515 0%, #D4AF37 50%, #F9E076 100%)',
      },
      fontFamily: {
        sans: ['var(--font-orbitron)', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;