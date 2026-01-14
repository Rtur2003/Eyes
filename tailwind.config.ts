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
          400: '#D4AF37', // Base Gold
          500: '#B5952F',
          600: '#967C27',
          700: '#78621F',
          800: '#5A4917',
          900: '#3C310F',
          DEFAULT: '#D4AF37',
        },
        obsidian: {
          DEFAULT: '#050505',
          card: '#0A0A0A',
          border: '#1F1F1F',
          surface: '#121212',
        },
      },
      fontFamily: {
        sans: ['var(--font-orbitron)', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F9E076 50%, #D4AF37 100%)',
        'gradient-dark': 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)',
      },
      boxShadow: {
        'glow-gold': '0 0 20px -5px rgba(212, 175, 55, 0.3)',
        'glow-subtle': '0 0 10px -5px rgba(212, 175, 55, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;