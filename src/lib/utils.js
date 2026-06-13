/** Merge class names (Tailwind-friendly). */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Use real overflow scrolling on #main instead of Lenis/Locomotive.
 * Lenis + iOS Safari often fails to translate touch; reduced-motion also skips smooth scroll.
 *
 * iOS Safari frequently reports `pointer: fine` (no `(pointer: coarse)` match) even on iPhone,
 * so we also treat “touch available + no hover” as touch-first UI.
 */
/**
 * Snap the real scroll surface(s) to the top: Lenis (if active), `#main`, and the window.
 * Call after route changes, after ScrollTrigger.refresh, and once Locomotive/Lenis is ready —
 * Lenis often owns scroll while `#main.scrollTop` stays 0, so both must be cleared.
 */
/**
 * Fullscreen nav open: pause Lenis (stops its RAF) and let CSS skip painting `#main` under the overlay.
 * About / long pages composite many blur + scrub layers; without this the menu animation janks.
 */
export function setNavOverlayActive(active) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('ensemble-nav-overlay', Boolean(active))

  if (typeof window === 'undefined') return
  const lenis =
    window.__ensembleLenis ||
    window.locomotiveScroll?.lenisInstance ||
    window.locomotiveScroll?.LenisInstance
  if (!lenis) return
  try {
    if (active && typeof lenis.stop === 'function') lenis.stop()
    if (!active && typeof lenis.start === 'function') lenis.start()
  } catch (e) {
    /* noop */
  }
}

export function hasUserScrolledMain(mainEl, threshold = 12) {
  if (typeof window === 'undefined') return false
  const main = mainEl || document.querySelector('#main')
  if (!main) return false
  if (main.scrollTop > threshold) return true
  const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
  if (lenis) {
    const y = typeof lenis.scroll === 'number' ? lenis.scroll : (lenis.scroll?.y ?? 0)
    if (y > threshold) return true
  }
  return false
}

export function forceScrollMainToTop(mainEl, { onlyIfNearTop = false, threshold = 12 } = {}) {
  if (typeof window === 'undefined') return
  if (onlyIfNearTop && hasUserScrolledMain(mainEl, threshold)) return
  const main = mainEl || document.querySelector('#main')
  const lenis = window.locomotiveScroll?.lenisInstance ?? window.locomotiveScroll?.LenisInstance
  if (lenis?.scrollTo) {
    try {
      lenis.scrollTo(0, { immediate: true })
    } catch (e) {
      /* noop */
    }
  }
  if (main) {
    try {
      main.scrollTop = 0
    } catch (e) {
      /* noop */
    }
  }
  try {
    window.scrollTo(0, 0)
  } catch (e) {
    /* noop */
  }
}

/**
 * Scroll the main shell (`#main` / Lenis) so `target` sits at the top band (respecting CSS scroll-margin).
 * Prefer Lenis `scrollTo` when available; fallback to native `scrollIntoView`.
 */
export function scrollMainToTarget(target, opts = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !target) return

  const reduce = prefersReducedMotion() || !!opts.forceImmediate
  const duration = reduce ? 0 : opts.duration ?? 1.08

  const lenis =
    window.__ensembleLenis ||
    window.locomotiveScroll?.lenisInstance ||
    window.locomotiveScroll?.LenisInstance

  if (lenis?.scrollTo) {
    try {
      lenis.scrollTo(target, {
        duration,
        easing: opts.easing,
        ...opts.lenisOpts,
      })
      return
    } catch (e) {
      /* fall through */
    }
  }

  const behavior = reduce ? 'auto' : opts.behavior ?? 'smooth'
  try {
    target.scrollIntoView({ behavior, block: 'start', inline: 'nearest' })
  } catch (e) {
    /* noop */
  }
}

/**
 * Same as {@link scrollMainToTarget}, but resolves after the approximate smooth-scroll window
 * (Lenis duration or native smooth estimate). Used to sequence full-screen transitions.
 */
export function scrollMainToTargetAsync(target, opts = {}) {
  if (typeof window === 'undefined' || !target) return Promise.resolve()

  const reduce = prefersReducedMotion() || !!opts.forceImmediate
  const durationSec = reduce ? 0 : opts.duration ?? 1.08
  scrollMainToTarget(target, { ...opts, duration: durationSec })

  const waitMs = reduce ? 60 : Math.round(durationSec * 1000) + 220
  return new Promise((resolve) => {
    window.setTimeout(resolve, waitMs)
  })
}

export function shouldUseNativeMainScroll() {
  if (typeof window === 'undefined') return false
  /**
   * Optional: set `VITE_USE_NATIVE_MAIN_SCROLL=true` in `.env.local` when you need mouse-wheel
   * scrolling in Chrome/Edge DevTools responsive mode at widths >1024px (Lenis wheel is often
   * unreliable there). Requires `#main` to use a bounded height — see `layout.jsx` native classes.
   */
  if (import.meta.env.VITE_USE_NATIVE_MAIN_SCROLL === 'true') return true
  if (prefersReducedMotion()) return true
  try {
    /** Aligns with Tailwind `lg` — Lenis on a short `#main` viewport makes the hero feel like its own “smooth” scroll layer. */
    if (window.matchMedia('(max-width: 1024px)').matches) return true
    const hoverNone = window.matchMedia('(hover: none)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const maxTouchPoints =
      typeof navigator !== 'undefined' ? Number(navigator.maxTouchPoints) || 0 : 0
    if (hoverNone && coarsePointer) return true
    if (hoverNone && maxTouchPoints > 0) return true
    return false
  } catch (e) {
    return false
  }
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
