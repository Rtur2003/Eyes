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
          950: '#1E1808',
          DEFAULT: '#D4AF37',
        },
        bronze: {
          50: '#FAF5F0',
          100: '#F5E6D3',
          200: '#E5C9A8',
          300: '#D4A574',
          400: '#CD7F32', // Base Bronze
          500: '#B56B28',
          600: '#96581F',
          700: '#784619',
          800: '#5A3513',
          900: '#3C230C',
          DEFAULT: '#CD7F32',
        },
        obsidian: {
          DEFAULT: '#050505',
          50: '#1A1A1A',
          100: '#151515',
          200: '#121212',
          300: '#0F0F0F',
          400: '#0C0C0C',
          500: '#0A0A0A',
          600: '#080808',
          700: '#060606',
          800: '#040404',
          900: '#020202',
          card: '#0A0A0A',
          border: '#1F1F1F',
          surface: '#121212',
        },
        dream: {
          lucid: '#FFD700',
          normal: '#D4AF37',
          nightmare: '#B22222',
          recurring: '#6B8E23',
          prophetic: '#9370DB',
          shared: '#4682B4',
        },
        emotion: {
          joy: '#FFD700',
          fear: '#8B0000',
          peace: '#87CEEB',
          confusion: '#9370DB',
          love: '#FF69B4',
          anxiety: '#FF6347',
          wonder: '#DAA520',
          neutral: '#A0A0A0',
        }
      },
      fontFamily: {
        sans: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F9E076 50%, #D4AF37 100%)',
        'gradient-bronze': 'linear-gradient(135deg, #CD7F32 0%, #E5C9A8 50%, #CD7F32 100%)',
        'gradient-dark': 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)',
        'gradient-radial-gold': 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
        'gradient-glow': 'linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)',
        'neural-mesh': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        'glow-gold': '0 0 20px -5px rgba(212, 175, 55, 0.3)',
        'glow-gold-intense': '0 0 40px -5px rgba(212, 175, 55, 0.5)',
        'glow-subtle': '0 0 10px -5px rgba(212, 175, 55, 0.1)',
        'glow-bronze': '0 0 20px -5px rgba(205, 127, 50, 0.3)',
        'inner-gold': 'inset 0 0 20px -5px rgba(212, 175, 55, 0.1)',
        'card': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        'card-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
        'neural': '0 0 60px -10px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-slow': 'shimmer 3s linear infinite',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-up': 'slide-in-up 0.5s ease-out',
        'border-glow': 'border-glow 3s linear infinite',
        'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(212, 175, 55, 0.2)' },
          '50%': { borderColor: 'rgba(212, 175, 55, 0.5)' },
        },
        'neural-pulse': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.02)' },
        },
        'typewriter': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink': {
          '50%': { borderColor: 'transparent' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;