import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Container from '../ui/Container'
import HeroParticleField from './HeroParticleField'
import StandardCTA from '../StandardCTA'
import { heroContent } from '../../lib/content'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'
import { prefersReducedMotion } from '../../lib/utils'

/** Tuned for faster first paint after Loader — still staggered, not sluggish */
const HERO_STAGGER_BASE = 0.12
const HERO_DURATION_BASE = 0.88
const HERO_SLIDE_OFFSET_BASE = 40

function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  useCinematicSectionReveal(heroRef, { firstScreenHero: true })

  useEffect(() => {
    if (prefersReducedMotion() || !contentRef.current) return
    const wrap = contentRef.current
    const nodes = [
      wrap.querySelector('[data-hero-slide="1"]'),
      wrap.querySelector('[data-hero-slide="2"]'),
      wrap.querySelector('[data-hero-slide="3"]'),
      wrap.querySelector('[data-hero-slide="4"]'),
      wrap.querySelector('[data-hero-slide="5"]'),
    ].filter(Boolean)
    if (nodes.length === 0) return

    const isNarrow = typeof window !== 'undefined' && window.innerWidth < 768
    const HERO_SLIDE_OFFSET = isNarrow ? 22 : HERO_SLIDE_OFFSET_BASE
    const HERO_DURATION = isNarrow ? 0.72 : HERO_DURATION_BASE
    const HERO_STAGGER = isNarrow ? 0.1 : HERO_STAGGER_BASE

    const getStartX = (i) =>
      i % 2 === 0 ? -HERO_SLIDE_OFFSET : HERO_SLIDE_OFFSET
    gsap.fromTo(
      nodes,
      { opacity: 0, x: getStartX },
      {
        opacity: 1,
        x: 0,
        duration: HERO_DURATION,
        stagger: HERO_STAGGER,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    )
  }, [])

  return (
    <section
      id="page1"
      ref={heroRef}
      data-scroll
      className="relative box-border min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#030508] pt-20 sm:pt-24 pb-12 md:pb-16"
    >
      <HeroParticleField boundsRef={heroRef} />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-transparent to-black/90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_55%_at_50%_38%,transparent_0%,rgba(2,6,12,0.65)_72%)]"
        aria-hidden
      />

      {/* Premium atmospheric layer: grid + soft orbs (replaces “sticker” energy with controlled depth) */}
      <div className="hero-premium-atmosphere" aria-hidden>
        <div className="hero-premium-atmosphere__glow" />
        <div className="hero-premium-atmosphere__glow hero-premium-atmosphere__glow--b" />
        <div className="hero-premium-atmosphere__mesh" />
        <div className="hero-premium-atmosphere__scanline" />
      </div>

      <div
        className="hero-horizon pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[min(32vh,280px)] md:h-[min(36vh,320px)]"
        aria-hidden
      >
        <div className="hero-horizon-fade absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="hero-horizon-net" />
        <div className="hero-horizon-net hero-horizon-net--b" />
        <div className="hero-horizon-scan" />
        <div className="hero-horizon-edge" />
        <div className="hero-horizon-glow" />
      </div>

      <Container className="relative z-10">
        <div ref={contentRef} className="pointer-events-none text-center max-w-5xl mx-auto">
          <div data-cinematic-reveal="lead">
            {/* Eyebrow — static system label (not in slide sequence) */}
            <div className="mb-5 md:mb-6">
              <span className="inline-flex items-center gap-3 text-[10px] xs:text-[11px] sm:text-xs font-medium uppercase tracking-[0.26em] text-cyan-200/75">
                <span className="hidden xs:inline h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-cyan-400/45" aria-hidden />
                Healthcare growth, engineered
                <span className="hidden xs:inline h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-cyan-400/45" aria-hidden />
              </span>
            </div>

            <div className="main-text">
              <h1
                data-hero-slide="1"
                className="text-balance text-[1.65rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white leading-[1.08] font-antique text-center mb-4 md:mb-5 tracking-[-0.02em] drop-shadow-[0_2px_48px_rgba(0,0,0,0.45)]"
              >
                {heroContent.headline}
              </h1>
              {heroContent.subBrand && (
                <div data-hero-slide="2" className="inline-flex mb-7 md:mb-10">
                  <div className="relative rounded-lg px-5 py-2.5 sm:px-7 sm:py-3 bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_12px_48px_-20px_rgba(0,0,0,0.5)]">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg opacity-50"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 42%, rgba(167,139,250,0.08) 100%)',
                      }}
                      aria-hidden
                    />
                    <p className="relative text-lg sm:text-xl md:text-2xl text-white/95 font-medium tracking-[0.04em]">
                      {heroContent.subBrand}
                    </p>
                    <span
                      className="pointer-events-none absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
                      aria-hidden
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div data-cinematic-reveal="block">
            <div
              data-hero-slide="3"
              className="mb-8 md:mb-10 max-w-3xl mx-auto rounded-xl border border-white/[0.1] bg-black/35 backdrop-blur-xl px-5 py-5 sm:px-8 sm:py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed text-balance">
                {heroContent.subhead}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 md:mb-14 max-w-xl sm:max-w-none mx-auto">
              <div data-hero-slide="4" className="pointer-events-auto w-full sm:w-auto">
                <StandardCTA
                  to={heroContent.primaryCTA.link}
                  variant="tech"
                  className="!rounded-xl !px-9 !py-3.5 sm:!py-4 !text-base !font-semibold !normal-case !tracking-wide w-full sm:w-auto min-h-[48px] !shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_-12px_rgba(34,211,238,0.35)] hover:!shadow-[0_12px_40px_-10px_rgba(34,211,238,0.45)] !transition-shadow !duration-300"
                >
                  {heroContent.primaryCTA.text}
                </StandardCTA>
              </div>
              <div data-hero-slide="5" className="pointer-events-auto w-full sm:w-auto">
                <StandardCTA
                  to={heroContent.secondaryCTA.link}
                  variant="outline"
                  className="!rounded-xl !px-9 !py-3.5 sm:!py-4 !text-base !font-semibold !border !border-white/22 !bg-white/[0.04] !text-white/95 !backdrop-blur-md hover:!bg-white/[0.09] hover:!border-white/35 !shadow-none w-full sm:w-auto min-h-[48px] !transition-[background-color,border-color] !duration-300"
                >
                  {heroContent.secondaryCTA.text}
                </StandardCTA>
              </div>
            </div>
          </div>

          <div data-cinematic-reveal="block" className="border-t border-white/[0.12] pt-6 md:pt-8">
            <p className="text-[11px] sm:text-xs text-white/45 mb-5 md:mb-6 uppercase tracking-[0.22em] font-medium">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-10">
              {heroContent.trustLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="flex items-center justify-center min-h-[44px] px-5 sm:px-6 rounded-lg border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-white/40 text-xs font-medium tracking-wide hover:text-white/55 hover:border-white/15 transition-colors duration-300"
                >
                  {logo.placeholder}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
