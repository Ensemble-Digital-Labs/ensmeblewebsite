import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { mountParallaxLayerStacks } from '../lib/parallaxLayerStacks'
import { prefersReducedMotion } from '../lib/utils'

/**
 * Registers scrubbed parallax for every `[data-parallax-layers]` under `#main` on all routes.
 * Re-runs on navigation and on staggered delays so Home (loader-gated content) still registers.
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

    run()
    const timeouts = [120, 450, 950, 1900, 3400].map((ms) => setTimeout(run, ms))

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
      cleanupRef.current()
      cleanupRef.current = () => {}
    }
  }, [location.pathname])

  return null
}
