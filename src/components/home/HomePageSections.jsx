/**
 * Homepage narrative bands — viewport-tall shells under `/`.
 * Chapter order for `HomeSectionIndex`: keep in sync with `src/lib/homeNarrativeSections.js`.
 */

import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Sparkles, ShieldCheck, CircleDot, ArrowRight } from 'lucide-react'
import { cn, clamp } from '../../lib/utils'
import { HOME_NARRATIVE_SECTIONS } from '../../lib/homeNarrativeSections'
import { useHomeStory } from './HomeStoryViewport'
import { useHomeSequentialReveals } from '../../hooks/useHomeSequentialReveals'
import {
  heroContent,
  heroPracticeOutcomeFeatures,
  heroSubheadSegments,
  parallaxShowcaseContent,
  homeProblemContent,
  homeRoadmapContent,
  ctaContent,
} from '../../lib/content'
import { caseStudies } from '../../lib/content'
import { services } from '../../data/services'
import { aiPages } from '../../data/site/aiPages'
import { growthPrimaryHero, growthSecondaryHero, growthHeroCtaArrow } from '../../lib/growthCtaClasses'
import TrustStatCards from './TrustStatCards'

const FEATURE_ICONS = { Sparkles, ShieldCheck, CircleDot }

const VERTICAL_PATHS = [
  '/services/software-product',
  '/services/it-infrastructure',
  '/services/websites-local-seo',
  '/services/performance-marketing',
  '/services/creative-production',
]

const VERTICAL_STAGGER = [
  'xl:translate-y-0 xl:col-start-1',
  'xl:translate-y-10 xl:col-start-3 motion-reduce:xl:translate-y-0',
  'xl:translate-y-3 xl:col-start-5 motion-reduce:xl:translate-y-0',
  'xl:translate-y-8 xl:col-start-1 motion-reduce:xl:translate-y-0',
  'xl:translate-y-2 xl:col-start-4 motion-reduce:xl:translate-y-0',
]

const PLAN_CARDS = [
  {
    title: 'Local Foundation',
    line: 'GBP, local SEO, citations, and review velocity — credibility first.',
    to: '/plans/local-foundation',
  },
  {
    title: 'Growth Engine',
    line: 'Paid + organic demand with bi-weekly reporting and governed creative tests.',
    to: '/plans/growth-engine',
    popular: true,
  },
  {
    title: 'Market Leader',
    line: 'Automation, predictive targeting, and full-market orchestration where ROI fits.',
    to: '/plans/market-leader',
  },
]

const PILLAR_ACCENTS = [
  'border-t-[3px] border-cyan-400/90',
  'border-t-[3px] border-emerald-400/85',
  'border-t-[3px] border-rose-400/85',
]

const PILLAR_STAGGER = [
  'md:-translate-y-2 md:z-[1] motion-reduce:md:translate-y-0',
  'md:translate-y-9 md:z-[2] motion-reduce:md:translate-y-0',
  'md:-translate-y-1 md:z-[1] motion-reduce:md:translate-y-0',
]

const FINAL_AUDIT_BULLETS = [
  'Local visibility, GBP health, and directory consistency',
  'Reputation signals and competitor snapshot',
  'ROI framing and a realistic 90-day sequence for your market',
]

const AI_STAGGER = [
  'sm:-translate-y-1 motion-reduce:sm:translate-y-0',
  'sm:translate-y-10 motion-reduce:sm:translate-y-0',
  'sm:translate-y-4 motion-reduce:sm:translate-y-0',
  'sm:translate-y-12 motion-reduce:sm:translate-y-0',
]

/** Renders intro eyebrow into `#home-nav-eyebrow-root` (nav chrome) while source stays in this module — not part of `FullscreenNav` logic. */
function HomeHeroNavEyebrowPortal({ text }) {
  const [host, setHost] = useState(null)
  useLayoutEffect(() => {
    setHost(document.getElementById('home-nav-eyebrow-root'))
  }, [])
  if (!host) return null
  return createPortal(
    <p
      className={cn(
        'home-nav-eyebrow-line m-0 text-balance text-center text-[0.8125rem] font-semibold uppercase leading-snug tracking-[0.16em] text-white/60 sm:text-sm sm:tracking-[0.18em] md:text-[0.9375rem] lg:text-base lg:tracking-[0.2em] [@media(max-height:720px)]:text-xs',
      )}
    >
      {text}
    </p>,
    host,
  )
}

