import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const {
    delay = 0,
    duration = 1,
    y = 50,
    opacity = 0,
    ease = 'power3.out',
    trigger = null,
    start = 'top 80%',
    once = true,
  } = options

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const element = ref.current
    const triggerElement = trigger || element

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          y,
          opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: triggerElement,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
            markers: false,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [delay, duration, y, opacity, ease, trigger, start, once])

  return ref
}
