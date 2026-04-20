import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn, prefersReducedMotion } from '../../lib/utils'

/**
 * @param {{ id: string|number, quote: string, author: string, role?: string, company?: string, image: string }[]} testimonials
 */
function calculateGap(width) {
  const minWidth = 1024
  const maxWidth = 1456
  /* Wider translateX so left/right “back” cards sit farther from center */
  const minGap = 92
  const maxGap = 128
  if (width <= 480) return Math.max(52, width * 0.165)
  if (width <= minWidth) return minGap
  if (width >= maxWidth) {
    return Math.max(minGap, maxGap + 0.085 * (width - maxWidth))
  }
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
}

function formatDesignation(t) {
  return [t.role, t.company].filter(Boolean).join(' · ')
}

export function CircularTestimonials({ testimonials, autoplay = true }) {
  const reduceMotionHook = useReducedMotion()
  const reduceLegacy = prefersReducedMotion()
  const reduceMotion = Boolean(reduceMotionHook || reduceLegacy)

  const items = useMemo(() => testimonials ?? [], [testimonials])
  const imageContainerRef = useRef(null)
  const autoplayIntervalRef = useRef(null)
  const touchStartX = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  const len = items.length
  const active = items[activeIndex] ?? items[0]

  const clearAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current != null) {
      window.clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  const handleNext = useCallback(() => {
    if (len < 1) return
    setActiveIndex((prev) => (prev + 1) % len)
    clearAutoplay()
  }, [len, clearAutoplay])

  const handlePrev = useCallback(() => {
    if (len < 1) return
    setActiveIndex((prev) => (prev - 1 + len) % len)
    clearAutoplay()
  }, [len, clearAutoplay])

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!autoplay || reduceMotion || len < 2) return
    autoplayIntervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % len)
    }, 5200)
    return () => clearAutoplay()
  }, [autoplay, reduceMotion, len, clearAutoplay])

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev])

  const getImageStyle = useCallback(
    (index) => {
      const gap = calculateGap(containerWidth)
      /* Slightly taller arc so spread reads clearly */
      const maxStickUp = gap * 0.88
      const isActive = index === activeIndex
      const isLeft =
        (activeIndex - 1 + len) % len === index
      const isRight = (activeIndex + 1) % len === index

      const transition = reduceMotion
        ? 'opacity 0.35s ease, transform 0.35s ease'
        : 'all 0.8s cubic-bezier(.4,2,.3,1)'

      if (reduceMotion) {
        if (isActive) {
          return {
            zIndex: 3,
            opacity: 1,
            pointerEvents: 'auto',
            transform: 'translateX(0) translateY(0) scale(1)',
            transition,
          }
        }
        return {
          zIndex: 1,
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translateX(0) translateY(8px) scale(0.96)',
          transition,
        }
      }

      if (isActive) {
        return {
          zIndex: 3,
          opacity: 1,
          pointerEvents: 'auto',
          transform:
            'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
          transition,
        }
      }
      if (isLeft) {
        return {
          zIndex: 2,
          opacity: 1,
          pointerEvents: 'auto',
          transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(15deg)`,
          transition,
        }
      }
      if (isRight) {
        return {
          zIndex: 2,
          opacity: 1,
          pointerEvents: 'auto',
          transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.82) rotateY(-15deg)`,
          transition,
        }
      }
      return {
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none',
        transition,
      }
    },
    [activeIndex, containerWidth, len, reduceMotion]
  )

  const quoteVariants = {
    initial: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16 },
    animate: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0 },
    exit: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -12 },
  }

  if (len === 0) return null

  /* Fewer than 3: circular 3-card layout breaks; show premium stacked cards */
  if (len < 3) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {items.map((t) => (
          <div
            key={t.id}
            className="group relative overflow-hidden rounded-2xl border border-cyan-200/40 bg-white/80 p-6 shadow-lg shadow-cyan-900/5 backdrop-blur-md transition hover:border-brand-primary/30 md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-brand-primary/20 md:mx-0">
                <img
                  src={t.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 text-center md:text-left">
                <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-text-primary">
                  {t.author}
                </p>
                {formatDesignation(t) && (
                  <p className="text-sm text-text-muted">
                    {formatDesignation(t)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="mx-auto w-full max-w-5xl px-2 sm:px-4"
      role="region"
      aria-label="Client testimonials carousel"
      tabIndex={0}
    >
      <div
        className="relative overflow-visible rounded-3xl border border-cyan-200/35 bg-gradient-to-br from-white/90 via-white/85 to-cyan-50/40 p-6 shadow-xl shadow-cyan-900/10 backdrop-blur-md sm:p-8 md:p-10"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx > 56) handlePrev()
          else if (dx < -56) handleNext()
          touchStartX.current = null
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(rgba(8,145,178,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8,145,178,0.06) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative grid gap-10 md:grid-cols-2 md:gap-12 md:items-center">
          <div
            className="relative mx-auto aspect-[4/3] w-full max-w-lg perspective-[1000px] px-1 sm:px-3 sm:h-72 md:h-96"
            ref={imageContainerRef}
          >
            {items.map((t, index) => (
              <button
                key={t.id}
                type="button"
                className="absolute inset-0 appearance-none border-0 bg-transparent p-0"
                style={getImageStyle(index)}
                onClick={() => {
                  if (index === activeIndex) return
                  setActiveIndex(index)
                  clearAutoplay()
                }}
                aria-label={`Show testimonial from ${t.author}`}
              >
                <img
                  src={t.image}
                  alt=""
                  className={cn(
                    'h-full w-full rounded-2xl object-cover shadow-lg shadow-cyan-900/25',
                    'ring-1 ring-white/60',
                    index === activeIndex && 'ring-2 ring-brand-primary/50'
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex min-h-[12rem] flex-col justify-between gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0.2 : 0.32,
                  ease: 'easeInOut',
                }}
              >
                <h3 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl md:text-[1.5rem]">
                  {active.author}
                </h3>
                {formatDesignation(active) && (
                  <p className="mt-1 text-sm text-text-muted sm:text-[0.925rem]">
                    {formatDesignation(active)}
                  </p>
                )}
                <motion.p
                  className="mt-5 text-base leading-relaxed text-text-secondary sm:text-[1.125rem]"
                  lang="en"
                >
                  {reduceMotion ? (
                    <>&ldquo;{active.quote}&rdquo;</>
                  ) : (
                    active.quote.split(' ').map((word, i) => (
                      <motion.span
                        key={`${activeIndex}-${i}`}
                        initial={{
                          filter: 'blur(8px)',
                          opacity: 0,
                          y: 4,
                        }}
                        animate={{
                          filter: 'blur(0px)',
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: 'easeInOut',
                          delay: 0.02 * i,
                        }}
                        className="inline-block"
                      >
                        {word}
                        &nbsp;
                      </motion.span>
                    ))
                  )}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 pt-2 md:justify-start">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                style={{
                  backgroundColor: hoverPrev
                    ? 'var(--color-brand-primary, #0891B2)'
                    : 'rgba(10, 10, 11, 0.92)',
                }}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                style={{
                  backgroundColor: hoverNext
                    ? 'var(--color-brand-primary, #0891B2)'
                    : 'rgba(10, 10, 11, 0.92)',
                }}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircularTestimonials
