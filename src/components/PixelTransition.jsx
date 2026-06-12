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
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { prefersReducedMotion, scrollMainToTarget, scrollMainToTargetAsync } from '../lib/utils'
import { shouldUsePixelNav } from '../lib/pixelNav'

const PixelTransitionContext = createContext(null)

const ROUTE_SWAP_MS = 420

export function usePixelTransition() {
  return useContext(PixelTransitionContext)
}

/** @deprecated Use `usePixelTransition` — kept for home deck imports during migration. */
export function useHomePixelJump() {
  return useContext(PixelTransitionContext)
}

/**
 * Full-screen pixel grid reveal (Codrops-style) for route changes.
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
            duration: 0.28,
            ease: 'power3.inOut',
            scale: 1.008,
            opacity: 1,
            stagger: (index) =>
              0.02 * (meta[index].row + gsap.utils.random(0, 3)),
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
            duration: 0.28,
            ease: 'power2.inOut',
            scale: 0,
            opacity: 0,
            stagger: (index, _target, list) =>
              0.02 *
              (meta[list.length - 1 - index].row + gsap.utils.random(0, 3)),
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
      className="pointer-events-none fixed inset-0 z-[999999] grid gap-0 opacity-0"
      style={{ gridAutoRows: '1fr' }}
      aria-hidden
    />
  )

  if (typeof document === 'undefined') return null
  return createPortal(grid, document.body)
})

export function PixelTransitionProvider({ children }) {
  const overlayRef = useRef(null)
  const busyRef = useRef(false)
  const navigate = useNavigate()

  const motionReduced = useCallback(() => {
    return (
      prefersReducedMotion() ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('reduced-motion'))
    )
  }, [])

  const withPixelCover = useCallback(
    async (during) => {
      if (motionReduced()) {
        await during()
        return
      }
      const overlay = overlayRef.current
      if (!overlay) {
        await during()
        return
      }
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
    [motionReduced],
  )

  const navigateWithPixel = useCallback(
    async (to, { replace = false, fromPath = null } = {}) => {
      const targetPath = typeof to === 'string' ? to : to?.pathname ?? '/'
      const currentPath =
        fromPath ??
        (typeof window !== 'undefined' ? window.location.pathname : '/')

      if (!shouldUsePixelNav(currentPath, targetPath) || motionReduced()) {
        navigate(to, { replace })
        return
      }

      await withPixelCover(async () => {
        navigate(to, { replace })
        await new Promise((r) => window.setTimeout(r, ROUTE_SWAP_MS))
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      })
    },
    [motionReduced, navigate, withPixelCover],
  )

  const jumpToSection = useCallback(
    async (sectionId) => {
      const el = document.getElementById(sectionId)
      if (!el) return

      if (motionReduced()) {
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
    },
    [motionReduced],
  )

  const value = useMemo(
    () => ({
      jumpToSection,
      withPixelCover,
      navigateWithPixel,
      motionReduced,
      /** @deprecated */ homeMotionReduced: motionReduced,
    }),
    [jumpToSection, motionReduced, navigateWithPixel, withPixelCover],
  )

  return (
    <PixelTransitionContext.Provider value={value}>
      {children}
      <PixelTransitionOverlay ref={overlayRef} />
    </PixelTransitionContext.Provider>
  )
}

/** @deprecated Use `PixelTransitionProvider`. */
export const HomePixelTransitionProvider = PixelTransitionProvider
