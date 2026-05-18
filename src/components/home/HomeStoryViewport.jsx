import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HOME_NARRATIVE_SECTIONS } from '../../lib/homeNarrativeSections'
import { clamp } from '../../lib/utils'
import { useHomePixelJump } from './HomePixelTransition'
import HomeSectionIndex from './HomeSectionIndex'

gsap.registerPlugin(ScrollTrigger)

const HomeStoryContext = createContext(null)

export function useHomeStory() {
  return useContext(HomeStoryContext)
}

const RAIL_SCROLL_SYNC_RELEASE_MS = 165
const GESTURE_IDLE_MS = 160
const STEP_COOLDOWN_MS = 820
const WHEEL_MIN_DELTA = 6
const TOUCH_SWIPE_MIN_PX = 48

function getMainLenis() {
  return (
    window.__ensembleLenis ||
    window.locomotiveScroll?.lenisInstance ||
    window.locomotiveScroll?.LenisInstance
  )
}

function getMainScrollTop(main) {
  if (!main) return 0
  const lenis = getMainLenis()
  if (lenis) {
    const scrollPos =
      typeof lenis.scroll === 'number'
        ? lenis.scroll
        : (lenis.scroll?.y ?? lenis.scroll ?? 0)
    if (typeof scrollPos === 'number' && !Number.isNaN(scrollPos)) return scrollPos
  }
  return main.scrollTop || 0
}

function stopMainScrollMomentum() {
  const lenis = getMainLenis()
  if (lenis?.stop) {
    try {
      lenis.stop()
    } catch (e) {
      /* noop */
    }
  }
}

function scrollMainToSlideProgress(main, slideIndex, slideCount, { duration = 0.55, immediate = false } = {}) {
  if (!main) return
  ScrollTrigger.refresh(true)
  const st = ScrollTrigger.getById('home-story-deck-pin')
  if (!st || typeof st.start !== 'number' || typeof st.end !== 'number') return

  const denom = Math.max(slideCount - 1, 1)
  const prog = slideCount <= 1 ? 0 : clamp(slideIndex / denom, 0, 1)
  const scrollY = clamp(st.start + prog * Math.max(st.end - st.start, 0), 0, Infinity)

  const lenis = getMainLenis()
  if (lenis?.scrollTo) {
    try {
      lenis.scrollTo(scrollY, { duration: immediate ? 0 : duration, immediate: Boolean(immediate) })
      return
    } catch (e) {
      /* fall through */
    }
  }

  main.scrollTo({ top: scrollY, behavior: immediate ? 'auto' : 'smooth' })
}

function isScrollInHomeDeck(main, st) {
  if (!main || !st) return false
  const y = getMainScrollTop(main)
  const viewH = main.clientHeight || window.innerHeight
  return y >= st.start - 2 && y < st.end - viewH * 0.35
}

