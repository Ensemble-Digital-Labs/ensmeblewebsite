import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Container from '../ui/Container'

function ContactHero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-word',
        { y: 80, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: 'expo.out',
        },
      )

      gsap.fromTo(
        '.hero-tagline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.6, ease: 'power3.out' },
      )

      gsap.fromTo(
        '.vertical-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 0.12, duration: 2, ease: 'expo.out', delay: 0.4 },
      )

      gsap.to('.data-particle', {
        y: 'random(-40, 40)',
        x: 'random(-20, 20)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent pb-12 pt-24 sm:pt-28 md:pt-32 lg:pb-20 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 z-[2] hidden opacity-20 lg:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="data-particle absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              transform: 'scale(0.8)',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              className="fill-none stroke-current text-brand-primary/30"
              strokeWidth="1"
            >
              <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" />
            </svg>
          </div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="vertical-text pointer-events-none absolute left-[-10%] top-[-20%] z-0 hidden opacity-0 lg:block">
            <h2
              className="font-display select-none text-[clamp(6rem,15vw,12rem)] font-black uppercase tracking-tighter text-brand-primary blur-[2px]"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              CONTACT
            </h2>
          </div>

          <h1 className="perspective-1000 font-display text-6xl font-black leading-[0.9] tracking-tight text-white lg:text-8xl">
            {['Get', 'In', 'Touch'].map((word, i) => (
              <span key={i} className="hero-title-word mb-2 mr-4 inline-block will-change-transform">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-tagline mx-auto mt-10 max-w-2xl text-xl font-medium leading-relaxed text-white/72 opacity-0 lg:text-2xl">
            Have a project in mind? Let&apos;s discuss how we can help bring your vision to life through{' '}
            <span className="font-serif font-bold italic tracking-wide text-brand-primary">
              digital precision
            </span>
            .
          </p>
        </div>
      </Container>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}

export default ContactHero
