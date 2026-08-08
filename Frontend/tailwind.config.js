/**
 * Tailwind theme for Shree Vishwa Prabha Ayurved & Panchakarma Clinic
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '390px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          DEFAULT: '#0F766E',
          dark: '#0B5A54',
          light: '#14B8A6',
        },
        secondary: {
          DEFAULT: '#D1FAE5',
          soft: '#ECFDF5',
        },
        accent: {
          DEFAULT: '#C8A951',
          dark: '#A88B3A',
          light: '#E8D59A',
        },
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#134E4A',
          muted: '#5B6F6C',
          soft: '#8AA09C',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(15, 118, 110, 0.18)',
        glass: '0 8px 32px rgba(15, 118, 110, 0.12)',
        lift: '0 20px 50px -20px rgba(15, 118, 110, 0.35)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(15,118,110,0.92) 0%, rgba(11,90,84,0.78) 45%, rgba(200,169,81,0.35) 100%)',
        'section-fade':
          'radial-gradient(ellipse at top, rgba(209,250,229,0.55), transparent 55%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
