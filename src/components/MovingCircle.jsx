import { useEffect, useRef, useState } from 'react'
import { cn, prefersReducedMotion } from '../lib/utils'

function isInteractiveTarget(el) {
  if (!el || !(el instanceof Element)) return false
  if (
    el.closest('a[href]') ||
    el.closest('button:not([disabled])') ||
    el.closest('[role="button"]:not([aria-disabled="true"])') ||
    el.closest('input:not([type="hidden"]):not([disabled])') ||
    el.closest('textarea:not([disabled])') ||
    el.closest('select:not([disabled])') ||
    el.closest('label[for]') ||
    el.closest('.cursor-pointer') ||
    el.closest('[data-cursor-intent]')
  ) {
    return true
  }
  return false
}

function MovingCircle() {
  const ringRef = useRef(null)
  const [clicks, setClicks] = useState([])
  const [mounted, setMounted] = useState(false)
  const [interactive, setInteractive] = useState(false)

  const interactiveRef = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.add('ensemble-custom-cursor')
    return () => document.documentElement.classList.remove('ensemble-custom-cursor')
  }, [mounted])

  useEffect(() => {
    if (prefersReducedMotion() || !mounted) return

    const ring = ringRef.current
    if (!ring) return

    const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    ring.style.left = `${initialX}px`
    ring.style.top = `${initialY}px`

    const onMove = (e) => {
      ring.style.left = `${e.clientX}px`
      ring.style.top = `${e.clientY}px`

      const hit = document.elementFromPoint(e.clientX, e.clientY)
      const next = isInteractiveTarget(hit)
      if (next !== interactiveRef.current) {
        interactiveRef.current = next
        setInteractive(next)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [mounted])

  useEffect(() => {
    if (prefersReducedMotion() || !mounted) return

    const handleClick = (e) => {
      setClicks((prev) => [...prev.slice(-4), { x: e.clientX, y: e.clientY, id: Date.now() }])
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [mounted])

  useEffect(() => {
    if (clicks.length === 0) return
    const t = setTimeout(() => setClicks((prev) => prev.slice(1)), 650)
    return () => clearTimeout(t)
  }, [clicks])

  if (prefersReducedMotion() || !mounted) {
    return null
  }

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-brand fixed pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          zIndex: 999999,
        }}
        aria-hidden
      >
        <div
          className={cn(
            'cursor-brand__hud',
            interactive && 'cursor-brand__hud--interactive'
          )}
        >
          <div className="cursor-brand__glow" />
          <div className="cursor-brand__orbit" />
          <div className="cursor-brand__brackets" aria-hidden>
            <span className="cursor-brand__bracket cursor-brand__bracket--tl" />
            <span className="cursor-brand__bracket cursor-brand__bracket--tr" />
            <span className="cursor-brand__bracket cursor-brand__bracket--bl" />
            <span className="cursor-brand__bracket cursor-brand__bracket--br" />
          </div>
          <div className="cursor-brand__ring" />
          <div className="cursor-brand__dot" />
        </div>
      </div>

      {clicks.map(({ x, y, id }) => (
        <div
          key={id}
          className="cursor-click-ripple fixed pointer-events-none"
          style={{
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)',
            zIndex: 999998,
          }}
          aria-hidden
        />
      ))}
    </>
  )
}

export default MovingCircle
