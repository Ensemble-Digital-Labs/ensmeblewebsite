import { useEffect, useRef } from 'react'
import { createHomeDnaRenderer } from '../../lib/homeDnaHelix'
import { prefersReducedMotion } from '../../lib/utils'

function measureHomeDocHeight(trackEl, viewHeight) {
  if (!trackEl) return Math.max(window.innerHeight, 1)

  const sections = document.getElementById('home-sections')
  const lastSection = sections?.lastElementChild
  const trackRect = trackEl.getBoundingClientRect()
  const bottomPad = viewHeight * 0.1

  if (lastSection) {
    const lastRect = lastSection.getBoundingClientRect()
    const span = lastRect.bottom - trackRect.top + bottomPad

    return Math.max(
      span,
      trackEl.scrollHeight,
      trackEl.offsetHeight,
      sections?.offsetHeight ?? 0,
      window.innerHeight,
    )
  }

  return Math.max(trackEl.scrollHeight, trackEl.offsetHeight, window.innerHeight)
}

/**
 * Fixed viewport canvas — DNA helices span the full home scroll height and
 * stay locked to section layout (works with Lenis transform scroll + native #main).
 */
export default function HomePageDnaCanvas() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const trackEl =
      document.getElementById('home-scroll-root') ||
      document.getElementById('home-sections')

    const mainEl = document.getElementById('main')

    let raf = 0
    let measureRaf = 0
    let w = 0
    let h = 0
    let docHeight = 0
    let dpr = 1

    const renderFrame = createHomeDnaRenderer(ctx)

    const measurePage = () => {
      docHeight = measureHomeDocHeight(trackEl, h || window.innerHeight)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, window.innerWidth)
      h = Math.max(1, window.innerHeight)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measurePage()
    }

    const draw = (time) => {
      if (!trackEl) {
        raf = requestAnimationFrame(draw)
        return
      }

      const sectionTop = trackEl.getBoundingClientRect().top
      renderFrame({ w, h, docHeight, sectionTop, time })
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)

    const scheduleMeasure = () => {
      if (measureRaf) return
      measureRaf = requestAnimationFrame(() => {
        measureRaf = 0
        measurePage()
      })
    }

    window.addEventListener('resize', resize)
    mainEl?.addEventListener('scroll', scheduleMeasure, { passive: true })

    const roTargets = [trackEl, document.getElementById('home-sections')].filter(Boolean)
    const ro = new ResizeObserver(measurePage)
    roTargets.forEach((el) => ro.observe(el))

    const onScrollReady = () => {
      measurePage()
    }
    window.addEventListener('ensemble:scroll-ready', onScrollReady)

    const remeasureDelays = [450, 1200, 2400, 4000].map((ms) =>
      window.setTimeout(measurePage, ms),
    )

    return () => {
      cancelAnimationFrame(raf)
      if (measureRaf) cancelAnimationFrame(measureRaf)
      remeasureDelays.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('resize', resize)
      mainEl?.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('ensemble:scroll-ready', onScrollReady)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="home-page-dna-canvas pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="home-page-dna-canvas__wash absolute inset-0" aria-hidden />
      <div className="home-page-dna-canvas__edge-scrim absolute inset-0" />
      <canvas
        ref={canvasRef}
        className="home-page-dna-canvas__canvas absolute inset-0 h-full w-full"
      />
    </div>
  )
}
