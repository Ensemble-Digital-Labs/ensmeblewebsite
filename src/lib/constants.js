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

// Ensemble Color Theme Configuration
// Colors inspired by the ENSEMBLE DIGITAL LABS logo gradient
export const COLORS = {
  // Background colors
  background: {
    primary: '#0A0A0B',      // Main dark background (deep black)
    secondary: '#1D1D1F',    // Secondary dark sections
    card: '#252528',         // Card/component background
    light: '#FFFFFF',        // Light backgrounds (for contrast)
  },
  // Text colors
  text: {
    primary: '#FFFFFF',       // Main text (white)
    secondary: '#A1A1AA',    // Secondary text (light grey)
    muted: '#71717A',        // Muted text (medium grey)
    dark: '#1D1D1F',        // Dark text (for light backgrounds)
  },
  // Brand colors - inspired by reference website
  brand: {
    primary: '#A374FF',      // Purple (main brand color from reference)
    secondary: '#17F1D1',   // Cyan (accent color from reference)
    accent: '#8B5CF6',      // Purple variant
    highlight: '#10B981',   // Green
    // Reference website colors
    reference: {
      purple: '#A374FF',
      cyan: '#17F1D1',
      blue: '#018BCF',
      yellow: '#f4d446',
    },
    // Gradient colors for special effects
    gradient: {
      start: '#60A5FA',     // Light blue
      mid1: '#10B981',      // Green
      mid2: '#FBBF24',      // Yellow
      mid3: '#F97316',      // Orange
      end: '#8B5CF6',       // Purple
    },
  },
  // Interactive colors
  interactive: {
    hover: '#A78BFA',        // Lighter purple for hover
    active: '#7C3AED',       // Deeper purple for active
    focus: '#8B5CF6',       // Brand purple for focus ring
  },
  // Status colors
  status: {
    success: '#10B981',      // Green (matches brand)
    warning: '#F59E0B',      // Orange (matches brand)
    error: '#EF4444',
    info: '#3B82F6',        // Blue (matches brand)
  },
}
