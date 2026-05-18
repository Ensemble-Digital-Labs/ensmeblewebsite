import { homeRoadmapContent } from '../../lib/content'
import StandardCTA from '../StandardCTA'

/**
 * Former “Page4” slot — roadmap teaser (insights-style layout retained for motion compatibility).
 */
function HomeRoadmapSection() {
  const { headline, lead, phases, primaryCta, secondaryCta } = homeRoadmapContent

  return (
    <section
      id="page4"
      className="relative w-full overflow-x-hidden bg-[#050816] text-white py-14 pb-16 sm:py-16 sm:pb-20 md:flex md:min-h-[100svh] md:flex-col md:items-center md:justify-center md:py-0 md:pb-0"
      data-scroll
      aria-labelledby="home-roadmap-heading"
    >
      {/*
        Mobile: content-height band (no h-screen / nested min-h-screen) so Lenis/native #main
        scroll stays one continuous page. Desktop: at least one viewport, vertically centered.
      */}
      <div className="relative flex w-full flex-col items-center justify-center gap-8 sm:gap-10 md:flex-1 md:gap-[min(11vh,5.5rem)] lg:gap-[12vh] overflow-x-hidden px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#050816]" aria-hidden />

        <div className="relative z-10 flex w-full max-w-[min(96vw,1200px)] flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12">
          <div className="text-center max-w-3xl">
            <h2
              id="home-roadmap-heading"
              className="section-heading-neon growth-gradient-text text-[clamp(1.5rem,4.5vw,2.5rem)] leading-tight mb-4"
            >
              {headline}
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed">{lead}</p>
          </div>

          <div
            className="grid w-full gap-6 md:gap-8 md:grid-cols-3 text-left"
          >
            {phases.map((phase) => (
              <div
                key={phase.title}
                className="rounded-2xl border border-white/[0.12] bg-white/[0.06] px-5 py-5 shadow-[0_20px_50px_-28px_rgba(2,6,23,0.55)] sm:px-6 sm:py-6 backdrop-blur-md"
              >
                <h3 className="text-sm font-semibold text-rose-200/95 uppercase tracking-wide mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-2.5 text-base text-zinc-400 leading-relaxed">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-amber-400/85 shrink-0" aria-hidden>
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:max-w-2xl sm:flex-row sm:items-center sm:gap-4">
            <StandardCTA to={primaryCta.link} variant="hero" className="w-full xs:flex-1">
              {primaryCta.text}
            </StandardCTA>
            <StandardCTA to={secondaryCta.link} variant="hero" className="w-full xs:flex-1">
              {secondaryCta.text}
            </StandardCTA>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeRoadmapSection
