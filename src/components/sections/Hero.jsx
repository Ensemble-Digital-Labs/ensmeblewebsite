import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import KeywordReveal from '../ui/KeywordReveal'
import { growthPrimaryHero } from '../../lib/growthCtaClasses'
import { heroContent, heroSubheadSegments } from '../../lib/content'
import { backgroundAssets } from '../../lib/backgroundAssets'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'
import { prefersReducedMotion } from '../../lib/utils'

/** Tuned for faster first paint after Loader — still staggered, not sluggish */
const HERO_STAGGER_BASE = 0.12
const HERO_DURATION_BASE = 0.88
const HERO_SLIDE_OFFSET_BASE = 40

/**
 * Cardinal-style growth arcs — concentric rings, warm + teal (no tech grid).
 */
function HeroGrowthArcs() {
  return (
    <div
      className="pointer-events-none absolute -bottom-[8%] -right-[12%] z-0 h-[min(88%,420px)] w-[min(120%,480px)] sm:h-[min(90%,500px)] sm:w-[min(130%,540px)] lg:-bottom-[5%] lg:-right-[8%] lg:h-[min(95%,560px)]"
      aria-hidden
    >
      <div className="absolute bottom-0 right-0 h-full w-full rounded-full border border-white/[0.07]" />
      <div className="absolute bottom-[2%] right-[2%] h-[92%] w-[92%] rounded-full border border-teal-400/20" />
      <div className="absolute bottom-[4%] right-[4%] h-[84%] w-[84%] rounded-full border border-brand-warm/30" />
      <div className="absolute bottom-[6%] right-[6%] h-[76%] w-[76%] rounded-full border border-cyan-500/15" />
    </div>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  useCinematicSectionReveal(heroRef, { firstScreenHero: true })

  const splitHero = heroContent.heroLayout === 'split' || Boolean(heroContent.heroPortraitSrc)
  const showPortraitColumn = Boolean(heroContent.heroPortraitSrc)
  const accentLineIndex =
    typeof heroContent.headlineAccentLineIndex === 'number'
      ? heroContent.headlineAccentLineIndex
      : 1

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

  const heroPhoto =
    heroContent.heroBackgroundSrc ?? backgroundAssets.digitalHealthNetwork

  return (
    <section
      id="page1"
      ref={heroRef}
      className={`hero relative box-border overflow-x-hidden bg-[#050816] pt-20 pb-12 sm:pt-[5.25rem] sm:pb-14 max-lg:h-auto max-lg:min-h-0 lg:flex lg:min-h-[100svh] lg:h-[100svh] lg:max-h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden lg:pb-8 ${splitHero ? 'hero--split' : 'hero--photo'}`}
    >
      {/* Background: split = editorial navy gradients only; legacy = full-bleed art */}
      {splitHero ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(165deg,#070d18_0%,#0a1628_42%,#050816_72%,#030712_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_90%_35%,rgba(20,184,166,0.08)_0%,transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_15%_75%,rgba(234,88,12,0.06)_0%,transparent_50%)]"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <img
              src={heroPhoto}
              alt=""
              width={1920}
              height={1080}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full min-h-[100%] object-cover object-[62%_center] min-[480px]:object-[68%_center] md:object-[72%_center] lg:object-[78%_center] xl:object-[82%_center] scale-[1.02] sm:scale-100"
            />
            <div className="absolute inset-0 bg-[#050816]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/86 sm:via-[#050816]/72 to-transparent to-[55%] sm:to-[48%] lg:to-[42%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/50" />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_82%_42%,rgba(20,184,166,0.06)_0%,transparent_52%)] sm:bg-[radial-gradient(ellipse_80%_65%_at_85%_38%,rgba(251,191,36,0.05)_0%,transparent_50%)]"
              aria-hidden
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/55 via-transparent to-black/85" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_100%_55%_at_50%_38%,transparent_0%,rgba(2,6,12,0.5)_72%)]"
            aria-hidden
          />
        </>
      )}

      {splitHero && !showPortraitColumn && (
        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
          <HeroGrowthArcs />
        </div>
      )}

      <div
        className={`hero-premium-atmosphere z-[2] ${splitHero ? 'hero-premium-atmosphere--split opacity-40' : ''}`}
        aria-hidden
      >
        <div className="hero-premium-atmosphere__glow" />
        <div className="hero-premium-atmosphere__glow hero-premium-atmosphere__glow--b" />
        {!splitHero && <div className="hero-premium-atmosphere__mesh" />}
      </div>

      <Container className="relative z-10 flex w-full max-lg:flex-none max-lg:items-start !max-w-[90rem] items-center py-3 sm:py-5 lg:min-h-0 lg:flex-1 lg:max-h-[calc(100svh-4rem)] lg:items-center lg:justify-center lg:py-4">
        <div
          ref={contentRef}
          className="pointer-events-none grid w-full max-w-full grid-cols-1 gap-8 text-center sm:gap-10 lg:max-h-[calc(100svh-5rem)] lg:gap-x-10 lg:gap-y-0 lg:text-left xl:gap-x-14 [@media(max-height:700px)]:lg:max-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:items-start"
        >
          {/* Left: messaging */}
          <div
            className={`flex min-h-0 flex-col ${splitHero && showPortraitColumn ? 'lg:col-span-6 xl:col-span-6' : 'lg:col-span-12'}`}
          >
            <div data-cinematic-reveal="lead">
              <div className="mb-2 flex justify-center sm:mb-3 lg:justify-start">
                <span className="hero-eyebrow-tech inline-flex items-center gap-2 text-[10px] font-semibold uppercase xs:text-[11px] sm:text-xs tracking-[0.18em]">
                  <span className="hidden xs:inline h-px w-6 bg-gradient-to-r from-transparent to-teal-400/40 sm:w-10" aria-hidden />
                  {heroContent.eyebrow ?? 'Healthcare growth, engineered'}
                  <span className="hidden xs:inline h-px w-6 bg-gradient-to-l from-transparent to-amber-400/35 sm:w-10" aria-hidden />
                </span>
              </div>

              <div className="main-text">
                <h1
                  data-hero-slide="1"
                  className={
                    splitHero
                      ? 'hero-main-heading text-balance font-display font-bold leading-[1.05] tracking-[-0.02em] text-white mb-3 sm:mb-4 normal-case sm:leading-[1.04] text-[clamp(2.5rem,6.5vw+0.35rem,4.25rem)] sm:text-[clamp(2.65rem,6.8vw+0.4rem,4.75rem)] lg:text-[clamp(3rem,5.2vw+0.75rem,5.75rem)] xl:text-[clamp(3.25rem,4.8vw+1rem,6.25rem)] [@media(max-height:700px)]:text-[clamp(2.1rem,5.5vw,3.5rem)]'
                      : 'hero-main-heading section-heading-neon text-balance text-[clamp(1.55rem,4.6vw+0.45rem,3.15rem)] leading-[1.08] sm:leading-[1.06] mb-1.5 uppercase sm:mb-2 lg:text-[clamp(1.85rem,3.6vw+0.45rem,3.35rem)] xl:text-[clamp(2rem,3.2vw+0.5rem,3.65rem)] [@media(max-height:700px)]:text-[clamp(1.35rem,4vw,2.65rem)]'
                  }
                >
                  {heroContent.headlineLines?.length ? (
                    <>
                      {heroContent.headlineLines.map((line, i) => (
                        <span
                          key={line + i}
                          className={`block ${splitHero && i === accentLineIndex ? 'text-brand-warm' : ''}`}
                        >
                          {line}
                        </span>
                      ))}
                    </>
                  ) : (
                    heroContent.headline
                  )}
                </h1>
                {heroContent.subBrand && (
                  <div
                    data-hero-slide="2"
                    className="mb-3 inline-flex w-full justify-center sm:mb-4 lg:w-auto lg:justify-start"
                  >
                    <div className="relative rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:px-5 sm:py-2.5">
                      <div
                        className="pointer-events-none absolute inset-0 rounded-lg opacity-40"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(201,162,39,0.14) 0%, transparent 42%, rgba(229,193,88,0.08) 100%)',
                        }}
                        aria-hidden
                      />
                      <p className="relative text-base font-medium tracking-[0.08em] text-white/95 sm:text-lg md:text-xl">
                        {heroContent.subBrand}
                      </p>
                      <span
                        className="pointer-events-none absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent"
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
                className={`mx-auto mb-4 max-w-2xl rounded-xl px-1 py-1 sm:mb-5 lg:mx-0 ${splitHero ? 'border border-white/[0.06] bg-white/[0.03] px-4 py-3 sm:px-5 sm:py-4 backdrop-blur-sm' : 'max-w-3xl rounded-lg border border-white/[0.1] bg-black/45 px-3.5 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:px-5 sm:py-3 [@media(max-height:700px)]:px-3 [@media(max-height:700px)]:py-2'}`}
              >
                <KeywordReveal
                  segments={heroSubheadSegments}
                  triggerImmediately
                  className={`text-balance leading-relaxed line-clamp-5 sm:leading-relaxed md:text-[1.0625rem] md:leading-[1.55] [@media(max-height:700px)]:line-clamp-4 [@media(max-height:640px)]:line-clamp-3 ${splitHero ? 'text-base text-white/[0.88] sm:text-lg' : 'text-sm text-white/88 sm:text-base md:text-[1.0625rem]'}`}
                />
              </div>

              <div className="mx-auto mb-0 flex max-w-xl flex-col items-stretch justify-center gap-3 xs:flex-row xs:items-center sm:max-w-none sm:gap-4 lg:mx-0">
                <div data-hero-slide="4" className="pointer-events-auto w-full xs:w-auto">
                  <Link
                    to={heroContent.primaryCTA.link}
                    data-discover="true"
                    className={`${growthPrimaryHero} no-underline`}
                  >
                    <span className="flex-1 text-center xs:text-left">{heroContent.primaryCTA.text}</span>
                    <span
                      className="shrink-0 pl-1 text-xl font-light leading-none text-white opacity-95"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </div>
                <div data-hero-slide="5" className="pointer-events-auto w-full xs:w-auto">
                  <Link
                    to={heroContent.secondaryCTA.link}
                    data-discover="true"
                    className={`${growthPrimaryHero} no-underline`}
                  >
                    <span className="flex-1 text-center xs:text-left">{heroContent.secondaryCTA.text}</span>
                    <span
                      className="shrink-0 pl-1 text-xl font-light leading-none text-white opacity-95"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Split layout: portrait + arcs (right column only when a portrait URL is set) */}
          {splitHero && showPortraitColumn && (
            <div className="relative mt-4 min-h-[320px] w-full sm:min-h-[420px] lg:col-span-6 lg:mt-0 lg:min-h-[min(64vh,620px)] xl:col-span-6">
              <HeroGrowthArcs />
              <div className="relative z-[2] mx-auto flex h-full max-w-xl items-end justify-center sm:max-w-2xl lg:ml-auto lg:mr-0 lg:max-w-none">
                <img
                  src={heroContent.heroPortraitSrc}
                  alt=""
                  width={900}
                  height={1100}
                  decoding="async"
                  fetchPriority="high"
                  className="max-h-[min(62vh,680px)] w-full rounded-2xl object-cover object-[center_15%] shadow-[0_28px_80px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:max-h-[min(68vh,760px)] lg:max-h-[min(74vh,860px)] xl:max-h-[min(78vh,920px)] lg:rounded-3xl"
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default Hero
