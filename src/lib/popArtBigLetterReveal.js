import { prefersReducedMotion } from '../lib/utils'
import { HOME_MOTION } from './homeMotionTokens'

/** Match `.popart-bigletter-wipe` duration in CSS — hero headline pace */
export const POPART_BIGLETTER_WIPE_MS = HOME_MOTION.headlineDuration * 1000
/** PopArt fills letter shortly after sweep starts */
export const POPART_BIGLETTER_LETTER_AT_MS = 140

function finishPopArtBigLetter(el, onComplete) {
  el.classList.add('is-letter-visible')
  onComplete?.()
}

function finishPopArtSweep(el) {
  el.classList.remove('is-sweep-run')
  el.classList.add('is-sweep-done')
}

/** PopArt giant letter — gold sweep, letter snaps in early (PopArt ~150ms), sweep completes after. */
export function revealPopArtBigLetter(el, { onComplete } = {}) {
  if (!el || el.classList.contains('show')) return
  const delaySec = parseFloat(el.getAttribute('data-bigletter-delay') ?? '0')
  const delayMs = Number.isFinite(delaySec) ? delaySec * 1000 : 0

  const startSweep = () => {
    el.classList.add('show')

    if (prefersReducedMotion()) {
      finishPopArtBigLetter(el, onComplete)
      return
    }

    requestAnimationFrame(() => {
      el.classList.add('is-sweep-run')

      window.setTimeout(() => {
        finishPopArtBigLetter(el, onComplete)
      }, POPART_BIGLETTER_LETTER_AT_MS)

      window.setTimeout(() => {
        finishPopArtSweep(el)
      }, POPART_BIGLETTER_WIPE_MS)
    })
  }

  window.setTimeout(startSweep, Math.max(0, delayMs))
}

export function revealPopArtSectionCopy(section, { afterMs = 0, onComplete } = {}) {
  if (!section) return

  const texts = section.querySelectorAll('.home-popart-rev-text--hidden:not(.is-revealed)')
  let lastRevealMs = afterMs

  texts.forEach((el) => {
    const staggerSec = parseFloat(el.getAttribute('data-rev-delay') ?? '0')
    const staggerMs = Number.isFinite(staggerSec) ? staggerSec * 1000 : 0
    const revealAt = afterMs + staggerMs
    lastRevealMs = Math.max(lastRevealMs, revealAt)

    window.setTimeout(() => {
      el.classList.remove('home-popart-rev-text--hidden')
      el.classList.add('is-revealed')
    }, revealAt)
  })

  const ctaWrap = section.querySelector('.home-popart-section__cta')
  const ctaDelay = lastRevealMs + (texts.length ? Math.round(HOME_MOTION.stagger * 1000) : 0)

  if (ctaWrap) {
    window.setTimeout(() => {
      ctaWrap.classList.remove('home-popart-cta--pending')
      ctaWrap.classList.add('is-revealed')
      onComplete?.()
    }, ctaDelay)
    return
  }

  if (texts.length) {
    window.setTimeout(() => onComplete?.(), lastRevealMs + 80)
  } else {
    onComplete?.()
  }
}

/** Letter wipe first, then staged rev-text — once per section. */
export function revealPopArtSectionSequence(section) {
  if (!section || section.dataset.popartRevealed === '1') return
  section.dataset.popartRevealed = '1'

  const monogram = section.querySelector('.popart-bigletter--animate')
  if (monogram) {
    revealPopArtBigLetter(monogram, {
      onComplete: () => revealPopArtSectionCopy(section, { afterMs: 0 }),
    })
    return
  }

  revealPopArtSectionCopy(section, { afterMs: 0 })
}

export function revealAllPopArtBigLetters(root = document) {
  root.querySelectorAll('.popart-bigletter--animate:not(.show)').forEach((el) => {
    revealPopArtBigLetter(el)
  })
}

/** Sections whose copy block is already in the scroller viewport (any screen size). */
export function revealPopArtSectionsInView(root, main) {
  if (!root || !main) return
  const mainRect = main.getBoundingClientRect()
  const edge = mainRect.top + mainRect.height * 0.9

  root.querySelectorAll('[data-home-popart-section], [data-popart-sequence]').forEach((section) => {
    if (section.dataset.popartRevealed === '1') return
    const rect = section.getBoundingClientRect()
    if (rect.top < edge && rect.bottom > mainRect.top + mainRect.height * 0.08) {
      section.classList.add('is-popart-ready')
      revealPopArtSectionSequence(section)
    }
  })
}
