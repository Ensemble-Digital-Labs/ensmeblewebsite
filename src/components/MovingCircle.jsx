import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import { resolveCursorLabel, shouldUseCustomCursor } from '../lib/cursorContext'
import { ANIMATION_MOBILE_MAX_WIDTH_PX } from '../lib/animationProfile'

/**
 * Pointer follow: exponential ease toward target (frame-rate stable).
 * Lower λ = softer / more “float”; higher = snappier (less ease).
 */
const CURSOR_FOLLOW_LAMBDA = 18

function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(shouldUseCustomCursor)

  useEffect(() => {
    const update = () => setEnabled(shouldUseCustomCursor())
    update()

    const mqCoarse = window.matchMedia('(pointer: coarse)')
    const mqNarrow = window.matchMedia(`(max-width: ${ANIMATION_MOBILE_MAX_WIDTH_PX}px)`)
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    mqCoarse.addEventListener('change', update)
    mqNarrow.addEventListener('change', update)
    mqReduce.addEventListener('change', update)

    return () => {
      mqCoarse.removeEventListener('change', update)
      mqNarrow.removeEventListener('change', update)
      mqReduce.removeEventListener('change', update)
    }
  }, [])

  return enabled
}

function MovingCircle() {
  const ringRef = useRef(null)
  const mounted = useCustomCursorEnabled()
  const [label, setLabel] = useState('')
  const [suppressed, setSuppressed] = useState(false)

  const labelRef = useRef('')
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const activeRef = useRef(false)

  const showRing = Boolean(label) && !suppressed
  const isClickLabel = label === 'CLICK'

  useLayoutEffect(() => {
    if (!mounted) return undefined
    document.documentElement.classList.toggle('ensemble-custom-cursor-labeled', showRing)
    document.body.style.cursor = showRing ? 'none' : ''
    return () => {
      document.documentElement.classList.remove('ensemble-custom-cursor-labeled')
      document.body.style.cursor = ''
    }
  }, [mounted, showRing])

  useLayoutEffect(() => {
    if (!showRing || !ringRef.current) return
    currentRef.current = { ...targetRef.current }
    ringRef.current.style.left = `${currentRef.current.x}px`
    ringRef.current.style.top = `${currentRef.current.y}px`
  }, [showRing, label])

  useEffect(() => {
    if (!mounted) return undefined

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const startLoop = () => {
      if (rafRef.current) return
      lastTsRef.current = performance.now()

      const tick = (ts) => {
        if (!activeRef.current) {
          rafRef.current = 0
          return
        }

        const el = ringRef.current
        const cur = currentRef.current
        const tgt = targetRef.current
        if (el) {
          const dtSec = Math.min(0.05, Math.max(1e-6, (ts - lastTsRef.current) / 1000))
          lastTsRef.current = ts
          const alpha = 1 - Math.exp(-CURSOR_FOLLOW_LAMBDA * dtSec)
          const dx = tgt.x - cur.x
          const dy = tgt.y - cur.y
          if (Math.abs(dx) < 0.35 && Math.abs(dy) < 0.35) {
            cur.x = tgt.x
            cur.y = tgt.y
          } else {
            cur.x += dx * alpha
            cur.y += dy * alpha
          }
          el.style.left = `${cur.x}px`
          el.style.top = `${cur.y}px`
        }
        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const setActive = (next) => {
      if (activeRef.current === next) return
      activeRef.current = next
      if (next) startLoop()
      else stopLoop()
    }

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      const hit = document.elementFromPoint(e.clientX, e.clientY)
      const hideRing = Boolean(
        hit?.closest?.('[data-cursor-suppress], .nav, #fullscreen-nav'),
      )
      setSuppressed(hideRing)

      const { label: next } = hideRing ? { label: '' } : resolveCursorLabel(hit)
      if (next !== labelRef.current) {
        labelRef.current = next
        setLabel(next)
      }

      setActive(Boolean(next) && !hideRing)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      activeRef.current = false
      stopLoop()
      labelRef.current = ''
      setLabel('')
      setSuppressed(false)
    }
  }, [mounted])

  if (!mounted || !showRing) {
    return null
  }

  return (
    <div
      ref={ringRef}
      className={cn(
        'cursor-brand fixed pointer-events-none cursor-brand--labeled',
        isClickLabel && 'cursor-brand--click',
      )}
      style={{
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
      }}
      aria-hidden
    >
      <div className="cursor-brand__hud cursor-brand__hud--labeled">
        <div className="cursor-brand__disc">
          <span className="cursor-brand__disc-text">{label}</span>
        </div>
      </div>
    </div>
  )
}

export default MovingCircle
