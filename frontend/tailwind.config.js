// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8', // Deep Blue
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1D4ED8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        accent: {
          DEFAULT: '#F97316', // Orange
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#F97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        background: {
          DEFAULT: '#ffffff',
          alt: '#f8fafc',
          dark: '#0f172a',
          darkAlt: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}