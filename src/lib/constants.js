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

// Ensemble Color Theme Configuration (light theme for medical / approachable)
export const COLORS = {
  // Background colors
  background: {
    primary: '#FAFAFA',      // Main light background
    secondary: '#F0F0F0',    // Secondary light sections
    card: '#FFFFFF',         // Card/component background
    light: '#FFFFFF',        // Light backgrounds
  },
  // Text colors
  text: {
    primary: '#0A0A0B',       // Main text (black)
    secondary: '#52525B',    // Secondary text (grey)
    muted: '#71717A',        // Muted text
    dark: '#0A0A0B',         // Dark text
  },
  // Brand colors (cyan blue – medical / approachable)
  brand: {
    primary: '#0891B2',      // Cyan 600 – main brand
    secondary: '#06B6D4',    // Cyan 500
    accent: '#0E7490',      // Cyan 700
    highlight: '#10B981',   // Green
    reference: {
      purple: '#A374FF',
      cyan: '#17F1D1',
      blue: '#018BCF',
      yellow: '#f4d446',
    },
    gradient: {
      start: '#06B6D4',     // Cyan
      mid1: '#10B981',     // Green
      mid2: '#FBBF24',     // Yellow
      mid3: '#F97316',     // Orange
      end: '#0891B2',      // Cyan
    },
  },
  // Interactive colors (cyan blue family)
  interactive: {
    hover: '#22D3EE',       // Cyan 400
    active: '#0E7490',     // Cyan 700
    focus: '#0891B2',      // Cyan 600
  },
  // Status colors
  status: {
    success: '#10B981',      // Green (matches brand)
    warning: '#F59E0B',      // Orange (matches brand)
    error: '#EF4444',
    info: '#3B82F6',        // Blue (matches brand)
  },
}
