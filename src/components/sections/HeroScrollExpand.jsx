import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../lib/utils'
import { growthPrimaryHero, growthSecondaryHero } from '../../lib/growthCtaClasses'
import { heroContent } from '../../lib/content'
import { backgroundAssets } from '../../lib/backgroundAssets'

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
 * Scroll-driven hero: title splits apart, inner media card grows to full-bleed.
 *
 * - Desktop (lg+): ScrollTrigger pins the section, scrub-ties progress to title
 *   slide + media expand + background fade. All three title lines play a per-
 *   character SHUTTER on mount (one-shot, staggered) and shutter out as scroll
 *   progresses. Plays nicely with Locomotive Scroll via the existing
 *   `scrollerProxy` on `#main`.
 * - Tablet / mobile: simpler static composition — no pin, no scrub, no card
 *   expand, no shutter. Background + stacked title + subhead + CTAs only.
 * - `prefers-reduced-motion`: skips the desktop pin entirely and falls back to
 *   the static composition so nothing hijacks scroll.
 *
 * Two render branches are intentional so the small-screen tree has no off-
 * screen card / no pinned spacer — keeps the LCP cheap on phones.
 */
function HeroScrollExpand({
  bgImageSrc = backgroundAssets.digitalHealthNetwork,
  mediaSrc = '/assets/videos/hero-background.mp4',
  mediaType = 'video',
  posterSrc = backgroundAssets.digitalHealthNetwork,
  leadText = 'Welcome to',
  focalText = 'Ensemble',
  tailText = 'Digital Labs',
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
      if (!card || !wordTop || !wordMid || !wordBottom || !bg || !overlay || !sub) return

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
      const endCardW = () => Math.min(window.innerWidth * 0.92, 1600)
      const endCardH = () => Math.min(window.innerHeight * 0.82, 900)

      // === Initial state (pre-entry) ===
      gsap.set(card, { width: startCardW(), height: startCardH() })
      // Tight 3-line stack — y offsets track the rendered line heights (focal +
      // tail share a mid-scale clamp, so gaps stay around half-line-height).
      gsap.set(wordTop, { xPercent: -50, yPercent: -50, x: 0, y: -102 })
      gsap.set(wordMid, { xPercent: -50, yPercent: -50, x: 0, y: -10 })
      gsap.set(wordBottom, { xPercent: -50, yPercent: -50, x: 0, y: 118 })
      gsap.set(bg, { opacity: 0.85, scale: 1.04 })
      gsap.set(overlay, { opacity: 0.55 })
      gsap.set(sub, { autoAlpha: 0, y: 28 })

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

      tl.to(sub, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.28 }, 0.74)

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
      className="hero-scroll-expand relative w-full overflow-x-hidden bg-[#050816]"
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/65 via-[#050816]/45 to-[#050816]/92" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pt-24 pb-12 text-center sm:pt-28">
          <p
            className="font-display italic font-medium uppercase tracking-[0.1em] text-white mix-blend-difference"
            style={{ fontSize: 'clamp(1.25rem, 5.5vw, 2rem)' }}
          >
            {leadText}
          </p>
          <h1
            className="mt-1 font-display font-extrabold uppercase leading-[0.92] tracking-tight text-white mix-blend-difference"
            style={{ fontSize: 'clamp(2.75rem, 14vw, 5.5rem)' }}
          >
            {focalText}
          </h1>
          <p
            className="mt-1 font-display italic font-medium uppercase tracking-[0.08em] text-white mix-blend-difference"
            style={{ fontSize: 'clamp(1.35rem, 6.5vw, 2.5rem)' }}
          >
            {tailText}
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
              className={`${growthSecondaryHero} no-underline`}
            >
              {heroContent.secondaryCTA.text}
            </Link>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────
         DESKTOP (lg+): pinned scroll-driven expand + per-line shutter
         ────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block">
        <div
          ref={pinRef}
          className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
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
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050816]/55 via-[#050816]/35 to-[#050816]/90"
            aria-hidden
          />

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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
          </div>

          {/* Three-line title — <ShutterWord> per-character base (white) +
              colored slice layers on entry + scroll-out. `sr-only` mirrors
              the accessible name; visible shutter chars are aria-hidden. */}
          <p
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 font-display italic font-medium uppercase tracking-[0.12em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] will-change-transform"
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

          {/* Subhead + CTAs — fade in after expand completes */}
          <div
            ref={subRef}
            className="pointer-events-auto absolute bottom-12 left-1/2 z-30 w-full max-w-3xl -translate-x-1/2 px-6 text-center"
          >
            <p className="mx-auto mb-5 max-w-2xl text-balance text-base leading-relaxed text-white/92">
              {heroContent.subhead}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
                className={`${growthSecondaryHero} no-underline`}
              >
                {heroContent.secondaryCTA.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroScrollExpand
