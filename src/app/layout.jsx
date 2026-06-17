import { useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FullscreenNav from '../components/FullscreenNav'
import PopArtContactOrb from '../components/contact-orb/PopArtContactOrb'
import SocialLinks from '../components/SocialLinks'
import { SITE_SOCIAL_LINKS } from '../data/siteSocialLinks'
import { PixelTransitionProvider } from '../components/PixelTransition'
import CinematicFooter from '../components/CinematicFooter'
import HomeAtmosphereCanvas from '../components/home/HomeAtmosphereCanvas'
import ParallaxLayerRegistry from '../components/ParallaxLayerRegistry'
import { useLocomotiveScroll } from '../lib/locomotive'
import { initScrollReveal } from '../lib/popprAnimations'
import { isAtmosphericRoute, shouldShowAmbientStarfield } from '../lib/atmosphericRoutes'
import { isDnaCapitalCloneRoute } from '../lib/dnaCapitalRoutes'
import { isCaseStudiesGalleryRoute } from '../lib/caseStudiesGalleryRoutes'
import { forceScrollMainToTop, prefersReducedMotion, shouldUseNativeMainScroll } from '../lib/utils'
import { ANIMATION_MOBILE_MAX_WIDTH_PX, isMobileAnimationVariant, syncAnimationVariantDataset } from '../lib/animationProfile'
import {
  HOME_PAGE_DNA_HELIX_ENABLED,
  HOME_PAGE_HELIX_VARIANT,
} from '../lib/homeDnaFeature'
import { hasHomeHelixIntroCompleted } from '../lib/homeHelixSession'
import { setHomeRibbonIntroProgress } from '../lib/homeRibbonIntro'
import { isHomeIntroLoaderDone } from '../lib/homeLoaderGate'
import 'locomotive-scroll/dist/locomotive-scroll.css'

const DnaCapitalHelixCanvas = lazy(() => import('../components/dna-clone/DnaCapitalHelixCanvas'))
const AmbientStarfieldCanvas = lazy(() => import('../components/ambient/AmbientStarfieldCanvas'))

/** Defer starfield WebGL until after first paint — same look, faster initial load. */
function DeferredAmbientStarfield() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const arm = () => {
      if (!cancelled) setReady(true)
    }

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(arm, { timeout: 1400 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }

    const timer = window.setTimeout(arm, 480)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <AmbientStarfieldCanvas />
    </Suspense>
  )
}

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

  /** Home ribbon helix: full opacity before WebGL paints on return visits. */
  useLayoutEffect(() => {
    const onHome =
      location.pathname === '/' &&
      HOME_PAGE_DNA_HELIX_ENABLED &&
      HOME_PAGE_HELIX_VARIANT === 'ribbon'
    if (!onHome || !isHomeIntroLoaderDone()) return
    if (hasHomeHelixIntroCompleted() || prefersReducedMotion()) {
      setHomeRibbonIntroProgress(1)
    }
  }, [location.pathname, location.key])

  /**
   * Route changes: Lenis owns scroll on desktop; `ScrollTrigger.refresh` / reveal init can nudge offset.
   * Follow up after the route transition (~380ms) and again after refresh + `initScrollReveal`.
   */
  useEffect(() => {
    const main = scrollContainerRef.current || document.querySelector('#main')
    if (!main) return

    let cancelled = false
    const run = (onlyIfNearTop = false) => {
      if (!cancelled) forceScrollMainToTop(main, { onlyIfNearTop })
    }

    if (isDnaCapitalCloneRoute(location.pathname) || location.pathname === '/lamalama-clone') {
      run()
      return () => {
        cancelled = true
      }
    }

    run()
    requestAnimationFrame(() => {
      run(true)
      requestAnimationFrame(() => run(true))
    })

    const touchMobile = isMobileAnimationVariant()
    /** After Framer route fade (~380ms) on mobile — avoid refresh jank mid-enter. */
    const refreshDelayMs = touchMobile ? 720 : 550

    const runScrollMetricsRefresh = () => {
      if (cancelled) return
      run(true)
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
      run(true)
      requestAnimationFrame(() => {
        run(true)
        requestAnimationFrame(() => run(true))
      })
    }

    const scheduleScrollMetricsRefresh = () => {
      if (cancelled) return
      if (touchMobile && typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => runScrollMetricsRefresh(), { timeout: 480 })
        return
      }
      runScrollMetricsRefresh()
    }

    const timerRefresh = window.setTimeout(scheduleScrollMetricsRefresh, refreshDelayMs)

    const timer850 = window.setTimeout(() => run(true), touchMobile ? 980 : 850)

    return () => {
      cancelled = true
      window.clearTimeout(timerRefresh)
      window.clearTimeout(timer850)
    }
  }, [location.pathname])

  const isDnaClone = isDnaCapitalCloneRoute(location.pathname)
  const isLamaLamaClone = location.pathname === '/lamalama-clone'
  const isCloneRoute = isDnaClone || isLamaLamaClone
  const isCaseStudiesGallery = isCaseStudiesGalleryRoute(location.pathname)
  const lamaLamaIframeMode = isLamaLamaClone

  useEffect(() => {
    if (!isDnaClone) return undefined
    document.documentElement.classList.add('dna-clone-active')
    return () => document.documentElement.classList.remove('dna-clone-active')
  }, [isDnaClone])

  useEffect(() => {
    if (!isLamaLamaClone) return undefined
    document.documentElement.classList.add('lama-lama-clone-active')
    return () => document.documentElement.classList.remove('lama-lama-clone-active')
  }, [isLamaLamaClone])

  useEffect(() => {
    if (!isCaseStudiesGallery) return undefined
    document.documentElement.classList.add('case-studies-gallery-active')
    return () => document.documentElement.classList.remove('case-studies-gallery-active')
  }, [isCaseStudiesGallery])

  /** Gallery → standard page: remount footer + re-init Lenis; refresh scroll metrics once scroller is ready. */
  useEffect(() => {
    if (isCaseStudiesGallery || isCloneRoute) return undefined

    const refreshScrollMetrics = () => {
      const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
      if (lenis?.resize) {
        try {
          lenis.resize()
        } catch (e) {
          /* noop */
        }
      }
      ScrollTrigger.refresh()
    }

    window.addEventListener('ensemble:scroll-ready', refreshScrollMetrics, { once: true })
    const timer = window.setTimeout(refreshScrollMetrics, 750)

    return () => {
      window.removeEventListener('ensemble:scroll-ready', refreshScrollMetrics)
      window.clearTimeout(timer)
    }
  }, [location.pathname, isCaseStudiesGallery, isCloneRoute])

  const useMainNativeScroll =
    useNativeMainScroller || (isCloneRoute && !lamaLamaIframeMode) || isCaseStudiesGallery

  // Re-init when native vs Lenis mode changes (F12 device toolbar, breakpoint cross, touch profile).
  useLocomotiveScroll(scrollContainerRef, {
    nativeOnly: useMainNativeScroll,
    skipScrollerProxy: (isCloneRoute && !lamaLamaIframeMode) || isCaseStudiesGallery,
  })

  const isHome = location.pathname === '/'
  const isHomeV2Neo = location.pathname === '/home-v2'
  const showHomeRibbonHelix =
    isHome && HOME_PAGE_DNA_HELIX_ENABLED && HOME_PAGE_HELIX_VARIANT === 'ribbon'
  const isAtmosphericPage = isAtmosphericRoute(location.pathname) && !isCloneRoute
  const showAmbientStarfield = shouldShowAmbientStarfield(location.pathname)
  const mainSurface = isDnaClone
    ? 'bg-transparent'
    : isLamaLamaClone
      ? 'bg-[#ffd8d0]'
      : isAtmosphericPage || isCaseStudiesGallery
        ? 'bg-transparent'
        : 'bg-white'

  return (
    <PixelTransitionProvider>
      <div
        ref={scrollContainerRef}
        id="main"
        className={`relative ${isCloneRoute || isCaseStudiesGallery ? 'scroll-pt-0' : 'scroll-pt-[6.75rem]'} ${mainSurface} ${lamaLamaIframeMode ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' : useMainNativeScroll ? 'native-main-scroll h-[100dvh] max-h-[100dvh] overflow-x-hidden overflow-y-auto' : 'h-[100dvh] max-h-[100dvh] overflow-hidden'}`}
      >
        {showHomeRibbonHelix ? (
          <Suspense fallback={null}>
            <DnaCapitalHelixCanvas
              key={`home-helix-${location.key}`}
              scrollRootId="main"
              theme="ensemble"
              introSource="home"
            />
          </Suspense>
        ) : null}
        <div
          data-scroll-content
          className={`relative ${lamaLamaIframeMode ? 'h-full min-h-0' : 'min-h-full'} ${mainSurface}${isHomeV2Neo ? ' home-v2-neo' : ''}`}
        >
          {isAtmosphericPage ? <HomeAtmosphereCanvas /> : null}
          {showAmbientStarfield ? <DeferredAmbientStarfield /> : null}
          {!isCloneRoute ? <ParallaxLayerRegistry /> : null}
          {children}
          {!isCloneRoute && !isCaseStudiesGallery ? <CinematicFooter /> : null}
        </div>
      </div>
      {!isCloneRoute ? (
        <div id="overlay" className="relative">
          <FullscreenNav />
          {!isCaseStudiesGallery ? <PopArtContactOrb /> : null}
        </div>
      ) : null}
      {!isCloneRoute && !isCaseStudiesGallery ? <SocialLinks links={SITE_SOCIAL_LINKS} /> : null}
    </PixelTransitionProvider>
  )
}

export default Layout
