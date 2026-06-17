import { useEffect, useRef, useState } from 'react'
import {
  createDnaCapitalShaderHelix,
  disposeDnaCapitalShaderHelix,
  renderDnaCapitalShaderHelix,
  resizeDnaCapitalShaderHelix,
} from '../../lib/dnaCapitalShaderHelix'
import { ENSEMBLE_DNA_SHADER_OPTIONS } from '../../lib/ensembleDnaShaderOptions'
import { prefersReducedMotion } from '../../lib/utils'
import { cn } from '../../lib/utils'

/** Starfield-only drift — matches home ambient particles (no helix / wave). */
const STARFIELD_STATE = {
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

/**
 * Full-viewport ambient particle field — same starfield as home / case-studies gallery.
 * Mount once in layout for marketing routes; case-studies pages may mount their own copy.
 */
export default function AmbientStarfieldCanvas({ className, scrimClassName, showScrim = true }) {
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
          scrollState: STARFIELD_STATE,
          time,
          deltaMs,
          reducedMotion: prefersReducedMotion(),
        })
      } catch (error) {
        console.warn('[AmbientStarfieldCanvas] render failed', error)
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
        canvas.className = 'ambient-starfield-canvas__gl'
        mount.appendChild(canvas)
        raf = requestAnimationFrame(draw)
      } catch (error) {
        console.warn('[AmbientStarfieldCanvas] WebGL init failed', error)
        if (!cancelled) setWebglFailed(true)
      }
    })()

    window.addEventListener('resize', resize)
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
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
      className={cn(
        'ambient-starfield-canvas pointer-events-none fixed inset-0 z-[1] overflow-hidden',
        className,
      )}
      aria-hidden
    >
      <div ref={mountRef} className="ambient-starfield-canvas__mount absolute inset-0" />
      {showScrim ? (
        <div
          className={cn('ambient-starfield-canvas__scrim absolute inset-0', scrimClassName)}
          aria-hidden
        />
      ) : null}
    </div>
  )
}
