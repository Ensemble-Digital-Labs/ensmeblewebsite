import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { homeProblemContent } from '../../lib/content'
import { cn, prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function HomeProblemSection() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const barInnerRefs = useRef([])

  const { headlineLine1, headlineLine2, lead, pains, stats } = homeProblemContent

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
      className="relative isolate w-full overflow-x-clip bg-[#050816] py-14 sm:py-16 md:py-20"
      aria-labelledby="home-problem-heading"
    >
      <div className="relative z-[1] mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2
            id="home-problem-heading"
            className="m-0 mb-4 mx-auto max-w-3xl text-center font-display text-[clamp(1.2rem,5.2vw,2.35rem)] font-extrabold uppercase leading-[1.08] tracking-[-0.03em] min-[400px]:text-[clamp(1.35rem,4.2vw,2.35rem)] sm:text-[clamp(1.55rem,3.8vw,2.5rem)]"
          >
            <span className="growth-gradient-text block">{headlineLine1}</span>
            <span className="growth-gradient-text mt-1 block sm:mt-1.5">{headlineLine2}</span>
          </h2>
          <p className="text-base leading-relaxed text-zinc-400 md:text-lg">{lead}</p>
        </div>
      </div>

      <div
        ref={listRef}
        className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
        aria-label="Common practice gaps we address"
      >
        <ul className="mx-auto mb-12 flex w-full max-w-[100vw] flex-col gap-3 sm:mb-14 sm:gap-4">
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
                  hasImage &&
                    'min-h-[min(13rem,42svh)] sm:min-h-[min(14rem,40svh)] min-[560px]:min-h-[min(12.5rem,34svh)]',
                  !hasImage && 'bg-white/[0.05] px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5 md:px-10 md:py-6 lg:px-14'
                )}
              >
                {hasImage ? (
                  <>
                    <img
                      src={p.image}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
                      decoding="async"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'low'}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050816]/25"
                      aria-hidden
                    />
                  </>
                ) : null}

                <div
                  className={cn(
                    'relative z-[1] flex w-full flex-1 flex-col gap-2 min-[560px]:min-h-0 min-[560px]:flex-row min-[560px]:items-start',
                    hasImage && 'px-5 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 lg:px-14',
                    !hasImage && 'min-h-0'
                  )}
                >
                  <div
                    className={cn(
                      'flex min-w-0 w-full flex-col gap-2 self-start text-left min-[560px]:w-1/3 min-[560px]:max-w-[33.333333%] min-[560px]:flex-none',
                      index % 2 === 0 ? 'min-[560px]:pr-6' : 'min-[560px]:pl-6 min-[560px]:text-right min-[560px]:ml-auto',
                      hasImage && 'min-[560px]:drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]'
                    )}
                  >
                    <p
                      className={cn(
                        'm-0 font-display text-sm font-extrabold uppercase tracking-[0.06em] sm:text-base sm:tracking-[0.07em]',
                        hasImage ? 'text-white' : 'text-white/95'
                      )}
                    >
                      {p.title}
                    </p>
                    <p
                      className={cn(
                        'm-0 text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-relaxed',
                        hasImage ? 'text-zinc-100/95' : 'text-zinc-500'
                      )}
                    >
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
            )
          })}
        </ul>
      </div>

      <div className="relative z-[1] mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="flex flex-col flex-wrap justify-center gap-4 pt-6 sm:flex-row sm:gap-6 md:gap-10 md:pt-8">
          {stats.map((s) => (
            <div key={s.value + s.label} className="mx-auto max-w-[280px] text-center sm:mx-0">
              <p className="growth-gradient-text text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-zinc-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeProblemSection
