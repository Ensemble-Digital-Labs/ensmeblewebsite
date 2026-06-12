import { useEffect } from 'react'
import {
  revealPopArtSectionSequence,
  revealPopArtSectionsInView,
} from '../lib/popArtBigLetterReveal'
import { prefersReducedMotion } from '../lib/utils'

function isPopArtSequenced(el) {
  return Boolean(el.closest('[data-home-popart-section], [data-popart-sequence]'))
}

/**
 * PopArt rev-text for non-sequenced blocks + immediate marketing hero sequences.
 * Home PopArt sections: letter → copy via `setupHomePopArtMotion` ScrollTrigger.
 */
export function usePopArtScrollReveals({
  immediate = false,
  scope = '#main',
  enabled = true,
} = {}) {
  useEffect(() => {
    if (!enabled) return undefined

    let cancelled = false
    let waitRaf = 0
    let observer = null
    let root = null
    const textPending = new Set()
    let scan = () => {}

    const revealText = (el) => {
      if (!el.classList.contains('home-popart-rev-text--hidden')) return
      const delaySec = parseFloat(el.getAttribute('data-rev-delay') ?? '0')
      const delayMs = Number.isFinite(delaySec) ? delaySec * 1000 : 0
      window.setTimeout(() => {
        el.classList.remove('home-popart-rev-text--hidden')
        el.classList.add('is-revealed')
      }, Math.max(0, delayMs))
      textPending.delete(el)
    }

    const bind = () => {
      if (cancelled) return
      root = document.querySelector(scope)
      if (!root) {
        waitRaf = requestAnimationFrame(bind)
        return
      }

      root.querySelectorAll('.home-popart-rev-text--hidden:not(.is-revealed)').forEach((el) => {
        if (isPopArtSequenced(el)) return
        textPending.add(el)
      })

      if (prefersReducedMotion()) {
        textPending.forEach(revealText)
        root.querySelectorAll('[data-popart-sequence]').forEach((section) => {
          revealPopArtSectionSequence(section)
        })
        return
      }

      if (immediate) {
        requestAnimationFrame(() => {
          root.querySelectorAll('[data-popart-sequence]').forEach((section) => {
            revealPopArtSectionSequence(section)
          })
        })
        textPending.forEach(revealText)
        return
      }

      scan = () => {
        if (!root) return
        revealPopArtSectionsInView(root, root)
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            if (entry.target.classList.contains('home-popart-rev-text--hidden')) {
              revealText(entry.target)
            }
          })
        },
        { root, rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
      )

      textPending.forEach((el) => observer.observe(el))

      root.addEventListener('scroll', scan, { passive: true })
      window.addEventListener('resize', scan)

      const lenis = typeof window !== 'undefined' ? window.locomotiveScroll?.lenisInstance : null
      if (lenis?.on) lenis.on('scroll', scan)
      window.addEventListener('ensemble:scroll-ready', scan)

      scan()
    }

    bind()

    return () => {
      cancelled = true
      cancelAnimationFrame(waitRaf)
      observer?.disconnect()
      if (root) {
        root.removeEventListener('scroll', scan)
        window.removeEventListener('resize', scan)
        window.removeEventListener('ensemble:scroll-ready', scan)
        const lenis = typeof window !== 'undefined' ? window.locomotiveScroll?.lenisInstance : null
        if (lenis?.off) lenis.off('scroll', scan)
      }
    }
  }, [immediate, scope, enabled])
}

/** @deprecated name — use `usePopArtScrollReveals` */
export function usePopArtBigLetter(options) {
  return usePopArtScrollReveals(options)
}
