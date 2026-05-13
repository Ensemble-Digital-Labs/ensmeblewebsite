import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ShieldCheck,
  CircleDot,
} from 'lucide-react'
import { heroContent, heroPracticeOutcomeFeatures, heroPracticeOutcomeSection } from '../../lib/content'
import StandardCTA from '../StandardCTA'
import { prefersReducedMotion } from '../../lib/utils'

const FEATURE_ICONS = {
  Sparkles,
  ShieldCheck,
  CircleDot,
}

const PROGRESS_TICK_MS = 100
const PROGRESS_RESET_DELAY_MS = 220

const HERO_OUTCOMES_BG = '/assets/images/hero-outcomes/how-we-grow-practice-bg.png'

/**
 * Single full-viewport band under `#page1` — one column: “How we grow your practice” (headline,
 * CTA, feature rail + image) and the full-bleed marble stat strip. Both share the same `100svh`
 * shell (no document scroll inside). Spacing and line clamps keep the block fitting typical
 * viewports (content may clip on extreme zoom).
 */
function HeroStatsTrustBand() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const featureRefs = useRef([])
  const reduceMotion = prefersReducedMotion()

  const features = heroPracticeOutcomeFeatures
  const n = features.length

  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [docHidden, setDocHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false
  )

  const advanceEnabled =
    sectionVisible && !docHidden && !reduceMotion && n > 0

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSectionVisible(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([e]) => setSectionVisible(Boolean(e?.isIntersecting)),
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (!advanceEnabled) return undefined
    const id = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1))
    }, PROGRESS_TICK_MS)
    return () => window.clearInterval(id)
  }, [advanceEnabled])

  useEffect(() => {
    if (progress < 100) return undefined
    const t = window.setTimeout(() => {
      setCurrentFeature((prev) => (prev + 1) % n)
      setProgress(0)
    }, PROGRESS_RESET_DELAY_MS)
    return () => window.clearTimeout(t)
  }, [progress, n])

  const scrollActiveIntoView = useCallback(() => {
    const el = featureRefs.current[currentFeature]
    const container = containerRef.current
    if (!el || !container) return
    if (container.scrollWidth <= container.clientWidth + 2) return
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    container.scrollTo({
      left:
        el.offsetLeft -
        (cRect.width - eRect.width) / 2,
      behavior: 'smooth',
    })
  }, [currentFeature])

  useEffect(() => {
    scrollActiveIntoView()
  }, [currentFeature, scrollActiveIntoView])

  const handleFeatureClick = (index) => {
    setCurrentFeature(index)
    setProgress(0)
  }

  const active = features[currentFeature]
  const outcomeCta = heroPracticeOutcomeSection.cta ?? heroContent.primaryCTA
  const trustLine = heroContent.trustLabel ?? ''
  const trustBarParts = trustLine
    ? trustLine.split(/\s*·\s*/).map((p) => p.trim()).filter(Boolean)
    : []

  return (
    <section
      ref={sectionRef}
      id="hero-stats-trust"
      data-scroll
      className="relative isolate flex h-[100svh] min-h-0 w-full flex-col overflow-x-clip overflow-y-hidden bg-[#050816]"
      aria-label="Practice outcomes"
    >
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <img
            src={HERO_OUTCOMES_BG}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="low"
            className="h-full min-h-full w-full scale-105 object-cover object-center select-none"
          />
        </div>
        {/* One full-viewport column: practice block + marble strip */}
        <div
          className="relative z-[1] flex min-h-0 flex-1 flex-col"
          data-hero-outcomes-full-page
        >
          <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-3 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-6 md:pt-7 lg:px-8 lg:pb-5 xl:pb-6 2xl:pb-6">
          <header className="mb-3 shrink-0 text-center sm:mb-5">
          <h2 className="growth-gradient-text mx-auto max-w-3xl font-display text-[clamp(1.2rem,5.2vw,2.35rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.03em] min-[400px]:text-[clamp(1.35rem,4.2vw,2.35rem)] sm:text-[clamp(1.55rem,3.8vw,2.5rem)]">
            {heroPracticeOutcomeSection.headline}
          </h2>
          <div className="mt-3 flex justify-center sm:mt-5">
            <StandardCTA to={outcomeCta.link} variant="hero" className="max-w-md xs:max-w-none">
              {outcomeCta.text}
            </StandardCTA>
          </div>
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-3 pb-1 sm:gap-5 sm:pb-2 lg:grid-cols-2 lg:grid-rows-1 lg:items-stretch lg:gap-6 lg:pb-0 xl:gap-8">
          <div
            ref={containerRef}
            className="hero-outcomes-scroll order-2 flex h-full min-h-0 flex-row items-stretch gap-2.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth scroll-pl-3 scroll-pr-3 pb-1 [-webkit-overflow-scrolling:touch] touch-pan-x snap-x snap-mandatory sm:gap-3 sm:scroll-pl-0 sm:scroll-pr-0 sm:pb-1 lg:order-1 lg:touch-auto lg:snap-none lg:flex-col lg:items-stretch lg:justify-start lg:gap-3 lg:overflow-y-auto lg:overflow-x-visible lg:overscroll-y-contain lg:overscroll-x-auto lg:pb-1 lg:pr-1"
          >
            {features.map((feature, index) => {
              const Icon = FEATURE_ICONS[feature.iconKey] ?? Sparkles
              const isActive = currentFeature === index
              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el
                  }}
                  className="w-[min(calc(100vw-2.25rem),22rem)] shrink-0 snap-center sm:w-[min(100%,22rem)] lg:flex lg:min-h-0 lg:w-full lg:max-w-none lg:flex-none"
                >
                  <button
                    type="button"
                    onClick={() => handleFeatureClick(index)}
                    aria-pressed={isActive}
                    className={`flex min-h-[min(10.5rem,36svh)] w-full cursor-pointer flex-col rounded-xl border p-3.5 text-left transition-all duration-300 min-[480px]:min-h-0 min-[480px]:p-4 sm:min-h-0 sm:rounded-2xl sm:p-5 lg:min-h-0 lg:flex-none lg:p-4 xl:p-5 ${
                      isActive
                        ? 'border-white/[0.12] bg-zinc-950/70 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.65)] backdrop-blur-xl'
                        : 'border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex min-h-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-3.5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-11 sm:w-11 sm:rounded-xl lg:h-9 lg:w-9 xl:h-10 xl:w-10 ${
                          isActive
                            ? 'bg-gradient-to-br from-teal-400 to-cyan-500 text-[#050816]'
                            : 'border border-white/10 bg-white/[0.05] text-teal-300/90'
                        }`}
                      >
                        <Icon className="h-[1.15rem] w-[1.15rem] sm:h-[1.35rem] sm:w-[1.35rem] lg:h-[1.1rem] lg:w-[1.1rem] xl:h-5 xl:w-5" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`font-display text-[0.9375rem] font-extrabold uppercase leading-snug tracking-[0.085em] transition-colors duration-300 sm:text-lg sm:tracking-[0.08em] lg:text-[0.875rem] lg:tracking-[0.082em] xl:text-[1.0625rem] 2xl:text-xl ${
                            isActive ? 'text-zinc-50' : 'text-zinc-300'
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          id={`hero-outcome-desc-${feature.id}`}
                          className={
                            isActive
                              ? 'mt-2 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 sm:mt-2.5 sm:text-base sm:leading-relaxed lg:mt-2.5 lg:text-sm lg:leading-snug xl:text-base xl:leading-relaxed 2xl:text-lg'
                              : 'sr-only'
                          }
                        >
                          {feature.description}
                        </p>
                        {isActive ? (
                        <div className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-white/[0.08] sm:mt-3.5 lg:mt-3">
                          {reduceMotion ? (
                              <div
                                className="h-full w-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-growth-from"
                                aria-hidden
                              />
                            ) : (
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-growth-from"
                                initial={false}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.08, ease: 'linear' }}
                              />
                            )}
                        </div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="relative order-1 mx-auto flex w-full max-w-lg shrink-0 flex-col lg:order-2 lg:mx-0 lg:h-full lg:min-h-0 lg:max-w-none">
            <div className="relative aspect-[16/11] w-full max-h-[min(22svh,200px)] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a1220] shadow-[0_28px_90px_-40px_rgba(0,0,0,0.75)] min-[400px]:max-h-[min(26svh,260px)] sm:max-h-[min(30svh,300px)] sm:rounded-2xl min-[480px]:max-h-[min(34svh,360px)] lg:aspect-auto lg:h-full lg:min-h-[min(26%,12rem)] lg:max-h-none lg:flex-1 xl:min-h-[min(36%,16rem)]">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -20 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <img
                      src={active.image}
                      alt=""
                      width={900}
                      height={675}
                      loading={currentFeature === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/55 via-transparent to-[#050816]/25" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          </div>
          </div>

          {/* Arc-style full-bleed strip — pinned to bottom of this 100svh section */}
          <div className="hero-outcomes-marble-bar relative z-[2] mt-auto w-full shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto grid max-w-none grid-cols-2 gap-px bg-transparent lg:grid-cols-4">
              {heroContent.stats?.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center px-2 py-3 text-center sm:px-4 sm:py-5 md:py-6 lg:py-4 xl:py-8 2xl:py-10"
                >
                  <p className="growth-gradient-text font-display text-[clamp(1.35rem,5vw,2.75rem)] font-bold leading-none tracking-[-0.03em] min-[400px]:text-[clamp(1.65rem,4.8vw,2.75rem)] sm:text-[clamp(1.85rem,5vw,3rem)]">
                    <span className="tabular-nums">{s.value}</span>
                    {s.suffix ? (
                      <span className="ml-0.5 align-baseline font-semibold text-[0.45em]">
                        {s.suffix}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2.5 mx-auto inline-flex max-w-[min(100%,17rem)] items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-2 text-center font-display text-xs font-extrabold uppercase leading-snug tracking-[0.12em] text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:mt-3 sm:max-w-[20rem] sm:px-5 sm:py-2.5 sm:text-sm sm:tracking-[0.13em] md:max-w-[min(100%,22rem)] md:text-[0.9375rem] md:tracking-[0.12em]">
                    {s.label}
                  </p>
                </div>
              ))}
              {trustBarParts.length ? (
                <div className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-center sm:gap-2 sm:px-4 sm:py-5 md:py-6 lg:py-4 xl:py-8 2xl:py-10">
                  {trustBarParts.map((part) => (
                    <p
                      key={part}
                      className="growth-gradient-text font-display uppercase text-[clamp(0.8rem,3.4vw,1.05rem)] font-extrabold leading-snug tracking-[0.06em] min-[400px]:text-[clamp(0.95rem,2.1vw,1.2rem)] min-[400px]:tracking-[0.07em] sm:text-[clamp(1rem,2.2vw,1.35rem)] sm:tracking-[0.08em]"
                    >
                      {part}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroStatsTrustBand
