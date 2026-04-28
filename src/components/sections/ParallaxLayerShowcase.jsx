import { useRef } from 'react'
import { parallaxShowcaseContent } from '../../lib/content'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'

/**
 * Osmo-style multi-image parallax stack — motion driven by scroll (`ParallaxLayerRegistry` + `parallaxLayerStacks.js`).
 * Visual metaphor: layers of a complete healthcare digital presence (see `parallaxShowcaseContent`).
 * Solid dark fill only (no extra absolute backdrop layers) so Lenis scroll + sticky carousel stay predictable.
 */
function ParallaxLayerShowcase() {
  const sectionRef = useRef(null)
  useCinematicSectionReveal(sectionRef)

  const { eyebrow, headline, lead, pillars } = parallaxShowcaseContent

  return (
    <section
      ref={sectionRef}
      id="parallax-showcase"
      data-scroll
      className="parallax-showcase relative isolate w-full overflow-x-clip overflow-y-visible bg-[#030712] py-8 sm:py-10 md:py-14"
      aria-labelledby="parallax-showcase-heading"
      aria-describedby="parallax-showcase-desc"
    >
      <div className="parallax-showcase__inner pointer-events-none relative z-[1] mx-auto max-w-[1100px] px-3 xs:px-4 md:px-6">
        <div
          data-cinematic-reveal="lead"
          className="parallax-showcase__header relative min-h-[min(62svh,560px)] w-full sm:min-h-[min(74svh,780px)] md:min-h-[min(68svh,720px)] lg:min-h-[min(56svh,620px)] xl:min-h-[min(52svh,680px)]"
        >
          <div className="parallax-showcase__visuals relative h-full min-h-0 w-full">
            <div
              data-parallax-layers
              className="parallax-showcase__layers relative mx-auto mt-4 flex min-h-[min(52svh,480px)] w-full max-w-[800px] items-center justify-center pb-[min(10svh,100px)] pt-1 sm:mt-6 sm:min-h-[min(62svh,640px)] sm:pb-[min(8svh,80px)] md:mt-8 md:min-h-[min(56svh,600px)] md:max-h-[min(620px,58svh)] md:pb-[min(5svh,48px)] lg:mt-10 lg:min-h-[min(44svh,440px)] lg:max-h-[min(500px,48svh)] lg:pb-6 xl:max-h-[min(540px,46svh)]"
            >
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
                alt=""
                width={800}
                height={600}
                loading="eager"
                data-parallax-layer="1"
                data-parallax-y="78"
                className="parallax-showcase__layer-img pointer-events-none absolute inset-x-0 top-[5%] z-[1] mx-auto h-auto max-h-[min(52vh,420px)] w-[92%] max-w-[760px] select-none object-contain object-center will-change-transform sm:top-[7%] sm:w-[90%] sm:max-h-[min(48vh,440px)] md:top-[6%] md:w-[84%] md:max-h-[min(42vh,400px)] lg:max-h-[min(36vh,340px)] xl:max-h-[min(34vh,360px)]"
              />
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
                alt=""
                width={800}
                height={600}
                loading="eager"
                data-parallax-layer="2"
                data-parallax-y="58"
                className="parallax-showcase__layer-img pointer-events-none absolute inset-x-0 top-[14%] z-[2] mx-auto h-auto max-h-[min(50vh,400px)] w-[90%] max-w-[740px] select-none object-contain object-center will-change-transform sm:top-[16%] sm:w-[88%] sm:max-h-[min(46vh,420px)] md:top-[16%] md:w-[82%] md:max-h-[min(40vh,380px)] lg:max-h-[min(34vh,320px)] xl:max-h-[min(32vh,340px)]"
              />
              <div
                data-parallax-layer="3"
                data-parallax-y="38"
                className="parallax-showcase__layer-title pointer-events-none absolute inset-x-0 top-[28%] z-[3] flex justify-center px-2 will-change-transform sm:top-[31%] sm:px-3 md:top-[32%]"
              >
                <div className="flex max-w-[min(100%,28rem)] flex-col items-center gap-2 text-center md:gap-3">
                  <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-cyan-300/90 md:text-xs">
                    {eyebrow}
                  </p>
                  <h2
                    id="parallax-showcase-heading"
                    className="parallax-showcase__title m-0 font-antique text-[clamp(1.75rem,7vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white/95"
                  >
                    {headline}
                  </h2>
                </div>
              </div>
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
                alt=""
                width={800}
                height={600}
                loading="eager"
                data-parallax-layer="4"
                data-parallax-y="14"
                className="parallax-showcase__layer-img pointer-events-none absolute inset-x-0 top-[48%] z-[4] mx-auto h-auto max-h-[min(52vh,420px)] w-[92%] max-w-[780px] select-none object-contain object-center will-change-transform sm:top-[50%] sm:max-h-[min(48vh,440px)] md:top-[50%] md:w-[86%] md:max-h-[min(42vh,400px)] lg:max-h-[min(36vh,340px)] xl:max-h-[min(34vh,360px)]"
              />
            </div>
            <div
              className="parallax-showcase__fade pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[min(38%,220px)] bg-gradient-to-t from-[#030712] via-[#030712]/90 to-transparent sm:h-[34%] md:h-[32%]"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="relative z-[6] mx-auto max-w-3xl px-4 pb-8 pt-2 text-center md:px-6 md:pb-12 md:pt-4">
        <div data-cinematic-reveal="block">
          <div className="parallax-showcase__content mb-6 flex justify-center md:mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 160 160"
              fill="none"
              className="osmo-icon-svg h-9 w-9 text-cyan-400/40 md:h-11 md:w-11"
              aria-hidden
            >
              <path
                d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p
            id="parallax-showcase-desc"
            className="m-0 text-base leading-relaxed text-zinc-300/95 md:text-lg"
          >
            {lead}
          </p>
        </div>
        <ul
          data-cinematic-reveal="block"
          className="mt-8 grid gap-4 text-left sm:grid-cols-3 sm:gap-5"
        >
          {pillars.map((p) => (
            <li
              key={p.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm"
            >
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-cyan-300/95">
                {p.label}
              </p>
              <p className="mt-2 m-0 text-sm leading-snug text-zinc-400">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ParallaxLayerShowcase
