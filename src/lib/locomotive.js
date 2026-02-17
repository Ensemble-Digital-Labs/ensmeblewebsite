import LocomotiveScroll from 'locomotive-scroll'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './utils'
import { initAllAnimations } from './popprAnimations'

gsap.registerPlugin(ScrollTrigger)

export function useLocomotiveScroll(containerRef) {
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef) return

    // Prevent multiple initializations
    if (typeof window !== 'undefined' && window.locomotiveScroll) {
      console.log('Locomotive Scroll already initialized, skipping...')
      return
    }

    let locomotiveScrollInstance = null

    // Wait for container to be ready
    const timer = setTimeout(() => {
      const scrollEl = containerRef.current
      if (!scrollEl) {
        console.warn('Locomotive Scroll: container ref not found')
        return
      }

      try {
        locomotiveScrollInstance = new LocomotiveScroll({
          el: scrollEl,
          smooth: true,
          mobile: {
            smooth: true,
          },
        })
        
        // Store instance globally
        if (typeof window !== 'undefined') {
          window.locomotiveScroll = locomotiveScrollInstance
        }

        // Setup event listener - Locomotive Scroll v5 uses Lenis
        if (locomotiveScrollInstance.LenisInstance) {
          // v5 API - use LenisInstance
          locomotiveScrollInstance.LenisInstance.on('scroll', () => {
            ScrollTrigger.update()
          })
        } else if (locomotiveScrollInstance.scroll && typeof locomotiveScrollInstance.scroll.on === 'function') {
          // Alternative v5 API
          locomotiveScrollInstance.scroll.on('scroll', () => {
            ScrollTrigger.update()
          })
        } else if (typeof locomotiveScrollInstance.on === 'function') {
          // v3/v4 API
          locomotiveScrollInstance.on('scroll', ScrollTrigger.update)
        }

        // Setup ScrollTrigger scroller proxy
        ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (!locomotiveScrollInstance) return 0
            
            try {
              // Locomotive Scroll v5 uses Lenis - check for LenisInstance
              if (locomotiveScrollInstance.LenisInstance) {
                // v5 API with Lenis
                if (arguments.length) {
                  locomotiveScrollInstance.LenisInstance.scrollTo(value, { immediate: true })
                  return value
                } else {
                  return locomotiveScrollInstance.LenisInstance.scroll
                }
              } else if (locomotiveScrollInstance.scroll && locomotiveScrollInstance.scroll.instance) {
                // v3/v4 API
                return arguments.length
                  ? locomotiveScrollInstance.scrollTo(value, 0, 0)
                  : locomotiveScrollInstance.scroll.instance.scroll.y
              } else {
                // Fallback - return current scroll position
                return arguments.length ? value : (scrollEl.scrollTop || 0)
              }
            } catch (e) {
              // Silently return 0 to prevent console spam
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
          if (locomotiveScrollInstance) {
            try {
              // v5 API - LenisInstance has resize method
              if (locomotiveScrollInstance.LenisInstance && typeof locomotiveScrollInstance.LenisInstance.resize === 'function') {
                locomotiveScrollInstance.LenisInstance.resize()
              } else if (locomotiveScrollInstance.scroll && typeof locomotiveScrollInstance.scroll.update === 'function') {
                locomotiveScrollInstance.scroll.update()
              } else if (typeof locomotiveScrollInstance.update === 'function') {
                locomotiveScrollInstance.update()
              }
            } catch (e) {
              // Silently handle - prevent console spam
            }
          }
        })
        
        ScrollTrigger.refresh()

        // Update after elements are rendered
        setTimeout(() => {
          if (locomotiveScrollInstance) {
            try {
              // v5 API - trigger resize to recalculate
              if (locomotiveScrollInstance.LenisInstance && typeof locomotiveScrollInstance.LenisInstance.resize === 'function') {
                locomotiveScrollInstance.LenisInstance.resize()
              } else if (locomotiveScrollInstance.scroll && typeof locomotiveScrollInstance.scroll.update === 'function') {
                locomotiveScrollInstance.scroll.update()
              } else if (typeof locomotiveScrollInstance.update === 'function') {
                locomotiveScrollInstance.update()
              }
              ScrollTrigger.refresh()
            } catch (e) {
              // Silently handle
            }
          }
        }, 500)

        // Initialize all poppr animations after Locomotive Scroll is ready
        setTimeout(() => {
          initAllAnimations(scrollEl)
        }, 1000)

        console.log('Locomotive Scroll initialized successfully')
      } catch (error) {
        console.error('Locomotive Scroll initialization error:', error)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      if (locomotiveScrollInstance) {
        locomotiveScrollInstance.destroy()
      }
      if (typeof window !== 'undefined') {
        delete window.locomotiveScroll
      }
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [containerRef])
}
