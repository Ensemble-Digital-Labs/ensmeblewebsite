import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  createHomeDnaWebgl,
  disposeHomeDnaWebgl,
  renderHomeDnaWebgl,
  resizeHomeDnaWebgl,
} from '../../lib/homeDnaWebgl'
import { CASE_STUDIES_DNA_HELICES } from '../../lib/homeDnaHelix'
import { setHomeDnaIntroProgress } from '../../lib/homeDnaIntro'
import { prefersReducedMotion } from '../../lib/utils'

/** Viewport height only — corner accent, not full-page scroll helix. */
function measurePortfolioDocHeight(viewHeight) {
  return Math.max(viewHeight, window.innerHeight, 640)
}

/** Fixed WebGL helix — subtle bottom-right accent on gallery atmosphere. */
export default function CaseStudiesDnaCanvas() {
  const wrapRef = useRef(null)
  const mountRef = useRef(null)
  const [webglFailed, setWebglFailed] = useState(false)

  /* Gallery page: skip scatter intro — avoids a dark particle cluster flash at center on load. */
  useLayoutEffect(() => {
    setHomeDnaIntroProgress(1)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const wrap = mountRef.current
    if (!wrap) return undefined

    let ctx = null
    let raf = 0
    let lastTime = 0
    let cancelled = false
    let w = 0
    let h = 0
    let docHeight = 0

    const measurePage = () => {
      docHeight = measurePortfolioDocHeight(h || window.innerHeight)
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

      try {
        renderHomeDnaWebgl(ctx, {
          time,
          deltaMs,
          sectionTop: 0,
          docHeight,
          viewHeight: h,
          viewWidth: w,
        })
      } catch (error) {
        console.warn('[CaseStudiesDnaCanvas] render failed', error)
      }

      raf = requestAnimationFrame(draw)
    }

    resize()

    ;(async () => {
      try {
        ctx = createHomeDnaWebgl(w, h, docHeight, {
          helixConfigs: CASE_STUDIES_DNA_HELICES,
          opacityScale: 0.52,
        })
        if (cancelled) {
          disposeHomeDnaWebgl(ctx)
          return
        }
        wrap.appendChild(ctx.renderer.domElement)
        ctx.renderer.domElement.className = 'home-page-dna-canvas__canvas absolute inset-0 h-full w-full'
        raf = requestAnimationFrame(draw)
      } catch (error) {
        console.warn('[CaseStudiesDnaCanvas] WebGL init failed', error)
        if (!cancelled) setWebglFailed(true)
      }
    })()

    window.addEventListener('resize', resize)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
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
        className="home-page-dna-canvas case-studies-portfolio-helix pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="home-page-dna-canvas__wash absolute inset-0" aria-hidden />
        <div className="home-page-dna-canvas__edge-scrim absolute inset-0" aria-hidden />
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className="home-page-dna-canvas case-studies-portfolio-helix pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="home-page-dna-canvas__wash absolute inset-0" aria-hidden />
      <div ref={mountRef} className="home-page-dna-canvas__webgl absolute inset-0" />
      <div className="home-page-dna-canvas__edge-scrim absolute inset-0" aria-hidden />
    </div>
  )
}
