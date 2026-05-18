import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

function getLocomotiveLenis() {
  if (typeof window === 'undefined') return null
  return (
    window.__ensembleLenis ||
    window.locomotiveScroll?.lenisInstance ||
    window.locomotiveScroll?.LenisInstance ||
    null
  )
}

/** Lenis v1–v2 may expose scroll as a number or `{ y }`. */
function getLenisScrollY(lenis) {
  if (!lenis) return 0
  const s = lenis.scroll
  if (typeof s === 'number' && Number.isFinite(s)) return s
  if (s && typeof s === 'object') {
    const y = s.y ?? s.current
    if (typeof y === 'number' && Number.isFinite(y)) return y
  }
  return 0
}

/**
 * Progress 0…1 through a tall “pin” wrapper while a sticky child stays in view.
 * Uses pin vs `#main` geometry so it matches **native #main scroll** and **Lenis-transformed** content
 * (the old Lenis branch mixed scroll pixels with viewport-relative offsets and stuck near 0 on mobile).
 */
function getPinZoneProgress(pinEl) {
  const main = document.querySelector('#main')
  if (!pinEl || !main) return null

  const lenis = getLocomotiveLenis()
  const vh = lenis?.dimensions?.height ?? main.clientHeight ?? window.innerHeight
  const H = pinEl.offsetHeight
  const range = Math.max(1, H - vh)

  const pinRect = pinEl.getBoundingClientRect()
  const mainRect = main.getBoundingClientRect()
  const pinTopInMainViewport = pinRect.top - mainRect.top
  const scrolled = -pinTopInMainViewport
  return Math.min(1, Math.max(0, scrolled / range))
}

function getGlobalFallbackProgress() {
  if (typeof window === 'undefined') return 0
  const lenis = getLocomotiveLenis()
  if (lenis && typeof lenis.progress === 'number' && Number.isFinite(lenis.progress)) {
    return Math.min(1, Math.max(0, lenis.progress))
  }
  const main = document.querySelector('#main')
  const content = document.querySelector('[data-scroll-content]')
  if (!main) {
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    )
    return Math.min(1, Math.max(0, window.scrollY / max))
  }
  const scrollable = Math.max(
    1,
    (content?.scrollHeight ?? main.scrollHeight) - main.clientHeight
  )
  return Math.min(1, Math.max(0, main.scrollTop / scrollable))
}

/**
 * @param {Object} props
 * @param {Array<{ title: string, description: string, category: string, image: string }>} props.items
 * @param {string} [props.className]
 * @param {string} [props.pinRootId] — tall wrapper that creates sticky scroll range (default carousel-pin-scroll)
 */
export function CircularGallery({
  items,
  className,
  pinRootId = 'carousel-pin-scroll',
  ...props
}) {
  const containerRef = useRef(null)
  const ringRef = useRef(null)
  const cardRefs = useRef([])
  const [box, setBox] = useState({ w: 1200, h: 800 })

  const anglePerItem = items.length > 0 ? 360 / items.length : 0

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      setBox({ w: cr.width, h: cr.height })
    })
    ro.observe(el)
    setBox({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    let rafId = 0

    const applyFrame = () => {
      const pinEl =
        (typeof document !== 'undefined' &&
          document.getElementById(pinRootId)) ||
        null

      let p = 0
      if (pinEl) {
        const zone = getPinZoneProgress(pinEl)
        if (zone !== null) {
          p = zone
        } else {
          p = getGlobalFallbackProgress()
        }
      } else {
        p = getGlobalFallbackProgress()
      }

      const rotation = p * 360
      const ring = ringRef.current
      if (ring) {
        ring.style.transform = `rotateY(${rotation}deg)`
      }

      const n = items.length
      for (let i = 0; i < n; i++) {
        const face = cardRefs.current[i]
        if (!face) continue
        const itemAngle = i * anglePerItem
        const relativeAngle = (itemAngle + rotation + 360) % 360
        const normalizedAngle =
          relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
        const opacity = Math.max(0.35, 1 - normalizedAngle / 180)
        face.style.opacity = String(opacity)
      }
    }

    const tick = () => {
      applyFrame()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [pinRootId, items.length, anglePerItem])

  const short = Math.min(box.w, box.h)
  const radius = Math.min(Math.max(short * 0.44, 200), 720)
  const cardW = Math.min(300, Math.max(220, box.w * 0.26))
  const cardH = cardW * (400 / 300)

  if (!items.length) return null

  const ml = -cardW / 2
  const mt = -cardH / 2

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Circular 3D gallery"
      data-cursor-intent="drag"
      className={cn(
        'relative flex h-full min-h-0 w-full flex-1 items-center justify-center',
        className
      )}
      style={{ perspective: '2000px' }}
      {...props}
    >
      <div
        ref={ringRef}
        className="relative h-full w-full max-w-none"
        style={{
          transform: 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {items.map((item, i) => {
          const itemAngle = i * anglePerItem
          return (
            <div
              key={`${item.title}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              role="group"
              aria-label={item.title}
              className="absolute left-1/2 top-1/2"
              style={{
                width: cardW,
                height: cardH,
                marginLeft: ml,
                marginTop: mt,
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                opacity: 1,
                willChange: 'opacity',
              }}
            >
              <div
                data-cursor-label="See it"
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-amber-300/35 bg-zinc-950/90 shadow-2xl shadow-amber-950/25 backdrop-blur-md sm:rounded-3xl"
              >
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'center' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 text-white sm:p-5">
                  <p className="mb-1 line-clamp-2 text-base font-normal leading-snug text-white/95">
                    {item.description}
                  </p>
                  <h2 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-amber-200/90 sm:text-xs">
                    {item.category}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CircularGallery
