import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Container from '../ui/Container'
import { ParallaxDepth, ParallaxThemedBackdrop } from '../ui/ParallaxDepth'

function ContactHero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Heading Word-by-Word Reveal
      gsap.fromTo('.hero-title-word', 
        { y: 80, opacity: 0, rotateX: -30 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          stagger: 0.1, 
          duration: 1.5, 
          ease: 'expo.out' 
        }
      )

      // 2. Tagline Fade In
      gsap.fromTo('.hero-tagline', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.6, ease: 'power3.out' }
      )

      // 3. Vertical Text Parallax
      gsap.fromTo('.vertical-text', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 0.12, duration: 2, ease: 'expo.out', delay: 0.4 }
      )

      // 4. Data Particle Drift
      gsap.to('.data-particle', {
        y: 'random(-40, 40)',
        x: 'random(-20, 20)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2
      })

      // 5. Terminal Typing (None)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FDFDFD]">
      <ParallaxDepth variant="default" tone="light" className="overflow-hidden pt-24 pb-12 lg:pt-40 lg:pb-20" layer1={
          <>
            <ParallaxThemedBackdrop tone="light" />
            <div
              className="absolute inset-0 opacity-[0.45]"
              style={{
                backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="pointer-events-none absolute top-1/4 -left-1/4 h-[50%] w-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-1/4 -right-1/4 h-[40%] w-[40%] rounded-full bg-amber-400/5 blur-[100px]" />
          </>
        }
      >
      {/* Hexagonal Data Particles (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden lg:block z-[2]">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="data-particle absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              transform: 'scale(0.8)'
            }}
          >
            <svg width="40" height="40" viewBox="0 0 100 100" className="text-brand-primary/30 fill-none stroke-current" strokeWidth="1">
              <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" />
            </svg>
          </div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center relative">
          
          {/* Layered Vertical Typography */}
          <div className="vertical-text absolute left-[-10%] top-[-20%] z-0 pointer-events-none hidden lg:block opacity-0">
            <h2 className="font-display text-[clamp(6rem,15vw,12rem)] font-black tracking-tighter text-brand-primary select-none uppercase blur-[2px]"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              CONTACT
            </h2>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Establish Connection</span>
          </div>

          <h1 className="font-display text-6xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[0.9] perspective-1000">
            {['Get', 'In', 'Touch'].map((word, i) => (
              <span key={i} className="hero-title-word inline-block mr-4 mb-2 will-change-transform">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-tagline text-xl lg:text-2xl text-gray-600 font-medium max-w-2xl mx-auto mt-10 leading-relaxed opacity-0">
            Have a project in mind? Let's discuss how we can help bring your vision to life through{' '}
            <span className="text-brand-primary italic font-bold font-serif tracking-wide">
              digital precision
            </span>
            .
          </p>
        </div>
      </Container>
      </ParallaxDepth>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}

export default ContactHero
