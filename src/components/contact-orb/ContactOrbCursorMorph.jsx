import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ANIMATION_MOBILE_MAX_WIDTH_PX } from '../../lib/animationProfile'
import { prefersReducedMotion } from '../../lib/utils'

const FOLLOW_LAMBDA = 20
const EXIT_MS = 280
const TRIGGER_SELECTOR = '.ensemble-contact-orb__trigger'
const LABEL_GAP_PX = 14
const LABEL_TEXT = 'Get in touch'

const LABEL_CHARS = LABEL_TEXT.split('').map((char, index) => ({
  id: `contact-label-char-${index}`,
  char: char === ' ' ? '\u00a0' : char,
  isSpace: char === ' ',
}))

function shouldUseContactCursor() {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  try {
    if (window.matchMedia('(pointer: coarse)').matches) return false
    if (window.matchMedia('(hover: none)').matches) return false
    if (window.matchMedia(`(max-width: ${ANIMATION_MOBILE_MAX_WIDTH_PX}px)`).matches) return false
  } catch {
    return false
  }
  return true
}

function getTriggerRect() {
  const trigger = document.querySelector(TRIGGER_SELECTOR)
  return trigger?.getBoundingClientRect() ?? null
}

function computeLabelTarget(clientX, clientY) {
  const rect = getTriggerRect()
  if (!rect) {
    return { x: clientX, y: clientY }
  }

  return {
    x: Math.min(clientX, rect.left - LABEL_GAP_PX),
    y: rect.top + rect.height / 2,
  }
}

/**
 * Desktop-only hover label left of contact FAB — brush script char reveal RTL.
 */