/** Pinned viewport; wheel / swipe advances exactly one chapter per gesture. */
export default function HomeStoryViewport({ children }) {
  const location = useLocation()
  const pixel = useHomePixelJump()
  const slideCount = HOME_NARRATIVE_SECTIONS.length

  const [visualSlideIndex, setVisualSlideIndex] = useState(0)

  const regionRef = useRef(null)
  const stKillRef = useRef(null)
  const visualSlideRef = useRef(0)
  const syncingRailRef = useRef(false)
  const stepBusyRef = useRef(false)
  const gestureConsumedRef = useRef(false)
  const gestureIdleTimerRef = useRef(null)
  const lastStepAtRef = useRef(0)
  const touchStartYRef = useRef(null)

  useEffect(() => {
    visualSlideRef.current = visualSlideIndex
  }, [visualSlideIndex])

  const goToChapterIndex = useCallback(
    async (targetIdx, { fromRail = false } = {}) => {
      const idx = clamp(targetIdx, 0, slideCount - 1)
      const main = document.querySelector('#main')

      if (pixel?.homeMotionReduced?.()) {
        setVisualSlideIndex(idx)
        scrollMainToSlideProgress(main, idx, slideCount, { duration: 0.4 })
        if (fromRail) {
          window.setTimeout(() => {
            syncingRailRef.current = false
            ScrollTrigger.refresh()
          }, RAIL_SCROLL_SYNC_RELEASE_MS)
        }
        return
      }

      if (pixel?.withPixelCover) {
        await pixel.withPixelCover(async () => {
          setVisualSlideIndex(idx)
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
        })
      } else {
        setVisualSlideIndex(idx)
      }

      syncingRailRef.current = true
      scrollMainToSlideProgress(main, idx, slideCount, { duration: fromRail ? 0.75 : 0.5 })
      window.setTimeout(() => {
        syncingRailRef.current = false
        ScrollTrigger.refresh()
      }, RAIL_SCROLL_SYNC_RELEASE_MS)
    },
    [pixel, slideCount],
  )

  const tryStepChapter = useCallback(
    async (direction) => {
      const now = Date.now()
      if (stepBusyRef.current) return false
      if (now - lastStepAtRef.current < STEP_COOLDOWN_MS) return false
      if (gestureConsumedRef.current) return false

      const current = visualSlideRef.current
      const next = clamp(current + direction, 0, slideCount - 1)
      if (next === current) return false

      gestureConsumedRef.current = true
      stepBusyRef.current = true
      lastStepAtRef.current = now

      try {
        stopMainScrollMomentum()
        await goToChapterIndex(next)
      } finally {
        stepBusyRef.current = false
      }
      return true
    },
    [goToChapterIndex, slideCount],
  )

  const resetGestureIdleTimer = useCallback(() => {
    if (gestureIdleTimerRef.current !== null) {
      window.clearTimeout(gestureIdleTimerRef.current)
    }
    gestureIdleTimerRef.current = window.setTimeout(() => {
      gestureConsumedRef.current = false
      gestureIdleTimerRef.current = null
    }, GESTURE_IDLE_MS)
  }, [])

  useLayoutEffect(() => {
    if (location.pathname !== '/') return undefined

    const main = document.querySelector('#main')
    const region = regionRef.current
    if (!main || !region) return undefined

    if (stKillRef.current) {
      try {
        stKillRef.current.kill()
      } catch (e) {
        /* noop */
      }
      stKillRef.current = null
    }

    const st = ScrollTrigger.create({
      id: 'home-story-deck-pin',
      trigger: region,
      scroller: main,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
    })
    stKillRef.current = st

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      if (stKillRef.current) {
        try {
          stKillRef.current.kill()
        } catch (e) {
          /* noop */
        }
        stKillRef.current = null
      }
      ScrollTrigger.refresh()
    }
  }, [location.pathname, slideCount])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const main = document.querySelector('#main')
    if (!main) return undefined

    const onWheel = (e) => {
      const st = ScrollTrigger.getById('home-story-deck-pin')
      if (!st || !isScrollInHomeDeck(main, st)) return

      const idx = visualSlideRef.current
      const down = e.deltaY > WHEEL_MIN_DELTA
      const up = e.deltaY < -WHEEL_MIN_DELTA
      if (!down && !up) return

      if (down && idx >= slideCount - 1) return
      if (up && idx <= 0) {
        e.preventDefault()
        stopMainScrollMomentum()
        return
      }

      e.preventDefault()
      stopMainScrollMomentum()

      if (!gestureConsumedRef.current && !stepBusyRef.current) {
        void tryStepChapter(down ? 1 : -1)
      }
      resetGestureIdleTimer()
    }

    main.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      main.removeEventListener('wheel', onWheel)
      if (gestureIdleTimerRef.current !== null) {
        window.clearTimeout(gestureIdleTimerRef.current)
        gestureIdleTimerRef.current = null
      }
    }
  }, [location.pathname, slideCount, tryStepChapter, resetGestureIdleTimer])

  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const main = document.querySelector('#main')
    const region = regionRef.current
    if (!main || !region) return undefined

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return
      touchStartYRef.current = e.touches[0].clientY
    }

    const onTouchEnd = (e) => {
      const startY = touchStartYRef.current
      touchStartYRef.current = null
      if (startY == null || e.changedTouches.length !== 1) return

      const st = ScrollTrigger.getById('home-story-deck-pin')
      if (!st || !isScrollInHomeDeck(main, st)) return

      const dy = startY - e.changedTouches[0].clientY
      if (Math.abs(dy) < TOUCH_SWIPE_MIN_PX) return

      const down = dy > 0
      const idx = visualSlideRef.current
      if (down && idx >= slideCount - 1) return
      if (!down && idx <= 0) return

      if (!gestureConsumedRef.current && !stepBusyRef.current) {
        void tryStepChapter(down ? 1 : -1)
      }
      resetGestureIdleTimer()
    }

    region.addEventListener('touchstart', onTouchStart, { passive: true })
    region.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      region.removeEventListener('touchstart', onTouchStart)
      region.removeEventListener('touchend', onTouchEnd)
    }
  }, [location.pathname, slideCount, tryStepChapter, resetGestureIdleTimer])

  const goToSlideById = useCallback(
    async (sectionId) => {
      const idx = HOME_NARRATIVE_SECTIONS.findIndex((s) => s.id === sectionId)
      if (idx < 0) return
      gestureConsumedRef.current = true
      lastStepAtRef.current = Date.now()
      await goToChapterIndex(idx, { fromRail: true })
      resetGestureIdleTimer()
    },
    [goToChapterIndex, resetGestureIdleTimer],
  )

  const value = useMemo(
    () => ({
      visualSlideIndex,
      slideCount,
      narrative: HOME_NARRATIVE_SECTIONS,
      goToSlideById,
    }),
    [goToSlideById, slideCount, visualSlideIndex],
  )

  if (location.pathname !== '/') {
    return <>{children}</>
  }

  return (
    <HomeStoryContext.Provider value={value}>
      <HomeSectionIndex />
      <div
        ref={regionRef}
        id="home-scroll-story-region"
        className="relative w-full touch-pan-y"
        style={{ minHeight: `${slideCount * 100}svh` }}
      >
        <div className="sticky top-0 z-[2] flex h-[min(100dvh,100svh)] w-full flex-col overflow-hidden">
          <div id="home-deck-mount" className="flex min-h-0 flex-1 flex-col">
            {children}
          </div>
        </div>
      </div>
    </HomeStoryContext.Provider>
  )
}
