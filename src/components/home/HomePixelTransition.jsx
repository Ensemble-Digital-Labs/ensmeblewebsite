import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { prefersReducedMotion, scrollMainToTarget, scrollMainToTargetAsync } from '../../lib/utils'

const HomePixelJumpContext = createContext(null)

export function useHomePixelJump() {
  return useContext(HomePixelJumpContext)
}

/**
 * Full-screen pixel grid reveal (Codrops-style) for home section jumps.
 * Dark healthcare-toned tiles — restrained, not cyber HUD.
 */
const PixelTransitionOverlay = forwardRef(function PixelTransitionOverlay(_, ref) {
  const hostRef = useRef(null)
  const cellMetaRef = useRef([])

  useLayoutEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const mq = window.matchMedia('(max-width: 639px)')
    const build = () => {
      host.innerHTML = ''
      const rows = mq.matches ? 6 : 8
      const columns = mq.matches ? 10 : 13
      host.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`

      const meta = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const el = document.createElement('div')
          el.className =
            'min-h-0 min-w-0 bg-[#14122a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] will-change-transform'
          host.appendChild(el)
          meta.push({ row: r, col: c, el })
        }
      }
      cellMetaRef.current = meta
    }

    build()
    const onMq = () => build()
    mq.addEventListener('change', onMq)
    return () => {
      mq.removeEventListener('change', onMq)
      const meta = cellMetaRef.current
      if (meta.length) gsap.killTweensOf(meta.map((m) => m.el))
    }
  }, [])

  useImperativeHandle(ref, () => ({
    show() {
      const meta = cellMetaRef.current
      const els = meta.map((m) => m.el)
      if (!els.length) return Promise.resolve()

      return new Promise((resolve) => {
        gsap.killTweensOf(els)
        gsap.set(hostRef.current, { opacity: 1, pointerEvents: 'auto' })
        gsap.fromTo(
          els,
          { scale: 0, opacity: 0, transformOrigin: '50% 0%' },
          {
            duration: 0.38,
            ease: 'power3.inOut',
            scale: 1.008,
            opacity: 1,
            stagger: (index) =>
              0.028 * (meta[index].row + gsap.utils.random(0, 4)),
            onComplete: resolve,
          },
        )
      })
    },
    hide() {
      const meta = cellMetaRef.current
      const els = meta.map((m) => m.el)
      if (!els.length) return Promise.resolve()

      return new Promise((resolve) => {
        gsap.killTweensOf(els)
        gsap.fromTo(
          els,
          { transformOrigin: '50% 100%' },
          {
            duration: 0.38,
            ease: 'power2.inOut',
            scale: 0,
            opacity: 0,
            stagger: (index, _target, list) =>
              0.028 *
              (meta[list.length - 1 - index].row + gsap.utils.random(0, 4)),
            onComplete: () => {
              gsap.set(hostRef.current, {
                opacity: 0,
                pointerEvents: 'none',
              })
              resolve()
            },
          },
        )
      })
    },
  }))

  const grid = (
    <div
      ref={hostRef}
      className="pointer-events-none fixed inset-0 z-[92] grid gap-0 opacity-0"
      style={{ gridAutoRows: '1fr' }}
      aria-hidden
    />
  )

  if (typeof document === 'undefined') return null
  return createPortal(grid, document.body)
})

export function HomePixelTransitionProvider({ children }) {
  const overlayRef = useRef(null)
  const busyRef = useRef(false)

  const homeMotionReduced = useCallback(() => {
    return (
      prefersReducedMotion() ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('reduced-motion'))
    )
  }, [])

  const jumpToSection = useCallback(async (sectionId) => {
    const el = document.getElementById(sectionId)
    if (!el) return

    if (homeMotionReduced()) {
      scrollMainToTarget(el, { duration: 0.45, forceImmediate: false })
      return
    }

    if (busyRef.current) return
    busyRef.current = true

    try {
      const overlay = overlayRef.current
      if (!overlay) {
        await scrollMainToTargetAsync(el, { duration: 0.88 })
        return
      }
      await overlay.show()
      await scrollMainToTargetAsync(el, { duration: 0.82 })
      await overlay.hide()
    } finally {
      busyRef.current = false
    }
  }, [homeMotionReduced])

  /**
   * Cover the viewport with the pixel grid, run work (e.g. swap deck slide), then reveal.
   */
  const withPixelCover = useCallback(
    async (during) => {
      if (homeMotionReduced()) {
        await during()
        return
      }
      const overlay = overlayRef.current
      if (!overlay) {
        await during()
        return
      }
      /** Allow overlapping callers to queue loosely (scroll + rail) without silent no-op. */
      while (busyRef.current) {
        await new Promise((r) => window.setTimeout(r, 40))
      }
      busyRef.current = true
      try {
        await overlay.show()
        await during()
        await overlay.hide()
      } finally {
        busyRef.current = false
      }
    },
    [homeMotionReduced],
  )

  const value = useMemo(
    () => ({ jumpToSection, withPixelCover, homeMotionReduced }),
    [jumpToSection, withPixelCover, homeMotionReduced],
  )

  return (
    <HomePixelJumpContext.Provider value={value}>
      {children}
      <PixelTransitionOverlay ref={overlayRef} />
    </HomePixelJumpContext.Provider>
  )
}
