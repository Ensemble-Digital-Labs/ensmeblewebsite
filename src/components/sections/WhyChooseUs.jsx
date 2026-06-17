import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'
import { isMobileAnimationVariant, shouldUseLightSectionEffects } from '../../lib/animationProfile'

gsap.registerPlugin(ScrollTrigger)

const HOVER_IMAGES_DESKTOP = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
]

const HOVER_IMAGES_TOUCH = HOVER_IMAGES_DESKTOP.map((url) =>
  url.replace('w=800', 'w=520').replace('q=80', 'q=72'),
)

function WhyChooseUs() {
  const { whyChooseUs, hero } = aboutPageContent
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const gridRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightTouch] = useState(() => shouldUseLightSectionEffects())
  const tiltRafRef = useRef(0)
  const tiltPendingRef = useRef({ rx: 0, ry: 0 })

  const stats = whyChooseUs?.stats || []
  const hoverImages = lightTouch ? HOVER_IMAGES_TOUCH : HOVER_IMAGES_DESKTOP

  useEffect(() => {
    if (!lightTouch) return undefined
    HOVER_IMAGES_TOUCH.forEach((src) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
    })
    return undefined
  }, [lightTouch])

  // Perspective tilt — rAF + gsap.set avoids stacking tweens on every mousemove (main-thread jank)
  const handleMouseMove = (e) => {
    if (!imageRef.current || isMobileAnimationVariant()) return
    const el = imageRef.current
    const { clientX, clientY } = e
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    tiltPendingRef.current = { ry: x * 12, rx: -y * 12 }
    if (tiltRafRef.current) return
    tiltRafRef.current = requestAnimationFrame(() => {
      tiltRafRef.current = 0
      if (!imageRef.current) return
      const { rx, ry } = tiltPendingRef.current
      gsap.set(imageRef.current, {
        rotateY: ry,
        rotateX: rx,
        transformPerspective: 1200,
      })
    })
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.5,
      ease: 'expo.out'
    })
  }

  useEffect(() => {
    if (lightTouch) return undefined

    let ctx
    const initAnimations = () => {
      if (!sectionRef.current || !document.querySelector('#main')) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          '.section-heading',
          { y: 60, rotateX: -45, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: '#main',
              start: 'top 85%',
            },
          },
        )

        if (textRef.current) {
          gsap.to(textRef.current, {
            y: -120,
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: '#main',
              scrub: 1.2,
            },
          })
        }

        gsap.fromTo(
          '.main-visual-container',
          { scale: 0.98, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: '#main',
              start: 'top 80%',
            },
          },
        )

        const cells = gsap.utils.toArray('.blueprint-cell')
        gsap.fromTo(
          cells,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              scroller: '#main',
              start: 'top 90%',
            },
          },
        )
      }, sectionRef)
    }

    const timer = window.setTimeout(initAnimations, 64)
    return () => {
      window.clearTimeout(timer)
      if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current)
      tiltRafRef.current = 0
      ctx?.revert()
    }
  }, [lightTouch])

  return (
    <section ref={sectionRef} className="relative overflow-x-hidden py-16 md:py-20 2xl:py-40">
      <Container className="relative z-10">
        {/* Section Heading with Modern Badging */}
        <div className="section-heading mb-10 text-center md:mb-14 2xl:mb-28 2xl:text-left">
          <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl 2xl:text-7xl">
            {whyChooseUs.title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 mb-2">{word}</span>
            ))}
          </h2>
        </div>

        <div className="main-visual-container relative flex min-h-0 flex-col items-stretch gap-0 overflow-visible rounded-xl border border-white/12 bg-white/[0.04] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.45)] 2xl:min-h-[620px] 2xl:flex-row 2xl:overflow-hidden">
          
          {/* Tactical Corner Brackets */}
          <div className="pointer-events-none absolute left-4 top-4 z-50 h-10 w-10 rounded-tl-lg border-l-2 border-t-2 border-white/15" />
          <div className="pointer-events-none absolute bottom-4 right-4 z-50 h-10 w-10 rounded-br-lg border-b-2 border-r-2 border-white/15" />

          {/* Image band — touch: fixed semicircle arch; desktop: interactive arch */}
          <div
            className={
              lightTouch
                ? 'why-choose-us__touch-visual relative h-[280px] w-full shrink-0 overflow-hidden bg-white/[0.03] sm:h-[320px] md:h-[360px]'
                : 'relative flex h-[280px] w-full shrink-0 flex-col justify-center overflow-hidden bg-white/[0.03] sm:h-[320px] md:h-[360px] 2xl:h-auto 2xl:min-h-full 2xl:w-[45%]'
            }
            onMouseMove={lightTouch ? undefined : handleMouseMove}
            onMouseLeave={lightTouch ? undefined : handleMouseLeave}
          >
            {!lightTouch ? (
              <>
                <div ref={textRef} className="pointer-events-none absolute left-8 z-30 2xl:left-10">
                  <h2
                    className="font-display select-none text-[clamp(5rem,12vw,10rem)] font-black uppercase leading-none tracking-tighter text-brand-primary opacity-[0.15]"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    ENSEMBLE
                  </h2>
                </div>

                <div className="absolute left-10 top-10 z-40 hidden font-mono text-[9px] tracking-widest text-brand-primary/40 2xl:block">
                  REF://SYS_CORE_00{activeIndex + 1}
                  <br />
                  LOC://ENV_SYNC_OK
                </div>

                <div
                  ref={imageRef}
                  className="why-choose-us__image-arch absolute right-0 top-1/2 z-20 aspect-[3/4] h-[94%] w-auto max-w-[88%] -translate-y-1/2 overflow-hidden rounded-l-full border-y-[12px] border-l-[12px] border-white/20 bg-[#14122a]/40 shadow-[-40px_0_80px_rgba(0,0,0,0.35)] 2xl:h-auto 2xl:w-[90%]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {hoverImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      decoding="async"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      fetchPriority={idx === 0 ? 'high' : 'low'}
                      className={`absolute inset-0 h-full w-full scale-110 object-cover transition-all duration-1000 ${
                        activeIndex === idx
                          ? 'translate-x-0 opacity-100 grayscale-0'
                          : '-translate-x-8 opacity-0 grayscale'
                      }`}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent mix-blend-overlay" />
                </div>
              </>
            ) : (
              <div className="why-choose-us__touch-arch">
                <div className="why-choose-us__touch-arch-frame">
                  <img
                    key={activeIndex}
                    src={hoverImages[activeIndex]}
                    alt=""
                    decoding="async"
                    className="why-choose-us__touch-arch-img"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: High-Precision Grid */}
          <div ref={gridRef} className="grid shrink-0 grid-cols-1 divide-x divide-y divide-white/10 border-t border-white/10 bg-white/[0.02] sm:grid-cols-2 2xl:min-h-0 2xl:flex-1 2xl:border-l 2xl:border-t-0">
            {stats.map((stat, index) => {
              const isActive = activeIndex === index
              return (
                <div
                  key={stat.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`blueprint-cell group relative flex cursor-default flex-col overflow-hidden p-5 transition-colors duration-300 sm:p-6 md:p-7 2xl:h-full 2xl:p-16 2xl:duration-700 ${
                    isActive ? 'bg-brand-primary text-white' : 'bg-transparent hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="relative z-10 flex flex-col 2xl:h-full">
                    <span className={`mb-3 block text-[9px] font-mono font-bold uppercase tracking-[0.35em] transition-colors duration-500 sm:text-[10px] 2xl:mb-10 2xl:tracking-[0.4em] ${
                      isActive ? 'text-white/50' : 'text-brand-primary/40'
                    }`}>
                      00{index + 1} // SYS.MOD
                    </span>
                    
                    <h3 className={`mb-2 text-xl font-bold leading-[1.08] tracking-tight transition-colors duration-500 sm:text-2xl 2xl:mb-8 2xl:text-4xl ${
                      isActive ? 'text-white' : 'text-white'
                    }`}>
                      {stat.label}
                    </h3>
                    
                    <p className={`max-w-[95%] text-sm font-medium leading-snug transition-colors duration-500 sm:text-[0.9375rem] sm:leading-relaxed 2xl:flex-1 2xl:text-lg ${
                      isActive ? 'text-white/90' : 'text-white/65'
                    }`}>
                      {stat.description}
                    </p>
                  </div>

                  {/* Glassmorphic Indicator */}
                  <div className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full blur-[40px] transition-opacity duration-300 2xl:duration-1000 ${
                    isActive ? 'bg-white/20' : 'bg-brand-primary/5'
                  }`} />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs

