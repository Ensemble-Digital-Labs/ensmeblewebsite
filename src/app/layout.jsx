import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FullscreenNav from '../components/FullscreenNav'
import MovingCircle from '../components/MovingCircle'
import CinematicFooter from '../components/CinematicFooter'
import ParallaxLayerRegistry from '../components/ParallaxLayerRegistry'
import { useLocomotiveScroll } from '../lib/locomotive'
import { initScrollReveal } from '../lib/popprAnimations'
import { forceScrollMainToTop, prefersReducedMotion, shouldUseNativeMainScroll } from '../lib/utils'
import { ANIMATION_MOBILE_MAX_WIDTH_PX, syncAnimationVariantDataset } from '../lib/animationProfile'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function Layout({ children }) {
  const scrollContainerRef = useRef(null)
  const location = useLocation()
  const [useNativeMainScroller, setUseNativeMainScroller] = useState(() =>
    typeof window !== 'undefined' ? shouldUseNativeMainScroll() : false,
  )

  useEffect(() => {
    const applyNative = () => {
      const next = shouldUseNativeMainScroll()
      setUseNativeMainScroller(next)
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('ensemble-touch-perf', next)
        syncAnimationVariantDataset()
      }
    }
    applyNative()
    const mqHoverNone = window.matchMedia('(hover: none)')
    const mqCoarse = window.matchMedia('(pointer: coarse)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqNarrow = window.matchMedia(`(max-width: ${ANIMATION_MOBILE_MAX_WIDTH_PX}px)`)
    mqHoverNone.addEventListener('change', applyNative)
    mqCoarse.addEventListener('change', applyNative)
    mqReduce.addEventListener('change', applyNative)
    mqNarrow.addEventListener('change', applyNative)
    return () => {
      mqHoverNone.removeEventListener('change', applyNative)
      mqCoarse.removeEventListener('change', applyNative)
      mqReduce.removeEventListener('change', applyNative)
      mqNarrow.removeEventListener('change', applyNative)
      document.documentElement.classList.remove('ensemble-touch-perf')
    }
  }, [])

  useEffect(() => {
    // Disable heavy animations if user prefers reduced motion
    const reducedMotion = prefersReducedMotion()
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion')
      document.body.style.cursor = 'auto'
    } else {
      document.documentElement.classList.remove('reduced-motion')
    }
  }, [])

  /** Avoid the browser restoring scroll on the window while `#main` is the real scroller. */
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  /** BFCache restore / back-forward can leave Lenis and `#main` out of sync with the visual top. */
  useEffect(() => {
    const onPageShow = () => {
      const main = scrollContainerRef.current || document.querySelector('#main')
      forceScrollMainToTop(main)
      requestAnimationFrame(() => forceScrollMainToTop(main))
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  /** Before paint on each route so the first frame is not mid-scroll (especially after hard refresh). */
  useLayoutEffect(() => {
    const main = scrollContainerRef.current || document.querySelector('#main')
    if (!main) return
    forceScrollMainToTop(main)
  }, [location.pathname])

  /**
   * Route changes: Lenis owns scroll on desktop; `ScrollTrigger.refresh` / reveal init can nudge offset.
   * Follow up after the route transition (~380ms) and again after refresh + `initScrollReveal`.
   */
  useEffect(() => {
    const main = scrollContainerRef.current || document.querySelector('#main')
    if (!main) return

    let cancelled = false
    const run = () => {
      if (!cancelled) forceScrollMainToTop(main)
    }

    run()
    requestAnimationFrame(() => {
      run()
      requestAnimationFrame(run)
    })

    const timer550 = window.setTimeout(() => {
      run()
      const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
      if (lenis?.resize) {
        try {
          lenis.resize()
        } catch (e) {
          /* noop */
        }
      }
      ScrollTrigger.refresh()
      initScrollReveal(main)
      run()
      requestAnimationFrame(() => {
        run()
        requestAnimationFrame(run)
      })
    }, 550)

    const timer850 = window.setTimeout(run, 850)

    return () => {
      cancelled = true
      window.clearTimeout(timer550)
      window.clearTimeout(timer850)
    }
  }, [location.pathname])

  // Enable Locomotive Scroll globally for all pages
  useLocomotiveScroll(scrollContainerRef)

  return (
    <>
      <div
        ref={scrollContainerRef}
        id="main"
        className={`relative scroll-pt-[6.75rem] bg-[#050816] ${useNativeMainScroller ? 'native-main-scroll h-screen overflow-x-hidden overflow-y-auto' : 'h-screen overflow-hidden'}`}
      >
        <div data-scroll-content className="relative min-h-full bg-[#050816]">
          <ParallaxLayerRegistry />
          {children}
          <CinematicFooter />
        </div>
      </div>
      <div id="overlay" className="relative">
        <FullscreenNav />
      </div>
      <MovingCircle />
    </>
  )
}

export default Layout
