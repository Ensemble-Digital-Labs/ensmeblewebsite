import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'
import { isMobileAnimationVariant } from '../../lib/animationProfile'

gsap.registerPlugin(ScrollTrigger)

function WhyChooseUs() {
  const { whyChooseUs, hero } = aboutPageContent
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const gridRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const tiltRafRef = useRef(0)
  const tiltPendingRef = useRef({ rx: 0, ry: 0 })

  const stats = whyChooseUs?.stats || []
  
  // Dynamic images based on the feature hovered
  const hoverImages = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', // HIPAA
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', // One-Stop
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', // Local Market
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', // Expertise
  ]

  // Perspective tilt — rAF + gsap.set avoids stacking tweens on every mousemove (main-thread jank)
  const handleMouseMove = (e) => {
    if (!imageRef.current || isMobileAnimationVariant()) return
    const el = imageRef.current
    const { clientX, clientY } = e
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    tiltPendingRef.current = { ry: x * 12, rx: -y * 12 }
    if (tiltRafRef.current) return
    tiltRafRef.current = requestAnimationFrame(() => {
      tiltRafRef.current = 0
      if (!imageRef.current) return
      const { rx, ry } = tiltPendingRef.current
      gsap.set(imageRef.current, {
        rotateY: ry,
        rotateX: rx,
        transformPerspective: 1200,
      })
    })
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.5,
      ease: 'expo.out'
    })
  }

  useEffect(() => {
    let ctx;
    const initAnimations = () => {
      if (!sectionRef.current || !document.querySelector('#main')) return

      ctx = gsap.context(() => {
        // 1. Heading Entrance
        gsap.fromTo('.section-heading', 
          { y: 60, rotateX: -45, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: "#main",
              start: 'top 85%',
            }
          }
        )

        // 2. Parallax for text
        gsap.to(textRef.current, {
          y: -120,
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: "#main",
            scrub: 1.2,
          }
        })

        // 3. Main Container Reveal
        gsap.fromTo('.main-visual-container',
          { scale: 0.98, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1.8, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: "#main",
              start: 'top 80%',
            }
          }
        )

        // 4. Grid Stagger
        const cells = gsap.utils.toArray('.blueprint-cell')
        gsap.fromTo(cells, 
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              scroller: "#main",
              start: 'top 90%',
            }
          }
        )
      }, sectionRef)
    }

    // Was 1200ms — felt broken on navigation; Locomotive is ready within a frame or two on #main
    const delayMs = isMobileAnimationVariant() ? 0 : 64
    const timer = setTimeout(initAnimations, delayMs)
    return () => {
      clearTimeout(timer)
      if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current)
      tiltRafRef.current = 0
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-40">
      <Container className="relative z-10">
        {/* Section Heading with Modern Badging */}
        <div className="section-heading mb-20 lg:mb-28 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Ensemble Core Advantage</span>
          </div>
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white lg:text-7xl">
            {whyChooseUs.title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 mb-2">{word}</span>
            ))}
          </h2>
        </div>

        <div className="main-visual-container relative flex min-h-[620px] flex-col items-stretch gap-0 overflow-hidden rounded-xl border border-white/12 bg-white/[0.04] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.45)] lg:flex-row">
          
          {/* Tactical Corner Brackets */}
          <div className="pointer-events-none absolute left-4 top-4 z-50 h-10 w-10 rounded-tl-lg border-l-2 border-t-2 border-white/15" />
          <div className="pointer-events-none absolute bottom-4 right-4 z-50 h-10 w-10 rounded-br-lg border-b-2 border-r-2 border-white/15" />

          {/* LEFT: Semi-circular image + Large vertical text */}
          <div 
            className="relative flex min-h-[420px] w-full flex-col justify-center overflow-hidden bg-white/[0.03] lg:min-h-full lg:w-[45%]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Vertical Decorative Text - ENSEMBLE */}
            <div ref={textRef} className="absolute left-8 lg:left-10 z-30 pointer-events-none">
              <h2 className="font-display text-[clamp(5rem,12vw,10rem)] font-black leading-none tracking-tighter text-brand-primary opacity-[0.15] select-none uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                ENSEMBLE
              </h2>
            </div>

            {/* Active Feature Coordinate Display */}
            <div className="absolute top-10 left-10 z-40 font-mono text-[9px] text-brand-primary/40 tracking-widest hidden lg:block">
              REF://SYS_CORE_00{activeIndex + 1}<br/>
              LOC://ENV_SYNC_OK
            </div>

            {/* Semi-circular Image Container */}
            <div 
              ref={imageRef}
              className="absolute right-0 top-1/2 z-20 aspect-[3/4] w-[85%] -translate-y-1/2 overflow-hidden rounded-l-full border-y-[12px] border-l-[12px] border-white/20 bg-[#14122a]/40 shadow-[-40px_0_80px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out lg:w-[90%]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {hoverImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  decoding="async"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-110 ${
                    activeIndex === idx ? 'opacity-100 translate-x-0 grayscale-0' : 'opacity-0 -translate-x-8 grayscale-[1]'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: High-Precision Grid */}
          <div ref={gridRef} className="grid flex-1 grid-cols-1 divide-x divide-y divide-white/10 border-l border-white/10 bg-white/[0.02] sm:grid-cols-2">
            {stats.map((stat, index) => {
              const isActive = activeIndex === index
              return (
                <div
                  key={stat.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`blueprint-cell group relative flex h-full cursor-default flex-col overflow-hidden p-12 transition-all duration-700 lg:p-16 ${
                    isActive ? 'bg-brand-primary text-white' : 'bg-transparent hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="relative z-10 h-full flex flex-col">
                    <span className={`text-[10px] font-mono tracking-[0.4em] font-bold uppercase mb-10 block transition-colors duration-500 ${
                      isActive ? 'text-white/50' : 'text-brand-primary/40'
                    }`}>
                      00{index + 1} // SYS.MOD
                    </span>
                    
                    <h3 className={`mb-8 text-3xl font-bold leading-[1] tracking-tight transition-colors duration-500 lg:text-4xl ${
                      isActive ? 'text-white' : 'text-white'
                    }`}>
                      {stat.label}
                    </h3>
                    
                    <p className={`max-w-[95%] flex-1 text-base font-medium leading-relaxed transition-colors duration-500 lg:text-lg ${
                      isActive ? 'text-white/90' : 'text-white/65'
                    }`}>
                      {stat.description}
                    </p>

                    {/* Modern Action Trigger */}
                    <div className={`mt-10 transition-all duration-700 transform origin-left ${
                      isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                    }`}>
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
                        View Capability
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic Indicator */}
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[40px] transition-all duration-1000 ${
                    isActive ? 'bg-white/20' : 'bg-brand-primary/5'
                  }`} />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs

