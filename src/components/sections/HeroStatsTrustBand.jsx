import { Activity } from 'lucide-react'
import Container from '../ui/Container'
import { heroContent } from '../../lib/content'

/**
 * Practice outcomes + trust strip — lives directly below `#page1` hero (not inside hero scroll slot).
 */
function HeroStatsTrustBand() {
  return (
    <section
      id="hero-stats-trust"
      data-scroll
      className="relative isolate w-full overflow-x-clip bg-[#050816] py-8 sm:py-10 md:py-12"
      aria-label="Practice outcomes and trust"
    >
      <Container className="relative z-[1] !max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto relative mx-auto w-full max-w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-3xl">
          <div
            className={`grid grid-cols-1 gap-8 md:gap-10 lg:gap-12 xl:gap-14 ${heroContent.stats?.length ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} p-5 sm:p-6 lg:p-6 xl:p-7`}
          >
          {heroContent.stats?.length > 0 && (
            <div className="relative min-w-0">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-teal-500/8 blur-3xl"
                aria-hidden
              />
              <div className="relative z-[1]">
                <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5 lg:justify-start">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] ring-1 ring-teal-400/25 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Activity className="h-5 w-5 text-teal-200/95 sm:h-6 sm:w-6" aria-hidden />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200/90 sm:text-[11px]">
                      Practice outcomes
                    </p>
                    <p className="text-xs text-white/50 sm:text-sm">What we optimize for first</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {heroContent.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/[0.1] bg-black/35 px-2 py-2.5 text-center backdrop-blur-md sm:px-2.5 sm:py-3"
                    >
                      <p className="text-base font-bold tabular-nums tracking-tight text-white sm:text-lg md:text-xl leading-none">
                        {s.value}
                        {s.suffix ? (
                          <span className="text-xs font-semibold text-white/80 sm:text-sm">{s.suffix}</span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-[8px] font-medium uppercase leading-tight text-white/50 xs:text-[9px] sm:text-[10px] line-clamp-2">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="relative min-w-0 lg:flex lg:flex-col lg:justify-center lg:py-1">
            <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 sm:mb-5 sm:text-[11px] lg:text-left lg:px-0">
              {heroContent.trustLabel ?? 'Trusted by industry leaders'}
            </p>
            <div
              className="relative overflow-hidden"
              aria-hidden
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              }}
            >
              <div className="hero-trust-marquee__track">
                {[0, 1].map((half) => (
                  <div key={half} className="flex shrink-0 items-center gap-4 pr-6 sm:gap-5 sm:pr-8">
                    {heroContent.trustLogos.map((logo) => (
                      <div
                        key={`${half}-${logo.id}`}
                        className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.1] bg-black/25 px-3 py-2 text-[11px] font-semibold tracking-wide text-white/70 sm:px-3.5 sm:text-xs"
                        title={logo.name}
                      >
                        <span className="text-white/90">{logo.placeholder}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroStatsTrustBand
