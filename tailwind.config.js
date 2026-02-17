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
        // Brand colors (inspired by reference website)
        brand: {
          primary: 'var(--color-brand-primary, #A374FF)',
          secondary: 'var(--color-brand-secondary, #17F1D1)',
          accent: 'var(--color-brand-accent, #8B5CF6)',
          highlight: 'var(--color-brand-highlight, #10B981)',
        },
        // Background colors
        bg: {
          primary: 'var(--color-background-primary, #0A0A0B)',
          secondary: 'var(--color-background-secondary, #1D1D1F)',
          card: 'var(--color-background-card, #252528)',
          light: 'var(--color-background-light, #FFFFFF)',
        },
        // Text colors
        text: {
          primary: 'var(--color-text-primary, #FFFFFF)',
          secondary: 'var(--color-text-secondary, #A1A1AA)',
          muted: 'var(--color-text-muted, #71717A)',
          dark: 'var(--color-text-dark, #1D1D1F)',
        },
        // Interactive colors
        interactive: {
          hover: 'var(--color-interactive-hover, #A78BFA)',
          active: 'var(--color-interactive-active, #7C3AED)',
          focus: 'var(--color-interactive-focus, #8B5CF6)',
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
