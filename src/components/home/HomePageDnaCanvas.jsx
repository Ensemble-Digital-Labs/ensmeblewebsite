import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  createHomeDnaWebgl,
  disposeHomeDnaWebgl,
  renderHomeDnaWebgl,
  resizeHomeDnaWebgl,
} from '../../lib/homeDnaWebgl'
import {
  resetHomeDnaIntroProgress,
  setHomeDnaIntroProgress,
} from '../../lib/homeDnaIntro'
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
 * Fixed viewport WebGL — curvy helix + DNA intro (scatter → chain after loader).
 */
export default function HomePageDnaCanvas({ introReady = false }) {
  const wrapRef = useRef(null)
  const mountRef = useRef(null)
  const introTlRef = useRef(null)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setHomeDnaIntroProgress(1)
      return undefined
    }

    if (!introReady) {
      resetHomeDnaIntroProgress()
      return undefined
    }

    resetHomeDnaIntroProgress()
    const introState = { value: 0 }
    introTlRef.current?.kill()
    introTlRef.current = gsap.timeline({
      onUpdate: () => setHomeDnaIntroProgress(introState.value),
    })
    introTlRef.current.to(introState, {
      value: 1,
      duration: 1.75,
      ease: 'power2.out',
      delay: 0.18,
    })

    return () => {
      introTlRef.current?.kill()
      introTlRef.current = null
      setHomeDnaIntroProgress(1)
    }
  }, [introReady])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const wrap = mountRef.current
    if (!wrap) return undefined

    const trackEl =
      document.getElementById('home-scroll-root') ||
      document.getElementById('home-sections')

    let ctx = null
    let raf = 0
    let measureRaf = 0
    let lastTime = 0
    let cancelled = false
    let w = 0
    let h = 0
    let docHeight = 0

    const measurePage = () => {
      docHeight = measureHomeDocHeight(trackEl, h || window.innerHeight)
    }

    const resize = () => {
      w = Math.max(1, window.innerWidth)
      h = Math.max(1, window.innerHeight)
      measurePage()
      if (ctx) resizeHomeDnaWebgl(ctx, w, h, docHeight)
    }

    const draw = (time) => {
      if (cancelled || !ctx) return

      const deltaMs = lastTime ? time - lastTime : 16.67
      lastTime = time

      const sectionTop = trackEl?.getBoundingClientRect().top ?? 0

      try {
        renderHomeDnaWebgl(ctx, {
          time,
          deltaMs,
          sectionTop,
          docHeight,
          viewHeight: h,
          viewWidth: w,
        })
      } catch (error) {
        console.warn('[HomePageDnaCanvas] render failed', error)
        setWebglFailed(true)
        return
      }

      raf = requestAnimationFrame(draw)
    }

    const scheduleMeasure = () => {
      if (measureRaf) return
      measureRaf = requestAnimationFrame(() => {
        measureRaf = 0
        measurePage()
      })
    }

    ;(async () => {
      try {
        w = Math.max(1, window.innerWidth)
        h = Math.max(1, window.innerHeight)
        measurePage()
        ctx = createHomeDnaWebgl(w, h, docHeight)
        if (cancelled) {
          disposeHomeDnaWebgl(ctx)
          return
        }
        wrap.appendChild(ctx.renderer.domElement)
        ctx.renderer.domElement.className = 'home-page-dna-canvas__canvas absolute inset-0 h-full w-full'
        raf = requestAnimationFrame(draw)
      } catch (error) {
        console.warn('[HomePageDnaCanvas] WebGL init failed', error)
        if (!cancelled) setWebglFailed(true)
      }
    })()

    window.addEventListener('resize', resize)
    document.getElementById('main')?.addEventListener('scroll', scheduleMeasure, { passive: true })

    const roTargets = [trackEl, document.getElementById('home-sections')].filter(Boolean)
    const ro = new ResizeObserver(measurePage)
    roTargets.forEach((el) => ro.observe(el))

    window.addEventListener('ensemble:scroll-ready', measurePage)

    const remeasureDelays = [450, 1200, 2400, 4000].map((ms) =>
      window.setTimeout(measurePage, ms),
    )

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      if (measureRaf) cancelAnimationFrame(measureRaf)
      remeasureDelays.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('resize', resize)
      document.getElementById('main')?.removeEventListener('scroll', scheduleMeasure)
      window.removeEventListener('ensemble:scroll-ready', measurePage)
      ro.disconnect()
      disposeHomeDnaWebgl(ctx)
      if (ctx?.renderer?.domElement?.parentNode === wrap) {
        wrap.removeChild(ctx.renderer.domElement)
      }
    }
  }, [])

  if (prefersReducedMotion() || webglFailed) {
    return (
      <div
        ref={wrapRef}
        className="home-page-dna-canvas pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="home-page-dna-canvas__wash absolute inset-0" aria-hidden />
        <div className="home-page-dna-canvas__edge-scrim absolute inset-0" />
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className="home-page-dna-canvas pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="home-page-dna-canvas__wash absolute inset-0" aria-hidden />
      <div ref={mountRef} className="home-page-dna-canvas__webgl absolute inset-0" />
      <div className="home-page-dna-canvas__edge-scrim absolute inset-0" />
    </div>
  )
}
