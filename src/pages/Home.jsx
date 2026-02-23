import { useState, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from '../components/Loader'
import Hero from '../components/sections/Hero'
import Page2 from '../components/sections/Page2'
import Carousel3D from '../components/sections/Carousel3D'
import Page4 from '../components/sections/Page4'
import TestimonialsCollage from '../components/sections/TestimonialsCollage'
import Page5 from '../components/sections/Page5'
import { initScrollReveal } from '../lib/popprAnimations'

function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false)

  // Run scroll reveal when Home content is in the DOM (after loader). Fixes "only hero visible" when returning to Home.
  useEffect(() => {
    if (!loaderComplete) return
    const main = document.querySelector('#main')
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
    }, 150)

    return () => clearTimeout(timer)
  }, [loaderComplete])

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      {/* Min-height keeps footer below viewport on load (Loader is fixed, so without this the footer shows first) */}
      <div className="min-h-screen relative">
        {loaderComplete && (
          <>
            <Hero /> {/* page1 */}
            <Page2 /> {/* page2 - Selected Work header */}
            <Carousel3D /> {/* page3 - 3D carousel */}
            <Page4 /> {/* page4 - Featured Insights */}
            <TestimonialsCollage /> {/* testimonials: animated collage + hover popup */}
            <Page5 /> {/* page5 - Let's make great work together */}
          </>
        )}
      </div>
    </>
  )
}

export default Home
