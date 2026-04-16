import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './utils'

gsap.registerPlugin(ScrollTrigger)

const DEPTH_4 = [78, 60, 42, 14]
const DEPTH_2 = [48, 18]

/**
 * Scrubbed multi-layer parallax for any `[data-parallax-layers]` inside the Locomotive/Lenis scroller.
 * Uses `scroller: #main` — do not instantiate a second Lenis instance.
 * Optional per-node override: `data-parallax-y="24"` on `[data-parallax-layer]`.
 *
 * @param {HTMLElement} scrollerEl - Usually `document.querySelector('#main')`
 * @returns {() => void} cleanup
 */
export function mountParallaxLayerStacks(scrollerEl) {
  if (prefersReducedMotion() || !scrollerEl) return () => {}

  const ctx = gsap.context(() => {
    const stacks = scrollerEl.querySelectorAll('[data-parallax-layers]')

    stacks.forEach((triggerEl) => {
      const layerNodes = [...triggerEl.querySelectorAll('[data-parallax-layer]')]
      if (!layerNodes.length) return

      const ids = [
        ...new Set(layerNodes.map((n) => n.getAttribute('data-parallax-layer')).filter(Boolean)),
      ].sort((a, b) => Number(a) - Number(b))

      const defaults = ids.length >= 4 ? DEPTH_4 : DEPTH_2

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          scroller: scrollerEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.32,
          invalidateOnRefresh: true,
        },
      })

      ids.forEach((id, idx) => {
        const targets = triggerEl.querySelectorAll(`[data-parallax-layer="${id}"]`)
        if (!targets.length) return

        const first = triggerEl.querySelector(`[data-parallax-layer="${id}"]`)
        let yPercent = defaults[Math.min(idx, defaults.length - 1)]
        if (first?.dataset?.parallaxY != null && first.dataset.parallaxY !== '') {
          const parsed = Number.parseFloat(first.dataset.parallaxY)
          if (!Number.isNaN(parsed)) yPercent = parsed
        }

        tl.to(targets, { yPercent, ease: 'none' }, idx === 0 ? 0 : '<')
      })
    })

    ScrollTrigger.refresh()
  }, scrollerEl)

  const refreshSoon = () => {
    try {
      ScrollTrigger.refresh()
    } catch (e) {
      /* noop */
    }
  }
  requestAnimationFrame(refreshSoon)
  setTimeout(refreshSoon, 400)
  setTimeout(refreshSoon, 1400)

  return () => {
    ctx.revert()
  }
}
