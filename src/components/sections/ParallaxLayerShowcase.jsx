/**
 * Osmo-style multi-image parallax stack — motion driven by scroll (`ParallaxLayerRegistry` + `parallaxLayerStacks.js`).
 * Uses external Webflow CDN assets from the reference snippet.
 */
function ParallaxLayerShowcase() {
  return (
    <section
      className="parallax-showcase relative w-full overflow-hidden bg-[#05080c] py-10 md:py-14"
      aria-labelledby="parallax-showcase-heading"
    >
      <div className="parallax-showcase__inner pointer-events-none mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="parallax-showcase__header relative min-h-[min(85vh,920px)] w-full">
          <div className="parallax-showcase__visuals relative h-full w-full">
            <div
              className="parallax-showcase__black-line-overflow pointer-events-none absolute left-1/2 top-0 z-[1] h-px w-screen max-w-none -translate-x-1/2 bg-black/80"
              aria-hidden
            />
            <div
              data-parallax-layers
              className="parallax-showcase__layers relative mx-auto mt-6 flex min-h-[min(72vh,780px)] w-full max-w-[800px] items-center justify-center md:mt-10"
            >
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
                alt=""
                width={800}
                height={600}
                loading="eager"
                data-parallax-layer="1"
                data-parallax-y="78"
                className="parallax-showcase__layer-img pointer-events-none absolute inset-x-0 top-[8%] z-[1] mx-auto w-[88%] max-w-[760px] select-none object-contain will-change-transform md:top-[6%] md:w-[84%]"
              />
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
                alt=""
                width={800}
                height={600}
                loading="eager"
                data-parallax-layer="2"
                data-parallax-y="58"
                className="parallax-showcase__layer-img pointer-events-none absolute inset-x-0 top-[18%] z-[2] mx-auto w-[86%] max-w-[740px] select-none object-contain will-change-transform md:top-[16%] md:w-[82%]"
              />
              <div
                data-parallax-layer="3"
                data-parallax-y="38"
                className="parallax-showcase__layer-title pointer-events-none absolute inset-x-0 top-[38%] z-[3] flex justify-center will-change-transform md:top-[36%]"
              >
                <h2
                  id="parallax-showcase-heading"
                  className="parallax-showcase__title m-0 text-center font-antique text-[clamp(2.5rem,10vw,5rem)] font-extrabold tracking-[-0.04em] text-white/95"
                >
                  Story in layers
                </h2>
              </div>
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
                alt=""
                width={800}
                height={600}
                loading="eager"
                data-parallax-layer="4"
                data-parallax-y="14"
                className="parallax-showcase__layer-img pointer-events-none absolute inset-x-0 top-[52%] z-[4] mx-auto w-[90%] max-w-[780px] select-none object-contain will-change-transform md:top-[50%] md:w-[86%]"
              />
            </div>
            <div
              className="parallax-showcase__fade pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[32%] bg-gradient-to-t from-[#05080c] via-[#05080c]/85 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="parallax-showcase__content pointer-events-none relative z-[2] flex justify-center px-4 pb-6 pt-2 md:pb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 160 160"
          fill="none"
          className="osmo-icon-svg h-10 w-10 text-cyan-400/35 md:h-12 md:w-12"
          aria-hidden
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}

export default ParallaxLayerShowcase
