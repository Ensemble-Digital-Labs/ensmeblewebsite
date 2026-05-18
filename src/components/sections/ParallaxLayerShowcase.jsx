import { motion } from 'framer-motion'
import { ambientAssets } from '../../lib/ambientAssets'
import { cn } from '../../lib/utils'
import { parallaxShowcaseContent } from '../../lib/content'
import {
  CardCurtain,
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  useCardCurtainRevealContext,
} from '../ui/CardCurtainReveal'

/** Matches `CardCurtainReveal` open easing so label + doors feel like one beat. */
const revealMotionTransition = { duration: 0.75, ease: [0.22, 1, 0.36, 1] }

function pillarUsesSplitCurtain(p) {
  return typeof p.imageOutside === 'string' && p.imageOutside.length > 0
}

function ParallaxPillarHeaders({ children }) {
  const { isRevealed } = useCardCurtainRevealContext()

  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      {/* Static compact header (same copy) — fades in when the curtain opens */}
      <motion.p
        className="absolute left-0 right-0 top-0 m-0 max-w-[22rem] px-5 pt-6 text-left font-display text-[clamp(0.8125rem,2.5vw,1.125rem)] font-bold uppercase leading-snug tracking-[0.06em] text-teal-200/95 sm:px-7 sm:pt-7 sm:text-[clamp(0.9375rem,2.2vw,1.25rem)] md:px-8 md:pt-8 md:text-[clamp(1rem,1.7vw,1.35rem)]"
        initial={false}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={revealMotionTransition}
        aria-hidden={!isRevealed}
      >
        {children}
      </motion.p>
      {/* Large hero line — fades out on reveal (no size morph) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8"
        initial={false}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={revealMotionTransition}
        aria-hidden={isRevealed}
      >
        <p className="m-0 max-w-[15rem] text-center font-display text-[clamp(1.05rem,3.8vw,1.55rem)] font-extrabold uppercase leading-tight tracking-[0.055em] text-teal-200/95 xs:max-w-[17rem] sm:max-w-[19rem]">
          {children}
        </p>
      </motion.div>
    </div>
  )
}

/** Top padding clears the absolute Phase-2 title; kept tight so subtext sits close to the heading. */
function ParallaxPillarDescription({ children }) {
  return (
    <CardCurtainRevealDescription className="relative z-[1] flex shrink-0 flex-col pt-[4.2rem] sm:pt-[4.45rem] md:pt-[4.65rem]">
      {children}
    </CardCurtainRevealDescription>
  )
}

/** Phase 1: fine-pointer devices only — discreet cue until the card is revealed. */
function ParallaxPillarHoverHint() {
  const { isRevealed, hoverCapable } = useCardCurtainRevealContext()
  if (!hoverCapable || isRevealed) return null

  return (
    <div
      className="pointer-events-none absolute bottom-3 left-0 right-0 z-[5] flex justify-center sm:bottom-4"
      aria-hidden
    >
      <span className="motion-reduce:animate-none animate-parallax-hint-pulse rounded-full border border-white/[0.14] bg-[#050816]/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400/95 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-3.5 sm:text-[11px]">
        Hover to reveal
      </span>
    </div>
  )
}

/**
 * Split-door “curtain” pillar: phase 1 = two halves of `imageOutside`; phase 2 (hover / focus) =
 * halves slide apart. If `imageInside` is set, it fills behind copy; otherwise a navy glass-style interior
 * shows `text` until inside art is added. Uses same hover / focus / reduced-motion rules as `CardCurtainReveal`.
 */
function ParallaxSplitCurtainPillar({ pillar }) {
  const { isRevealed } = useCardCurtainRevealContext()

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        {pillar.imageInside ? (
          <>
            <img
              src={pillar.imageInside}
              alt=""
              className="h-full w-full object-cover"
              decoding="async"
            />
            <div className="absolute inset-0 flex flex-col justify-start bg-gradient-to-b from-[#050816]/88 via-[#050816]/50 to-[#050816]/25 px-5 pb-6 pt-[4.65rem] sm:px-7 sm:pt-[4.9rem] sm:pb-7 md:px-8 md:pt-[5.05rem] md:pb-8">
              <p className="m-0 mt-0.5 max-w-none text-base leading-snug text-zinc-100/95 sm:mt-1 sm:text-[1.0625rem] sm:leading-[1.55]">
                {pillar.text}
              </p>
            </div>
          </>
        ) : (
          <div className="relative h-full min-h-0 bg-[#050816]/90 backdrop-blur-md">
            <div className="absolute inset-0 flex flex-col justify-start bg-gradient-to-b from-[#050816]/92 via-[#050816]/55 to-[#050816]/30 px-5 pb-6 pt-[4.65rem] sm:px-7 sm:pt-[4.9rem] sm:pb-7 md:px-8 md:pt-[5.05rem] md:pb-8">
              <p className="m-0 mt-0.5 max-w-none text-base leading-snug text-zinc-100/95 sm:mt-1 sm:text-[1.0625rem] sm:leading-[1.55]">
                {pillar.text}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Static compact header under the curtain — uncovered when doors open */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] px-5 pt-6 sm:px-7 sm:pt-7 md:px-8 md:pt-8"
        aria-hidden={!isRevealed}
      >
        <p className="m-0 max-w-[22rem] text-left font-display text-[clamp(0.8125rem,2.5vw,1.125rem)] font-bold uppercase leading-snug tracking-[0.06em] text-teal-200/95 sm:text-[clamp(0.9375rem,2.2vw,1.25rem)] md:text-[clamp(1rem,1.7vw,1.35rem)]">
          {pillar.label}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] flex" aria-hidden>
        <motion.div
          className="h-full w-1/2 overflow-hidden border-r border-white/[0.06]"
          initial={false}
          animate={{ x: isRevealed ? '-100%' : '0%' }}
          transition={revealMotionTransition}
        >
          <div
            className="h-full w-full bg-cover bg-left bg-no-repeat"
            style={{ backgroundImage: `url(${pillar.imageOutside})` }}
          />
        </motion.div>
        <motion.div
          className="h-full w-1/2 overflow-hidden"
          initial={false}
          animate={{ x: isRevealed ? '100%' : '0%' }}
          transition={revealMotionTransition}
        >
          <div
            className="h-full w-full bg-cover bg-right bg-no-repeat"
            style={{ backgroundImage: `url(${pillar.imageOutside})` }}
          />
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8"
        initial={false}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={revealMotionTransition}
        aria-hidden={isRevealed}
      >
        <p className="m-0 max-w-[15rem] text-center font-display text-[clamp(1.05rem,3.8vw,1.55rem)] font-extrabold uppercase leading-tight tracking-[0.055em] text-teal-200/95 xs:max-w-[17rem] sm:max-w-[19rem]">
          {pillar.label}
        </p>
      </motion.div>
    </div>
  )
}

/**
 * “Who we are” band — full viewport (`100svh`): headline + lead at top; four glass pillars that
 * complement `HeroStatsTrustBand` (operating model / nuance), not duplicate its AI · HIPAA · revenue rail.
 * On Home this section is mounted directly after `HeroScrollExpand`, before `HeroStatsTrustBand`.
 *
 * **Pillar modes (per pillar in `parallaxShowcaseContent.pillars`):**
 * - **Default:** glass card + clip-path on body copy; large hero title fades out on hover while a
 *   static compact header (same text) fades in at the top — no typography morph.
 * - **Split curtain:** set `imageOutside` — phase 1 is two sliding halves of that art; phase 2 reveals
 *   optional `imageInside` (or a navy interior + `text` until inside art exists). Static compact header
 *   under the doors; large hero line above fades out when they open.
 *
 * Section backdrop: `ambientAssets.ensemble02` full-bleed (`object-cover`), no tint overlay on the art.
 */
function ParallaxLayerShowcase() {
  const { headlineLine1, headlineLine2, lead, pillars } = parallaxShowcaseContent

  return (
    <section
      id="parallax-showcase"
      data-scroll
      className="parallax-showcase relative isolate flex min-h-[100svh] w-full flex-col overflow-x-clip bg-[#050816] pt-8 pb-6 sm:pt-10 sm:pb-8 md:pt-12 md:pb-10"
      aria-labelledby="parallax-showcase-heading"
      aria-describedby="parallax-showcase-desc"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <img
          src={ambientAssets.ensemble02}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_42%] md:object-center"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 px-3 text-center xs:px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <h2
              id="parallax-showcase-heading"
              className="growth-gradient-text mx-auto max-w-3xl m-0 font-display text-[clamp(1.2rem,5.2vw,2.35rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.03em] min-[400px]:text-[clamp(1.35rem,4.2vw,2.35rem)] sm:text-[clamp(1.55rem,3.8vw,2.5rem)]"
            >
              <span className="block">{headlineLine1}</span>
              <span className="mt-1 block sm:mt-1.5">{headlineLine2}</span>
            </h2>
            <p
              id="parallax-showcase-desc"
              className="m-0 mt-4 text-base leading-relaxed text-zinc-300/95 sm:mt-5 md:text-lg"
            >
              {lead}
            </p>
          </div>
        </header>

        <div className="mt-8 flex min-h-0 flex-1 flex-col px-3 sm:mt-10 sm:px-5 lg:px-8">
          <ul className="grid min-h-0 w-full flex-1 grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-2 lg:items-stretch">
            {pillars.map((p) => {
              const split = pillarUsesSplitCurtain(p)
              return (
                <li
                  key={p.label}
                  className={cn(
                    'flex h-full min-h-[min(12rem,32svh)] flex-1 flex-col overflow-hidden rounded-2xl border shadow-[0_20px_60px_-28px_rgba(2,6,23,0.65)] lg:min-h-0',
                    split
                      ? 'border-white/[0.1] bg-black/25'
                      : 'border-white/[0.12] bg-white/[0.06] backdrop-blur-md'
                  )}
                >
                  <CardCurtainReveal className="flex h-full min-h-0 flex-1 flex-col text-left">
                    {split ? (
                      <ParallaxSplitCurtainPillar pillar={p} />
                    ) : (
                      <>
                        <CardCurtain />
                        <CardCurtainRevealBody className="relative flex h-full min-h-0 flex-1 flex-col px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">
                          <ParallaxPillarHeaders>{p.label}</ParallaxPillarHeaders>
                          <ParallaxPillarDescription>
                            <p className="m-0 mt-0.5 text-base leading-snug text-zinc-300 sm:mt-1 sm:text-[1.0625rem] sm:leading-[1.55]">
                              {p.text}
                            </p>
                          </ParallaxPillarDescription>
                        </CardCurtainRevealBody>
                      </>
                    )}
                    <ParallaxPillarHoverHint />
                  </CardCurtainReveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ParallaxLayerShowcase
