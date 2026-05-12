import { useRef } from 'react'
import { parallaxShowcaseContent } from '../../lib/content'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'

/**
 * “Who we are” band — static typography on a solid dark field (no image parallax stack).
 * Copy from `parallaxShowcaseContent`; imagery was removed so type stays legible.
 */
function ParallaxLayerShowcase() {
  const sectionRef = useRef(null)
  /** Static copy band — no scrubbed fade (was invisible on mobile until `top top` scrub completed). */
  useCinematicSectionReveal(sectionRef, { skipReveal: true })

  const { headline, lead, pillars } = parallaxShowcaseContent

  return (
    <section
      ref={sectionRef}
      id="parallax-showcase"
      data-scroll
      className="parallax-showcase relative isolate w-full overflow-x-clip bg-[#050816] py-10 sm:py-12 md:py-16"
      aria-labelledby="parallax-showcase-heading"
      aria-describedby="parallax-showcase-desc"
    >
      <div className="relative z-[1] mx-auto max-w-[1100px] px-4 xs:px-5 md:px-8">
        <div data-cinematic-reveal="lead" className="mx-auto max-w-3xl text-center">
          <h2
            id="parallax-showcase-heading"
            className="parallax-showcase__title section-heading-neon m-0 text-[clamp(1.75rem,7vw,3.25rem)] leading-[1.08]"
          >
            {headline}
          </h2>
          <p
            id="parallax-showcase-desc"
            className="m-0 mt-5 text-base leading-relaxed text-zinc-300/95 sm:mt-6 md:text-lg"
          >
            {lead}
          </p>
        </div>

        <div data-cinematic-reveal="block" className="mx-auto mt-10 max-w-3xl md:mt-14">
          <ul className="grid gap-4 text-left sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {pillars.map((p) => (
              <li
                key={p.label}
                className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-4 shadow-[0_12px_40px_-24px_rgba(2,6,23,0.55)] backdrop-blur-md"
              >
                <p className="m-0 text-xs font-semibold uppercase tracking-wide text-teal-200/95">
                  {p.label}
                </p>
                <p className="m-0 mt-2 text-sm leading-snug text-zinc-400">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ParallaxLayerShowcase
