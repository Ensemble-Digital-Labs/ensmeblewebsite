import StandardCTA from '../StandardCTA'
import { CircularGallery } from '../ui/CircularGallery'
import { prefersReducedMotion } from '../../lib/utils'
import { heroContent, homeCarouselItems, homeSelectedWorkContent } from '../../lib/content'

/** Lead line with gradient emphasis spans (same pattern as former `selectedWorkIntroSegments`). */
function SelectedWorkLeadCopy({ segments }) {
  return (
    <p className="carousel-selected-work-intro max-w-[min(40rem,100%)] text-left font-display text-[clamp(1.05rem,2.75vw,1.72rem)] font-medium leading-snug tracking-[-0.02em] sm:leading-relaxed sm:tracking-[-0.025em]">
      {segments.map((s, i) =>
        s.emphasis ? (
          <span
            key={`${i}-${s.text}`}
            className="keyword-reveal-emphasis font-semibold [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
          >
            {s.text}
          </span>
        ) : (
          <span key={`${i}-${s.text}`} className="selected-work-intro-plain">
            {s.text}
          </span>
        )
      )}
    </p>
  )
}

/** No `data-scroll-section` — global CSS hides those at opacity:0 until scroll-reveal; sticky + tall pin scroll rarely fires on mobile/Lenis. */
function Carousel3D() {
  const reduceMotion = prefersReducedMotion()
  const sectionBackdrop = heroContent.backgroundImage
  const sw = homeSelectedWorkContent

  return (
    <section
      id="page2"
      className="carousel-3d-section relative w-full bg-[#050816]"
      data-scroll
      aria-label={sw.sectionLabel}
    >
      {/*
        Pin height = scroll range for one 360° spin (CircularGallery progress). 260svh is excessive on
        phones (huge empty band); scale down by breakpoint so mobile still gets ~1 rotation without a long tail.
      */}
      <div
        id="carousel-pin-scroll"
        className="relative min-h-[155svh] min-[480px]:min-h-[185svh] md:min-h-[220svh] xl:min-h-[260svh] w-full"
      >
        <div
          id="page3"
          className="sticky top-0 z-10 flex h-[100svh] min-h-[100svh] w-full flex-col overflow-x-clip"
        >
          <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-x-clip">
            <div
              className="pointer-events-none absolute inset-0 z-0 min-h-[100svh]"
              aria-hidden
            >
              {sectionBackdrop ? (
                <>
                  <img
                    src={sectionBackdrop}
                    alt=""
                    className="absolute inset-0 h-full min-h-[100svh] w-full object-cover object-center"
                    decoding="async"
                  />
                  <div className="hud-screenshot-patch--br" aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-[#070d18]/92 to-[#050816]" />
                  <div className="carousel-3d-bg-grid absolute inset-0 opacity-[0.14]" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[#050816]" aria-hidden />
              )}
            </div>

            <div className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col pt-[max(6rem,calc(0.75rem+env(safe-area-inset-top,0px)))] sm:pt-[6.25rem] lg:pt-[6.75rem]">
              <div className="relative z-[15] w-full shrink-0 px-4 pb-3 sm:pb-4 md:px-8 md:pb-5">
                <div className="mx-auto w-full max-w-[min(52rem,92vw)] pb-5 sm:pb-6">
                  <div className="space-y-2 sm:space-y-2.5">
                    <h2 className="section-heading-neon growth-gradient-text text-[clamp(1.35rem,4vw,2.25rem)] leading-[1.12]">
                      {sw.headlineLine1}
                    </h2>
                    <p className="section-heading-neon--line2 growth-gradient-text text-[clamp(1.2rem,3.5vw,1.95rem)] leading-tight">
                      {sw.headlineLine2}
                    </p>
                    <div className="pt-1">
                      <SelectedWorkLeadCopy segments={sw.leadSegments} />
                    </div>
                  </div>
                </div>
              </div>

              <CircularGallery
                items={homeCarouselItems}
                pinRootId="carousel-pin-scroll"
                className="min-h-0 flex-1"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end gap-2 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16">
                <p className="pointer-events-auto max-w-md text-center text-xs text-zinc-300/95 drop-shadow-sm">
                  {reduceMotion
                    ? 'Scroll through this section to explore the work samples.'
                    : 'Keep scrolling — the carousel fills the screen and spins once through this section.'}
                </p>
                <div className="pointer-events-auto">
                  <StandardCTA to="/case-studies" id="disc-btn" variant="hero" className="max-w-md xs:max-w-none">
                    Discover more of our work
                  </StandardCTA>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carousel3D
