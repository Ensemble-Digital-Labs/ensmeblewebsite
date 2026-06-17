import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { debounce, prefersReducedMotion } from './utils'
import { isMobileAnimationVariant } from './animationProfile'

gsap.registerPlugin(ScrollTrigger)

const DEPTH_4 = [78, 60, 42, 14]
const DEPTH_2 = [48, 18]

/**
 * Scale parallax strength by viewport — large `yPercent` values read as excessive
 * on narrow / short screens where layer heights differ and overflow clips more.
 */
function getIntensityFromConditions(conditions) {
  if (conditions.xs) return 0.38
  if (conditions.smMd) return 0.62
  if (conditions.lg) return 1
  return 1
}

/** Slightly softer scrub on very small widths reduces jitter with touch / short viewports */
function getScrubFromConditions(conditions) {
  if (conditions.xs) return 0.42
  return 0.32
}

function createLayerStacks(scrollerEl, intensity, scrub) {
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
        scrub,
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

      yPercent *= intensity

      tl.to(targets, { yPercent, ease: 'none' }, idx === 0 ? 0 : '<')
    })
  })

  ScrollTrigger.refresh()
}

/**
 * Scrubbed multi-layer parallax for any `[data-parallax-layers]` inside the Locomotive/Lenis scroller.
 * Uses `scroller: #main` — do not instantiate a second Lenis instance.
 * Optional per-node override: `data-parallax-y="24"` on `[data-parallax-layer]`.
 *
 * Responsive: `gsap.matchMedia` rebuilds tweens with scaled motion; resize debounces `ScrollTrigger.refresh`.
 *
 * @param {HTMLElement} scrollerEl - Usually `document.querySelector('#main')`
 * @returns {() => void} cleanup
 */
export function mountParallaxLayerStacks(scrollerEl) {
  if (prefersReducedMotion() || !scrollerEl) return () => {}

  let mm = gsap.matchMedia()

  mm.add(
    {
      xs: '(max-width: 479px)',
      smMd: '(min-width: 480px) and (max-width: 1023px)',
      lg: '(min-width: 1024px)',
    },
    (context) => {
      const intensity = getIntensityFromConditions(context.conditions)
      const scrub = getScrubFromConditions(context.conditions)
      const ctx = gsap.context(() => {
        createLayerStacks(scrollerEl, intensity, scrub)
      }, scrollerEl)

      return () => ctx.revert()
    }
  )

  const refreshScroll = debounce(() => {
    try {
      ScrollTrigger.refresh()
    } catch (e) {
      /* noop */
    }
  }, 180)

  window.addEventListener('resize', refreshScroll)
  window.addEventListener('orientationchange', refreshScroll)

  requestAnimationFrame(refreshScroll)
  if (!isMobileAnimationVariant()) {
    setTimeout(refreshScroll, 400)
    setTimeout(refreshScroll, 1400)
  }

  return () => {
    window.removeEventListener('resize', refreshScroll)
    window.removeEventListener('orientationchange', refreshScroll)
    mm.revert()
  }
}
