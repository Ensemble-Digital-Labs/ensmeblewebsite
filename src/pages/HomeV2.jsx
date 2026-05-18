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
import { heroContent } from '../lib/content'
import {
  isHomeIntroLoaderDone,
  markHomeIntroLoaderDone,
} from '../lib/homeLoaderGate'
import '../styles/home-v2-neo.css'

/**
 * Full legacy homepage with neo hollow Orbitron typography — route `/home-v2`.
 * Typography is scoped via `.home-v2-neo` on the scroll shell in `layout.jsx`.
 */
function HomeV2() {
  const [loaderComplete, setLoaderComplete] = useState(() => isHomeIntroLoaderDone())
  const [userTestimonials, setUserTestimonials] = useState(() => getStoredUserTestimonials())

  const handleUserTestimonialAdded = useCallback((newT) => {
    setUserTestimonials((prev) => {
      const next = [...prev, newT]
      persistUserTestimonials(next)
      return next
    })
  }, [])

  useEffect(() => {
    if (!loaderComplete) return
    const main = document.querySelector('#main')
    if (!main) return

    const timer = setTimeout(() => {
      forceScrollMainToTop(main)
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
      <div className="min-h-screen relative" aria-label="Home v2 neo typography">
        <HeroScrollExpand
          welcomeLine={heroContent.heroWelcomeLine}
          leadText={heroContent.heroScrollExpandHeadlineLines?.[0] ?? 'Welcome to'}
          focalText={heroContent.heroScrollExpandHeadlineLines?.[1] ?? 'Ensemble'}
          tailText={heroContent.heroScrollExpandHeadlineLines?.[2] ?? 'Digital Labs'}
          mobileLeadText={heroContent.headlineLines?.[0] ?? 'Not just a'}
          mobileFocalText={
            Array.isArray(heroContent.headlineLines) && heroContent.headlineLines.length >= 3
              ? heroContent.headlineLines[1]
              : (heroContent.headlineLines?.[1] ?? 'marketing agency')
          }
          mobileTailText={
            Array.isArray(heroContent.headlineLines) && heroContent.headlineLines.length >= 3
              ? (heroContent.headlineLines[2] ?? '')
              : ''
          }
        />
        <ParallaxLayerShowcase />
        <HeroStatsTrustBand />
        <HomeProblemSection />
        <Carousel3D />
        <HomeRoadmapSection />
        <TestimonialsCollage userTestimonials={userTestimonials} />
        <ShareExperienceSection onTestimonialAdded={handleUserTestimonialAdded} />
      </div>
    </>
  )
}

export default HomeV2
