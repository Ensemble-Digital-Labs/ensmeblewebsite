import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FullscreenNav from '../components/FullscreenNav'
import Footer from '../components/Footer'
import MovingCircle from '../components/MovingCircle'
import { useLocomotiveScroll } from '../lib/locomotive'
import { initScrollReveal } from '../lib/popprAnimations'
import { prefersReducedMotion } from '../lib/utils'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function Layout({ children }) {
  const scrollContainerRef = useRef(null)
  const location = useLocation()

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

  // Re-run scroll reveal when route changes (fixes "only hero visible" when returning to Home)
  useEffect(() => {
    const main = scrollContainerRef.current || document.querySelector('#main')
    if (!main) return

    const timer = setTimeout(() => {
      const ls = window.locomotiveScroll
      const lenis = ls?.lenisInstance ?? ls?.LenisInstance
      if (lenis?.scrollTo) {
        try { lenis.scrollTo(0, { immediate: true }) } catch (e) {}
      }
      if (lenis?.resize) {
        try { lenis.resize() } catch (e) {}
      }
      ScrollTrigger.refresh()
      initScrollReveal(main)
    }, 550)

    return () => clearTimeout(timer)
  }, [location.pathname])

  // Enable Locomotive Scroll globally for all pages
  useLocomotiveScroll(scrollContainerRef)

  return (
    <>
      <MovingCircle />
      <div
        ref={scrollContainerRef}
        id="main"
        className="relative h-screen overflow-hidden"
      >
        <div data-scroll-content className="relative">
          {children}
          <Footer />
        </div>
      </div>
      <div id="overlay" className="relative">
        <FullscreenNav />
      </div>
    </>
  )
}

export default Layout
