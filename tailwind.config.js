/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2C1810',
          dark: '#1C0F0A',
          light: '#3D2218',
        },
        cream: {
          DEFAULT: '#F7F3EE',
          dark: '#E8E2D9',
          light: '#FAFAF7',
        },
        caramel: {
          DEFAULT: '#C67C4E',
          dark: '#A66238',
          light: '#D99367',
        },
        dark: {
          DEFAULT: '#171717',
          surface: '#222222',
          card: '#1F1F1F',
          border: '#2E2E2E',
        },
        gold: {
          DEFAULT: '#D6A85F',
          light: '#E6C387',
          dark: '#B58842',
        },
        forest: {
          DEFAULT: '#3D5A40',
          light: '#537A57',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 35px -5px rgba(198, 124, 78, 0.3)',
        'glow-gold': '0 0 35px -5px rgba(214, 168, 95, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'steam-glow': 'radial-gradient(ellipse at center, rgba(198, 124, 78, 0.2) 0%, rgba(23, 23, 23, 0) 70%)',
      },
      animation: {
        'steam': 'steam 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.2' },
          '50%': { transform: 'translateY(-20px) scaleX(1.2)', opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
