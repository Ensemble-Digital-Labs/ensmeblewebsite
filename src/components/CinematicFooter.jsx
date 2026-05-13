import * as React from 'react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn, prefersReducedMotion, shouldUseNativeMainScroll } from '../lib/utils'
import { getAnimationVariant } from '../lib/animationProfile'
import { growthHeroCtaArrow, growthPrimaryHero } from '../lib/growthCtaClasses'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Magnetic hover (2D) — works with button / anchor / React Router Link.
 */
const MagneticButton = React.forwardRef(function MagneticButton(
  { className, children, as: Component = 'button', ...props },
  forwardedRef
) {
  const localRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const element = localRef.current
    if (!element) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const x = e.clientX - cx
      const y = e.clientY - cy
      gsap.to(element, {
        x: x * 0.28,
        y: y * 0.28,
        scale: 1.05,
        ease: 'power2.out',
        duration: 0.35,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        ease: 'elastic.out(1, 0.35)',
        duration: 0.9,
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      gsap.killTweensOf(element)
    }
  }, [])

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <Component ref={setRefs} className={cn('cursor-pointer', className)} {...props}>
      {children}
    </Component>
  )
})

function MarqueeRow() {
  return (
    <div className="flex items-center gap-10 px-6 md:gap-14">
      <span>HIPAA-aware growth</span>
      <span className="text-teal-500/50">·</span>
      <span>Strategy & creative</span>
      <span className="text-amber-400/55">·</span>
      <span>Performance marketing</span>
      <span className="text-teal-500/50">·</span>
      <span>Patient acquisition</span>
      <span className="text-amber-400/55">·</span>
      <span>Medical innovation</span>
      <span className="text-teal-500/50">·</span>
    </div>
  )
}

