/**
 * Desktop vs mobile/tablet animation profiles.
 * - Desktop: full cinematic motion (pin + scrub, larger travel).
 * - Mobile / iPhone / iPad: lighter motion (no pin, tighter scrub, smaller offsets) for scroll performance + touch UX.
 * - `prefers-reduced-motion`: callers should skip or minimize motion (handled per module).
 */
import { prefersReducedMotion, shouldUseNativeMainScroll } from './utils'

/** @typedef {'desktop' | 'mobile'} AnimationVariant */

/** Match Tailwind `lg` — viewport at or below this uses the mobile animation profile. */
export const ANIMATION_MOBILE_MAX_WIDTH_PX = 1024

/**
 * Which high-level animation set to use (non-reduced-motion only).
 * Mobile profile: narrow viewport OR touch-primary scrolling (native #main / iOS-friendly path).
 */
export function getAnimationVariant() {
  if (typeof window === 'undefined') return 'desktop'
  const narrow = window.matchMedia(`(max-width: ${ANIMATION_MOBILE_MAX_WIDTH_PX}px)`).matches
  if (narrow) return 'mobile'
  if (shouldUseNativeMainScroll()) return 'mobile'
  return 'desktop'
}

export function isMobileAnimationVariant() {
  return getAnimationVariant() === 'mobile'
}

/** Cinematic section reveal (`setupCinematicSectionReveal`) */
export const cinematicProfiles = {
  desktop: {
    pin: true,
    scrub: 1.1,
    leadFrom: { y: '8vh', scale: 0.92, opacity: 0 },
    blockFrom: { y: 52, opacity: 0 },
    durationLead: 0.42,
    durationBlock: 0.52,
    staggerEach: 0.07,
  },
  mobile: {
    pin: false,
    scrub: true,
    leadFrom: { y: '5vh', scale: 0.97, opacity: 0 },
    blockFrom: { y: 28, opacity: 0 },
    durationLead: 0.32,
    durationBlock: 0.38,
    staggerEach: 0.04,
  },
}

/** First-screen hero: keep visible at scroll 0; still respect desktop vs mobile intensity */
export const cinematicHeroProfiles = {
  desktop: {
    leadFrom: { y: '4vh', scale: 0.98, opacity: 1 },
    blockFrom: { y: 32, opacity: 1 },
  },
  mobile: {
    leadFrom: { y: '2vh', scale: 0.995, opacity: 1 },
    blockFrom: { y: 18, opacity: 1 },
  },
}

/** `initScrollReveal` — `[data-scroll-section]` */
export const scrollRevealProfiles = {
  desktop: {
    duration: 1.2,
    delayFactor: 0.12,
    ease: 'power2.out',
    start: 'top 98%',
    end: 'top 50%',
  },
  mobile: {
    duration: 0.75,
    delayFactor: 0.06,
    ease: 'power2.out',
    start: 'top 99%',
    end: 'top 62%',
  },
}

/** Footer scrub timeline (`initFooterScroll`) */
export const footerScrollProfiles = {
  desktop: { scrub: 2.2, parallaxFrom: 85, contentY: 60 },
  mobile: { scrub: 1.2, parallaxFrom: 40, contentY: 32 },
}

/**
 * Set `data-animation-variant` on `<html>` for optional CSS hooks.
 */
export function syncAnimationVariantDataset() {
  if (typeof document === 'undefined') return
  const v = prefersReducedMotion() ? 'reduced' : getAnimationVariant()
  document.documentElement.dataset.animationVariant = v
}
