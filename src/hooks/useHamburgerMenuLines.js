import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/utils'

const HAMBURGER = {
  line1: { y: -10, rotation: 0, scaleX: 1, opacity: 1 },
  line2: { y: 0, rotation: 0, scaleX: 1, opacity: 1 },
  line3: { y: 10, rotation: 0, scaleX: 1, opacity: 1 },
}

const CLOSE_X = {
  line1: { y: 0, rotation: 45, scaleX: 1, opacity: 1 },
  line2: { y: 0, rotation: 0, scaleX: 1, opacity: 0 },
  line3: { y: 0, rotation: -45, scaleX: 1, opacity: 1 },
}

function startIdleBreathe(l1, l2, l3) {
  return gsap
    .timeline({ repeat: -1, repeatDelay: 0.5 })
    .to(l1, { y: -14, duration: 0.44, ease: 'power2.out' }, 0)
    .to(l3, { y: 14, duration: 0.44, ease: 'power2.out' }, 0)
    .to(l2, { scaleX: 0.7, opacity: 0.55, duration: 0.4, ease: 'power2.out' }, 0.06)
    .to(l1, { y: -11, duration: 0.3, ease: 'sine.inOut' })
    .to(l3, { y: 11, duration: 0.3, ease: 'sine.inOut' }, '<')
    .to(l1, { y: -10, duration: 0.5, ease: 'power2.inOut' })
    .to(l3, { y: 10, duration: 0.5, ease: 'power2.inOut' }, '<')
    .to(l2, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.inOut' }, '<')
}

function beginIdle(l1, l2, l3, idleTweenRef) {
  if (prefersReducedMotion()) return
  idleTweenRef.current?.kill()
  idleTweenRef.current = startIdleBreathe(l1, l2, l3)
}

/** GSAP-only hamburger ↔ X morph + idle breathe (avoids CSS/GSAP transform conflicts). */
export function useHamburgerMenuLines(line1Ref, line2Ref, line3Ref, isOpen) {
  const idleTweenRef = useRef(null)
  const morphTweenRef = useRef(null)
  const hasBeenOpenRef = useRef(false)

  useEffect(() => {
    const l1 = line1Ref.current
    const l2 = line2Ref.current
    const l3 = line3Ref.current
    if (!l1 || !l2 || !l3) return undefined

    const killAll = () => {
      idleTweenRef.current?.kill()
      morphTweenRef.current?.kill()
      idleTweenRef.current = null
      morphTweenRef.current = null
    }

    killAll()
    gsap.set([l1, l2, l3], { transformOrigin: '50% 50%', xPercent: 0 })

    const instant = prefersReducedMotion()
    const duration = instant ? 0.01 : 0.42

    if (isOpen) {
      hasBeenOpenRef.current = true
      morphTweenRef.current = gsap
        .timeline()
        .to(l1, { ...CLOSE_X.line1, duration, ease: 'power3.out' }, 0)
        .to(l2, { ...CLOSE_X.line2, duration: duration * 0.6 }, 0)
        .to(l3, { ...CLOSE_X.line3, duration, ease: 'power3.out' }, 0)
      return killAll
    }

    if (!hasBeenOpenRef.current) {
      gsap.set(l1, HAMBURGER.line1)
      gsap.set(l2, HAMBURGER.line2)
      gsap.set(l3, HAMBURGER.line3)
      beginIdle(l1, l2, l3, idleTweenRef)
      return killAll
    }

    morphTweenRef.current = gsap.timeline({
      onComplete: () => beginIdle(l1, l2, l3, idleTweenRef),
    })

    morphTweenRef.current
      .to(l1, { ...HAMBURGER.line1, duration, ease: 'power3.out' }, 0)
      .to(l2, { ...HAMBURGER.line2, duration, ease: 'power3.out' }, 0.06)
      .to(l3, { ...HAMBURGER.line3, duration, ease: 'power3.out' }, 0)

    return killAll
  }, [isOpen, line1Ref, line2Ref, line3Ref])
}