function scrollMainToTop() {
  const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
  if (lenis?.scrollTo) {
    try {
      lenis.scrollTo(0, { duration: 1.15 })
      return
    } catch (e) {
      /* fall through */
    }
  }
  const main = document.querySelector('#main')
  if (main) {
    try {
      main.scrollTo({ top: 0, behavior: 'smooth' })
      return
    } catch (e) {
      /* fall through */
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function CinematicFooter() {
  const wrapperRef = useRef(null)
  const giantTextRef = useRef(null)
  const headingRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const main = document.querySelector('#main')
    if (!main || !wrapperRef.current) return

    /** Mobile profile (narrow / touch-native scroll): ScrollTrigger scrub often leaves footer at opacity 0 on `#main`. */
    const staticFooterReveal = prefersReducedMotion() || getAnimationVariant() === 'mobile'

    if (staticFooterReveal) {
      if (giantTextRef.current) gsap.set(giantTextRef.current, { y: 0, scale: 1, opacity: 0.4, clearProps: 'transform' })
      if (headingRef.current) gsap.set(headingRef.current, { y: 0, opacity: 1 })
      if (linksRef.current) gsap.set(linksRef.current, { y: 0, opacity: 1 })
      return undefined
    }

    const touchPerf = shouldUseNativeMainScroll()
    const scrubHero = touchPerf ? true : 1.1
    const scrubLinks = touchPerf ? true : 1

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: '8vh', scale: 0.88, opacity: 0 },
        {
          y: '0vh',
          scale: 1,
          opacity: 0.55,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            scroller: main,
            start: 'top 88%',
            end: 'bottom bottom',
            scrub: scrubHero,
          },
        }
      )

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            scroller: main,
            start: 'top 72%',
            end: 'bottom bottom',
            scrub: scrubLinks,
          },
        }
      )
    }, wrapperRef)

    const refresh = () => ScrollTrigger.refresh()
    const t = requestAnimationFrame(refresh)
    const t2 = setTimeout(refresh, 400)

    return () => {
      cancelAnimationFrame(t)
      clearTimeout(t2)
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-[100svh] h-[100svh] w-full"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="cinematic-footer-wrapper pointer-events-none fixed bottom-0 left-0 flex h-[100svh] min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#050816] text-zinc-100">
        <div className="footer-aurora animate-footer-breathe absolute left-1/2 top-1/2 z-0 h-[58vh] w-[min(88vw,1100px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px] pointer-events-none" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 select-none pointer-events-none whitespace-nowrap lg:bottom-[10vh] xl:bottom-[14vh] 2xl:bottom-[16vh]"
          aria-hidden
        >
          ENSEMBLE
        </div>

        <div className="absolute top-10 left-0 z-10 w-full -rotate-2 scale-[1.06] overflow-hidden border-y border-white/[0.07] bg-[#050816]/75 py-3 shadow-2xl backdrop-blur-md md:top-12">
          <div className="animate-footer-scroll-marquee flex w-max text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 md:text-xs">
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-16 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pointer-events-auto md:mt-20">
          <h2
            ref={headingRef}
            className="footer-neon-heading section-heading-neon growth-gradient-text mb-10 text-center text-4xl sm:text-6xl md:mb-12 md:text-7xl lg:text-8xl"
          >
            Ready to grow your practice?
          </h2>

          <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
              <MagneticButton
                as={Link}
                to="/contact"
                className={cn(growthPrimaryHero, 'no-underline')}
              >
                <span className="flex-1 text-center">Get in Touch</span>
                <span className={growthHeroCtaArrow} aria-hidden>
                  →
                </span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                to="/services"
                className={cn(growthPrimaryHero, 'no-underline')}
              >
                <span className="flex-1 text-center">Our Services</span>
                <span className={growthHeroCtaArrow} aria-hidden>
                  →
                </span>
              </MagneticButton>
            </div>

            <div className="mt-1 flex w-full flex-wrap justify-center gap-2 md:gap-4">
              <MagneticButton
                as={Link}
                to="/privacy-policy"
                className={cn(growthPrimaryHero, 'no-underline text-sm sm:text-base')}
              >
                <span className="flex-1 text-center">Privacy Policy</span>
                <span className={growthHeroCtaArrow} aria-hidden>
                  →
                </span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                to="/terms"
                className={cn(growthPrimaryHero, 'no-underline text-sm sm:text-base')}
              >
                <span className="flex-1 text-center">Terms of Service</span>
                <span className={growthHeroCtaArrow} aria-hidden>
                  →
                </span>
              </MagneticButton>
              <MagneticButton
                as={Link}
                to="/contact"
                className={cn(growthPrimaryHero, 'no-underline text-sm sm:text-base')}
              >
                <span className="flex-1 text-center">Support</span>
                <span className={growthHeroCtaArrow} aria-hidden>
                  →
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-5 pb-8 pointer-events-auto md:flex-row md:px-10 lg:px-12">
          <div className="order-2 text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:order-1 md:text-left md:text-xs">
            © {new Date().getFullYear()} Ensemble Digital Labs. All rights reserved.
          </div>

          <div className="footer-glass-pill order-1 flex max-w-md flex-col items-center justify-center gap-1 rounded-2xl border-white/10 px-6 py-3 text-center sm:flex-row sm:gap-3 sm:rounded-full sm:py-2.5 md:order-2">
            <span className="hero-eyebrow-tech text-[10px] md:text-[11px]">
              Ensemble Digital Labs
            </span>
            <span className="hidden h-3 w-px shrink-0 bg-white/15 sm:inline-block" aria-hidden />
            <span className="text-[11px] leading-snug text-zinc-400 sm:max-w-[220px] sm:text-left md:max-w-none">
              Marketing & technology engineered for clinical credibility and patient growth.
            </span>
          </div>

          <MagneticButton
            as="button"
            type="button"
            onClick={scrollMainToTop}
            className="group footer-glass-pill order-3 flex h-12 w-12 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-100"
            aria-label="Back to top"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  )
}

/**
 * Slim diagonal marquee band — place between home sections for scroll rhythm (optional).
 */
const bandSegments = (
  <>
    <span>HIPAA-aware</span>
    <span className="text-teal-500/45">·</span>
    <span>Strategy</span>
    <span className="text-amber-500/45">·</span>
    <span>Creative</span>
    <span className="text-teal-500/45">·</span>
    <span>Performance</span>
    <span className="text-amber-500/45">·</span>
    <span>Patient growth</span>
    <span className="text-teal-500/45">·</span>
  </>
)

export function CinematicSectionBand({ className = '' }) {
  return (
    <div
      className={cn(
        'cinematic-section-band pointer-events-none relative z-[1] w-full overflow-hidden border-y border-white/[0.06] bg-[#050816]/40 py-2 backdrop-blur-[2px] -rotate-1',
        className
      )}
      aria-hidden
    >
      <div className="band-marquee flex w-max items-center gap-10 px-6 text-[9px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:text-[10px]">
        <div className="flex items-center gap-10">{bandSegments}</div>
        <div className="flex items-center gap-10">{bandSegments}</div>
      </div>
    </div>
  )
}

export default CinematicFooter
