import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../lib/utils'
import { growthPrimaryHero } from '../../lib/growthCtaClasses'
import { heroContent, heroSubheadSegments } from '../../lib/content'
import { backgroundAssets } from '../../lib/backgroundAssets'
import { BrandScroller } from '../ui/BrandScroller'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Per-character "shutter" word — base layer + three colored horizontal slice
 * layers (top 35% / middle 30% / bottom 35%). The slices animate independently
 * to create a rolling-shutter reveal / dismiss on top of the base character.
 *
 * The base characters are plain white sitting over the background image
 * + dark gradient overlay. (We deliberately do NOT use `mix-blend-difference`
 * here: against the navy/blue hero plate, white-difference resolves to a
 * yellow cast — `|255 - blue|` ≈ yellow. The wrappers add a soft drop-shadow
 * instead so the title stays readable without color shift.) The slices are
 * normal-blend colored accents that flash across during the shutter.
 *
 * GSAP looks up the sub-elements via `[data-shutter="..."]` attributes scoped
 * to the outer span (the ref). Pass `innerRef` to get a handle on that span.
 */
function ShutterWord({ text, innerRef, className = '' }) {
  const chars = text.split('')
  return (
    <span
      ref={innerRef}
      aria-hidden="true"
      className={`inline-flex items-baseline whitespace-nowrap leading-none ${className}`}
    >
      {chars.map((c, i) => {
        const display = c === ' ' ? '\u00A0' : c
        return (
          <span
            key={`${c}-${i}`}
            className="shutter-char relative inline-block overflow-hidden leading-none"
          >
            <span
              data-shutter="base"
              className="block text-white will-change-[opacity,filter,transform]"
            >
              {display}
            </span>
            <span
              data-shutter="top"
              aria-hidden
              className="pointer-events-none absolute inset-0 text-[color:var(--color-growth-from)] will-change-transform"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)' }}
            >
              {display}
            </span>
            <span
              data-shutter="mid"
              aria-hidden
              className="pointer-events-none absolute inset-0 text-white/90 mix-blend-difference will-change-transform"
              style={{ clipPath: 'polygon(0 35%, 100% 35%, 100% 65%, 0 65%)' }}
            >
              {display}
            </span>
            <span
              data-shutter="bot"
              aria-hidden
              className="pointer-events-none absolute inset-0 text-[color:var(--color-growth-to)] will-change-transform"
              style={{ clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)' }}
            >
              {display}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/**
 * Phase-2 hero — right-column value prop. Glass frame + gold accent rail; split
 * from the left headline so vertical offset stays independent.
 * Keywords use `growth-gradient-text` (same pink→coral system as primary CTAs).
 */
function HeroScrollExpandPhase2Aside({ segments }) {
  return (
    <aside
      aria-label="What we do"
      className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-[min(100%,28rem)] lg:translate-y-40 xl:max-w-[min(100%,30rem)] xl:translate-y-52"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#050816]/22 shadow-[0_20px_48px_-22px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.1)] ring-1 ring-white/[0.08] sm:rounded-3xl">
        {/* Top hairline — reads as a deliberate frame, not a random cut */}
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/45 to-transparent sm:inset-x-7"
          aria-hidden
        />
        {/* Gold accent rail */}
        <div
          className="pointer-events-none absolute bottom-5 left-0 top-5 w-px bg-gradient-to-b from-amber-200/55 via-amber-200/25 to-transparent sm:bottom-6 sm:top-6"
          aria-hidden
        />
        {/* Corner flourishes (subtler than raw L-brackets) */}
        <span
          className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-amber-200/35 sm:left-4 sm:top-4 sm:h-6 sm:w-6"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-amber-200/35 sm:bottom-4 sm:right-4 sm:h-6 sm:w-6"
          aria-hidden
        />
        <p className="text-balance pl-7 pr-5 py-5 text-left font-display text-base font-semibold leading-relaxed text-white/95 sm:pl-8 sm:pr-6 sm:py-6 sm:text-lg sm:leading-relaxed lg:pl-9 lg:pr-7 lg:py-6 lg:text-right lg:text-[1.125rem] lg:leading-[1.55] xl:text-xl xl:leading-[1.5] [text-shadow:0_1px_3px_rgba(0,0,0,0.65),0_0_24px_rgba(0,0,0,0.35)]">
          {segments.map((segment, i) =>
            segment.emphasis ? (
              <span key={i} className="growth-gradient-text font-semibold">
                {segment.text}
              </span>
            ) : (
              <span key={i}>{segment.text}</span>
            ),
          )}
        </p>
      </div>
    </aside>
  )
}

/**
 * Scroll-driven hero: title splits apart, inner media card grows to full-bleed.
 *
 * - Desktop (lg+): ScrollTrigger pins the section, scrub-ties progress to title
 *   slide + media expand + background fade. All three title lines play a per-
 *   character SHUTTER on mount (one-shot, staggered) and shutter out as scroll
 *   progresses. Plays nicely with Locomotive Scroll via the existing
 *   `scrollerProxy` on `#main`.
 * - Tablet / mobile: simpler static composition — no pin, no scrub, no card
 *   expand, no shutter. Background + stacked title + subhead + CTAs only.
 *   Pass `mobileLeadText` / `mobileFocalText` / `mobileTailText` when the small-
 *   screen headline should differ from the desktop shutter lines.
 * - `prefers-reduced-motion`: skips the desktop pin entirely and falls back to
 *   the static composition so nothing hijacks scroll.
 *
 * Two render branches are intentional so the small-screen tree has no off-
 * screen card / no pinned spacer — keeps the LCP cheap on phones.
 */
function HeroScrollExpand({
  bgImageSrc = backgroundAssets.heroScrollExpandOuter,
  mediaSrc = backgroundAssets.heroScrollExpandCard,
  mediaType = 'image',
  posterSrc = backgroundAssets.heroScrollExpandOuter,
  /** Shown above the three-line title when non-empty (sentence case; not forced uppercase). */
  welcomeLine = '',
  leadText = 'Welcome to',
  focalText = 'Ensemble',
  tailText = 'Digital Labs',
  /** Optional `< lg` three-line stack; defaults to `leadText` / `focalText` / `tailText` (desktop pin + shutter). */
  mobileLeadText,
  mobileFocalText,
  mobileTailText,
}) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const bgRef = useRef(null)
  const overlayRef = useRef(null)
  const cardRef = useRef(null)
  const wordTopRef = useRef(null)
  const wordMidRef = useRef(null)
  const wordBottomRef = useRef(null)
  const subRef = useRef(null)
  /** Fade targets only — never `autoAlpha` on `subRef` or an aside ancestor (breaks `backdrop-filter`). */
  const subLockupRef = useRef(null)
  const subAsideWrapRef = useRef(null)
  const subCtasRef = useRef(null)
  const logoMarqueeRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion()) return

    const main = document.querySelector('#main')
    if (!sectionRef.current || !pinRef.current) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const card = cardRef.current
      const wordTop = wordTopRef.current
      const wordMid = wordMidRef.current
      const wordBottom = wordBottomRef.current
      const bg = bgRef.current
      const overlay = overlayRef.current
      const sub = subRef.current
      const lockupCol = subLockupRef.current
      const asideWrap = subAsideWrapRef.current
      const ctaRow = subCtasRef.current
      const logoMarquee = logoMarqueeRef.current
      if (!card || !wordTop || !wordMid || !wordBottom || !bg || !overlay || !sub || !logoMarquee) return
      if (!lockupCol || !asideWrap || !ctaRow) return

      // Per-line shutter handles. Order matters for stagger between lines.
      const lines = [wordTop, wordMid, wordBottom].map((el) => ({
        el,
        bases: el.querySelectorAll('[data-shutter="base"]'),
        tops: el.querySelectorAll('[data-shutter="top"]'),
        mids: el.querySelectorAll('[data-shutter="mid"]'),
        bots: el.querySelectorAll('[data-shutter="bot"]'),
      }))

      const startCardW = () => Math.min(window.innerWidth * 0.28, 420)
      const startCardH = () => Math.min(window.innerHeight * 0.55, 560)
      /** Use `clientWidth` so expanded card does not exceed layout viewport (avoids gutter / stray scrollbars). */
      const endCardW = () => {
        const cw = typeof document !== 'undefined' ? document.documentElement.clientWidth : window.innerWidth
        return Math.min(cw * 0.92, 1600)
      }
      const endCardH = () => Math.min(window.innerHeight * 0.82, 900)

      // === Initial state (pre-entry) ===
      gsap.set(card, { width: startCardW(), height: startCardH() })
      // Tight 3-line stack — y offsets track the rendered line heights (focal +
      // tail share a mid-scale clamp, so gaps stay around half-line-height).
      gsap.set(wordTop, { xPercent: -50, yPercent: -50, x: 0, y: -102 })
      gsap.set(wordMid, { xPercent: -50, yPercent: -50, x: 0, y: -10 })
      gsap.set(wordBottom, { xPercent: -50, yPercent: -50, x: 0, y: 118 })
      /* Photo + vignette: keep image readable; prior 0.85 × heavy gradient felt muddy */
      gsap.set(bg, { opacity: 0.96, scale: 1.04 })
      gsap.set(overlay, { opacity: 0.4 })
      /**
       * Phase-2: `autoAlpha` on `subRef` used to set `opacity` on an ancestor of the glass
       * aside — Chrome then composites `backdrop-filter` wrong (milky / “opaque” snap). Fade
       * lockup + CTAs only; aside wrapper uses `visibility` (no opacity on backdrop ancestors).
       */
      gsap.set(sub, { y: 20, pointerEvents: 'none' })
      gsap.set([lockupCol, ctaRow], { autoAlpha: 0 })
      gsap.set(asideWrap, { visibility: 'hidden', pointerEvents: 'none' })
      gsap.set(logoMarquee, { autoAlpha: 0, y: 14 })

      // Park every shutter piece off-screen (bases hidden + blurred, slices
      // off the side) so the entry timeline can play them in cleanly.
      lines.forEach((line) => {
        gsap.set(line.bases, { autoAlpha: 0, filter: 'blur(10px)' })
        gsap.set(line.tops, { xPercent: -100, autoAlpha: 0 })
        gsap.set(line.mids, { xPercent: 100, autoAlpha: 0 })
        gsap.set(line.bots, { xPercent: -100, autoAlpha: 0 })
      })

      // === ENTRY — one-shot shutter-IN on mount ===
      // Lines stagger so the eye reads top → focal → bottom; per-character
      // stagger inside each line keeps the sweep crisp.
      const entryTl = gsap.timeline({ delay: 0.3 })
      const LINE_STAGGER = 0.18

      lines.forEach((line, lineIdx) => {
        const t = lineIdx * LINE_STAGGER

        entryTl
          // Top slice sweeps left → right and fades off the right edge.
          .to(
            line.tops,
            { xPercent: 0, autoAlpha: 1, duration: 0.26, ease: 'power2.in', stagger: 0.03 },
            t,
          )
          .to(
            line.tops,
            { xPercent: 100, autoAlpha: 0, duration: 0.3, ease: 'power2.out', stagger: 0.03 },
            t + 0.26,
          )
          // Mid slice sweeps right → left (opposite direction for variety).
          .to(
            line.mids,
            { xPercent: 0, autoAlpha: 1, duration: 0.26, ease: 'power2.in', stagger: 0.03 },
            t + 0.07,
          )
          .to(
            line.mids,
            { xPercent: -100, autoAlpha: 0, duration: 0.3, ease: 'power2.out', stagger: 0.03 },
            t + 0.33,
          )
          // Bot slice mirrors the top.
          .to(
            line.bots,
            { xPercent: 0, autoAlpha: 1, duration: 0.26, ease: 'power2.in', stagger: 0.03 },
            t + 0.14,
          )
          .to(
            line.bots,
            { xPercent: 100, autoAlpha: 0, duration: 0.3, ease: 'power2.out', stagger: 0.03 },
            t + 0.4,
          )
          // Base resolves just after the slices have swept across it.
          .to(
            line.bases,
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: 0.55,
              ease: 'power2.out',
              stagger: 0.025,
            },
            t + 0.28,
          )
      })

      // === EXIT — scrub-tied scroll-out timeline ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: main || undefined,
          start: 'top top',
          end: '+=130%',
          scrub: 1,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Card expands + bg recedes through the whole scroll. Lead/tail also
      // drift diagonally so the corners clear cleanly while their characters
      // are shuttering out.
      tl.to(card, { width: endCardW, height: endCardH, ease: 'power2.inOut', duration: 0.72 }, 0)
        .to(
          wordTop,
          {
            x: () => -window.innerWidth * 0.45,
            y: () => -window.innerHeight * 0.4,
            ease: 'power2.inOut',
            duration: 0.72,
          },
          0,
        )
        .to(
          wordBottom,
          {
            x: () => window.innerWidth * 0.45,
            y: () => window.innerHeight * 0.4,
            ease: 'power2.inOut',
            duration: 0.72,
          },
          0,
        )
        .to(bg, { opacity: 0.18, scale: 1, ease: 'power2.inOut', duration: 0.72 }, 0)
        .to(overlay, { opacity: 0.22, ease: 'power2.inOut', duration: 0.72 }, 0)

      // Per-line shutter-OUT: slices sweep across once more, base fades + blurs.
      lines.forEach((line, lineIdx) => {
        const t = lineIdx * 0.04

        tl.to(
          line.bases,
          {
            autoAlpha: 0,
            filter: 'blur(10px)',
            duration: 0.5,
            ease: 'power2.in',
            stagger: 0.015,
          },
          t + 0.05,
        )
          .to(
            line.tops,
            { xPercent: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.in', stagger: 0.012 },
            t,
          )
          .to(
            line.tops,
            { xPercent: -100, autoAlpha: 0, duration: 0.24, ease: 'power2.out', stagger: 0.012 },
            t + 0.22,
          )
          .to(
            line.mids,
            { xPercent: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.in', stagger: 0.012 },
            t + 0.05,
          )
          .to(
            line.mids,
            { xPercent: 100, autoAlpha: 0, duration: 0.24, ease: 'power2.out', stagger: 0.012 },
            t + 0.27,
          )
          .to(
            line.bots,
            { xPercent: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.in', stagger: 0.012 },
            t + 0.1,
          )
          .to(
            line.bots,
            { xPercent: -100, autoAlpha: 0, duration: 0.24, ease: 'power2.out', stagger: 0.012 },
            t + 0.32,
          )
      })

      tl.to(sub, { y: 0, pointerEvents: 'auto', ease: 'power2.out', duration: 0.34 }, 0.56)
        .to([lockupCol, ctaRow], { autoAlpha: 1, ease: 'power2.out', duration: 0.34 }, 0.56)
        .to(
          asideWrap,
          { visibility: 'visible', pointerEvents: 'auto', ease: 'none', duration: 0.05 },
          0.56,
        )
        .to(logoMarquee, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.34 }, 0.56)

      return () => {
        entryTl.kill()
        tl.kill()
      }
    })

    const refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => {
      window.clearTimeout(refreshT)
      mm.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="page1"
      className="hero-scroll-expand relative w-full overflow-x-hidden bg-[#050816] lg:overflow-hidden"
    >
      {/* ──────────────────────────────────────────────────────────────
         MOBILE / TABLET (< lg): simple static hero — no scroll hijack
         ────────────────────────────────────────────────────────────── */}
      <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden lg:hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bgImageSrc}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/48 via-[#050816]/28 to-[#050816]/84" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pt-24 pb-12 text-center sm:pt-28">
          {welcomeLine?.trim() ? (
            <p className="mb-4 max-w-[min(100%,36rem)] text-balance font-display text-xs font-semibold uppercase leading-snug tracking-[0.18em] text-teal-200/95 sm:mb-5 sm:text-sm sm:tracking-[0.16em]">
              {welcomeLine.trim()}
            </p>
          ) : null}
          <p
            className="growth-gradient-text font-display italic font-extrabold uppercase tracking-[0.1em]"
            style={{ fontSize: 'clamp(1.25rem, 5.5vw, 2rem)' }}
          >
            {mobileLeadText ?? leadText}
          </p>
          <h1
            className="growth-gradient-text mt-1 font-display italic font-extrabold uppercase tracking-[0.1em]"
            style={{ fontSize: 'clamp(1.25rem, 5.5vw, 2rem)' }}
          >
            {mobileFocalText ?? focalText}
          </h1>
          <p
            className="growth-gradient-text mt-1 font-display italic font-extrabold uppercase tracking-[0.1em]"
            style={{ fontSize: 'clamp(1.25rem, 5.5vw, 2rem)' }}
          >
            {mobileTailText ?? tailText}
          </p>

          <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-white/85 sm:text-base">
            {heroContent.subhead}
          </p>

          <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 xs:flex-row xs:items-center sm:w-auto sm:gap-4">
            <Link
              to={heroContent.primaryCTA.link}
              data-discover="true"
              className={`${growthPrimaryHero} no-underline`}
            >
              <span className="flex-1 text-center xs:text-left">
                {heroContent.primaryCTA.text}
              </span>
              <span className="shrink-0 pl-1 text-xl font-light leading-none opacity-95" aria-hidden>
                →
              </span>
            </Link>
            <Link
              to={heroContent.secondaryCTA.link}
              data-discover="true"
              className={`${growthPrimaryHero} no-underline`}
            >
              <span className="flex-1 text-center xs:text-left">{heroContent.secondaryCTA.text}</span>
              <span className="shrink-0 pl-1 text-xl font-light leading-none opacity-95" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────
         DESKTOP (lg+): pinned scroll-driven expand + per-line shutter
         ────────────────────────────────────────────────────────────── */}
      <div className="hidden min-w-0 max-w-full overflow-hidden lg:block">
        <div
          ref={pinRef}
          className="relative flex h-[100svh] w-full max-w-full min-w-0 items-center justify-center overflow-hidden overscroll-none"
        >
          {/* Background photo */}
          <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
            <img
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050816]/38 via-[#050816]/20 to-[#050816]/78"
            aria-hidden
          />

          {welcomeLine?.trim() ? (
            <p
              className="pointer-events-none absolute left-1/2 top-[min(14vh,128px)] z-20 w-[min(94vw,52rem)] -translate-x-1/2 text-center font-display text-xs font-semibold uppercase leading-snug tracking-[0.18em] text-teal-200/95 drop-shadow-[0_1px_14px_rgba(0,0,0,0.45)] sm:text-sm sm:tracking-[0.16em] lg:top-[min(15vh,144px)] lg:text-[0.9375rem] lg:tracking-[0.14em]"
            >
              {welcomeLine.trim()}
            </p>
          ) : null}

          {/* Centered media card — expands on scroll */}
          <div
            ref={cardRef}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl shadow-[0_50px_140px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 will-change-[width,height]"
            style={{ width: 'min(28vw, 420px)', height: 'min(55vh, 560px)' }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
                disablePictureInPicture
                disableRemotePlayback
              />
            ) : (
              <img
                src={mediaSrc}
                alt=""
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/26 via-transparent to-black/10" />
          </div>

          {/* Three-line title — <ShutterWord> per-character base (white) +
              colored slice layers on entry + scroll-out. `sr-only` mirrors
              the accessible name; visible shutter chars are aria-hidden. */}
          <p
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 font-display italic font-extrabold uppercase tracking-[0.12em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] will-change-transform"
            style={{ fontSize: 'clamp(1.35rem, 2.75vw, 2rem)' }}
          >
            <span className="sr-only">{leadText}</span>
            <ShutterWord text={leadText} innerRef={wordTopRef} />
          </p>

          <h1
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 font-display font-extrabold uppercase tracking-tight text-white drop-shadow-[0_3px_22px_rgba(0,0,0,0.6)] will-change-transform"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span className="sr-only">{focalText}</span>
            <ShutterWord text={focalText} innerRef={wordMidRef} />
          </h1>

          <p
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 font-display font-extrabold uppercase tracking-tight text-white drop-shadow-[0_3px_22px_rgba(0,0,0,0.6)] will-change-transform"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span className="sr-only">{tailText}</span>
            <ShutterWord text={tailText} innerRef={wordBottomRef} />
          </p>

          {/* Phase-2: Arc-style split — left lockup + right aside (gold corners) + CTAs */}
          <div
            ref={subRef}
            className="pointer-events-auto absolute left-1/2 top-[45%] z-30 flex w-[min(100%,80rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 px-4 mix-blend-normal sm:top-[44%] sm:gap-10 sm:px-6 lg:top-[40%] lg:px-10 xl:top-[38%]"
          >
            <div className="grid grid-cols-1 items-end gap-10 text-center lg:grid-cols-[minmax(0,2fr)_minmax(0,0.92fr)] lg:gap-x-12 lg:gap-y-0 lg:text-left xl:gap-x-16">
              <div
                ref={subLockupRef}
                className="mx-auto flex w-full min-w-0 max-w-[min(100%,48rem)] flex-col gap-2.5 sm:gap-3 lg:mx-0 lg:max-w-full lg:gap-4 lg:pr-2"
              >
                <p className="font-display font-bold leading-[1.45] tracking-[-0.02em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_0_20px_rgba(0,0,0,0.45)] text-[clamp(1.1rem,2.75vw,1.75rem)] lg:text-[clamp(2.65rem,6.75vw,4.85rem)] lg:leading-[1.06] lg:tracking-[-0.035em]">
                  {heroContent.heroScrollExpandPhase2Lockup.line1}
                </p>
                <p className="flex flex-col gap-0.5 font-display font-extrabold italic leading-[1.5] tracking-[-0.025em] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.82),0_0_24px_rgba(0,0,0,0.45)] text-[clamp(1.15rem,2.85vw,1.85rem)] sm:gap-1 lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-x-[0.2em] lg:gap-y-0 lg:text-[clamp(2.85rem,7.35vw,5.35rem)] lg:leading-[1.18] lg:tracking-[-0.038em] lg:pb-[0.1em]">
                  <span className="block lg:inline growth-gradient-text [padding-inline-end:0.06em] [padding-inline-start:0.02em] [padding-block-end:0.1em]">
                    {heroContent.heroScrollExpandPhase2Lockup.line2}
                  </span>
                  <span className="block lg:inline growth-gradient-text [padding-inline-end:0.1em] [padding-inline-start:0.02em] [padding-block-end:0.12em]">
                    {heroContent.heroScrollExpandPhase2Lockup.line3}
                  </span>
                </p>
              </div>
              <div ref={subAsideWrapRef} className="min-w-0 lg:justify-self-end">
                <HeroScrollExpandPhase2Aside segments={heroSubheadSegments} />
              </div>
            </div>
            <div
              ref={subCtasRef}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start"
            >
              <Link
                to={heroContent.primaryCTA.link}
                data-discover="true"
                className={`${growthPrimaryHero} no-underline`}
              >
                <span className="flex-1 text-center">{heroContent.primaryCTA.text}</span>
                <span className="shrink-0 pl-1 text-xl font-light leading-none opacity-95" aria-hidden>
                  →
                </span>
              </Link>
              <Link
                to={heroContent.secondaryCTA.link}
                data-discover="true"
                className={`${growthPrimaryHero} no-underline`}
              >
                <span className="flex-1 text-center">{heroContent.secondaryCTA.text}</span>
                <span className="shrink-0 pl-1 text-xl font-light leading-none opacity-95" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom logo marquee — edge-to-edge of hero pin; infinite CSS loop */}
          <div
            ref={logoMarqueeRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[22] w-full max-w-none pb-4 lg:pb-6"
          >
            <div className="pointer-events-none w-full max-w-none">
              <BrandScroller className="py-3 md:py-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroScrollExpand
