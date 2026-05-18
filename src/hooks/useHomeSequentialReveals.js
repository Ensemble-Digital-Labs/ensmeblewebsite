import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function shouldSkipHomeMotion() {
  if (typeof document === 'undefined') return prefersReducedMotion()
  return prefersReducedMotion() || document.documentElement.classList.contains('reduced-motion')
}

/**
 * Home `/` — single pinned viewport slide at a time (`#home-deck-slide`). Pass `deckSlideIndex` from `HomeStoryViewport`.
 */
export function useHomeSequentialReveals(activeSlideIndex) {
  useLayoutEffect(() => {
    const slideRoot = document.getElementById('home-deck-slide')
    if (!slideRoot) return undefined

    if (shouldSkipHomeMotion()) {
      slideRoot.querySelectorAll('[data-home-reveal]').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      slideRoot.querySelectorAll('[data-home-problem-bar]').forEach((el) => {
        el.style.transform = 'none'
      })
      return undefined
    }

    const ctx = gsap.context(() => {
      const reveals = slideRoot.querySelectorAll('[data-home-reveal]')

      gsap.killTweensOf(reveals)
      gsap.fromTo(
        reveals,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          stagger: 0.068,
          ease: 'power2.out',
          overwrite: true,
          delay: 0.06,
        },
      )

      const bars = slideRoot.querySelectorAll('[data-home-problem-bar]')
      bars.forEach((inner, i) => {
        gsap.killTweensOf(inner)
        gsap.fromTo(
          inner,
          { xPercent: i % 2 === 0 ? -101 : 101 },
          {
            xPercent: 0,
            duration: 0.75,
            ease: 'expo.out',
            delay: 0.12 + i * 0.055,
          },
        )
      })
    }, slideRoot)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ctx.revert()
    }
  }, [activeSlideIndex])
}
