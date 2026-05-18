export const BREAKPOINTS = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
}

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
}

export const EASING = {
  easeIn: 'power1.in',
  easeOut: 'power1.out',
  easeInOut: 'power1.inOut',
}

// Ensemble theme — growth pink → coral accent (see index.css :root)
export const COLORS = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F0F0F0',
    card: '#FFFFFF',
    light: '#FFFFFF',
  },
  text: {
    primary: '#0A0A0B',
    secondary: '#52525B',
    muted: '#71717A',
    dark: '#0A0A0B',
  },
  brand: {
    primary: '#e94e77',
    secondary: '#f17245',
    accent: '#be185d',
    highlight: '#fda085',
    gold: '#fb7185',
    goldLight: '#fecdd3',
    goldDark: '#db2777',
    reference: {
      purple: '#A374FF',
      cyan: '#17F1D1',
      blue: '#018BCF',
      yellow: '#f4d446',
    },
    gradient: {
      start: '#e94e77',
      mid1: '#fb7185',
      mid2: '#f17245',
      mid3: '#ea580c',
      end: '#fda085',
    },
  },
  interactive: {
    hover: '#fb7185',
    active: '#be185d',
    focus: '#e94e77',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
}
