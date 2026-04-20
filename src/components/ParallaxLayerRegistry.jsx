import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mountParallaxLayerStacks } from '../lib/parallaxLayerStacks'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Registers scrubbed parallax for every `[data-parallax-layers]` under `#main` on all routes.
 * Full remount is expensive; staggered delays only call ScrollTrigger.refresh after the first build
 * (loader-gated Home content, images, fonts) instead of rebuilding all tweens five times.
 */
export default function ParallaxLayerRegistry() {
  const location = useLocation()
  const cleanupRef = useRef(() => {})

  useEffect(() => {
    if (prefersReducedMotion()) return

    let cancelled = false

    const run = () => {
      if (cancelled) return
      cleanupRef.current()
      cleanupRef.current = () => {}
      const main = document.querySelector('#main')
      if (!main) return
      cleanupRef.current = mountParallaxLayerStacks(main)
    }

    const refreshOnly = () => {
      if (cancelled) return
      try {
        ScrollTrigger.refresh()
      } catch (e) {
        /* noop */
      }
    }

    run()
    const rebuildAfterLoader = setTimeout(run, 600)
    const refreshTimers = [400, 1100, 2200, 3600].map((ms) =>
      setTimeout(refreshOnly, ms)
    )

    return () => {
      cancelled = true
      clearTimeout(rebuildAfterLoader)
      refreshTimers.forEach(clearTimeout)
      cleanupRef.current()
      cleanupRef.current = () => {}
    }
  }, [location.pathname])

  return null
}
