import LocomotiveScroll from 'locomotive-scroll'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { forceScrollMainToTop, shouldUseNativeMainScroll } from './utils'
import { initAllAnimations } from './popprAnimations'

gsap.registerPlugin(ScrollTrigger)

const DEBUG_LENIS_SCROLL = false

export function useLocomotiveScroll(containerRef, { homeDeck = false, nativeOnly = false } = {}) {
  useEffect(() => {
    if (!containerRef) return

    let locomotiveScrollInstance = null
    let boundScrollEl = null
    let nativeHandler = null

    let cancelled = false
    let initTimer = null

    const bindNativeScroller = (scrollEl) => {
      if (nativeOnly && typeof window !== 'undefined') {
        const existing = window.locomotiveScroll
        if (existing?.destroy) {
          try {
            existing.destroy()
          } catch (e) {
            /* noop */
          }
        }
        delete window.locomotiveScroll
        delete window.__ensembleLenis
      }

      boundScrollEl = scrollEl
      forceScrollMainToTop(scrollEl)

      // DNA clone preview has no GSAP scroll scenes — skip scrollerProxy to avoid blanking #main.
      if (!nativeOnly) {
        nativeHandler = () => {
          ScrollTrigger.update()
        }
        scrollEl.addEventListener('scroll', nativeHandler, { passive: true })

        ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (arguments.length) {
              scrollEl.scrollTop = value
              return value
            }
            return scrollEl.scrollTop
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          pinType: scrollEl.style.transform ? 'transform' : 'fixed',
        })

        ScrollTrigger.refresh()
      }

      forceScrollMainToTop(scrollEl)

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ensemble:scroll-ready'))
      }

      if (!nativeOnly) {
        setTimeout(() => {
          initAllAnimations(scrollEl)
        }, 1000)
      }
    }

    // DNA clone / native routes: never attach Lenis (prevents flash → blank).
    initTimer = window.setTimeout(() => {
      if (cancelled) return
      const scrollEl = containerRef.current
      if (!scrollEl) {
        console.warn('Locomotive Scroll: container ref not found')
        return
      }
      const contentEl = scrollEl.querySelector('[data-scroll-content]') || scrollEl.firstElementChild
      if (!contentEl) {
        console.warn('Locomotive Scroll: content element not found')
        return
      }

      // Standalone native scroll (DNA clone preview) or touch-primary devices.
      if (nativeOnly || shouldUseNativeMainScroll()) {
        bindNativeScroller(scrollEl)
        console.log(nativeOnly ? 'Scroll: native #main (DNA clone)' : 'Scroll: native #main (touch / reduced motion)')
        return
      }

      // Prevent multiple initializations
      if (typeof window !== 'undefined' && window.locomotiveScroll) {
        console.log('Locomotive Scroll already initialized, skipping...')
        forceScrollMainToTop(scrollEl)
        return
      }

      try {
        forceScrollMainToTop(scrollEl)
        locomotiveScrollInstance = new LocomotiveScroll({
          lenisOptions: {
            wrapper: scrollEl,
            content: contentEl,
            /* Home: act stepping in `HomeStoryViewport`; inner act stack uses native overflow scroll. */
            smoothWheel: !homeDeck,
            duration: homeDeck ? 1.05 : 1.4,
            wheelMultiplier: homeDeck ? 1 : 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        })
        
        // Store instance globally
        if (typeof window !== 'undefined') {
          window.locomotiveScroll = locomotiveScrollInstance
        }

        // Setup event listener - Locomotive Scroll v5 uses Lenis (lenisInstance)
        const lenis = locomotiveScrollInstance.lenisInstance || locomotiveScrollInstance.LenisInstance
        if (typeof window !== 'undefined' && lenis) {
          window.__ensembleLenis = lenis
        }
        if (lenis && typeof lenis.on === 'function') {
          lenis.on('scroll', () => ScrollTrigger.update())
        } else if (typeof locomotiveScrollInstance.on === 'function') {
          locomotiveScrollInstance.on('scroll', ScrollTrigger.update)
        }

        // Setup ScrollTrigger scroller proxy
        const getLenis = () => locomotiveScrollInstance?.lenisInstance || locomotiveScrollInstance?.LenisInstance
        let _scrollLogCount = 0
        ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (!locomotiveScrollInstance) return 0
            const lenis = getLenis()
            try {
              if (lenis) {
                if (arguments.length) {
                  lenis.scrollTo(value, { immediate: true })
                  return value
                }
                const scrollPos = typeof lenis.scroll === 'number' ? lenis.scroll : (lenis.scroll?.y ?? lenis.scroll ?? 0)
                if (DEBUG_LENIS_SCROLL && _scrollLogCount < 3) {
                  _scrollLogCount++
                  console.log('[Lenis proxy] scrollTop', {
                    raw: lenis.scroll,
                    used: scrollPos,
                    type: typeof lenis.scroll,
                  })
                }
                return scrollPos
              }
              return arguments.length ? value : (scrollEl.scrollTop || 0)
            } catch (e) {
              if (DEBUG_LENIS_SCROLL) console.warn('[Lenis proxy] scrollTop error', e)
              return arguments.length ? value : 0
            }
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          pinType: scrollEl.style.transform ? 'transform' : 'fixed',
        })

        ScrollTrigger.addEventListener('refresh', () => {
          const lenis = locomotiveScrollInstance?.lenisInstance || locomotiveScrollInstance?.LenisInstance
          if (lenis && typeof lenis.resize === 'function') {
            try { lenis.resize() } catch (e) {}
          }
        })
        
        ScrollTrigger.refresh()
        forceScrollMainToTop(scrollEl)

        const lenisRef = locomotiveScrollInstance?.lenisInstance || locomotiveScrollInstance?.LenisInstance
        const doResize = () => {
          if (lenisRef && typeof lenisRef.resize === 'function') {
            try {
              lenisRef.resize()
              ScrollTrigger.refresh()
            } catch (e) {
              /* noop */
            }
          }
        }
        setTimeout(doResize, 500)
        setTimeout(doResize, 2000)

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('ensemble:scroll-ready'))
        }

        setTimeout(() => {
          initAllAnimations(scrollEl)
        }, 1000)

        console.log('Locomotive Scroll initialized successfully')
      } catch (error) {
        console.error('Locomotive Scroll initialization error:', error)
      }
    }, nativeOnly ? 0 : 500)

    return () => {
      cancelled = true
      if (initTimer != null) window.clearTimeout(initTimer)
      if (nativeHandler && boundScrollEl) {
        boundScrollEl.removeEventListener('scroll', nativeHandler)
        try {
          ScrollTrigger.scrollerProxy(boundScrollEl, null)
        } catch (e) {
          try {
            ScrollTrigger.scrollerProxy(boundScrollEl, false)
          } catch (e2) {
            /* ignore */
          }
        }
      }
      if (locomotiveScrollInstance) {
        locomotiveScrollInstance.destroy()
        if (typeof window !== 'undefined') {
          delete window.locomotiveScroll
          delete window.__ensembleLenis
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [containerRef, homeDeck, nativeOnly])
}
