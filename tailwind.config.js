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
        // Brand — growth pink → coral (CSS vars in index.css :root)
        brand: {
          primary: 'var(--color-brand-primary, #e94e77)',
          secondary: 'var(--color-brand-secondary, #f17245)',
          accent: 'var(--color-brand-accent, #be185d)',
          highlight: 'var(--color-brand-highlight, #fda085)',
          gold: 'var(--color-brand-gold, #fb7185)',
          'gold-light': 'var(--color-brand-gold-light, #fecdd3)',
          'gold-dark': 'var(--color-brand-gold-dark, #db2777)',
          warm: 'var(--color-brand-warm, #f17245)',
          'warm-light': 'var(--color-brand-warm-light, #fda085)',
        },
        growth: {
          from: 'var(--color-growth-from, #e94e77)',
          to: 'var(--color-growth-to, #f17245)',
          soft: 'var(--color-growth-soft, #fce7f3)',
          muted: 'var(--color-growth-muted, #fda4af)',
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
        interactive: {
          hover: 'var(--color-interactive-hover, #fb7185)',
          active: 'var(--color-interactive-active, #be185d)',
          focus: 'var(--color-interactive-focus, #e94e77)',
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
      keyframes: {
        'parallax-hint-pulse': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 8px 24px -12px rgba(0,0,0,0.55)',
            borderColor: 'rgba(255,255,255,0.14)',
          },
          '50%': {
            opacity: '0.9',
            boxShadow:
              '0 8px 28px -10px rgba(34,211,238,0.22), 0 0 0 1px rgba(34,211,238,0.14)',
            borderColor: 'rgba(34,211,238,0.28)',
          },
        },
      },
      animation: {
        'parallax-hint-pulse':
          'parallax-hint-pulse 2.25s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        /**
         * Display stack: Fraunces (Google Fonts display serif) + Plus Jakarta + system UI.
         */
        display: ['Fraunces', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ui: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        antique: ['Fraunces', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
