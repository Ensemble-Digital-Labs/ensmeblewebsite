import { useState, useEffect, useRef, useId } from 'react'
import StandardCTA from '../StandardCTA'

const page5AccentGradient =
  'bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent'

function Page5({ layout = 'home', ctaTo = '/contact' }) {
  const sectionRef = useRef(null)
  const [arrowReady, setArrowReady] = useState(false)
  const isHome = layout === 'home'
  const uid = useId().replace(/:/g, '')
  const arrowGradId = `p5a-${uid}`

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let timeoutId = null
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        timeoutId = setTimeout(() => setArrowReady(true), 900)
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const layoutClasses = isHome
    ? 'min-h-[80vh] mt-[-10vh]'
    : 'min-h-[min(72vh,720px)] mt-0 pt-12 pb-16 sm:pt-16 sm:pb-20'

  return (
    <section
      ref={sectionRef}
      id="page5"
      className={`relative isolate w-full flex items-center overflow-hidden bg-[#080c10] text-zinc-200 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(rgba(56,189,248,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.055)_1px,transparent_1px)] before:bg-[length:44px_44px] before:opacity-90 ${layoutClasses} ${arrowReady ? 'page5-arrow-ready' : ''}`}
      data-scroll
      data-scroll-section
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1018]/80 via-transparent to-[#05080c]" aria-hidden />
      <div className="main-text2 relative z-[1] mx-auto max-w-[90vw] sm:max-w-[80vw] font-antique font-extrabold text-[7vw] sm:text-[6.5vw] md:text-[6vw] lg:text-[5.5vw] leading-[1.15] tracking-tight flex flex-col gap-[0.15em]">
        <div className="tracking-[-0.04em] mt-8 sm:mt-12 flex flex-col gap-[0.15em] relative">
          {/* Hand-drawn arrow: top-left, arcs toward “transform” */}
          <svg className="absolute -left-[5.5rem] sm:-left-[6rem] -top-[6.5rem] sm:-top-[7.5rem] w-[3.5em] h-[3.2em] opacity-[0.45] pointer-events-none -rotate-[20deg] origin-top-left" viewBox="0 0 70 100" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ strokeWidth: 2.2 }}>
            <defs>
              <linearGradient id={arrowGradId} x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="55%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path className="page5-scribble-arrow-path" pathLength={120} d="M 8 5 Q 25 22 12 38 Q 28 52 10 68 Q 22 82 14 95 L 10 88 L 18 96 L 14 95" stroke={`url(#${arrowGradId})`} />
          </svg>
          <p className="block m-0 pl-[1.25em] sm:pl-[1.5em] flex items-center flex-wrap gap-x-1">
            Ready to <span className={`ml-2 inline-block ${page5AccentGradient}`}>transform</span>
          </p>
          <p className="block m-0 flex flex-wrap items-center justify-start gap-x-3 gap-y-3 sm:gap-x-4 md:gap-x-6 relative">
            <span className="shrink-0">
              your <span className={page5AccentGradient}>practices</span>?
            </span>
            <StandardCTA
              to={ctaTo}
              variant="tech"
              className="shrink-0 rounded-[5vw] !px-10 !py-5 !text-xl sm:!px-14 sm:!py-6 sm:!text-2xl md:!px-16 md:!py-7 md:!text-3xl lg:!px-20 lg:!py-8 lg:!text-4xl"
            >
              Get in touch
            </StandardCTA>
          </p>
        </div>
        <p className="tracking-[-0.04em] m-0 pl-[1.25em] sm:pl-[1.5em]">
          Let&apos;s <span className={page5AccentGradient}>build</span> it <span className={page5AccentGradient}>together</span>.
        </p>
      </div>
    </section>
  )
}

export default Page5
