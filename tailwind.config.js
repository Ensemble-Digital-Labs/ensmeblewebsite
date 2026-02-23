/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      colors: {
        // Brand colors (cyan blue primary + warm gold second primary)
        brand: {
          primary: 'var(--color-brand-primary, #0891B2)',
          secondary: 'var(--color-brand-secondary, #06B6D4)',
          accent: 'var(--color-brand-accent, #0E7490)',
          highlight: 'var(--color-brand-highlight, #10B981)',
          gold: 'var(--color-brand-gold, #C9A227)',
          'gold-light': 'var(--color-brand-gold-light, #E5C158)',
          'gold-dark': 'var(--color-brand-gold-dark, #A68520)',
        },
        // Background colors (light theme)
        bg: {
          primary: 'var(--color-background-primary, #FAFAFA)',
          secondary: 'var(--color-background-secondary, #F0F0F0)',
          card: 'var(--color-background-card, #FFFFFF)',
          light: 'var(--color-background-light, #FFFFFF)',
        },
        // Text colors (light theme)
        text: {
          primary: 'var(--color-text-primary, #0A0A0B)',
          secondary: 'var(--color-text-secondary, #52525B)',
          muted: 'var(--color-text-muted, #71717A)',
          dark: 'var(--color-text-dark, #0A0A0B)',
        },
        // Interactive colors (cyan blue family)
        interactive: {
          hover: 'var(--color-interactive-hover, #22D3EE)',
          active: 'var(--color-interactive-active, #0E7490)',
          focus: 'var(--color-interactive-focus, #0891B2)',
        },
        // Legacy primary (keeping for backward compatibility)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        antique: ['Antique Olive', 'serif'],
      },
    },
  },
  plugins: [],
}
