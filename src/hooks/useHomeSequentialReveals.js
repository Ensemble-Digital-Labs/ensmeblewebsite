import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/utils'
import { setupHomePopArtMotion, finishPopArtStacksFailsafe } from './useHomePopArtMotion'
import { revealPopArtBigLetter, revealPopArtSectionSequence, revealPopArtSectionsInView } from '../lib/popArtBigLetterReveal'
import { HOME_MOTION } from '../lib/homeMotionTokens'

gsap.registerPlugin(ScrollTrigger)

function shouldSkipHomeMotion() {
  if (typeof document === 'undefined') return prefersReducedMotion()
  return prefersReducedMotion() || document.documentElement.classList.contains('reduced-motion')
}

function parseCountStat(raw) {
  const value = String(raw ?? '').trim()
  const match = value.match(/^([\d.]+)(.*)$/)
  if (!match) return null
  return { target: parseFloat(match[1]), suffix: match[2] ?? '' }
}

function resetMaskReveal(root) {
  root.querySelectorAll('[data-home-mask-load], [data-home-mask-reveal], [data-home-mono-reveal]').forEach((wrapper) => {
    const inner = wrapper.querySelector('.home-mask-reveal__inner')
    if (inner) {
      inner.style.transform = 'none'
      inner.style.opacity = '1'
    }
    wrapper.classList.add('is-revealed')
  })
  root.querySelectorAll('[data-home-monogram], .popart-bigletter--animate').forEach((el) => {
    el.classList.add('show', 'is-letter-visible')
  })
}

function markMaskRevealed(wrapper) {
  wrapper.classList.add('is-revealed')
}

function animateMaskInner(wrapper, inner, { delay = 0, scrollTrigger } = {}) {
  gsap.killTweensOf(inner)
  gsap.fromTo(
    inner,
    { yPercent: HOME_MOTION.yPercent },
    {
      yPercent: 0,
      duration: HOME_MOTION.revealDuration,
      ease: HOME_MOTION.ease,
      delay,
      overwrite: true,
      onComplete: () => markMaskRevealed(wrapper),
      ...(scrollTrigger ? { scrollTrigger } : {}),
    },
  )
}

/** Unhide mask lines already on screen when ScrollTrigger init runs late. */
function revealMasksAlreadyInView(root) {
  root.querySelectorAll('[data-home-mask-reveal]:not(.is-revealed), [data-home-mono-reveal]:not(.is-revealed)').forEach((wrapper) => {
    const inner = wrapper.querySelector('.home-mask-reveal__inner')
    if (!inner) return
    const rect = wrapper.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      gsap.killTweensOf(inner)
      gsap.set(inner, { yPercent: 0 })
      markMaskRevealed(wrapper)
    }
  })
}

function playMaskGroup(group, main, { trigger, start = 'top 80%' } = {}) {
  const wrappers = [...group.querySelectorAll('[data-home-mask-reveal]')]
  if (!wrappers.length) return

  const revealAll = () => {
    if (trigger.matches?.('[data-home-popart-section]')) {
      trigger.classList.add('is-popart-ready')
    }
    wrappers.forEach((wrapper, i) => {
      if (wrapper.classList.contains('is-revealed')) return
      const inner = wrapper.querySelector('.home-mask-reveal__inner')
      if (!inner) return
      const customDelay = parseFloat(wrapper.getAttribute('data-home-mask-delay') ?? '')
      const delay = Number.isFinite(customDelay) ? customDelay : i * HOME_MOTION.stagger
      animateMaskInner(wrapper, inner, { delay })
    })
  }

  ScrollTrigger.create({
    trigger,
    scroller: main,
    start,
    once: true,
    onEnter: revealAll,
  })

  const rect = trigger.getBoundingClientRect()
  if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
    revealAll()
  }
}