export default function ContactOrbCursorMorph({ disabled = false }) {
  const rootRef = useRef(null)
  const animRef = useRef(null)
  const hasEnteredRef = useRef(false)
  const [enabled, setEnabled] = useState(shouldUseContactCursor)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)

  const pointerRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const lastTsRef = useRef(0)
  const followActiveRef = useRef(false)
  const exitTimerRef = useRef(0)
  const hoveringRef = useRef(false)
  const frozenAnchorRef = useRef(null)

  useEffect(() => {
    const update = () => setEnabled(shouldUseContactCursor())
    update()

    const mqCoarse = window.matchMedia('(pointer: coarse)')
    const mqHover = window.matchMedia('(hover: none)')
    const mqNarrow = window.matchMedia(`(max-width: ${ANIMATION_MOBILE_MAX_WIDTH_PX}px)`)
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    mqCoarse.addEventListener('change', update)
    mqHover.addEventListener('change', update)
    mqNarrow.addEventListener('change', update)
    mqReduce.addEventListener('change', update)

    return () => {
      mqCoarse.removeEventListener('change', update)
      mqHover.removeEventListener('change', update)
      mqNarrow.removeEventListener('change', update)
      mqReduce.removeEventListener('change', update)
    }
  }, [])

  useLayoutEffect(() => {
    if (!mounted || !active || !rootRef.current) return undefined

    const root = rootRef.current
    const chars = root.querySelectorAll('[data-contact-label-char]')
    if (!chars.length) return undefined

    animRef.current?.kill()
    hasEnteredRef.current = true

    const instant = prefersReducedMotion()

    gsap.set(root, { opacity: 1 })
    gsap.set(chars, { xPercent: 72, opacity: 0 })

    if (instant) {
      gsap.set(chars, { xPercent: 0, opacity: 1 })
      return undefined
    }

    animRef.current = gsap.timeline().to(chars, {
      xPercent: 0,
      opacity: 1,
      duration: 0.18,
      stagger: { each: 0.011, from: 'end' },
      ease: 'power2.out',
    })

    return () => {
      animRef.current?.kill()
    }
  }, [mounted, active])

  useLayoutEffect(() => {
    if (!mounted || active || !rootRef.current || !hasEnteredRef.current) return undefined

    const root = rootRef.current
    const chars = root.querySelectorAll('[data-contact-label-char]')
    if (!chars.length) return undefined

    animRef.current?.kill()

    const instant = prefersReducedMotion()

    if (instant) {
      gsap.set(chars, { clearProps: 'all', opacity: 0 })
      gsap.set(root, { opacity: 0 })
      return undefined
    }

    animRef.current = gsap
      .timeline()
      .to(chars, {
        xPercent: 72,
        opacity: 0,
        duration: 0.12,
        stagger: { each: 0.009, from: 'start' },
        ease: 'sine.in',
      })
      .to(
        root,
        {
          opacity: 0,
          duration: 0.08,
        },
        '-=0.06',
      )

    return () => {
      animRef.current?.kill()
    }
  }, [mounted, active])

  useEffect(() => {
    if (!enabled || disabled) return undefined

    const stopFollow = () => {
      followActiveRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const startFollow = () => {
      if (followActiveRef.current) return
      followActiveRef.current = true
      lastTsRef.current = performance.now()

      const tick = (ts) => {
        if (!followActiveRef.current) {
          rafRef.current = 0
          return
        }

        const el = rootRef.current
        const cur = currentRef.current
        const tgt = targetRef.current

        if (el) {
          const dtSec = Math.min(0.05, Math.max(1e-6, (ts - lastTsRef.current) / 1000))
          lastTsRef.current = ts
          const alpha = 1 - Math.exp(-FOLLOW_LAMBDA * dtSec)
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

    const freezeLabelAnchor = () => {
      const frozen = frozenAnchorRef.current ?? { ...targetRef.current }
      frozenAnchorRef.current = frozen
      targetRef.current = frozen
      currentRef.current = frozen

      const el = rootRef.current
      if (el) {
        el.style.left = `${frozen.x}px`
        el.style.top = `${frozen.y}px`
      }
    }

    const setHovering = (next) => {
      if (hoveringRef.current === next) return
      hoveringRef.current = next

      window.clearTimeout(exitTimerRef.current)

      if (next) {
        frozenAnchorRef.current = null
        const { x, y } = pointerRef.current
        targetRef.current = computeLabelTarget(x, y)
        setMounted(true)
        setActive(true)
        startFollow()
        return
      }

      freezeLabelAnchor()
      stopFollow()
      setActive(false)
      exitTimerRef.current = window.setTimeout(() => {
        hasEnteredRef.current = false
        frozenAnchorRef.current = null
        setMounted(false)
      }, EXIT_MS)
    }

    const onMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY }

      if (hoveringRef.current) {
        targetRef.current = computeLabelTarget(e.clientX, e.clientY)
      }

      const navOpen = document.documentElement.classList.contains('ensemble-nav-overlay')
      const hit = document.elementFromPoint(e.clientX, e.clientY)
      const onTrigger = Boolean(hit?.closest?.(TRIGGER_SELECTOR))
      const orbOpen = Boolean(document.querySelector('.ensemble-contact-orb[data-open]'))

      setHovering(onTrigger && !navOpen && !orbOpen)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.clearTimeout(exitTimerRef.current)
      hoveringRef.current = false
      hasEnteredRef.current = false
      frozenAnchorRef.current = null
      animRef.current?.kill()
      setMounted(false)
      setActive(false)
      stopFollow()
    }
  }, [enabled, disabled])

  useLayoutEffect(() => {
    if (!mounted || !rootRef.current) return
    const { x, y } = pointerRef.current
    const start = computeLabelTarget(x, y)
    currentRef.current = { ...start }
    rootRef.current.style.left = `${start.x}px`
    rootRef.current.style.top = `${start.y}px`
  }, [mounted])

  if (!enabled || disabled || !mounted) {
    return null
  }

  return (
    <div
      ref={rootRef}
      className={`contact-hover-label${active ? ' is-visible' : ''}`}
      aria-hidden
    >
      <p className="contact-hover-label__copy">
        <span className="contact-hover-label__line">
          {LABEL_CHARS.map(({ id, char, isSpace }) => (
            <span
              key={id}
              className={`contact-hover-label__char-wrap${isSpace ? ' contact-hover-label__char-wrap--space' : ''}`}
            >
              <span className="contact-hover-label__char" data-contact-label-char>
                {char}
              </span>
            </span>
          ))}
        </span>
      </p>
    </div>
  )
}
