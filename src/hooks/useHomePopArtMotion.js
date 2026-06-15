import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  revealPopArtSectionSequence,
  revealPopArtSectionsInView,
} from '../lib/popArtBigLetterReveal'
import { prefersReducedMotion } from '../lib/utils'
import { HOME_MOTION } from '../lib/homeMotionTokens'

gsap.registerPlugin(ScrollTrigger)

function shouldSkipPopArtMotion() {
  if (typeof document === 'undefined') return prefersReducedMotion()
  return prefersReducedMotion() || document.documentElement.classList.contains('reduced-motion')
}

function scrollerOpts(main, trigger, extra = {}) {
  return {
    trigger,
    scroller: main,
    ...extra,
  }
}

/** Resting tilt for PopArt collage layers (degrees). */
const POPART_LAYER_ANGLES = {
  main: -1.75,
  top: -5,
  bottom: 4.5,
}

/** Scroll travel (y px) — start lower, end higher as user scrolls through section (PopArt parallax). */
function popArtLayerTravel(desktop) {
  if (desktop) {
    return {
      main: { yStart: 72, yEnd: -64 },
      top: { yStart: 96, yEnd: -96, xEnd: 14 },
      bottom: { yStart: 112, yEnd: -120 },
    }
  }
  return {
    main: { yStart: 40, yEnd: -36 },
    top: { yStart: 52, yEnd: -56 },
    bottom: { yStart: 60, yEnd: -68 },
  }
}

/**
 * PopArt web-design pattern — layers float upward tied to scroll progress (scrub), not a load tween.
 * @see popwebdesign.net `.has-parallax` + ScrollMagic offset tweens
 */
function bindPopArtStackParallax(main, section, { mainLayer, topLayer, bottomLayer }) {
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  const travel = popArtLayerTravel(desktop)
  const scrub = HOME_MOTION.popArtScrollScrub ?? 1.15

  const baseTrigger = scrollerOpts(main, section, {
    start: 'top bottom',
    end: 'bottom top',
    scrub,
    invalidateOnRefresh: true,
  })

  if (mainLayer) {
    gsap.fromTo(
      mainLayer,
      { y: travel.main.yStart, rotation: POPART_LAYER_ANGLES.main },
      { y: travel.main.yEnd, ease: 'none', force3D: true, scrollTrigger: { ...baseTrigger } },
    )
  }

  if (topLayer) {
    gsap.fromTo(
      topLayer,
      { y: travel.top.yStart, x: 0, rotation: POPART_LAYER_ANGLES.top },
      {
        y: travel.top.yEnd,
        x: travel.top.xEnd ?? 0,
        ease: 'none',
        force3D: true,
        scrollTrigger: { ...baseTrigger },
      },
    )
  }

  if (bottomLayer) {
    gsap.fromTo(
      bottomLayer,
      { y: travel.bottom.yStart, rotation: POPART_LAYER_ANGLES.bottom },
      { y: travel.bottom.yEnd, ease: 'none', force3D: true, scrollTrigger: { ...baseTrigger } },
    )
  }
}

/** PopArt-style section motion — scroll parallax visuals + letter/copy on enter. */
export function setupHomePopArtMotion(root, main) {
  if (!root || !main) return

  if (shouldSkipPopArtMotion()) {
    root.querySelectorAll('[data-home-popart-section]').forEach((section) => {
      section.classList.add('is-popart-ready')
      section.querySelector('.home-popart-section__cta')?.classList.remove('home-popart-cta--pending')
      revealPopArtSectionSequence(section)
    })
    return
  }

  root.querySelectorAll('[data-home-popart-section]').forEach((section) => {
    const stack = section.querySelector('.home-popart-visual-stack')
    const gridLines = section.querySelector('.home-popart-section__grid-lines')
    const copy = section.querySelector('.home-popart-section__copy')
    const ctaWrap = section.querySelector('.home-popart-section__cta')
    const orchestrated = Boolean(stack)

    if (orchestrated) {
      section.dataset.popartOrchestrated = '1'
    }

    if (ctaWrap) {
      ctaWrap.classList.add('home-popart-cta--pending')
    }

    if (gridLines) {
      gsap.fromTo(
        gridLines,
        { autoAlpha: 0, scaleX: 0.92 },
        {
          autoAlpha: 0.65,
          scaleX: 1,
          duration: HOME_MOTION.revealDuration,
          ease: HOME_MOTION.ease,
          scrollTrigger: scrollerOpts(main, section, {
            start: 'top 88%',
            toggleActions: 'play none none none',
          }),
        },
      )
    }

    const beginCopySequence = () => {
      if (section.dataset.popartRevealed === '1') return
      section.classList.add('is-popart-ready')
      revealPopArtSectionSequence(section)
    }

    if (stack) {
      const mainLayer = stack.querySelector('[data-home-popart-layer="main"]')
      const topLayer = stack.querySelector('[data-home-popart-layer="top"]')
      const bottomLayer = stack.querySelector('[data-home-popart-layer="bottom"]')

      ;[mainLayer, topLayer, bottomLayer].filter(Boolean).forEach((layer) => {
        const key = layer.getAttribute('data-home-popart-layer')
        gsap.set(layer, {
          autoAlpha: 1,
          rotation: POPART_LAYER_ANGLES[key] ?? 0,
          clearProps: 'clipPath',
        })
      })

      stack.classList.add('is-scroll-parallax')
      section.classList.add('is-popart-ready')

      bindPopArtStackParallax(main, section, { mainLayer, topLayer, bottomLayer })

      ScrollTrigger.create(
        scrollerOpts(main, section, {
          start: 'top 82%',
          once: true,
          invalidateOnRefresh: true,
          onEnter: beginCopySequence,
        }),
      )
    } else {
      const monogram = section.querySelector('.popart-bigletter--animate')
      if (monogram || copy) {
        ScrollTrigger.create(
          scrollerOpts(main, section, {
            start: 'top 85%',
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              section.classList.add('is-popart-ready')
              beginCopySequence()
            },
          }),
        )
      }
    }

    if (ctaWrap) {
      const cta = ctaWrap.querySelector('.home-popart-circle-cta')
      if (cta) {
        gsap.to(cta, {
          y: -6,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }
  })

  revealPopArtSectionsInView(root, main)
  ScrollTrigger.refresh()
}

/** If copy never revealed, unstick orchestrated stacks (layers stay visible — parallax only). */
export function finishPopArtStacksFailsafe(root) {
  if (!root || shouldSkipPopArtMotion()) return

  root.querySelectorAll('[data-home-popart-section][data-popart-orchestrated="1"]').forEach((section) => {
    if (section.dataset.popartRevealed === '1') return
    section.classList.add('is-popart-ready')
    revealPopArtSectionSequence(section)
  })
}
