import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { heroContent } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'

const TYPING_MS_PER_CHAR = 28
const STAGGER_MS = 380

function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const painPoints = heroContent.painPoints || []
  const [visibleLengths, setVisibleLengths] = useState(() =>
    painPoints.map(() => 0)
  )

  // Typewriter: stagger start per item, then reveal one char every TYPING_MS_PER_CHAR
  useEffect(() => {
    if (prefersReducedMotion() || painPoints.length === 0) {
      setVisibleLengths(painPoints.map((p) => p.length))
      return
    }
    const fullLengths = painPoints.map((p) => p.length)
    const start = performance.now()
    let rafId = null
    const tick = () => {
      const elapsed = performance.now() - start
      setVisibleLengths(
        fullLengths.map((len, i) => {
          const delay = i * STAGGER_MS
          if (elapsed < delay) return 0
          const typingElapsed = elapsed - delay
          const chars = Math.floor(typingElapsed / TYPING_MS_PER_CHAR)
          return Math.min(len, chars)
        })
      )
      const maxTime =
        Math.max(...fullLengths.map((len, i) => i * STAGGER_MS + len * TYPING_MS_PER_CHAR)) + 200
      if (elapsed < maxTime) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      id="page1"
      ref={heroRef}
      className="relative min-h-0 md:min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary pt-20 sm:pt-24 pb-6 md:pb-0"
    >
      {/* Video background: autoplay loop only (no scroll link = no lag) */}
      {heroContent.backgroundVideo && (
        <div className="video absolute inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-[calc(50%-200px)_50%] md:object-right"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src={heroContent.backgroundVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/20 to-bg-primary/80 pointer-events-none" />
        </div>
      )}

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <div className="main-text">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight font-antique text-center mb-3 md:mb-4 tracking-in-contract-normal">
              {heroContent.headline}
            </h1>
            {heroContent.subBrand && (
              <div className="inline-block mb-4 md:mb-8 rounded-2xl border border-white/40 border-l-4 border-l-brand-primary bg-white/10 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 shadow-lg shadow-black/10">
                <p className="text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-wide">
                  {heroContent.subBrand}
                </p>
              </div>
            )}
          </div>

          {/* Pain points / speech bubbles - fixed height to prevent layout jump */}
          {heroContent.painPoints && heroContent.painPoints.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-8 max-w-4xl mx-auto h-[368px] sm:h-[176px] overflow-visible">
              {heroContent.painPoints.map((point, i) => {
                const len = visibleLengths[i] ?? point.length
                const visible = point.slice(0, len)
                const done = len >= point.length
                return (
                  <div
                    key={i}
                    className="relative bg-white/90 border border-gray-200 rounded-2xl px-5 py-4 text-left text-sm sm:text-base text-gray-800 leading-relaxed shadow-sm h-[80px] flex items-center overflow-visible"
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 border border-gray-200/80 rotate-45 shadow-sm rainbow-gradient-animated pointer-events-none" />
                    <p className="line-clamp-2 w-full pr-1">
                      &ldquo;{visible}
                      {!done && <span className="animate-pulse opacity-80" aria-hidden>|</span>}
                      {done && '\u201D'}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Subhead */}
          <div className="mb-4 md:mb-8 max-w-3xl mx-auto rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-5 sm:px-8 sm:py-6">
            <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed">
              {heroContent.subhead}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-16">
            <Link to={heroContent.primaryCTA.link}>
              <Button size="lg" variant="primary">
                {heroContent.primaryCTA.text}
              </Button>
            </Link>
            <Link to={heroContent.secondaryCTA.link}>
              <Button size="lg" variant="outline">
                {heroContent.secondaryCTA.text}
              </Button>
            </Link>
          </div>

          {/* Trust Row */}
          <div className="border-t border-white/40 pt-4 md:pt-8">
            <p className="text-sm text-white/90 mb-4 md:mb-6 uppercase tracking-wider">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
              {heroContent.trustLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="flex items-center justify-center h-12 w-32 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="text-white/90 text-sm font-medium border border-white/50 rounded px-4 py-2">
                    {logo.placeholder}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
