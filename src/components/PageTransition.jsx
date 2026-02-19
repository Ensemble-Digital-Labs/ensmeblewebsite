import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function PageTransition({ children }) {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('entered')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsLoading(true)
      setTransitionStage('exiting')
    }
  }, [location.pathname, displayLocation.pathname])

  useEffect(() => {
    if (isLoading) {
      // Update Locomotive Scroll before transition
      const ls = window.locomotiveScroll
      const lenis = ls?.lenisInstance ?? ls?.LenisInstance
      if (lenis?.scrollTo) {
        try { lenis.scrollTo(0, { immediate: true }) } catch (e) {}
      } else if (ls?.scrollTo) {
        try { ls.scrollTo(0, { immediate: true }) } catch (e) {}
      }

      // Exit animation
      const exitTimeline = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location)
          setTransitionStage('entering')
          
          // Small delay before entering animation
          setTimeout(() => {
            setIsLoading(false)
            
            // Update Locomotive Scroll after page change
            setTimeout(() => {
              const ls = window.locomotiveScroll
              const lenis = ls?.lenisInstance ?? ls?.LenisInstance
              if (lenis?.resize) {
                try { lenis.resize(); ScrollTrigger.refresh() } catch (e) {}
              } else if (ls?.update) {
                try { ls.update() } catch (e) {}
              }
            }, 100)
          }, 50)
        }
      })

      exitTimeline
        .to('.page-transition-overlay', {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        })
        .to('.page-transition-loader', {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }, '-=0.2')
    }
  }, [isLoading, location])

  useEffect(() => {
    if (!isLoading && transitionStage === 'entering') {
      // Enter animation
      const enterTimeline = gsap.timeline({
        onComplete: () => {
          setTransitionStage('entered')
        }
      })

      enterTimeline
        .to('.page-transition-loader', {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
        .to('.page-transition-overlay', {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.2')
        .set('.page-transition-overlay', { 
          opacity: 0,
          display: 'none' 
        })
    }
  }, [isLoading, transitionStage])

  return (
    <>
      {/* Transition Overlay */}
      <div 
        className="page-transition-overlay fixed inset-0 z-[999999] bg-bg-primary pointer-events-none opacity-0" 
        style={{ 
          display: (transitionStage === 'exiting' || transitionStage === 'entering') ? 'block' : 'none',
          pointerEvents: (transitionStage === 'exiting' || transitionStage === 'entering') ? 'auto' : 'none'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="page-transition-loader text-center transform scale-75 opacity-0">
            {/* ENSEMBLE Logo */}
            <h3 className="text-6xl sm:text-7xl font-bold text-brand-primary mb-8 font-['Antique_Olive',sans-serif]">
              ENSEMBLE
            </h3>
            {/* Loading Animation */}
            <div className="w-16 h-12 mx-auto">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-8 border-2 border-brand-primary rounded-full flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-brand-primary rounded-full absolute animate-pulse"></div>
                  <div className="absolute inset-0 border-2 border-brand-primary rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div
        key={displayLocation.pathname}
        className={`page-content ${transitionStage}`}
      >
        {children}
      </div>
    </>
  )
}

export default PageTransition
