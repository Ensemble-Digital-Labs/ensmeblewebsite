import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'
import { prefersReducedMotion, shouldUseNativeMainScroll } from '../../lib/utils'
import { shouldUseLightSectionEffects } from '../../lib/animationProfile'

gsap.registerPlugin(ScrollTrigger)

function AboutHeroVisual({ hero, visualRef, lightEffects, addToGlowRefs }) {
  if (lightEffects) {
    return (
      <div
        className="about-visual about-visual--light absolute inset-0 z-0 h-full w-full pointer-events-none"
        ref={visualRef}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#14122a]/88 via-[#14122a]/55 to-[#14122a]/82" />
        <img
          src={hero.image}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14] grayscale"
        />
      </div>
    )
  }

  return (
    <div className="about-visual absolute inset-0 z-0 h-full w-full pointer-events-none" ref={visualRef}>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#14122a]/80 via-transparent to-[#14122a]/70" />

      <img
        src={hero.image}
        alt=""
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-luminosity grayscale"
      />

      <div
        className="absolute inset-0 z-20"
        style={{
          maskImage:
            'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)',
        }}
      >
        <img
          src={hero.image}
          alt=""
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover opacity-50 mix-blend-screen grayscale"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 350px at var(--mouse-x) var(--mouse-y), rgba(163, 116, 255, 0.3), transparent 70%)',
          }}
        />
      </div>

      <div
        ref={addToGlowRefs}
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-primary/10 opacity-20 blur-[150px]"
      />
      <div
        ref={addToGlowRefs}
        className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/10 opacity-10 blur-[150px]"
      />
    </div>
  )
}

function AboutHero() {
  const { hero } = aboutPageContent
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const glowRefs = useRef([])
  const [lightEffects] = useState(() => shouldUseLightSectionEffects())

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return undefined

    if (lightEffects) {
      gsap.set(
        sectionEl.querySelectorAll('.title-word, .accent-line, .hero-tagline, .story-panel'),
        { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 },
      )
      gsap.set(sectionEl.querySelectorAll('.accent-line'), { scaleX: 1 })
      return undefined
    }

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

    sectionEl.addEventListener('mousemove', handleMouseMove, { passive: true })

    let entranceCtx = null
    let parallaxCtx = null
    let parallaxReady = false

    const setupParallax = () => {
      if (parallaxReady || !sectionRef.current || !visualRef.current) return
      const main = document.querySelector('#main')
      if (!main) return

      parallaxReady = true
      parallaxCtx?.revert()

      parallaxCtx = gsap.context(() => {
        const parallaxBase = {
          trigger: sectionRef.current,
          scroller: main,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }

        gsap.fromTo(
          visualRef.current,
          { y: 0, scale: 1 },
          {
            y: 100,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: parallaxBase,
          },
        )

        glowRefs.current.forEach((glow, i) => {
          if (!glow) return
          gsap.fromTo(
            glow,
            { x: 0, y: 0 },
            {
              y: (i + 1) * 50,
              x: (i % 2 === 0 ? 1 : -1) * 30,
              ease: 'none',
              scrollTrigger: parallaxBase,
            },
          )
        })
      }, sectionEl)

      ScrollTrigger.refresh()
    }

    entranceCtx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.5 },
      })

      tl.fromTo(
        '.title-word',
        { opacity: 0, y: 100, rotateX: -45 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.2, duration: 1.2 },
      )
        .fromTo(
          '.accent-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1 },
          '-=1',
        )
        .fromTo('.hero-tagline', { opacity: 0, x: -20 }, { opacity: 1, x: 0 }, '-=0.8')
        .fromTo(
          '.story-panel',
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2 },
          '-=1',
        )
    }, sectionEl)

    const onScrollReady = () => setupParallax()
    window.addEventListener('ensemble:scroll-ready', onScrollReady, { once: true })

    let fallbackTimer = null
    if (window.locomotiveScroll || shouldUseNativeMainScroll()) {
      requestAnimationFrame(() => requestAnimationFrame(setupParallax))
    } else {
      fallbackTimer = window.setTimeout(setupParallax, 620)
    }

    return () => {
      sectionEl.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('ensemble:scroll-ready', onScrollReady)
      if (fallbackTimer) window.clearTimeout(fallbackTimer)
      if (rafId) cancelAnimationFrame(rafId)
      entranceCtx?.revert()
      parallaxCtx?.revert()
    }
  }, [lightEffects])

  const addToGlowRefs = (el) => {
    if (el && !glowRefs.current.includes(el)) {
      glowRefs.current.push(el)
    }
  }

  const storyPanelClass = lightEffects
    ? 'story-panel relative z-10 rounded-[2.5rem] border border-white/12 bg-[#14122a]/72 p-8 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.55)] lg:p-12'
    : 'story-panel relative z-10 rounded-[2.5rem] border border-white/12 bg-white/[0.06] p-8 opacity-0 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:p-12'

  return (
    <section
      id="about-hero"
      ref={sectionRef}
      data-about-hero-light={lightEffects ? 'true' : undefined}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent pt-24 sm:pt-28 md:pt-32"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
    >
      <AboutHeroVisual
        hero={hero}
        visualRef={visualRef}
        lightEffects={lightEffects}
        addToGlowRefs={addToGlowRefs}
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[#14122a]/20" aria-hidden />

      <Container className="relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="mb-12 pl-8 sm:pl-10 md:pl-12 lg:mb-0 lg:pl-6 xl:pl-10">
              <div className={lightEffects ? 'main-text' : 'main-text perspective-1000'}>
                {(() => {
                  const words = hero.title.trim().split(/\s+/)
                  const firstPart = words.length > 1 ? words.slice(0, -1).join(' ') : hero.title
                  const lastWord = words.length > 1 ? words[words.length - 1] : null
                  return (
                    <h1
                      className={`title-word font-display mb-8 text-6xl font-bold leading-[0.95] tracking-[-0.04em] text-white lg:text-7xl xl:text-8xl${lightEffects ? '' : ' opacity-0'}`}
                    >
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

              <div className="accent-line mb-8 h-1 w-24 bg-gradient-to-r from-brand-primary to-transparent" />

              <p
                className={`hero-tagline text-2xl font-medium tracking-tight text-white/85 lg:text-3xl${lightEffects ? '' : ' opacity-0'}`}
              >
                {hero.tagline}
              </p>
            </div>

            <div className="relative">
              <div className={storyPanelClass}>
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-tl-2xl border-l-2 border-t-2 border-brand-primary/40" />
                <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-br-2xl border-b-2 border-r-2 border-brand-primary/40" />

                <p className="text-lg leading-relaxed text-white/75 lg:text-xl">{hero.description}</p>
              </div>

              {!lightEffects ? (
                <div
                  className="about-hero-ring pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                  aria-hidden
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AboutHero
