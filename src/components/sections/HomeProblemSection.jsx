import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ambientAssets } from '../../lib/ambientAssets'
import { homeProblemContent } from '../../lib/content'
import { cn, prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function HomeProblemSection() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const barInnerRefs = useRef([])

  const { headlineLine1, headlineLine2, lead, pains } = homeProblemContent

  useEffect(() => {
    const section = sectionRef.current
    const inners = barInnerRefs.current.filter(Boolean)
    if (!section || !inners.length) return

    if (prefersReducedMotion()) {
      gsap.set(inners, { xPercent: 0, clearProps: 'transform' })
      return
    }

    const main = document.querySelector('#main')

    const ctx = gsap.context(() => {
      inners.forEach((inner, i) => {
        const triggerEl = inner.parentElement
        if (!triggerEl) return

        const scrollTrigger = {
          trigger: triggerEl,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        }
        if (main) {
          scrollTrigger.scroller = main
        }

        gsap.fromTo(
          inner,
          { xPercent: i % 2 === 0 ? -101 : 101 },
          {
            xPercent: 0,
            duration: 0.78,
            ease: 'expo.out',
            scrollTrigger,
          }
        )
      })
    }, sectionRef)

    const refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 120)

    return () => {
      clearTimeout(refreshT)
      ctx.revert()
    }
  }, [pains.length])

  return (
    <section
      ref={sectionRef}
      id="home-problem"
      data-scroll
      className="relative isolate w-full overflow-x-clip bg-[#050816] pb-0"
      aria-labelledby="home-problem-heading"
    >
      <div className="relative isolate overflow-x-clip pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-14">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <img
            src={ambientAssets.ensemble01}
            alt=""
            className="absolute inset-0 h-full min-h-full w-full object-cover object-[center_38%] sm:object-center"
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/72 via-[#050816]/78 to-[#050816]/84" />
        </div>

        <div className="relative z-[1] mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2
            id="home-problem-heading"
            className="m-0 mb-4 mx-auto max-w-3xl text-center font-display text-[clamp(1.2rem,5.2vw,2.35rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.03em] min-[400px]:text-[clamp(1.35rem,4.2vw,2.35rem)] sm:text-[clamp(1.55rem,3.8vw,2.5rem)]"
          >
            <span className="growth-gradient-text block">{headlineLine1}</span>
            <span className="growth-gradient-text mt-1 block sm:mt-1.5">{headlineLine2}</span>
          </h2>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">{lead}</p>
        </div>
      </div>

      <div
        ref={listRef}
        className="relative z-[1] left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
        aria-label="Common practice gaps we address"
      >
        <ul className="mx-auto mb-0 flex w-full max-w-[100vw] flex-col gap-3 sm:gap-4">
          {pains.map((p, index) => {
            const hasImage = Boolean(p.image)
            return (
            <li key={p.title} className="overflow-hidden">
              <div
                ref={(el) => {
                  barInnerRefs.current[index] = el
                }}
                className={cn(
                  'home-problem-bar-inner relative flex min-h-0 w-full min-w-full flex-col overflow-hidden rounded-xl border border-white/[0.12] shadow-[0_16px_48px_-28px_rgba(2,6,23,0.5)] will-change-transform',
                  hasImage && 'min-h-0',
                  !hasImage &&
                    'min-h-0 bg-white/[0.05] px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5 md:px-10 md:py-6 lg:px-14'
                )}
              >
                {hasImage ? (
                  <>
                    <div className="relative isolate w-full shrink-0 overflow-hidden bg-[#0a1220] h-[clamp(6.75rem,calc(5rem_+_6vw),10rem)]">
                      <img
                        src={p.image}
                        alt=""
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
                        style={{
                          objectPosition: p.imageObjectPosition ?? 'center center',
                        }}
                        decoding="async"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'low'}
                      />
                    </div>
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]/20"
                      aria-hidden
                    />
                    <div
                      className={cn(
                        'absolute inset-0 z-[1] flex w-full flex-col gap-2 px-5 py-4 min-[560px]:flex-row min-[560px]:items-start sm:px-8 sm:py-5 md:px-10 md:py-6 lg:px-14'
                      )}
                    >
                      <div
                        className={cn(
                          'flex min-w-0 w-full flex-col gap-2 self-start text-left min-[560px]:w-1/3 min-[560px]:max-w-[33.333333%] min-[560px]:flex-none',
                          index % 2 === 0
                            ? 'min-[560px]:pr-6'
                            : 'min-[560px]:pl-6 min-[560px]:text-right min-[560px]:ml-auto',
                          'min-[560px]:drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'
                        )}
                      >
                        <p className="m-0 font-display text-sm font-extrabold uppercase tracking-[0.06em] text-white sm:text-base sm:tracking-[0.07em]">
                          {p.title}
                        </p>
                        <p className="m-0 text-base leading-relaxed text-zinc-100/95 sm:text-[1.0625rem] sm:leading-[1.55]">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className={cn(
                      'relative z-[1] flex w-full flex-1 flex-col gap-2 min-[560px]:min-h-0 min-[560px]:flex-row min-[560px]:items-start'
                    )}
                  >
                    <div
                      className={cn(
                        'flex min-w-0 w-full flex-col gap-2 self-start text-left min-[560px]:w-1/3 min-[560px]:max-w-[33.333333%] min-[560px]:flex-none',
                        index % 2 === 0 ? 'min-[560px]:pr-6' : 'min-[560px]:pl-6 min-[560px]:text-right min-[560px]:ml-auto'
                      )}
                    >
                      <p className="m-0 font-display text-sm font-extrabold uppercase tracking-[0.06em] text-white/95 sm:text-base sm:tracking-[0.07em]">
                        {p.title}
                      </p>
                      <p className="m-0 text-base leading-relaxed text-zinc-500 sm:text-[1.0625rem] sm:leading-[1.55]">
                        {p.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </li>
            )
          })}
        </ul>
      </div>
      </div>
    </section>
  )
}

export default HomeProblemSection
