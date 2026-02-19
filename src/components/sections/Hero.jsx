import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { heroContent } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'
import { initMainImageMovement, initLeftArrow } from '../../lib/popprAnimations'

function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    // Initialize poppr video tilt effect after a delay
    const timer = setTimeout(() => {
      initMainImageMovement()
      initLeftArrow()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section
      id="page1"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary pt-20 sm:pt-24"
    >
      {/* Video Background */}
      <div className="video absolute inset-0 w-full h-full opacity-30">
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          autoPlay
          loop
          muted
          playsInline
        >
          {/* Placeholder - add your video source here */}
          <source src="" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary/80" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <div className="main-text">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-text-primary leading-tight font-antique text-center mb-4">
              {heroContent.headline}
            </h1>
            {heroContent.subBrand && (
              <p className="text-xl sm:text-2xl text-brand-primary font-medium tracking-wide mb-8">
                {heroContent.subBrand}
              </p>
            )}
          </div>

          {/* Pain points / speech bubbles */}
          {heroContent.painPoints && heroContent.painPoints.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
              {heroContent.painPoints.map((point, i) => (
                <div
                  key={i}
                  className="relative bg-bg-card/80 border border-white/10 rounded-2xl px-5 py-4 text-left text-sm sm:text-base text-text-secondary leading-relaxed"
                >
                  <span className="absolute -top-2 left-6 w-4 h-4 bg-bg-card border-l border-t border-white/10 rotate-45" />
                  &ldquo;{point}&rdquo;
                </div>
              ))}
            </div>
          )}

          {/* Subhead */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            {heroContent.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-text-muted mb-6 uppercase tracking-wider">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
              {heroContent.trustLogos.map((logo) => (
                <div
                  key={logo.id}
                  className="flex items-center justify-center h-12 w-32 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="text-text-muted text-sm font-medium border border-gray-700 rounded px-4 py-2">
                    {logo.placeholder}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll Arrow - matches poppr reference */}
      <div className="left-arrow absolute left-8 bottom-8 z-10 hidden lg:block">
        <div className="arrow-circle w-16 h-16 rounded-full border border-brand-secondary flex items-center justify-center cursor-pointer transition-all duration-1000">
          <div className="arrow relative h-6 w-3 overflow-hidden">
            <img
              id="arrow-initial"
              src="/assets/images/arrow-up.svg"
              alt="scroll down"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
              style={{ top: '3.5vh' }}
            />
            <img
              id="arrow-after"
              src="/assets/images/arrow-up.svg"
              alt="scroll down"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-1000"
              style={{ top: '-3vh' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
