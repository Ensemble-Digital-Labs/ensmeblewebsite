import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/utils'

function MovingCircle() {
  const ringRef = useRef(null)
  const [clicks, setClicks] = useState([])
  const [mounted, setMounted] = useState(false)

  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion() || !mounted) return

    const ring = ringRef.current
    if (!ring) return

    const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    targetRef.current = { x: initialX, y: initialY }
    currentRef.current = { x: initialX, y: initialY }
    ring.style.left = `${initialX}px`
    ring.style.top = `${initialY}px`

    const lerp = 0.18

    const onMove = (e) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }

    const tick = () => {
      const target = targetRef.current
      const current = currentRef.current
      current.x += (target.x - current.x) * lerp
      current.y += (target.y - current.y) * lerp
      ring.style.left = `${current.x}px`
      ring.style.top = `${current.y}px`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mounted])

  useEffect(() => {
    if (prefersReducedMotion() || !mounted) return

    const handleClick = (e) => {
      setClicks((prev) => [
        ...prev.slice(-4),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [mounted])

  useEffect(() => {
    if (clicks.length === 0) return
    const t = setTimeout(() => setClicks((prev) => prev.slice(1)), 600)
    return () => clearTimeout(t)
  }, [clicks])

  if (prefersReducedMotion() || !mounted) {
    return null
  }

  return (
    <>
      {/* Single bright border ring – cursor is the center */}
      <div
        ref={ringRef}
        className="cursor-ring fixed pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          zIndex: 999999,
        }}
        aria-hidden
      />

      {/* Click ripple animations */}
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
