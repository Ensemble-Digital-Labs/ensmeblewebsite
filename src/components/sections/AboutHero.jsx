import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'
import { initLeftArrow } from '../../lib/popprAnimations'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function AboutHero() {
  const { hero } = aboutPageContent
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const glowRefs = useRef([])

  useEffect(() => {
    if (prefersReducedMotion()) return

    // 1. Torch Spotlight Logic (Mouse Movement)
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Use GSAP for smoother torch tracking
      gsap.to(sectionRef.current, {
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

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

    // Initialize poppr arrow with delay
    const timer = setTimeout(() => {
      initLeftArrow('.about-arrow-container')
    }, 500)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ctx.revert()
      clearTimeout(timer)
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
      className="relative min-h-screen flex items-center justify-center bg-[#0A0A0B] overflow-hidden pt-20"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
    >
      {/* Background Interactive Visual */}
      <div className="about-visual absolute inset-0 w-full h-full z-0 pointer-events-none" ref={visualRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/90 via-transparent to-[#0A0A0B] z-10"></div>

        {/* Base Layer (Dim) */}
        <img
          src={hero.image}
          alt=""
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
        <div ref={addToGlowRefs} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <Container className="relative z-20">
        <div className="max-w-6xl mx-auto" ref={contentRef}>
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column - Large Typography */}
            <div className="mb-12 lg:mb-0">
              <div className="about-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 opacity-0">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                <span className="text-xs font-bold text-white uppercase tracking-[0.3em]">{hero.subtitle}</span>
              </div>

              <div className="main-text perspective-1000">
                <h1 className="title-word text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 tracking-[-0.04em] leading-[0.95] opacity-0">
                  {hero.title.split(' ')[0]}
                </h1>
                <h1 className="title-word text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-[-0.04em] leading-[0.95] opacity-0 text-right lg:text-left">
                  <span className="bg-gradient-to-r from-brand-primary via-purple-400 to-brand-primary bg-clip-text text-transparent italic">
                    {hero.title.split(' ')[1]}
                  </span>
                </h1>
              </div>

              <div className="accent-line w-24 h-1 bg-gradient-to-r from-brand-primary to-transparent mb-8"></div>

              <p className="hero-tagline text-2xl lg:text-3xl text-white/90 font-medium tracking-tight opacity-0">
                {hero.tagline}
              </p>
            </div>

            {/* Right Column - Storytelling Panel */}
            <div className="relative">
              <div className="story-panel p-8 lg:p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 relative z-10 shadow-2xl opacity-0">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-brand-primary/40 rounded-tl-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-brand-primary/40 rounded-br-2xl"></div>

                <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
                  {hero.description}
                </p>
              </div>

              {/* Animated Ring Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full z-0 animate-ping-slow pointer-events-none"></div>
            </div>

          </div>
        </div>
      </Container>

      {/* Poppr Style Scroll Arrow */}
      <div className="about-arrow-container left-arrow absolute left-12 bottom-12 z-30 hidden lg:block">
        <div className="arrow-circle w-16 h-16 rounded-full border border-brand-primary flex items-center justify-center cursor-pointer transition-all duration-1000">
          <div className="arrow relative h-6 w-3 overflow-hidden">
            <img
              id="arrow-initial"
              src="/assets/images/arrow-up.svg"
              alt="scroll down"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
              style={{ top: '3.5vh', filter: 'brightness(0) invert(1)' }}
            />
            <img
              id="arrow-after"
              src="/assets/images/arrow-up.svg"
              alt="scroll down"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
              style={{ top: '-3vh', filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      </div>

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
