import { useState, useEffect, useRef } from 'react'
import StandardCTA from '../StandardCTA'

function Page5() {
  const sectionRef = useRef(null)
  const [arrowReady, setArrowReady] = useState(false)

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

  return (
    <section
      ref={sectionRef}
      id="page5"
      className={`relative min-h-[80vh] w-full mt-[-10vh] flex items-center ${arrowReady ? 'page5-arrow-ready' : ''}`}
      data-scroll
      data-scroll-section
    >
      <div className="main-text2 mx-auto max-w-[90vw] sm:max-w-[80vw] font-antique font-extrabold text-[7vw] sm:text-[6.5vw] md:text-[6vw] lg:text-[5.5vw] leading-[1.15] tracking-tight text-text-primary flex flex-col gap-[0.15em]">
        <div className="tracking-[-0.04em] mt-8 sm:mt-12 flex flex-col gap-[0.15em] relative">
          {/* Hand-drawn arrow: from top-left, scribbles down toward the "y" in "your" */}
          <svg className="absolute -left-[6rem] -top-16 w-[3.5em] h-[3.2em] opacity-90 pointer-events-none -rotate-[22deg] origin-top-left" viewBox="0 0 70 100" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ strokeWidth: 2.2 }}>
            <defs>
              <linearGradient id="page5-arrow-rainbow" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="30%" stopColor="#f97316" />
                <stop offset="60%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path className="page5-scribble-arrow-path" pathLength={120} d="M 8 5 Q 25 22 12 38 Q 28 52 10 68 Q 22 82 14 95 L 10 88 L 18 96 L 14 95" stroke="url(#page5-arrow-rainbow)" />
          </svg>
          <p className="block m-0 pl-[1.25em] sm:pl-[1.5em] flex items-center flex-wrap gap-x-1">
            Ready to <span className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#06b6d4,#8b5cf6)] bg-clip-text text-transparent ml-2">transform</span>
            <span className="inline-flex shrink-0 w-[0.55em] h-[0.55em] ml-0.5 align-middle" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full animate-spin" style={{ animationDuration: '3s', strokeWidth: 3 }} stroke="url(#page5-icon-rainbow)">
                <defs>
                  <linearGradient id="page5-icon-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="20%" stopColor="#f97316" />
                    <stop offset="40%" stopColor="#eab308" />
                    <stop offset="60%" stopColor="#22c55e" />
                    <stop offset="80%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </span>
          </p>
          <p className="block m-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 relative">
            <span>your <span className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#06b6d4,#8b5cf6)] bg-clip-text text-transparent">practices</span>?</span>
            <StandardCTA to="/contact" variant="primary" showRipple className="responsive-btn text-inherit shrink-0">
              Get in touch
            </StandardCTA>
          </p>
        </div>
        <p className="tracking-[-0.04em] m-0 pl-[1.25em] sm:pl-[1.5em]">
          Let&apos;s <span className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#06b6d4,#8b5cf6)] bg-clip-text text-transparent">build</span> it <span className="bg-[linear-gradient(90deg,#ef4444,#f97316,#eab308,#22c55e,#06b6d4,#8b5cf6)] bg-clip-text text-transparent">together</span>.
        </p>
      </div>
    </section>
  )
}

export default Page5
