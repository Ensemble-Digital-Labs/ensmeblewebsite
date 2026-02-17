import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Fade in and slide up animation
 */
export function fadeInUp(element, options = {}) {
  if (prefersReducedMotion()) return
  
  const {
    delay = 0,
    duration = 0.8,
    y = 30,
    opacity = 0,
  } = options

  gsap.fromTo(
    element,
    {
      opacity,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
    }
  )
}

/**
 * Fade in animation
 */
export function fadeIn(element, options = {}) {
  if (prefersReducedMotion()) return
  
  const {
    delay = 0,
    duration = 0.6,
  } = options

  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    }
  )
}

/**
 * Stagger children animation
 */
export function staggerChildren(parent, options = {}) {
  if (prefersReducedMotion()) return
  
  const {
    delay = 0,
    duration = 0.6,
    stagger = 0.1,
    y = 30,
    opacity = 0,
  } = options

  gsap.fromTo(
    parent.children,
    {
      opacity,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    }
  )
}

/**
 * Scale in animation
 */
export function scaleIn(element, options = {}) {
  if (prefersReducedMotion()) return
  
  const {
    delay = 0,
    duration = 0.6,
    scale = 0.8,
  } = options

  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)',
    }
  )
}
