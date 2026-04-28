import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/utils'

const GRID_REM = 1.35

/**
 * High-tech ambient field: soft cyan grid that drifts and responds to pointer while
 * the cursor is over the hero bounds. Replaces the 3D globe for a lighter, agency-premium feel.
 *
 * @param {{ boundsRef: React.RefObject<HTMLElement | null> }} props
 */
export default function HeroParticleField({ boundsRef }) {
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const timeoutRef = useRef(null)
  const idleReturnRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const lastPointerRef = useRef(Date.now())

  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [staticCursor, setStaticCursor] = useState({ x: 0, y: 0 })
  const [isAutoMode, setIsAutoMode] = useState(true)
  const [isStaticAnimation, setIsStaticAnimation] = useState(false)
  const [rows, setRows] = useState(15)

  const reduceMotion = typeof window !== 'undefined' && prefersReducedMotion()
  const finePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => setRows(mq.matches ? 11 : 15)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const totalParticles = rows * rows

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return

    const container = containerRef.current
    container.replaceChildren()
    particlesRef.current = []

    for (let i = 0; i < totalParticles; i += 1) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full will-change-transform'
      const row = Math.floor(i / rows)
      const col = i % rows
      const centerRow = (rows - 1) / 2
      const centerCol = (rows - 1) / 2
      const distanceFromCenter = Math.hypot(row - centerRow, col - centerCol)

      const scale = Math.max(0.12, 1.05 - distanceFromCenter * 0.11)
      const opacity = Math.max(0.06, 0.92 - distanceFromCenter * 0.09)
      const lightness = Math.max(22, 62 - distanceFromCenter * 5.2)
      const glowSize = Math.max(0.35, 4.2 - distanceFromCenter * 0.42)
      const delayMs = Math.round(distanceFromCenter * 5)

      particle.style.cssText = [
        'width:0.32rem',
        'height:0.32rem',
        `left:${col * GRID_REM}rem`,
        `top:${row * GRID_REM}rem`,
        `transform:scale(${scale})`,
        `opacity:${opacity}`,
        `background:hsl(188, 82%, ${lightness}%)`,
        `box-shadow:0 0 ${(glowSize * 0.22).toFixed(2)}rem 0 hsl(186, 90%, 52%)`,
        'mix-blend-mode:screen',
        `z-index:${Math.max(1, Math.round(totalParticles - distanceFromCenter * 4))}`,
        `transition:transform ${120 + distanceFromCenter * 16}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        `transition-delay:${delayMs}ms`,
      ].join(';')

      container.appendChild(particle)
      particlesRef.current.push(particle)
    }
  }, [rows, totalParticles, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return undefined

    const animate = () => {
      const t = (Date.now() - startTimeRef.current) * 0.001

      if (isAutoMode) {
        const x = Math.sin(t * 0.28) * 120 + Math.sin(t * 0.15) * 56
        const y = Math.cos(t * 0.19) * 88 + Math.cos(t * 0.21) * 44
        setCursor({ x, y })
      } else if (isStaticAnimation) {
        const idle = Date.now() - lastPointerRef.current
        if (idle > 180) {
          const strength = Math.min((idle - 180) / 900, 1)
          const subtleX = Math.sin(t * 1.35) * 14 * strength
          const subtleY = Math.cos(t * 1.1) * 12 * strength
          setCursor({
            x: staticCursor.x + subtleX,
            y: staticCursor.y + subtleY,
          })
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isAutoMode, isStaticAnimation, reduceMotion, staticCursor.x, staticCursor.y])

  useEffect(() => {
    if (reduceMotion) return
    const particles = particlesRef.current
    if (!particles.length) return

    particles.forEach((particle, i) => {
      const row = Math.floor(i / rows)
      const col = i % rows
      const centerRow = (rows - 1) / 2
      const centerCol = (rows - 1) / 2
      const distanceFromCenter = Math.hypot(row - centerRow, col - centerCol)
      const originalScale = Math.max(0.12, 1.05 - distanceFromCenter * 0.11)
      const dampening = Math.max(0.28, 1 - distanceFromCenter * 0.075)
      const moveX = cursor.x * dampening
      const moveY = cursor.y * dampening
      particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`
    })
  }, [cursor, rows, reduceMotion])

  const handlePointerFromWindow = useCallback(
    (e) => {
      if (!finePointer || reduceMotion) return
      const root = boundsRef?.current
      if (!root) return
      const r = root.getBoundingClientRect()
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        return
      }

      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const next = {
        x: (e.clientX - cx) * 0.55,
        y: (e.clientY - cy) * 0.55,
      }
      setCursor(next)
      setStaticCursor(next)
      setIsAutoMode(false)
      setIsStaticAnimation(false)
      lastPointerRef.current = Date.now()

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        setIsStaticAnimation(true)
      }, 420)

      if (idleReturnRef.current) window.clearTimeout(idleReturnRef.current)
      idleReturnRef.current = window.setTimeout(() => {
        if (Date.now() - lastPointerRef.current >= 3800) {
          setIsAutoMode(true)
          setIsStaticAnimation(false)
          startTimeRef.current = Date.now()
        }
      }, 4000)
    },
    [boundsRef, finePointer, reduceMotion]
  )

  useEffect(() => {
    if (reduceMotion || !finePointer) return undefined
    window.addEventListener('pointermove', handlePointerFromWindow, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerFromWindow)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      if (idleReturnRef.current) window.clearTimeout(idleReturnRef.current)
    }
  }, [handlePointerFromWindow, reduceMotion, finePointer])

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,rgba(34,211,238,0.09)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(167,139,250,0.06)_0%,transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
    )
  }

  const sizeRem = rows * GRID_REM

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative opacity-[0.92]"
          style={{
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
            transform: 'translateY(-4%)',
          }}
        />
      </div>

      <div className="absolute inset-0">
        <div className="absolute -left-[10%] top-[12%] h-[min(42vw,420px)] w-[min(42vw,420px)] rounded-full bg-cyan-500/[0.045] blur-[100px]" />
        <div
          className="absolute -right-[8%] bottom-[18%] h-[min(48vw,480px)] w-[min(48vw,480px)] rounded-full bg-violet-500/[0.04] blur-[110px]"
          style={{ animationDelay: '1.2s' }}
        />
        <div className="absolute left-1/2 top-1/2 h-[min(120vh,900px)] w-[min(120vh,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04)_0%,transparent_62%)]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]/90" />
    </div>
  )
}
