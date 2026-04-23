import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function pinScrollEnd(scroller) {
  const h = scroller.clientHeight || window.innerHeight || 720
  return `+=${Math.round(h)}`
}

/**
 * Cinematic takeover like `CinematicFooter`: one viewport of scroll is **reserved** while the
 * section is **pinned**, and a scrubbed timeline rises/fades layers in (same mental model as
 * the footer’s fixed slot + scrub, but works mid-page).
 *
 * Markup (inside `trigger`):
 * - Optional `[data-cinematic-reveal="lead"]`
 * - Any `[data-cinematic-reveal="block"]` in DOM order (stagger)
 */
export function setupCinematicSectionReveal(trigger, scroller) {
  if (!trigger || !scroller) return () => {}

  const lead = trigger.querySelector('[data-cinematic-reveal="lead"]')
  const blocks = trigger.querySelectorAll('[data-cinematic-reveal="block"]')

  if (!lead && blocks.length === 0) return () => {}

  if (prefersReducedMotion()) {
    if (lead) gsap.set(lead, { y: 0, scale: 1, opacity: 1, clearProps: 'all' })
    if (blocks.length) gsap.set(blocks, { y: 0, opacity: 1, clearProps: 'all' })
    return () => {}
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger,
        scroller,
        start: 'top top',
        end: () => pinScrollEnd(scroller),
        pin: true,
        pinSpacing: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    if (lead) {
      tl.fromTo(
        lead,
        { y: '8vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.42 },
        0
      )
    }

    if (blocks.length) {
      // Use `opacity` (not `autoAlpha`) so GSAP never sets `visibility:hidden` on wrappers that
      // contain hover-driven children (e.g. `.part` + `.reveal-image` on Page4).
      tl.fromTo(
        blocks,
        { y: 52, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.52,
          stagger: { each: 0.07 },
        },
        lead ? 0.12 : 0
      )
    }
  }, trigger)

  const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
  const t = setTimeout(() => ScrollTrigger.refresh(), 400)

  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(t)
    ctx.revert()
  }
}

export function useCinematicSectionReveal(sectionRef) {
  useEffect(() => {
    const el = sectionRef?.current
    const main = document.querySelector('#main')
    if (!el || !main) return undefined

    let teardown = () => {}
    let cancelled = false

    const timer = window.setTimeout(() => {
      if (cancelled) return
      teardown = setupCinematicSectionReveal(el, main)
      const lenis =
        window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
      if (lenis?.resize) {
        try {
          lenis.resize()
        } catch (e) {
          /* noop */
        }
      }
      try {
        ScrollTrigger.refresh()
      } catch (e) {
        /* noop */
      }
    }, 200)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      teardown()
    }
  }, [sectionRef])
}
