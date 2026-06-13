import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

function shouldSkipHeroMotion() {
  if (typeof document === 'undefined') return prefersReducedMotion()
  return prefersReducedMotion() || document.documentElement.classList.contains('reduced-motion')
}

function showHeroInstant(hero) {
  hero.classList.add('is-hero-entered')
  hero.querySelectorAll('[data-home-hero-line]').forEach((el) => {
    el.style.animation = 'none'
    el.style.transform = 'none'
  })
  hero.querySelectorAll('[data-home-hero-cta]').forEach((el) => {
    gsap.set(el, { clearProps: 'transform,opacity,visibility' })
  })
  hero.querySelectorAll('[data-home-hero-scroll-hint]').forEach((el) => {
    gsap.set(el, { clearProps: 'transform,opacity,visibility' })
  })
}

/**
 * Hero entrance timeline — runs when `introReady` (after intro loader).
 * Headline lines are visible in HTML by default; GSAP animates CTAs.
 */
export function useHomeHeroEntrance(introReady) {
  const ctxRef = useRef(null)

  useLayoutEffect(() => {
    if (!introReady) return undefined

    const hero = document.getElementById('home-hero')
    if (!hero) return undefined

    ctxRef.current?.revert()

    if (shouldSkipHeroMotion()) {
      showHeroInstant(hero)
      return undefined
    }

    const ctas = hero.querySelectorAll('[data-home-hero-cta]')
    const scrollHint = hero.querySelector('[data-home-hero-scroll-hint]')

    ctxRef.current = gsap.context(() => {
      gsap.set([...ctas], { autoAlpha: 0 })
      if (scrollHint) gsap.set(scrollHint, { autoAlpha: 0, y: 10 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => hero.classList.add('is-hero-entered'),
      })

      tl.fromTo(
        ctas,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.78, stagger: 0.14 },
        0.92,
      )

      if (scrollHint) {
        tl.fromTo(
          scrollHint,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.62 },
          1.18,
        )
      }
    }, hero)

    const failsafe = window.setTimeout(() => {
      if (!hero.classList.contains('is-hero-entered')) {
        showHeroInstant(hero)
      }
    }, 2800)

    return () => {
      window.clearTimeout(failsafe)
      ctxRef.current?.revert()
      ctxRef.current = null
    }
  }, [introReady])
}