/** Tailwind `lg`: intro eyebrow portaled into nav only here and up; below, it stays in the hero so it does not stack on the bar. */
const HOME_INTRO_EYEBROW_PORTAL_MQ = '(min-width: 1024px)'

function useHomeIntroEyebrowInNavPortal() {
  const [inNav, setInNav] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(HOME_INTRO_EYEBROW_PORTAL_MQ).matches : false,
  )
  useLayoutEffect(() => {
    const mq = window.matchMedia(HOME_INTRO_EYEBROW_PORTAL_MQ)
    setInNav(mq.matches)
    const fn = () => setInNav(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return inNav
}

/** Two-line hero: line 1 + line 2 with gradient on first word. Legacy `['a','b','c']` still works. */
function splitHomeHeroHeadline(lines) {
  const arr = Array.isArray(lines) && lines.length > 0 ? lines : ['Not just a', 'marketing', 'agency']
  const line1 = arr[0] ?? 'Not just a'
  if (arr.length >= 3) {
    const w = arr[1] ?? 'marketing'
    const tail = arr[2] ?? 'agency'
    return { line1, gradientWord: w, tailSecondLine: tail.startsWith(' ') ? tail : ` ${tail}` }
  }
  const raw = (arr[1] ?? 'marketing agency').trim()
  const m = /^(\S+)(.*)$/.exec(raw)
  const gradientWord = m?.[1] ?? 'marketing'
  const tailSecondLine = m?.[2] ?? ''
  return { line1, gradientWord, tailSecondLine }
}

/** At least one viewport tall; `my-auto` centers shorter bands without clipping tall grids. */
function SectionShell({
  id,
  ariaLabel,
  className,
  bleed,
  children,
  viewportBand,
  deckFrame,
  deckInnerOverflowVisible,
  fullBleedBackdrop,
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'relative w-full scroll-mt-[6.75rem]',
        viewportBand && !deckFrame && 'flex min-h-[100svh] flex-col',
        deckFrame && 'flex min-h-0 flex-1 flex-shrink-0 flex-col overflow-hidden',
        bleed ? 'overflow-visible px-4 sm:px-6' : 'overflow-x-clip px-5 sm:px-8',
        fullBleedBackdrop && 'overflow-hidden',
        className,
      )}
    >
      {fullBleedBackdrop}
      <div
        className={cn(
          'relative z-10 mx-auto w-full max-w-6xl',
          bleed && 'max-w-[min(100%,76rem)]',
          viewportBand && !deckFrame && 'my-auto w-full',
          deckFrame &&
            cn(
              'my-0 flex min-h-0 w-full flex-1 flex-col overflow-x-hidden',
              /* Deck: match hero — visible Y avoids nested scrollbar; chapter height is viewport via `#main` scroll. */
              deckInnerOverflowVisible ? 'overflow-y-visible' : 'overflow-y-auto',
            ),
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default function HomePageSections() {
  const story = useHomeStory()
  const deckIdx = clamp(story?.visualSlideIndex ?? 0, 0, HOME_NARRATIVE_SECTIONS.length - 1)
  const df = Boolean(story)
  const introEyebrowInNavPortal = useHomeIntroEyebrowInNavPortal()
  useHomeSequentialReveals(deckIdx)

  const { line1: heroLine1, gradientWord: heroGradientWord, tailSecondLine: heroTailSecond } =
    splitHomeHeroHeadline(heroContent.headlineLines)

  const aiTiles = (aiPages.find((p) => p.path === '/ai')?.relatedLinks ?? []).slice(0, 4)
  const problemPains = homeProblemContent.pains.slice(0, 4)
  const workCases = caseStudies.slice(0, 3)
  const roadmapPhases = homeRoadmapContent.phases.map((phase) => ({
    ...phase,
    itemsShort: phase.items.slice(0, 2),
  }))

  const roadmapStagger = [
    'md:-translate-y-2 motion-reduce:md:translate-y-0',
    'md:translate-y-10 motion-reduce:md:translate-y-0',
    'md:-translate-y-1 motion-reduce:md:translate-y-0',
  ]

  const problemTilt = [
    'md:-rotate-[0.35deg] md:translate-x-0 motion-reduce:md:rotate-0',
    'md:rotate-[0.35deg] md:translate-x-1 md:-translate-y-1 motion-reduce:md:translate-x-0 motion-reduce:md:translate-y-0 motion-reduce:md:rotate-0',
    'md:-rotate-[0.25deg] md:-translate-x-1 md:translate-y-2 motion-reduce:md:translate-x-0 motion-reduce:md:translate-y-0 motion-reduce:md:rotate-0',
    'md:rotate-[0.3deg] md:translate-x-2 motion-reduce:md:translate-x-0 motion-reduce:md:rotate-0',
  ]

  return (
    <div
      id="home-deck-slide"
      key={HOME_NARRATIVE_SECTIONS[deckIdx]?.id ?? deckIdx}
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
    >
      {deckIdx === 0 && (
      <>
      {introEyebrowInNavPortal ? <HomeHeroNavEyebrowPortal text={heroContent.eyebrow} /> : null}
      <SectionShell deckFrame={df}
        deckInnerOverflowVisible={df}
        id="home-hero"
        ariaLabel="Hero"
        bleed
        viewportBand
        className={cn(
          'overflow-hidden pl-2.5 pr-4 pb-10 sm:pl-3 sm:pr-6 sm:pb-12 md:pl-4 md:pb-14 lg:pb-12 [@media(max-height:720px)]:pb-8 [@media(max-height:720px)]:sm:pb-10',
          /* Hero clears nav; `lg+` intro eyebrow is portaled into `#home-nav-eyebrow-root`; smaller widths render it in-flow below. */
          'pt-24 sm:pt-28 md:pt-36 lg:pt-40 [@media(max-height:780px)]:md:pt-32 [@media(max-height:780px)]:lg:pt-36',
        )}
        fullBleedBackdrop={
          heroContent.homeHeroFullBleedBackgroundSrc ? (
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
              <img
                src={heroContent.homeHeroFullBleedBackgroundSrc}
                alt=""
                width={1920}
                height={1080}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className={cn(
                  'h-full w-full object-cover object-[70%_center] lg:object-center',
                  df ? 'min-h-full' : 'min-h-[100svh]',
                )}
              />
            </div>
          ) : null
        }
      >
        <div className="relative w-full">
          {!introEyebrowInNavPortal ? (
            <p
              data-home-reveal
              className="relative z-[1] mx-auto mb-5 max-w-[min(100%,40rem)] text-center text-[0.8125rem] font-semibold uppercase leading-snug tracking-[0.16em] text-white/60 sm:mb-6 sm:text-sm sm:tracking-[0.18em] md:max-w-[48rem] md:text-[0.9375rem] lg:text-base lg:tracking-[0.2em] [@media(max-height:720px)]:mb-4 [@media(max-height:720px)]:text-xs"
            >
              {heroContent.eyebrow}
            </p>
          ) : null}
          <div
            className={cn(
              'relative grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-8 [@media(max-height:780px)]:gap-6 [@media(max-height:700px)]:gap-5',
              introEyebrowInNavPortal
                ? 'mt-12 sm:mt-14 md:mt-20 lg:mt-28 [@media(max-height:780px)]:mt-14 [@media(max-height:720px)]:mt-10'
                : 'mt-2 sm:mt-3 md:mt-4 [@media(max-height:780px)]:mt-3 [@media(max-height:720px)]:mt-2',
            )}
          >
            <div className="min-h-0 lg:col-span-7 lg:self-start">
              <h1 className="overflow-visible font-display text-center font-extrabold tracking-[-0.03em] text-white sm:text-left">
                <span
                  data-home-reveal
                  className="block text-[clamp(2.125rem,calc(0.45rem+7.2vw),5.75rem)] leading-[0.98] sm:leading-[0.96] [@media(max-height:760px)]:text-[clamp(1.875rem,calc(0.42rem+6.2vw),4.25rem)]"
                >
                  {heroLine1}
                </span>
                <span
                  data-home-reveal
                  className="mt-1 block font-display text-[clamp(2.25rem,calc(0.5rem+7.8vw),6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] sm:mt-1.5 xs:whitespace-nowrap sm:leading-[1.04] [@media(max-height:760px)]:text-[clamp(1.9rem,calc(0.45rem+6.5vw),4.5rem)] [@media(max-height:760px)]:xs:whitespace-normal"
                >
                  <span className="bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] bg-clip-text pb-[0.18em] text-transparent">
                    {heroGradientWord}
                  </span>
                  <span className="text-white">{heroTailSecond}</span>
                </span>
              </h1>
              <p
                data-home-reveal
                className="mx-auto mt-5 max-w-2xl text-center text-[clamp(1.0625rem,calc(0.42rem+1.45vw),1.5rem)] font-normal leading-[1.55] text-white/[0.82] sm:mx-0 sm:mt-6 sm:text-left md:mt-7 md:max-w-[34rem] lg:pr-2 [@media(max-height:760px)]:mt-4 [@media(max-height:760px)]:text-[clamp(0.98rem,calc(0.38rem+1.2vw),1.25rem)]"
              >
                {heroSubheadSegments.map((seg, i) =>
                  seg.growthHighlight ? (
                    <span
                      key={`hero-subhead-${i}`}
                      className="bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] bg-clip-text pb-[0.12em] font-semibold text-transparent"
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={`hero-subhead-${i}`}>{seg.text}</span>
                  ),
                )}
              </p>
            </div>
            <div className="relative flex min-h-0 flex-col justify-start lg:justify-end lg:col-span-5 lg:mt-0">
              <div
                data-home-reveal
                className="mt-10 flex flex-col items-stretch justify-center gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:justify-center sm:mt-12 md:mt-14 lg:mt-0 lg:justify-end [@media(max-height:760px)]:mt-9"
              >
                <Link to="/free-practice-audit" className={cn(growthPrimaryHero, 'no-underline')}>
                  <span>Free practice audit</span>
                  <span className={growthHeroCtaArrow} aria-hidden>
                    →
                  </span>
                </Link>
                <Link to="/portfolio" className={cn(growthPrimaryHero, 'no-underline')}>
                  <span>See what we build</span>
                  <span className={growthHeroCtaArrow} aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
      </>
      )}
      {deckIdx === 1 && (
      <>
      {/* 2 · Trust — trust line + three outcome stat cards */}
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-trust" ariaLabel="Trust" viewportBand className="py-8 md:py-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-8 md:max-w-5xl md:gap-10 lg:max-w-6xl">
          <div className="-rotate-1 motion-reduce:rotate-0">
            <div
              data-home-reveal
              className={cn(
                'home-scene-surface-dark home-scene-elevate-soft mx-auto max-w-2xl rounded-2xl border border-white/[0.1] px-6 py-4 text-center',
              )}
            >
              <p className="text-base font-medium leading-relaxed text-white/70 md:text-lg">
                <span className="text-white/90">HIPAA-aware</span>
                <span className="mx-2 text-white/25" aria-hidden>
                  ·
                </span>
                <span className="text-white/90">Full-stack</span>
                <span className="mx-2 text-white/25" aria-hidden>
                  ·
                </span>
                <span className="text-white/90">Physician-led</span>
              </p>
            </div>
          </div>
          <div data-home-reveal className="w-full">
            <TrustStatCards stats={heroContent.stats} />
          </div>
        </div>
      </SectionShell>
      </>
      )}
      {deckIdx === 2 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-pillars" ariaLabel="Three pillars" bleed viewportBand className="py-12 md:py-20">
        <h2
          data-home-reveal
          className="max-w-lg font-display text-2xl font-extrabold leading-tight text-white md:text-3xl"
        >
          Built for how practices actually grow
        </h2>
        <div className="relative mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:items-start md:justify-between md:gap-5">
          {heroPracticeOutcomeFeatures.map((feature, i) => {
            const Icon = FEATURE_ICONS[feature.iconKey] ?? Sparkles
            return (
              <div
                key={feature.id}
                className={cn('relative min-w-0 flex-1 md:max-w-[34%]', PILLAR_STAGGER[i])}
              >
                <div data-home-reveal>
                  <div
                    className={cn(
                      'home-scene-surface-dark home-scene-elevate-soft flex h-full flex-col rounded-2xl border border-white/[0.1] p-6 backdrop-blur-sm',
                      PILLAR_ACCENTS[i],
                    )}
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] text-cyan-200/90">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{feature.title}</h3>
                    <p className="mt-3 flex-1 text-[clamp(0.9375rem,calc(0.2rem+1vw),1.0625rem)] leading-relaxed text-white/72 md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </SectionShell>
      )}
      {deckIdx === 3 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-who" ariaLabel="Who we are" bleed viewportBand className="py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:pt-4">
            <p
              data-home-reveal
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            >
              Who we are
            </p>
            <h2
              data-home-reveal
              className="mt-3 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl"
            >
              <span className="block">{parallaxShowcaseContent.headlineLine1}</span>
              <span className="block">{parallaxShowcaseContent.headlineLine2}</span>
            </h2>
            <p
              data-home-reveal
              className="mt-5 max-w-2xl text-[clamp(1.0625rem,calc(0.38rem+1.25vw),1.3125rem)] font-normal leading-[1.55] text-white/[0.78]"
            >
              {parallaxShowcaseContent.lead}
            </p>
            <blockquote
              data-home-reveal
              className="mt-10 border-l-2 border-cyan-400/40 pl-5 text-lg italic leading-snug text-white/80 md:text-xl"
            >
              Outcomes are the goal; fewer handoffs and clearer ownership are how we get there credibly in healthcare.
            </blockquote>
            <Link
              data-home-reveal
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 underline-offset-4 hover:text-white hover:underline"
            >
              Start the conversation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="relative flex min-h-[280px] flex-col justify-center gap-4 lg:col-span-6 lg:min-h-[320px]">
            <div
              className={cn(
                'lg:absolute lg:right-0 lg:top-0 lg:max-w-[92%] lg:-translate-y-4',
                '-rotate-1 lg:translate-x-2 motion-reduce:rotate-0 motion-reduce:lg:translate-x-0 motion-reduce:lg:translate-y-0',
              )}
            >
              <div data-home-reveal className="home-scene-surface-dark home-scene-elevate-soft rounded-2xl border border-white/[0.1] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Typical agency</p>
                <p className="mt-2 text-base leading-relaxed text-white/70">
                  Campaigns and creative — rarely owns product, IT, or compliance depth.
                </p>
              </div>
            </div>
            <div
              className={cn(
                'lg:absolute lg:left-4 lg:top-[38%] lg:max-w-[88%]',
                'rotate-1 lg:translate-x-6 motion-reduce:rotate-0 motion-reduce:lg:translate-x-0',
              )}
            >
              <div data-home-reveal className="home-scene-surface-dark home-scene-elevate-soft rounded-2xl border border-white/[0.1] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Tech vendor</p>
                <p className="mt-2 text-base leading-relaxed text-white/70">
                  Tickets and uptime — not accountable for patient demand or revenue.
                </p>
              </div>
            </div>
            <div
              className={cn(
                'lg:absolute lg:bottom-0 lg:left-0 lg:max-w-[94%]',
                '-rotate-[0.5deg] lg:-translate-x-1 lg:translate-y-2 motion-reduce:rotate-0 motion-reduce:lg:translate-x-0 motion-reduce:lg:translate-y-0',
              )}
            >
              <div
                data-home-reveal
                className="rounded-2xl border border-cyan-400/35 bg-cyan-500/[0.12] p-4 shadow-[0_20px_50px_-28px_rgba(6,182,212,0.35)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-100/95">You</p>
                <p className="mt-2 text-base leading-relaxed text-white/90">
                  Run the practice; we align growth, software, and marketing under one roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
      )}
      {deckIdx === 4 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-verticals" ariaLabel="Services verticals" bleed viewportBand className="py-12 md:py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div data-home-reveal className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Five verticals</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
              One partner. Zero gaps.
            </h2>
          </div>
          <Link
            data-home-reveal
            to="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/[0.1]"
          >
            Explore services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:grid-rows-2 xl:gap-5">
          {services.map((v, idx) => (
            <li
              key={v.id}
              className={cn(
                'min-w-0 sm:col-span-1',
                idx < 3 ? 'xl:row-start-1' : 'xl:row-start-2',
                idx === 3 ? 'xl:col-span-3' : idx === 4 ? 'xl:col-span-3' : 'xl:col-span-2',
                VERTICAL_STAGGER[idx],
              )}
            >
              <div data-home-reveal className="h-full">
                <Link
                  to={VERTICAL_PATHS[idx] ?? '/services'}
                  className={cn(
                    'home-scene-surface-light home-scene-elevate-soft flex h-full min-h-[140px] flex-col rounded-2xl border border-slate-200/80 p-5 text-slate-900',
                    'transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_-28px_rgba(0,0,0,0.45)] motion-reduce:hover:translate-y-0',
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{v.category}</span>
                  <span className="mt-2 font-display text-base font-bold leading-snug">{v.title}</span>
                  <span className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base md:leading-[1.55]">
                    {v.description}
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </SectionShell>
      )}
      {deckIdx === 5 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-ai" ariaLabel="AI capabilities" bleed viewportBand className="py-12 md:py-20">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div data-home-reveal className="max-w-xl lg:max-w-[26rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">AI engine</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
              AI as the operating system for growth — governed, measurable, HIPAA-aware.
            </h2>
          </div>
          <Link
            data-home-reveal
            to="/ai"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/25 bg-white/[0.06] px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm hover:border-white/40 lg:self-auto"
          >
            Explore AI capabilities
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
          {aiTiles.map((tile, i) => (
            <li key={tile.to} className={cn('min-w-0', AI_STAGGER[i])}>
              <div data-home-reveal className="h-full">
                <Link
                  to={tile.to}
                  className={cn(
                    'home-scene-surface-dark home-scene-elevate-soft flex h-full flex-col rounded-2xl border border-white/[0.1] p-6 backdrop-blur-sm',
                    'transition-colors hover:border-white/25 hover:bg-white/[0.07]',
                  )}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] text-[11px] font-extrabold text-white shadow-md">
                    {i + 1}
                  </span>
                  <span className="mt-4 font-display text-base font-bold text-white">{tile.title}</span>
                  <span className="mt-2 text-base leading-relaxed text-white/68">{tile.description}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </SectionShell>
      )}
      {deckIdx === 6 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-problem" ariaLabel="Practice growth gaps" bleed viewportBand className="py-12 md:py-20">
        <div className="max-w-3xl">
          <p data-home-reveal className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {homeProblemContent.eyebrow}
          </p>
          <h2
            data-home-reveal
            className="mt-3 font-display text-2xl font-extrabold text-white md:text-3xl"
          >
            {homeProblemContent.headlineLine1}{' '}
            <span className="text-white/90">{homeProblemContent.headlineLine2}</span>
          </h2>
          <p
            data-home-reveal
            className="mt-4 text-[clamp(1rem,calc(0.35rem+1.15vw),1.25rem)] font-normal leading-[1.55] text-white/72 md:text-lg"
          >
            {homeProblemContent.lead}
          </p>
        </div>
        <ul className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8">
          {problemPains.map((pain, i) => (
            <li
              key={pain.title}
              className={cn('relative min-w-0 overflow-hidden rounded-2xl', problemTilt[i])}
            >
              <div
                data-home-problem-bar
                className="home-scene-surface-dark home-scene-elevate-soft min-w-full rounded-2xl border border-white/[0.1] backdrop-blur-sm will-change-transform"
              >
                <div
                  className="h-28 w-full bg-cover sm:h-32"
                  style={{
                    backgroundImage: `url(${pain.image})`,
                    backgroundPosition: pain.imageObjectPosition ?? 'center',
                  }}
                />
                <div className="p-4">
                  <h3 className="font-display text-base font-bold text-white">{pain.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/68">{pain.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div data-home-reveal className="mt-12 sm:mt-14">
          <Link to="/free-practice-audit" className={cn(growthPrimaryHero, 'no-underline')}>
            <span>See how we fix this</span>
            <span className={growthHeroCtaArrow} aria-hidden>
              →
            </span>
          </Link>
        </div>
      </SectionShell>
      )}
      {deckIdx === 7 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-selected-work" ariaLabel="Selected work" bleed viewportBand className="py-12 md:py-20">
        <p data-home-reveal className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Selected work
        </p>
        <h2
          data-home-reveal
          className="mt-3 max-w-xl font-display text-2xl font-extrabold leading-tight text-white md:text-3xl"
        >
          Outcomes you can brief a board on
        </h2>
        <ul className="mt-12 flex flex-col gap-6 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-5">
          {workCases.map((cs, i) => (
            <li
              key={cs.slug}
              className={cn(
                'min-h-0 min-w-0',
                i === 0 && 'md:row-span-2',
                i === 1 && 'md:col-start-2 md:row-start-1',
                i === 2 && 'md:col-start-2 md:row-start-2',
              )}
            >
              <div data-home-reveal className="h-full min-h-0">
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className={cn(
                    'group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm',
                    'home-scene-elevate-soft transition-[border-color,transform] hover:border-white/25 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
                    i === 0 && 'md:min-h-[min(72vh,560px)]',
                  )}
                >
                <div
                  className={cn(
                    'w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100',
                    i === 0 ? 'aspect-[4/3] min-h-[200px] flex-1 md:aspect-auto md:min-h-[280px]' : 'aspect-[5/3] md:aspect-[16/10]',
                  )}
                  style={{ backgroundImage: `url(${cs.image})` }}
                />
                <div className="flex flex-1 flex-col p-5">
                  {cs.primaryMetric ? (
                    <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-200/90">
                      {cs.primaryMetric.value} — {cs.primaryMetric.label}
                    </p>
                  ) : null}
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{cs.client}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-base leading-relaxed text-white/68 md:line-clamp-4">
                    {cs.excerpt}
                  </p>
                  <p className="mt-4 flex flex-wrap gap-1.5">
                    {cs.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
              </Link>
              </div>
            </li>
          ))}
        </ul>
        <div data-home-reveal>
          <Link
            to="/case-studies"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white"
          >
            View all case studies
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </SectionShell>
      )}
      {deckIdx === 8 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-roadmap" ariaLabel="Ninety day roadmap" bleed viewportBand className="py-12 md:py-20">
        <p data-home-reveal className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          {homeRoadmapContent.eyebrow}
        </p>
        <h2
          data-home-reveal
          className="mt-3 max-w-3xl font-display text-2xl font-extrabold leading-tight text-white md:text-3xl"
        >
          {homeRoadmapContent.headline}
        </h2>
        <p data-home-reveal className="mt-4 max-w-2xl text-[clamp(1rem,calc(0.35rem+1.1vw),1.25rem)] font-normal leading-[1.55] text-white/72 md:text-lg">
          {homeRoadmapContent.lead}
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {roadmapPhases.map((phase, i) => (
            <div key={phase.title} className={cn(roadmapStagger[i])}>
              <div
                data-home-reveal
                className="home-scene-surface-dark home-scene-elevate-soft rounded-2xl border border-white/[0.1] p-6 backdrop-blur-sm"
              >
                <h3 className="font-display text-base font-bold text-white">{phase.title}</h3>
                <ul className="mt-4 list-disc space-y-2.5 pl-4 text-[0.9375rem] leading-relaxed text-white/72 marker:text-cyan-400/80 md:text-base">
                  {phase.itemsShort.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p data-home-reveal className="mt-10 text-base leading-relaxed text-white/60 md:text-[1.0625rem]">
          Longer engagements build the 12-month engine —{' '}
          <Link to="/about" className="font-semibold text-cyan-200/90 underline-offset-2 hover:text-white hover:underline">
            how we work
          </Link>
          .
        </p>
      </SectionShell>
      )}
      {deckIdx === 9 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-plans" ariaLabel="Plans" bleed viewportBand className="py-12 md:py-20">
        <p data-home-reveal className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Plans
        </p>
        <h2
          data-home-reveal
          className="mt-3 max-w-lg font-display text-2xl font-extrabold leading-tight text-white md:text-3xl"
        >
          Pick a ladder, not a laundry list
        </h2>
        <ul className="relative mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-center md:gap-5">
          {PLAN_CARDS.map((plan, i) => (
            <li
              key={plan.to}
              className={cn(
                'min-w-0 flex-1 md:max-w-[32%]',
                i === 0 && 'md:translate-y-6 motion-reduce:md:translate-y-0',
                i === 1 &&
                  'md:z-[3] md:-translate-y-3 md:scale-[1.03] motion-reduce:md:translate-y-0 motion-reduce:md:scale-100',
                i === 2 && 'md:translate-y-5 motion-reduce:md:translate-y-0',
              )}
            >
              <div data-home-reveal className="h-full">
                <Link
                  to={plan.to}
                  className={cn(
                    'home-scene-surface-dark home-scene-elevate relative flex h-full flex-col rounded-2xl border border-white/[0.12] p-6 backdrop-blur-sm',
                    'transition-colors hover:border-white/30',
                    i === 1 && 'border-cyan-400/25 shadow-[0_24px_60px_-28px_rgba(34,211,238,0.18)]',
                  )}
                >
                {plan.popular ? (
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}
                <h3 className="font-display text-lg font-bold text-white">{plan.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-white/72">{plan.line}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-200">
                  View plan <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
              </div>
            </li>
          ))}
        </ul>
        <div data-home-reveal className="mt-12 flex justify-center md:mt-14">
          <Link to="/plans" className={cn(growthSecondaryHero, 'no-underline')}>
            Compare all plans
          </Link>
        </div>
      </SectionShell>
      )}
      {deckIdx === 10 && (
      <SectionShell deckFrame={df} deckInnerOverflowVisible={df} id="home-final-cta" ariaLabel="Free practice audit" bleed viewportBand className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <h2
              data-home-reveal
              className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl lg:max-w-[14ch]"
            >
              {ctaContent.headline}
            </h2>
            <p
              data-home-reveal
              className="mt-5 max-w-2xl text-[clamp(1.0625rem,calc(0.4rem+1.2vw),1.375rem)] font-normal leading-[1.55] text-white/[0.78] md:max-w-3xl"
            >
              {ctaContent.subhead}
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div
              className={cn(
                'lg:-translate-x-4 lg:translate-y-2 lg:rotate-[0.4deg] motion-reduce:lg:translate-x-0 motion-reduce:lg:translate-y-0 motion-reduce:lg:rotate-0',
              )}
            >
              <div
                data-home-reveal
                className="home-scene-surface-dark home-scene-elevate rounded-3xl border border-white/[0.12] p-6 sm:p-8"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">What you get</p>
                <ul className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed text-white/85 md:text-base">
                  {FINAL_AUDIT_BULLETS.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/90" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/free-practice-audit"
                  className={cn(growthPrimaryHero, 'mt-8 w-full no-underline sm:w-full')}
                >
                  <span>Get your free practice audit</span>
                  <span className={growthHeroCtaArrow} aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
      )}
    </div>
  )
}
