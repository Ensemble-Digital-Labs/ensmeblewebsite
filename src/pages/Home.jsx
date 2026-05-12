import { useState, useEffect, useCallback } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from '../components/Loader'
import HeroScrollExpand from '../components/sections/HeroScrollExpand'
import HeroStatsTrustBand from '../components/sections/HeroStatsTrustBand'
import Carousel3D from '../components/sections/Carousel3D'
import HomeProblemSection from '../components/sections/HomeProblemSection'
import HomeRoadmapSection from '../components/sections/HomeRoadmapSection'
import TestimonialsCollage from '../components/sections/TestimonialsCollage'
import ShareExperienceSection from '../components/sections/ShareExperienceSection'
import ParallaxLayerShowcase from '../components/sections/ParallaxLayerShowcase'
import { initScrollReveal } from '../lib/popprAnimations'
import { forceScrollMainToTop } from '../lib/utils'
import {
  getStoredUserTestimonials,
  persistUserTestimonials,
} from '../lib/userTestimonialsStorage'
import {
  isHomeIntroLoaderDone,
  markHomeIntroLoaderDone,
} from '../lib/homeLoaderGate'

function Home() {
  const [loaderComplete, setLoaderComplete] = useState(() => isHomeIntroLoaderDone())
  const [userTestimonials, setUserTestimonials] = useState(() => getStoredUserTestimonials())

  const handleUserTestimonialAdded = useCallback((newT) => {
    setUserTestimonials((prev) => {
      const next = [...prev, newT]
      persistUserTestimonials(next)
      return next
    })
  }, [])

  // Run scroll reveal when Home content is in the DOM (after loader). Fixes "only hero visible" when returning to Home.
  useEffect(() => {
    if (!loaderComplete) return
    const main = document.querySelector('#main')
    if (!main) return

    const timer = setTimeout(() => {
      forceScrollMainToTop(main)
      const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
      if (lenis?.resize) {
        try { lenis.resize() } catch (e) {}
      }
      ScrollTrigger.refresh()
      initScrollReveal(main)
      forceScrollMainToTop(main)
      requestAnimationFrame(() => {
        forceScrollMainToTop(main)
        requestAnimationFrame(() => forceScrollMainToTop(main))
      })
    }, 150)

    return () => clearTimeout(timer)
  }, [loaderComplete])

  return (
    <>
      {!loaderComplete && (
        <Loader
          onComplete={() => {
            markHomeIntroLoaderDone()
            setLoaderComplete(true)
          }}
        />
      )}
      {/*
        Keep Home sections mounted while the intro loader runs: `#main` keeps real height so
        native / Lenis scroll is not a dead zone, and `pointer-events-none` on the loader lets
        touch scrolling pass through the overlay.
      */}
      <div className="min-h-screen relative">
        <HeroScrollExpand /> {/* page1 — scroll-driven media expand */}
        <HeroStatsTrustBand />
        <ParallaxLayerShowcase />
        <HomeProblemSection />
        <Carousel3D /> {/* page2 + page3: Selected Work + 3D carousel */}
        <HomeRoadmapSection /> {/* page4 — roadmap teaser */}
        <TestimonialsCollage userTestimonials={userTestimonials} />
        <ShareExperienceSection onTestimonialAdded={handleUserTestimonialAdded} />
      </div>
    </>
  )
}

export default Home
