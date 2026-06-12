import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  revealPopArtSectionSequence,
  revealPopArtSectionsInView,
} from '../lib/popArtBigLetterReveal'
import { prefersReducedMotion } from '../lib/utils'

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

/** PopArt-style section motion — layered parallax, collage entrance, grid fade. */
export function setupHomePopArtMotion(root, main) {
  if (!root || !main) return

  if (shouldSkipPopArtMotion()) {
    root.querySelectorAll('[data-home-popart-section]').forEach((section) => {
      section.classList.add('is-popart-ready')
      revealPopArtSectionSequence(section)
    })
    return
  }

  const desktopParallax = window.matchMedia('(min-width: 1024px)').matches

  root.querySelectorAll('[data-home-popart-section]').forEach((section) => {
    const monogram = section.querySelector('.popart-bigletter--animate')
    if (monogram) {
      ScrollTrigger.create(
        scrollerOpts(main, section, {
          start: 'top 90%',
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => revealPopArtSectionSequence(section),
        }),
      )
    }

    const stack = section.querySelector('.home-popart-visual-stack')
    const gridLines = section.querySelector('.home-popart-section__grid-lines')
    const copy = section.querySelector('.home-popart-section__copy')
    const ctaWrap = section.querySelector('.home-popart-circle-cta')?.parentElement

    if (gridLines) {
      gsap.fromTo(
        gridLines,
        { autoAlpha: 0, scaleX: 0.92 },
        {
          autoAlpha: 0.65,
          scaleX: 1,
          duration: 1.15,
          ease: 'power2.out',
          scrollTrigger: scrollerOpts(main, section, {
            start: 'top 78%',
            toggleActions: 'play none none none',
          }),
        },
      )
    }

    if (stack) {
      const mainLayer = stack.querySelector('[data-home-popart-layer="main"]')
      const topLayer = stack.querySelector('[data-home-popart-layer="top"]')
      const bottomLayer = stack.querySelector('[data-home-popart-layer="bottom"]')

      ;[mainLayer, topLayer, bottomLayer].filter(Boolean).forEach((layer) => {
        gsap.set(layer, { autoAlpha: 0 })
      })

      const entrance = gsap.timeline({
        scrollTrigger: scrollerOpts(main, stack, {
          start: 'top 84%',
          toggleActions: 'play none none none',
        }),
        onComplete: () => section.classList.add('is-popart-ready'),
      })

      if (mainLayer) {
        entrance.fromTo(
          mainLayer,
          { autoAlpha: 0, y: 72, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' },
          0,
        )
      }

      if (topLayer) {
        entrance.fromTo(
          topLayer,
          { autoAlpha: 0, x: -48, y: -28, rotation: -10 },
          { autoAlpha: 1, x: 0, y: 0, rotation: -4, duration: 0.82, ease: 'power3.out' },
          0.12,
        )
      }

      if (bottomLayer) {
        entrance.fromTo(
          bottomLayer,
          { autoAlpha: 0, x: 52, y: 36, rotation: 10 },
          { autoAlpha: 1, x: 0, y: 0, rotation: 3, duration: 0.82, ease: 'power3.out' },
          0.24,
        )
      }

      if (desktopParallax) {
        if (mainLayer) {
          gsap.to(mainLayer, {
            y: -64,
            ease: 'none',
            scrollTrigger: scrollerOpts(main, section, {
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
            }),
          })
        }
        if (topLayer) {
          gsap.to(topLayer, {
            y: -110,
            x: 18,
            ease: 'none',
            scrollTrigger: scrollerOpts(main, section, {
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.45,
            }),
          })
        }
        if (bottomLayer) {
          gsap.to(bottomLayer, {
            y: -150,
            ease: 'none',
            scrollTrigger: scrollerOpts(main, section, {
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
            }),
          })
        }
      }
    }

    if (ctaWrap) {
      gsap.fromTo(
        ctaWrap,
        { autoAlpha: 0, scale: 0.6 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.65,
          ease: 'back.out(1.7)',
          scrollTrigger: scrollerOpts(main, copy ?? section, {
            start: 'top 72%',
            toggleActions: 'play none none none',
          }),
        },
      )

      const cta = ctaWrap.querySelector('.home-popart-circle-cta')
      if (cta) {
        gsap.to(cta, {
          y: -8,
          duration: 2.4,
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
