import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../lib/utils'

const MOBILE_LABEL_MQ = '(max-width: 767px)'

/**
 * PopArt plus CTA — script label reveals downward below the orb (no layout shift).
 */
export default function HomePopArtCircleCta({ to, label, hoverLabel }) {
  const linkRef = useRef(null)
  const labelRef = useRef(null)
  const animRef = useRef(null)
  const mobileLabelStaticRef = useRef(false)
  const displayLabel = hoverLabel ?? label.replace(/^Read\s+/i, '')

  const showMobileLabel = useCallback(() => {
    const link = linkRef.current
    const labelEl = labelRef.current
    if (!link || !labelEl) return

    mobileLabelStaticRef.current = true
    link.classList.add('is-label-visible', 'is-mobile-label-static')
    animRef.current?.kill()
    gsap.set(labelEl, { y: 0, opacity: 1 })
  }, [])

  const hideMobileLabel = useCallback(() => {
    const link = linkRef.current
    const labelEl = labelRef.current
    if (!link || !labelEl) return

    mobileLabelStaticRef.current = false
    link.classList.remove('is-label-visible', 'is-mobile-label-static')
    animRef.current?.kill()
    gsap.set(labelEl, { y: -5, opacity: 0 })
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mq = window.matchMedia(MOBILE_LABEL_MQ)
    const sync = () => {
      if (mq.matches) showMobileLabel()
      else hideMobileLabel()
    }

    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [hideMobileLabel, showMobileLabel])

  const animateIn = useCallback(() => {
    if (mobileLabelStaticRef.current) return

    const link = linkRef.current
    const labelEl = labelRef.current
    if (!link || !labelEl) return

    animRef.current?.kill()
    link.classList.add('is-label-visible')

    if (prefersReducedMotion()) {
      gsap.set(labelEl, { y: 0, opacity: 1 })
      return
    }

    gsap.set(labelEl, { y: -5, opacity: 0 })
    animRef.current = gsap.to(labelEl, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const animateOut = useCallback(() => {
    if (mobileLabelStaticRef.current) return

    const link = linkRef.current
    const labelEl = labelRef.current
    if (!link || !labelEl) return

    animRef.current?.kill()
    link.classList.remove('is-label-visible')

    if (prefersReducedMotion()) {
      gsap.set(labelEl, { y: 0, opacity: 0 })
      return
    }

    animRef.current = gsap.to(labelEl, {
      y: 5,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
  }, [])

  return (
    <Link
      ref={linkRef}
      to={to}
      className="home-popart-circle-cta group"
      aria-label={label}
      title={label}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
      onFocus={animateIn}
      onBlur={animateOut}
    >
      <span className="home-popart-circle-cta__orb inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
        <Plus
          className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90"
          strokeWidth={2.5}
          aria-hidden
        />
      </span>
      <span className="home-popart-circle-cta__label" aria-hidden>
        <span ref={labelRef} className="home-popart-circle-cta__label-text">
          {displayLabel}
        </span>
      </span>
    </Link>
  )
}
