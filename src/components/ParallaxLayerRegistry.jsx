import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mountParallaxLayerStacks } from '../lib/parallaxLayerStacks'
import { isMobileAnimationVariant } from '../lib/animationProfile'
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
    const mobile = isMobileAnimationVariant()
    const rebuildAfterLoader = mobile ? null : window.setTimeout(run, 600)
    const refreshTimers = mobile
      ? []
      : [400, 1100, 2200, 3600].map((ms) => window.setTimeout(refreshOnly, ms))

    return () => {
      cancelled = true
      if (rebuildAfterLoader != null) window.clearTimeout(rebuildAfterLoader)
      refreshTimers.forEach((id) => window.clearTimeout(id))
      cleanupRef.current()
      cleanupRef.current = () => {}
    }
  }, [location.pathname])

  return null
}
