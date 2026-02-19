import { useEffect, useRef } from 'react'
import FullscreenNav from '../components/FullscreenNav'
import Footer from '../components/Footer'
import MovingCircle from '../components/MovingCircle'
import { useLocomotiveScroll } from '../lib/locomotive'
import { prefersReducedMotion } from '../lib/utils'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function Layout({ children }) {
  const scrollContainerRef = useRef(null)

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
