import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'
import { isMobileAnimationVariant } from '../../lib/animationProfile'

gsap.registerPlugin(ScrollTrigger)

function AboutHero() {
  const { hero } = aboutPageContent
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const glowRefs = useRef([])

  useEffect(() => {
    if (prefersReducedMotion() || isMobileAnimationVariant()) {
      const root = sectionRef.current
      if (!root) return
      gsap.set(
        root.querySelectorAll('.about-badge, .title-word, .accent-line, .hero-tagline, .story-panel'),
        { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 },
      )
      gsap.set(root.querySelectorAll('.accent-line'), { scaleX: 1 })
      return
    }

    // Torch: rAF + direct CSS vars (avoid gsap.to on every mousemove + full-section repaints)
    let rafId = 0
    let px = 0
    let py = 0
    const flush = () => {
      rafId = 0
      const el = sectionRef.current
      if (!el) return
      el.style.setProperty('--mouse-x', `${px}px`)
      el.style.setProperty('--mouse-y', `${py}px`)
    }
    const handleMouseMove = (e) => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      px = e.clientX - rect.left
      py = e.clientY - rect.top
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    const sectionEl = sectionRef.current
    sectionEl?.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 2. Entrance Animation Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.5 }
      })

      tl.fromTo('.about-badge',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo('.title-word',
          { opacity: 0, y: 100, rotateX: -45 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.2, duration: 1.2 },
          '-=0.8'
        )
        .fromTo('.accent-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1 },
          '-=1'
        )
        .fromTo('.hero-tagline',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0 },
          '-=0.8'
        )
        .fromTo('.story-panel',
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 },
          '-=1'
        )

      // 3. Scroll Parallax Animations
      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        scale: 1.1
      })

      glowRefs.current.forEach((glow, i) => {
        gsap.to(glow, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          },
          y: (i + 1) * 50,
          x: (i % 2 === 0 ? 1 : -1) * 30
        })
      })
    }, sectionRef)

    return () => {
      sectionEl?.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
      ctx.revert()
    }
  }, [])

  const addToGlowRefs = (el) => {
    if (el && !glowRefs.current.includes(el)) {
      glowRefs.current.push(el)
    }
  }

  return (
    <section
      id="about-hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent pt-24 sm:pt-28 md:pt-32"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
    >
      {/* Background Interactive Visual */}
      <div className="about-visual absolute inset-0 w-full h-full z-0 pointer-events-none" ref={visualRef}>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#14122a]/80 via-transparent to-[#14122a]/70" />

        {/* Base Layer (Dim) */}
        <img
          src={hero.image}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 mix-blend-luminosity"
        />

        {/* Torch Reveal Layer (Bright) */}
        <div
          className="absolute inset-0 z-20"
          style={{
            maskImage: `radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)`
          }}
        >
          <img
            src={hero.image}
            alt=""
            decoding="async"
            fetchPriority="low"
            className="w-full h-full object-cover grayscale opacity-50 mix-blend-screen"
          />
          {/* Subtle Color Torch Glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), rgba(163, 116, 255, 0.3), transparent 70%)`
            }}
          ></div>
        </div>

        {/* Decorative Ambience */}
        <div ref={addToGlowRefs} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[150px] opacity-20"></div>
        <div ref={addToGlowRefs} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] opacity-10"></div>
      </div>

      {/* Dark overlay for darker background */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[#14122a]/20" aria-hidden />

      <Container className="relative z-20">
        <div className="max-w-6xl mx-auto" ref={contentRef}>
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column - Large Typography */}
            <div className="mb-12 lg:mb-0">
              <div className="about-badge mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 opacity-0 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/75">{hero.subtitle}</span>
              </div>

              <div className="main-text perspective-1000">
                {(() => {
                  const words = hero.title.trim().split(/\s+/)
                  const firstPart = words.length > 1 ? words.slice(0, -1).join(' ') : hero.title
                  const lastWord = words.length > 1 ? words[words.length - 1] : null
                  return (
                    <h1 className="title-word font-display mb-8 text-6xl font-bold leading-[0.95] tracking-[-0.04em] text-white opacity-0 lg:text-7xl xl:text-8xl">
                      <span className="block">{firstPart}</span>
                      {lastWord ? (
                        <span className="block mt-1 bg-gradient-to-r from-brand-primary via-amber-400 to-brand-primary bg-clip-text text-transparent italic">
                          {lastWord}
                        </span>
                      ) : null}
                    </h1>
                  )
                })()}
              </div>

              <div className="accent-line w-24 h-1 bg-gradient-to-r from-brand-primary to-transparent mb-8"></div>

              <p className="hero-tagline text-2xl font-medium tracking-tight text-white/85 opacity-0 lg:text-3xl">
                {hero.tagline}
              </p>
            </div>

            {/* Right Column - Storytelling Panel */}
            <div className="relative">
              <div className="story-panel relative z-10 rounded-[2.5rem] border border-white/12 bg-white/[0.06] p-8 opacity-0 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:p-12">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-brand-primary/40 rounded-tl-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-brand-primary/40 rounded-br-2xl"></div>

                <p className="text-lg leading-relaxed text-white/75 lg:text-xl">
                  {hero.description}
                </p>
              </div>

              {/* Animated Ring Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full z-0 animate-ping-slow pointer-events-none"></div>
            </div>

          </div>
        </div>
      </Container>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes pingSlow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
        .animate-ping-slow { animation: pingSlow 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </section>
  )
}

export default AboutHero
