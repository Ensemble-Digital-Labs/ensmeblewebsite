import { parallaxShowcaseContent } from '../../lib/content'

/**
 * “Who we are” band — full viewport (`100svh`): headline + lead at top; two wide glass panels
 * (each pairs two pillars) fill remaining height edge-to-edge within horizontal padding.
 */
function ParallaxLayerShowcase() {
  const { headlineLine1, headlineLine2, lead, pillars } = parallaxShowcaseContent

  const pillarPairs = []
  for (let i = 0; i < pillars.length; i += 2) {
    pillarPairs.push(pillars.slice(i, i + 2))
  }

  return (
    <section
      id="parallax-showcase"
      data-scroll
      className="parallax-showcase relative isolate flex min-h-[100svh] w-full flex-col overflow-x-clip bg-[#050816] pt-8 pb-6 sm:pt-10 sm:pb-8 md:pt-12 md:pb-10"
      aria-labelledby="parallax-showcase-heading"
      aria-describedby="parallax-showcase-desc"
    >
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
            {pillarPairs.map((pair) => (
              <li
                key={pair.map((p) => p.label).join('-')}
                className="flex min-h-[min(15rem,40svh)] flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.06] shadow-[0_20px_60px_-28px_rgba(2,6,23,0.65)] backdrop-blur-md lg:min-h-0"
              >
                {pair.map((p, idx) => (
                  <div
                    key={p.label}
                    className={`flex min-h-0 flex-1 flex-col justify-center px-5 py-6 text-left sm:px-7 sm:py-7 md:px-8 md:py-8 ${
                      idx > 0 ? 'border-t border-white/[0.08]' : ''
                    }`}
                  >
                    <p className="m-0 text-xs font-semibold uppercase tracking-wide text-teal-200/95 sm:text-sm">
                      {p.label}
                    </p>
                    <p className="m-0 mt-3 text-sm leading-relaxed text-zinc-300 sm:mt-3.5 sm:text-base sm:leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ParallaxLayerShowcase