/** Home `/` — PopArt-adapted reveals: mask lines, count-up stats, monograms. */
export function useHomeSequentialReveals() {
  useLayoutEffect(() => {
    const root = document.getElementById('home-sections')
    if (!root) return undefined

    let ctx = null
    let cancelled = false
    let motionInitialized = false

    const setupScrollMotion = () => {
      if (cancelled) return

      const main = document.querySelector('#main')
      if (!main) return

      if (shouldSkipHomeMotion()) {
        root.querySelectorAll('[data-home-reveal]').forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
        root.querySelectorAll('[data-home-problem-bar]').forEach((el) => {
          el.style.transform = 'none'
        })
        resetMaskReveal(root)
        return
      }

      if (motionInitialized) return
      motionInitialized = true

      ctx?.revert()
      ctx = gsap.context(() => {
        // Hero load lines use CSS (`data-home-intro-ready`) — scroll masks only here.

        // PopArt sections use `useHomePopArtRevText` (class toggle) — not GSAP masks.

        root.querySelectorAll('[data-home-mask-group]').forEach((group) => {
          if (group.closest('[data-home-popart-section]')) return
          const trigger = group.closest('section') ?? group
          playMaskGroup(group, main, { trigger, start: 'top 90%' })
        })

        root.querySelectorAll('[data-home-mask-reveal], [data-home-mono-reveal]').forEach((wrapper) => {
          if (wrapper.closest('[data-home-mask-group]')) return
          const inner = wrapper.querySelector('.home-mask-reveal__inner')
          if (!inner) return
          const delay = parseFloat(wrapper.getAttribute('data-home-mask-delay') ?? '') || 0
          animateMaskInner(wrapper, inner, {
            delay,
            scrollTrigger: {
              trigger: wrapper,
              scroller: main,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
        })

        root.querySelectorAll('[data-home-reveal]').forEach((el) => {
          if (el.closest('.home-mask-reveal') || el.closest('#home-hero')) return
          gsap.killTweensOf(el)
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: HOME_MOTION.y },
            {
              autoAlpha: 1,
              y: 0,
              duration: HOME_MOTION.revealDuration,
              ease: HOME_MOTION.ease,
              overwrite: true,
              scrollTrigger: {
                trigger: el,
                scroller: main,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            },
          )
        })

        root.querySelectorAll('[data-home-problem-bar]').forEach((inner, i) => {
          gsap.killTweensOf(inner)
          gsap.fromTo(
            inner,
            { xPercent: i % 2 === 0 ? -101 : 101 },
            {
              xPercent: 0,
              duration: HOME_MOTION.revealDuration,
              ease: HOME_MOTION.ease,
              scrollTrigger: {
                trigger: inner,
                scroller: main,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            },
          )
        })

        root.querySelectorAll('[data-home-count-up]').forEach((el, i) => {
          if (el.closest('#home-proof')) return
          const parsed = parseCountStat(el.getAttribute('data-home-count-up'))
          if (!parsed) return
          const obj = { val: 0 }
          gsap.killTweensOf(obj)
          gsap.to(obj, {
            val: parsed.target,
            duration: HOME_MOTION.headlineDuration,
            ease: HOME_MOTION.ease,
            delay: i * HOME_MOTION.stagger,
            scrollTrigger: {
              trigger: el.closest('[data-home-count-group]') ?? el,
              scroller: main,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              const n = parsed.target % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1)
              el.textContent = `${n}${parsed.suffix}`
            },
          })
        })

        setupHomePopArtMotion(root, main)

        const proofSection = root.querySelector('#home-proof')
        const proofMonogram = proofSection?.querySelector('.home-proof-copy__monogram.popart-bigletter--animate')
        if (proofSection && proofMonogram) {
          ScrollTrigger.create({
            trigger: proofSection,
            scroller: main,
            start: 'top 85%',
            once: true,
            onEnter: () => revealPopArtBigLetter(proofMonogram),
          })
        }

        const workHeader = root.querySelector('#home-work [data-home-popart-section]')
        if (workHeader) {
          ScrollTrigger.create({
            trigger: workHeader,
            scroller: main,
            start: 'top 88%',
            once: true,
            onEnter: () => {
              workHeader.classList.add('is-popart-ready')
              revealPopArtSectionSequence(workHeader)
            },
          })
        }
      }, root)

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        requestAnimationFrame(() => revealMasksAlreadyInView(root))
      })

      // Failsafe — never leave sections invisible if ScrollTrigger missed a target
      window.setTimeout(() => {
        revealMasksAlreadyInView(root)
        root.querySelectorAll('[data-home-reveal]').forEach((el) => {
          if (el.closest('#home-hero')) return
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
        root.querySelectorAll('[data-home-popart-section]').forEach((section) => {
          section.classList.add('is-popart-ready')
        })
        revealPopArtSectionsInView(root, main)
        const proofMonogram = root.querySelector('#home-proof .home-proof-copy__monogram.popart-bigletter--animate:not(.show)')
        if (proofMonogram) revealPopArtBigLetter(proofMonogram)
      }, 600)

      // Late failsafe — orchestrated PopArt stacks only if ScrollTrigger never fired
      window.setTimeout(() => {
        finishPopArtStacksFailsafe(root)
      }, 4000)
    }

    // Bind when Lenis is ready; keep a short failsafe for hard-refresh races.
    const onScrollReady = () => setupScrollMotion()
    window.addEventListener('ensemble:scroll-ready', onScrollReady, { once: true })

    const tFailsafe = window.setTimeout(setupScrollMotion, 800)

    return () => {
      cancelled = true
      window.clearTimeout(tFailsafe)
      window.removeEventListener('ensemble:scroll-ready', onScrollReady)
      ctx?.revert()
    }
  }, [])
}
