/**
 * Custom cursor (`MovingCircle`) — resolve hover context from DOM.
 *
 * Markup:
 * - `data-cursor-label="See it"` — show this text (uppercased in UI, max length trimmed).
 * - `data-cursor-intent="drag"` — preset label **DRAG** (carousel, draggable canvas).
 * - `data-cursor-intent="view"` — preset **VIEW**.
 * - Plain links / buttons / `[role="button"]` / `.cursor-pointer` → **CLICK** when no closer override.
 * - `data-cursor-suppress` on an ancestor — hide labeled ring; use normal cursor.
 */

import { ANIMATION_MOBILE_MAX_WIDTH_PX } from './animationProfile'
import { prefersReducedMotion } from './utils'

const SUPPRESS_SELECTOR =
  '[data-cursor-suppress], .nav, .nav *, #fullscreen-nav, #fullscreen-nav *, .nav__brand, .logo, .logo-owl'

const INTENT_PRESETS = {
  drag: 'DRAG',
  view: 'VIEW',
}

const LABEL_MAX = 12

/** Desktop pointer only — no custom cursor on mobile/tablet or touch-primary devices. */
export function shouldUseCustomCursor() {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  try {
    if (window.matchMedia('(pointer: coarse)').matches) return false
    if (window.matchMedia(`(max-width: ${ANIMATION_MOBILE_MAX_WIDTH_PX}px)`).matches) return false
  } catch {
    return false
  }
  return true
}

function isCursorSuppressed(el) {
  if (!el || !(el instanceof Element)) return false
  return Boolean(el.closest(SUPPRESS_SELECTOR))
}

export function isInteractiveTarget(el) {
  if (!el || !(el instanceof Element)) return false
  if (isCursorSuppressed(el)) {
    return false
  }
  if (
    el.closest('a[href]') ||
    el.closest('button:not([disabled])') ||
    el.closest('[role="button"]:not([aria-disabled="true"])') ||
    el.closest('input:not([type="hidden"]):not([disabled])') ||
    el.closest('textarea:not([disabled])') ||
    el.closest('select:not([disabled])') ||
    el.closest('label[for]') ||
    el.closest('.cursor-pointer') ||
    el.closest('[data-cursor-intent]') ||
    el.closest('[data-cursor-label]')
  ) {
    return true
  }
  return false
}

/**
 * @param {Element | null} hit — `document.elementFromPoint` under the pointer
 * @returns {{ label: string }}
 */
export function resolveCursorLabel(hit) {
  if (!hit || !(hit instanceof Element)) {
    return { label: '' }
  }

  if (isCursorSuppressed(hit)) {
    return { label: '' }
  }

  let el = hit
  while (el && el.nodeType === 1) {
    const rawLabel = el.getAttribute('data-cursor-label')
    if (rawLabel != null) {
      const t = String(rawLabel).trim()
      if (t.length > 0) {
        return { label: t.toUpperCase().slice(0, LABEL_MAX) }
      }
    }

    const intent = el.getAttribute('data-cursor-intent')
    if (intent != null && String(intent).trim() !== '') {
      const key = String(intent).trim().toLowerCase()
      const preset = INTENT_PRESETS[key]
      if (preset) return { label: preset }
      return { label: key.toUpperCase().replace(/-/g, ' ').slice(0, LABEL_MAX) }
    }

    el = el.parentElement
  }

  if (isInteractiveTarget(hit)) {
    return { label: 'CLICK' }
  }

  return { label: '' }
}
