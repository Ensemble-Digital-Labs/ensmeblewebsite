import { useEffect, useRef, useState } from 'react'
import {
  createDnaCapitalShaderHelix,
  disposeDnaCapitalShaderHelix,
  renderDnaCapitalShaderHelix,
  resizeDnaCapitalShaderHelix,
} from '../../lib/dnaCapitalShaderHelix'
import { ENSEMBLE_DNA_SHADER_OPTIONS } from '../../lib/ensembleDnaShaderOptions'
import { prefersReducedMotion } from '../../lib/utils'

/** Starfield-only drift behind fixed gallery (no helix / wave). */
const GALLERY_FIELD_STATE = {
  globalProgress: 0,
  drift: 0.4,
  morph: 0,
  helixMix: 0,
  waveMix: 0,
  cameraLift: 0,
}

const WEBGL_OPTIONS = {
  ...ENSEMBLE_DNA_SHADER_OPTIONS,
  getIntroProgress: () => 1,
  includeHelix: false,
  includeWave: false,
  starBrightnessScale: 1.38,
}

/** Full-viewport starfield particles for `/case-studies-v2` (DNA Capital–style, no helix). */
export default function CaseStudiesV2DnaCanvas() {
  const mountRef = useRef(null)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const mount = mountRef.current
    if (!mount) return undefined

    let w = Math.max(1, mount.clientWidth)
    let h = Math.max(1, mount.clientHeight)
    let ctx = null
    let raf = 0
    let cancelled = false
    let lastTime = 0

    const draw = (time) => {
      if (cancelled || !ctx) return
      const deltaMs = lastTime ? time - lastTime : 16.67
      lastTime = time

      try {
        renderDnaCapitalShaderHelix(ctx, {
          scrollState: GALLERY_FIELD_STATE,
          time,
          deltaMs,
          reducedMotion: prefersReducedMotion(),
        })
      } catch (error) {
        console.warn('[CaseStudiesV2DnaCanvas] render failed', error)
        setWebglFailed(true)
        return
      }

      raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      w = Math.max(1, mount.clientWidth)
      h = Math.max(1, mount.clientHeight)
      if (ctx) resizeDnaCapitalShaderHelix(ctx, w, h)
    }

    ;(async () => {
      try {
        ctx = await createDnaCapitalShaderHelix(w, h, WEBGL_OPTIONS)
        if (cancelled) {
          disposeDnaCapitalShaderHelix(ctx)
          return
        }
        const canvas = ctx.renderer.domElement
        canvas.className = 'case-studies-v2-dna-canvas__gl'
        mount.appendChild(canvas)
        raf = requestAnimationFrame(draw)
      } catch (error) {
        console.warn('[CaseStudiesV2DnaCanvas] WebGL init failed', error)
        if (!cancelled) setWebglFailed(true)
      }
    })()

    window.addEventListener('resize', resize)
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(resize)
        : null
    resizeObserver?.observe(mount)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      resizeObserver?.disconnect()
      disposeDnaCapitalShaderHelix(ctx)
      if (ctx?.renderer?.domElement?.parentNode === mount) {
        mount.removeChild(ctx.renderer.domElement)
      }
    }
  }, [])

  if (prefersReducedMotion() || webglFailed) return null

  return (
    <div
      className="case-studies-v2-dna-canvas pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div ref={mountRef} className="case-studies-v2-dna-canvas__mount absolute inset-0" />
      <div className="case-studies-v2-dna-canvas__scrim absolute inset-0" aria-hidden />
    </div>
  )
}
