import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

/** Circle r=46 in 100×100 viewBox — path starts at 12 o'clock (no SVG rotate needed). */
export const RING_PROGRESS_PATH = 'M 50 4 A 46 46 0 1 1 49.999 4'

export function measureRingLength(el) {
  if (!el?.getTotalLength) return 2 * Math.PI * 46
  const len = el.getTotalLength()
  return len > 0 ? len : 2 * Math.PI * 46
}

/** Grow stroke from path start (12 o'clock) — avoids the “sliding arc” offset effect. */
export function setRingDrawProgress(el, progress, length) {
  if (!el || !length) return
  const p = Math.min(1, Math.max(0, progress))
  const visible = length * p
  el.setAttribute('stroke-dasharray', `${visible} ${length}`)
  el.setAttribute('stroke-dashoffset', '0')
}

export function initRingHidden(el) {
  const length = measureRingLength(el)
  setRingDrawProgress(el, 0, length)
  return length
}

export function parseDnaCountStat(raw) {
  const value = String(raw ?? '').trim()
  const match = value.match(/^([\d.]+)(.*)$/)
  if (!match) return null
  const target = parseFloat(match[1])
  return {
    target,
    suffix: match[2] ?? '',
    isInteger: target % 1 === 0,
  }
}

/**
 * DNA Capital–style count-up with ring stroke drawn in sync (GSAP + ScrollTrigger on home).
 */
export function useDnaStyleCountUp(value, suffix = '', options = {}) {
  const {
    rootId = 'main',
    threshold = 0.15,
    duration = 1800,
    onIntersect,
    syncWithHomeScroll = false,
    scrollStart = 'top 85%',
    staggerDelay = 0,
    ringProgressRef,
  } = options
  const valueRef = useRef(null)
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const el = valueRef.current
    const container = containerRef.current
    if (!el || !container) return undefined

    const parsed =
      typeof value === 'number'
        ? { target: value, suffix, isInteger: value % 1 === 0 }
        : parseDnaCountStat(value)

    if (!parsed) {
      el.textContent = String(value ?? '')
      return undefined
    }

    const displaySuffix = typeof value === 'number' ? suffix : parsed.suffix

    const resolveRingEl = () =>
      ringProgressRef?.current ?? container.querySelector('.dna-style-stat-ring__progress')

    if (prefersReducedMotion()) {
      el.textContent = `${parsed.target}${displaySuffix}`
      const ring = resolveRingEl()
      const length = measureRingLength(ring)
      setRingDrawProgress(ring, 1, length)
      setIsActive(true)
      onIntersect?.()
      return undefined
    }

    let scrollTrigger = null
    let observer = null
    let cancelled = false
    let ringWaitFrames = 0
    let tweenCtx = null

    const playAnimation = () => {
      if (cancelled) return

      const ring = resolveRingEl()
      if (!ring) {
        if (ringWaitFrames < 120) {
          ringWaitFrames += 1
          requestAnimationFrame(playAnimation)
        }
        return
      }

      onIntersect?.()
      setIsActive(true)

      const length = initRingHidden(ring)
      el.textContent = `0${displaySuffix}`

      const animState = { progress: 0, val: 0 }
      tweenCtx?.kill()
      tweenCtx = gsap.timeline({ delay: staggerDelay / 1000 })

      tweenCtx.to(animState, {
        progress: 1,
        val: parsed.target,
        duration: duration / 1000,
        ease: 'power2.out',
        onUpdate: () => {
          const n = parsed.isInteger ? Math.round(animState.val) : animState.val.toFixed(1)
          el.textContent = `${n}${displaySuffix}`
          setRingDrawProgress(ring, animState.progress, length)
        },
        onComplete: () => {
          setRingDrawProgress(ring, 1, length)
          el.textContent = `${parsed.target}${displaySuffix}`
        },
      })
    }

    const bind = () => {
      if (cancelled) return undefined

      const root = document.getElementById(rootId)
      const ring = resolveRingEl()
      if (ring) {
        initRingHidden(ring)
        el.textContent = `0${displaySuffix}`
      }

      if (syncWithHomeScroll) {
        const main = root
        const triggerEl = container.closest('#home-proof') ?? container.closest('.home-proof-split') ?? container
        if (!main) return undefined

        scrollTrigger = ScrollTrigger.create({
          trigger: triggerEl,
          scroller: main,
          start: scrollStart,
          once: true,
          onEnter: playAnimation,
        })

        ScrollTrigger.refresh()

        return () => {
          scrollTrigger?.kill()
        }
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return
          observer?.disconnect()
          playAnimation()
        },
        { root, threshold },
      )

      observer.observe(container)

      return () => {
        observer?.disconnect()
      }
    }

    let detach = () => {}

    const attach = () => {
      detach = bind() ?? (() => {})
    }

    if (syncWithHomeScroll) {
      const onScrollReady = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(attach)
        })
      }

      window.addEventListener('ensemble:scroll-ready', onScrollReady, { once: true })
      const failsafe = window.setTimeout(onScrollReady, 2500)

      return () => {
        cancelled = true
        window.removeEventListener('ensemble:scroll-ready', onScrollReady)
        window.clearTimeout(failsafe)
        detach()
        tweenCtx?.kill()
      }
    }

    attach()

    return () => {
      cancelled = true
      detach()
      tweenCtx?.kill()
    }
  }, [
    value,
    suffix,
    rootId,
    threshold,
    duration,
    onIntersect,
    syncWithHomeScroll,
    scrollStart,
    staggerDelay,
    ringProgressRef,
  ])

  return { valueRef, containerRef, isActive }
}
