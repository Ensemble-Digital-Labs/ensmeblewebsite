import { COLORS } from './constants'

/**
 * Get CSS variable string for a color
 */
export function getColorVar(category, key) {
  return `var(--color-${category}-${key})`
}

/**
 * Initialize theme CSS variables
 */
export function initTheme() {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  
  // Set background colors
  Object.entries(COLORS.background).forEach(([key, value]) => {
    root.style.setProperty(`--color-background-${key}`, value)
  })
  
  // Set text colors
  Object.entries(COLORS.text).forEach(([key, value]) => {
    root.style.setProperty(`--color-text-${key}`, value)
  })
  
  // Set brand colors (handle nested objects)
  Object.entries(COLORS.brand).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Handle nested objects like reference
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        root.style.setProperty(`--color-brand-${key}-${nestedKey}`, nestedValue)
      })
    } else {
      root.style.setProperty(`--color-brand-${key}`, value)
    }
  })
  
  // Set interactive colors
  Object.entries(COLORS.interactive).forEach(([key, value]) => {
    root.style.setProperty(`--color-interactive-${key}`, value)
  })
  
  // Set status colors
  Object.entries(COLORS.status).forEach(([key, value]) => {
    root.style.setProperty(`--color-status-${key}`, value)
  })
}
