import StandardCTA from '../StandardCTA'
import { CircularGallery } from '../ui/CircularGallery'
import { prefersReducedMotion } from '../../lib/utils'
import { heroContent } from '../../lib/content'

const carouselItems = [
  {
    title: 'E-commerce Platform',
    description: 'Immersive 3D shopping experience',
    category: 'Web • 3D',
    color: '#018BCF',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  },
  {
    title: 'Virtual Reality Showcase',
    description: 'Highlighting urban redevelopment in virtual reality',
    category: 'Web • 360° • VR',
    color: '#90BFD6',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800',
  },
  {
    title: 'Brand Experience',
    description: 'A perfect immersive experience for digital transformation',
    category: 'Web • 3D',
    color: '#0891B2',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
  {
    title: 'Interactive Documentary',
    description: 'Building engagement through interactive storytelling',
    category: 'Web • 360° video',
    color: '#f4d446',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
  {
    title: 'Digital Innovation',
    description: 'Spreading virtual wings in the digital space',
    category: 'Web • 3D',
    color: '#17F1D1',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
  },
  {
    title: 'AR Experience',
    description: 'Transforming reality through augmented experiences',
    category: 'AR • Mobile',
    color: '#6c59ea',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
]

function Carousel3D() {
  const reduceMotion = prefersReducedMotion()
  const sectionBackdrop = heroContent.backgroundImage

  return (
    <section
      id="page2"
      className="carousel-3d-section relative w-full bg-bg-primary"
      data-scroll
      data-scroll-section
      aria-label="Selected work"
    >
      <div
        id="carousel-pin-scroll"
        className="relative min-h-[260svh] w-full"
      >
        <div
          id="page3"
          className="sticky top-0 z-10 flex h-[100svh] min-h-[100svh] w-full flex-col overflow-x-clip"
        >
          {/* No data-parallax-* here: GSAP scrub + sticky pin zone fought Lenis; bg is static */}
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
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-bg-primary/65 to-bg-primary" />
                  <div className="absolute inset-0 opacity-[0.35] mix-blend-soft-light bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.25)_0%,transparent_55%)]" />
                  <div className="carousel-3d-bg-grid absolute inset-0 opacity-40" />
                </>
              ) : (
                <>
                  <div className="carousel-3d-bg-glow absolute inset-0" />
                  <div
                    className={`carousel-3d-bg-mesh absolute inset-0 ${reduceMotion ? '' : 'carousel-3d-bg-mesh--motion'}`}
                  />
                  <div className="carousel-3d-bg-grid absolute inset-0" />
                  <div className="carousel-3d-bg-vignette absolute inset-0" />
                  <div className="absolute inset-x-0 top-0 h-[min(40vh,320px)] bg-gradient-to-b from-[#0a0e12]/25 via-transparent to-transparent" />
                </>
              )}

              {/* Blend from Hero — same as former Page2 */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(56vh,460px)]">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, #000000 0%, #060a0e 14%, #0e141c 38%, #161d26 58%, rgba(250, 250, 250, 0) 100%)',
                    maskImage:
                      'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-[min(28vh,220px)] bg-gradient-to-b from-cyan-400/12 via-violet-500/6 to-transparent mix-blend-screen opacity-80" />
                <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(34,211,238,0.08)_0%,transparent_58%)]" />
                <div className="absolute inset-x-0 top-[min(18vh,120px)] h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent opacity-70" />
              </div>
            </div>

            <div className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col">
              {/* Former Page2 — intro (flows at top of sticky viewport) */}
              <div className="relative z-[15] w-full max-w-none shrink-0 px-4 pb-4 pt-6 md:px-8 md:pb-6 md:pt-8">
                <div className="mx-auto flex w-full max-w-[90%] flex-col items-start gap-6 md:max-w-none md:flex-row md:gap-[10vw] md:pl-[5%]">
                  <div className="sel-wrk shrink-0">
                    <h4 className="text-xs font-medium uppercase tracking-[2px] text-brand-primary md:text-[1vw]">
                      Selected Work
                    </h4>
                  </div>
                  <div className="main-txt text-lg leading-snug tracking-[-0.5px] text-text-primary md:text-[2.7vw] md:leading-tight md:tracking-[-1px]">
                    <span id="col1" className="text-[#018BCF]">
                      Explore our best work in healthcare websites and medical SEO
                    </span>
                    <br />
                    <span id="col2" className="text-[#B45309]">
                      and digital patient growth.
                    </span>
                  </div>
                </div>
              </div>

              <CircularGallery
                items={carouselItems}
                pinRootId="carousel-pin-scroll"
                className="min-h-0 flex-1"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end gap-2 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16">
                <p className="pointer-events-auto max-w-md text-center text-xs text-text-muted drop-shadow-sm">
                  {reduceMotion
                    ? 'Scroll through this section to explore the work samples.'
                    : 'Keep scrolling — the carousel fills the screen and spins once through this section.'}
                </p>
                <div className="pointer-events-auto">
                  <StandardCTA
                    to="/casestudies"
                    id="disc-btn"
                    variant="outline"
                    className="text-sm px-8 py-4 shadow-lg shadow-black/10 backdrop-blur-sm"
                  >
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
