import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn, prefersReducedMotion } from '../lib/utils'
import { resolveCursorLabel } from '../lib/cursorContext'

/**
 * Pointer follow: exponential ease toward target (frame-rate stable).
 * Lower λ = softer / more “float”; higher = snappier (less ease).
 */
const CURSOR_FOLLOW_LAMBDA = 18

function shouldMountCustomCursorRing() {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  try {
    if (window.matchMedia('(pointer: coarse)').matches) return false
  } catch {
    return false
  }
  return true
}

function MovingCircle() {
  const ringRef = useRef(null)
  /** Sync on first client render so we do not paint one frame with the default cursor before effects run. */
  const [mounted] = useState(shouldMountCustomCursorRing)
  const [label, setLabel] = useState('')
  const [suppressed, setSuppressed] = useState(false)

  const labelRef = useRef('')
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)

  useLayoutEffect(() => {
    if (!mounted) return
    document.documentElement.classList.add('ensemble-custom-cursor')
    return () => document.documentElement.classList.remove('ensemble-custom-cursor')
  }, [mounted])

  useEffect(() => {
    if (prefersReducedMotion() || !mounted) return

    const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    targetRef.current = { x: initialX, y: initialY }
    currentRef.current = { x: initialX, y: initialY }

    const ring = ringRef.current
    if (ring) {
      ring.style.left = `${initialX}px`
      ring.style.top = `${initialY}px`
    }

    lastTsRef.current = performance.now()

    const tick = (ts) => {
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

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      const hit = document.elementFromPoint(e.clientX, e.clientY)
      const hideRing = Boolean(hit?.closest?.('[data-cursor-suppress]'))
      setSuppressed(hideRing)
      if (hideRing) {
        if (labelRef.current !== '') {
          labelRef.current = ''
          setLabel('')
        }
        return
      }

      const { label: next } = resolveCursorLabel(hit)
      if (next !== labelRef.current) {
        labelRef.current = next
        setLabel(next)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [mounted])

  if (prefersReducedMotion() || !mounted) {
    return null
  }

  const hasLabel = Boolean(label)
  const isClickLabel = label === 'CLICK'

  return (
    <div
      ref={ringRef}
      className={cn(
        'cursor-brand fixed pointer-events-none',
        hasLabel ? 'cursor-brand--labeled' : 'cursor-brand--idle',
        isClickLabel && 'cursor-brand--click',
      )}
      style={{
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
        opacity: suppressed ? 0 : 1,
        visibility: suppressed ? 'hidden' : 'visible',
      }}
      aria-hidden
    >
      <div className={cn('cursor-brand__hud', hasLabel && 'cursor-brand__hud--labeled')}>
        {/* Ring + disc both mounted — crossfade avoids a hard swap / “puff” on hover targets */}
        <div className="cursor-brand__idle" aria-hidden />
        <div className="cursor-brand__disc" aria-hidden={!hasLabel}>
          {hasLabel ? <span className="cursor-brand__disc-text">{label}</span> : null}
        </div>
      </div>
    </div>
  )
}

export default MovingCircle
