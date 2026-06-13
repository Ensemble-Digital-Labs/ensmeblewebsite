import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

/** Smoothstep 0→1 */
export function easeIntro(t) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

/** Softer in/out for card wipe + opacity (Ken Perlin smootherstep). */
export function easeIntroReveal(t) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * x * (x * (x * 6 - 15) + 10)
}

export const GALLERY_INTRO_DURATION_PAGE = 2.15
export const GALLERY_INTRO_DURATION_FILTER = 1.15

/**
 * DNA Capital /companies — cards wipe open from left edge on page entry.
 * Mutates `introRef.current` from 0→1 during intro (1 = complete).
 */
export function useCaseStudiesGalleryIntro(
  introRef,
  applyLayout,
  { replayKey, studiesKey, enabled = true } = {},
) {
  const prevReplayRef = useRef(null)
  const prevStudiesRef = useRef(studiesKey)

  useEffect(() => {
    if (!enabled) {
      introRef.current = 1
      applyLayout()
      return undefined
    }

    if (prefersReducedMotion()) {
      introRef.current = 1
      applyLayout()
      return undefined
    }

    const isPageEntry = prevReplayRef.current !== replayKey
    prevReplayRef.current = replayKey
    prevStudiesRef.current = studiesKey

    introRef.current = 0
    applyLayout()

    const state = { t: 0 }
    const tween = gsap.to(state, {
      t: 1,
      duration: isPageEntry ? GALLERY_INTRO_DURATION_PAGE : GALLERY_INTRO_DURATION_FILTER,
      ease: 'sine.inOut',
      delay: isPageEntry ? 0.12 : 0.06,
      onUpdate: () => {
        introRef.current = state.t
        applyLayout()
      },
      onComplete: () => {
        introRef.current = 1
        applyLayout()
      },
    })

    return () => {
      tween.kill()
    }
  }, [applyLayout, enabled, introRef, replayKey, studiesKey])
}

/** Filter change — quick crossfade like DNA Vue `fade` on carousel section. */
export function useCaseStudiesGalleryFilterFade(containerRef, studiesKey, replayKey) {
  const prevStudiesRef = useRef(studiesKey)
  const prevReplayRef = useRef(replayKey)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const isPageEntry = prevReplayRef.current !== replayKey
    prevReplayRef.current = replayKey

    if (isPageEntry || prevStudiesRef.current === studiesKey) {
      prevStudiesRef.current = studiesKey
      return undefined
    }

    prevStudiesRef.current = studiesKey

    if (prefersReducedMotion()) return undefined

    gsap.fromTo(el, { opacity: 0.32 }, { opacity: 1, duration: 0.85, ease: 'sine.inOut' })
  }, [studiesKey, replayKey, containerRef])
}

/** Filters anchor — fade/slide on each gallery page entry. */
export function useCaseStudiesGalleryFiltersIntro(replayKey) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const filtersEl = document.querySelector('.case-studies-portfolio-filters-anchor')
    if (!filtersEl) return undefined

    gsap.fromTo(
      filtersEl,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 1.15, delay: 0.95, ease: 'sine.inOut' },
    )
  }, [replayKey])
}
