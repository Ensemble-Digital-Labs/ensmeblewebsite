import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Hand, Mail, PenLine } from 'lucide-react'
import { cn } from '../../lib/utils'
import { prefersReducedMotion } from '../../lib/utils'

const STROKE = 1.65

export function useWaveAnimation(targetRef, isActive, transformOrigin = '50% 85%') {
  const tweenRef = useRef(null)

  useEffect(() => {
    tweenRef.current?.kill()
    tweenRef.current = null

    const el = targetRef.current
    if (!el) return undefined

    if (!isActive || prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'transform' })
      return undefined
    }

    gsap.set(el, { rotation: 0, transformOrigin })

    tweenRef.current = gsap
      .timeline({ repeat: -1, repeatDelay: 0.12 })
      .to(el, { rotation: 16, duration: 0.36, ease: 'sine.out' })
      .to(el, { rotation: -12, duration: 0.34, ease: 'sine.inOut' })
      .to(el, { rotation: 10, duration: 0.3, ease: 'sine.inOut' })
      .to(el, { rotation: -8, duration: 0.28, ease: 'sine.inOut' })
      .to(el, { rotation: 5, duration: 0.24, ease: 'sine.inOut' })
      .to(el, { rotation: 0, duration: 0.32, ease: 'sine.in' })

    return () => {
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [isActive, transformOrigin])
}

function OrbAnimatedLucideIcon({ Icon, isActive, className, transformOrigin }) {
  const waveRef = useRef(null)
  useWaveAnimation(waveRef, isActive, transformOrigin)

  return (
    <span
      className={cn('ensemble-contact-orb__trigger-icon', isActive && 'is-active', className)}
      aria-hidden
    >
      <Icon
        ref={waveRef}
        className="ensemble-contact-orb__trigger-icon-svg"
        strokeWidth={STROKE}
      />
    </span>
  )
}

export function OrbAnimatedHand(props) {
  return <OrbAnimatedLucideIcon Icon={Hand} transformOrigin="62% 82%" {...props} />
}

export function OrbAnimatedPen(props) {
  return <OrbAnimatedLucideIcon Icon={PenLine} transformOrigin="50% 88%" {...props} />
}

export function OrbAnimatedMail(props) {
  return <OrbAnimatedLucideIcon Icon={Mail} transformOrigin="50% 80%" {...props} />
}
