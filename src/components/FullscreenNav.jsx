import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EnsembleLogoNav from './EnsembleLogoNav'
import NavPixelLink from './NavPixelLink'
import { caseStudies } from '../lib/content'
import { prefersReducedMotion, setNavOverlayActive, shouldUseNativeMainScroll } from '../lib/utils'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import { isDnaCapitalCloneRoute } from '../lib/dnaCapitalRoutes'
import { isCaseStudiesGalleryRoute } from '../lib/caseStudiesGalleryRoutes'
import {
  clipCircleAt,
  originPercent,
  setExpandOrigin,
  triggerCenter,
} from '../lib/circleExpandMotion'
import { useHamburgerMenuLines } from '../hooks/useHamburgerMenuLines'
import {
  revealFullscreenNavMenu,
  resetFullscreenNavMenu,
} from '../lib/navLogoTileMotion'

gsap.registerPlugin(ScrollTrigger)

const NAV_LOGO_SCROLL_IDLE_MS = 520
const NAV_LOGO_USER_SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])

/** Match `layout.jsx` — these routes use native `#main` scroll (no Lenis). */
function usesLenisMainScroll(pathname) {
  const isNativeOnlyRoute = isDnaCapitalCloneRoute(pathname) || isCaseStudiesGalleryRoute(pathname)
  return !isNativeOnlyRoute && !shouldUseNativeMainScroll()
}
/** Tripled list + scroll jump for seamless infinite vertical scroll (showcase rail). */
const SHOWCASE_LOOP_COPIES = 3
const SHOWCASE_LOOP_EDGE_PX = 72
const SHOWCASE_DRAG_THRESHOLD = 6
/** Inertia tuned to match case-studies-v2 carousel feel (px/s). */
const SHOWCASE_DRAG_FRICTION = 5.8
const SHOWCASE_VELOCITY_CUTOFF = 42
const SHOWCASE_VELOCITY_DAMP = 0.92

function FullscreenNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [clickCounter, setClickCounter] = useState(1)
  /** When false, nav logo is faded during active scroll; true after scroll settles (or reduced motion / menu open). */
  const [navLogoScrollIdle, setNavLogoScrollIdle] = useState(true)
  const navLogoScrollDebounceRef = useRef(null)
  /** True only after wheel/touch/keyboard — ignores Lenis programmatic scroll on load / route change. */
  const navLogoUserIntentRef = useRef(false)
  const menuRef = useRef(null)
  const fullscreenNavRef = useRef(null)
  const expandShellRef = useRef(null)
  const expandBackdropRef = useRef(null)
  const navContentRef = useRef(null)
  const menuButtonRef = useRef(null)
  const hamburgerLine1Ref = useRef(null)
  const hamburgerLine2Ref = useRef(null)
  const hamburgerLine3Ref = useRef(null)
  const expandOriginRef = useRef({ x: 92, y: 8 })
  const navWasOpenRef = useRef(false)
  const revealDelayRef = useRef(null)
  const showcaseScrollRef = useRef(null)
  const showcaseDragRef = useRef({
    pointerId: null,
    dragging: false,
    startY: 0,
    startScrollTop: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
    moved: false,
    pointerDownTarget: null,
  })
  const showcaseMotionRef = useRef({
    velocity: 0,
    sampleVelocity: 0,
  })
  const showcaseRafRef = useRef(0)
  const showcaseLastFrameRef = useRef(0)

  const showcaseLoopCopies = useMemo(
    () => Array.from({ length: SHOWCASE_LOOP_COPIES }, (_, copyIdx) => copyIdx),
    []
  )
  const showcaseReducedMotion = prefersReducedMotion()
  const showcaseCopiesToRender = showcaseReducedMotion ? [0] : showcaseLoopCopies
  const navShowcaseStudies = useMemo(() => caseStudies, [])

  useHamburgerMenuLines(hamburgerLine1Ref, hamburgerLine2Ref, hamburgerLine3Ref, isMenuOpen)

  const expandTweenRef = useRef(null)

  useEffect(() => () => setNavOverlayActive(false), [])

  const location = useLocation()
  const isHomeRoute = location.pathname === '/'
  const isCaseStudiesGallery = isCaseStudiesGalleryRoute(location.pathname)

  const markNavLogoUserScroll = useCallback(() => {
    navLogoUserIntentRef.current = true
  }, [])

  const onMainScrollActivity = useCallback(() => {
    if (isCaseStudiesGallery) return
    if (!navLogoUserIntentRef.current) return

    if (!navLogoScrollDebounceRef.current) {
      setNavLogoScrollIdle(false)
    }

    clearTimeout(navLogoScrollDebounceRef.current)
    navLogoScrollDebounceRef.current = setTimeout(() => {
      setNavLogoScrollIdle(true)
      navLogoUserIntentRef.current = false
      navLogoScrollDebounceRef.current = null
    }, NAV_LOGO_SCROLL_IDLE_MS)
  }, [isCaseStudiesGallery])

  useEffect(() => {
    if (isMenuOpen) {
      if (navLogoScrollDebounceRef.current) {
        clearTimeout(navLogoScrollDebounceRef.current)
        navLogoScrollDebounceRef.current = null
      }
      setNavLogoScrollIdle(true)
    }
  }, [isMenuOpen])

  useEffect(() => {
    navLogoUserIntentRef.current = false
    setNavLogoScrollIdle(true)
    if (navLogoScrollDebounceRef.current) {
      clearTimeout(navLogoScrollDebounceRef.current)
      navLogoScrollDebounceRef.current = null
    }
  }, [location.pathname])

  useEffect(() => {
    if (prefersReducedMotion() || isCaseStudiesGallery) return undefined

    const main = document.querySelector('#main')
    const onUserKeyDown = (event) => {
      if (NAV_LOGO_USER_SCROLL_KEYS.has(event.key)) markNavLogoUserScroll()
    }

    window.addEventListener('wheel', markNavLogoUserScroll, { passive: true })
    window.addEventListener('keydown', onUserKeyDown)
    if (main) {
      main.addEventListener('touchmove', markNavLogoUserScroll, { passive: true })
    }

    let lenisOff = null
    let lenisPoll = null
    let lenisPollMax = null
    let lenisAttached = false
    const useLenis = usesLenisMainScroll(location.pathname)

    const tryAttachLenis = () => {
      if (lenisAttached || !useLenis) return true
      const lenis =
        window.__ensembleLenis ||
        window.locomotiveScroll?.lenisInstance ||
        window.locomotiveScroll?.LenisInstance
      if (lenis?.on && typeof lenis.off === 'function') {
        lenis.on('scroll', onMainScrollActivity)
        lenisAttached = true
        lenisOff = () => {
          try {
            lenis.off('scroll', onMainScrollActivity)
          } catch (e) {
            /* noop */
          }
        }
        return true
      }
      return false
    }

    const onScrollReady = () => {
      if (tryAttachLenis() && lenisPoll != null) {
        window.clearInterval(lenisPoll)
        lenisPoll = null
      }
    }

    if (useLenis) {
      if (!tryAttachLenis()) {
        lenisPoll = window.setInterval(() => {
          if (tryAttachLenis() && lenisPoll != null) {
            window.clearInterval(lenisPoll)
            lenisPoll = null
          }
        }, 120)
        lenisPollMax = window.setTimeout(() => {
          if (lenisPoll != null) {
            window.clearInterval(lenisPoll)
            lenisPoll = null
          }
        }, 12000)
      }
      window.addEventListener('ensemble:scroll-ready', onScrollReady)
    } else if (main) {
      main.addEventListener('scroll', onMainScrollActivity, { passive: true })
    }

    return () => {
      window.removeEventListener('wheel', markNavLogoUserScroll)
      window.removeEventListener('keydown', onUserKeyDown)
      window.removeEventListener('ensemble:scroll-ready', onScrollReady)
      if (main) {
        main.removeEventListener('touchmove', markNavLogoUserScroll)
        main.removeEventListener('scroll', onMainScrollActivity)
      }
      if (lenisPoll != null) window.clearInterval(lenisPoll)
      if (lenisPollMax != null) window.clearTimeout(lenisPollMax)
      if (lenisOff) lenisOff()
      if (navLogoScrollDebounceRef.current) {
        clearTimeout(navLogoScrollDebounceRef.current)
        navLogoScrollDebounceRef.current = null
      }
    }
  }, [isCaseStudiesGallery, location.pathname, onMainScrollActivity, markNavLogoUserScroll])

  const revealNavMenuContent = useCallback((content) => {
    revealFullscreenNavMenu(content, { instant: prefersReducedMotion() })
  }, [])

  const hideNavMenuContent = useCallback((content) => {
    if (!content) return
    gsap.set(content, { autoAlpha: 0, pointerEvents: 'none' })
  }, [])

  useEffect(() => {
    const full = fullscreenNavRef.current
    const shell = expandShellRef.current
    const backdrop = expandBackdropRef.current
    const content = navContentRef.current
    const menuBtn = menuButtonRef.current
    if (!full || !shell || !backdrop || !content || !menuBtn) return

    if (clickCounter === 0) {
      navWasOpenRef.current = true
      const rect = menuBtn.getBoundingClientRect()
      const { cx, cy } = triggerCenter(rect)
      const origin = originPercent(cx, cy)
      expandOriginRef.current = origin
      setExpandOrigin(backdrop, origin)

      expandTweenRef.current?.kill()
      revealDelayRef.current?.kill()
      revealDelayRef.current = null

      hideNavMenuContent(content)
      gsap.set(backdrop, {
        autoAlpha: 1,
        clipPath: clipCircleAt(origin.x, origin.y, 0),
      })

      full.classList.add('is-visible')
      full.style.pointerEvents = 'auto'

      if (prefersReducedMotion()) {
        gsap.set(backdrop, { clipPath: clipCircleAt(origin.x, origin.y, 150) })
        setNavOverlayActive(true)
        revealNavMenuContent(content)
        return
      }

      expandTweenRef.current = gsap.to(backdrop, {
        clipPath: clipCircleAt(origin.x, origin.y, 150),
        duration: 0.95,
        ease: 'power3.inOut',
        onComplete: () => {
          expandTweenRef.current = null
          setNavOverlayActive(true)
          revealNavMenuContent(content)
        },
      })
    } else {
      if (!navWasOpenRef.current) return

      const origin = expandOriginRef.current

      const finishClose = () => {
        expandTweenRef.current?.kill()
        expandTweenRef.current = null
        revealDelayRef.current?.kill()
        revealDelayRef.current = null
        navWasOpenRef.current = false
        full.classList.remove('is-visible')
        full.style.pointerEvents = 'none'
        gsap.set(backdrop, { autoAlpha: 0, clearProps: 'clipPath' })
        gsap.set(content, { clearProps: 'opacity,visibility,pointerEvents' })
        resetFullscreenNavMenu(content)
        gsap.set(content.querySelectorAll('.fs-nav-showcase-scroll'), {
          clearProps: 'opacity,visibility,transform',
        })
        setNavOverlayActive(false)
      }

      if (prefersReducedMotion()) {
        hideNavMenuContent(content)
        setNavOverlayActive(false)
        finishClose()
        return
      }

      expandTweenRef.current?.kill()
      revealDelayRef.current?.kill()
      revealDelayRef.current = null
      setNavOverlayActive(false)

      gsap.to(content, {
        autoAlpha: 0,
        duration: 0.22,
        ease: 'power2.in',
      })

      expandTweenRef.current = gsap.to(backdrop, {
        clipPath: clipCircleAt(origin.x, origin.y, 0),
        duration: 0.78,
        ease: 'power3.inOut',
        delay: 0.08,
        onComplete: () => {
          expandTweenRef.current = null
          finishClose()
        },
      })
    }
  }, [clickCounter, hideNavMenuContent, revealNavMenuContent])

  /** Infinite vertical loop: tripled items, jump scroll when crossing top/bottom band. */
  useEffect(() => {
    if (!isMenuOpen || prefersReducedMotion()) return

    const scrollEl = showcaseScrollRef.current
    if (!scrollEl) return

    const getBlockHeight = () => {
      const items = scrollEl.querySelectorAll(':scope > ul > li.fs-nav-showcase-card')
      const n = navShowcaseStudies.length
      if (items.length < n * 2) return 0
      const top0 = items[0].offsetTop
      const topN = items[n].offsetTop
      return Math.max(0, topN - top0)
    }

    const centerScroll = () => {
      const block = getBlockHeight()
      if (block > 0) {
        scrollEl.scrollTop = block
      }
    }

    let cancelled = false
    const runCenter = () => {
      if (!cancelled) centerScroll()
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(runCenter)
    })
    const lateCenter = window.setTimeout(runCenter, 380)

    let seamLock = false
    const onScroll = () => {
      const motion = showcaseMotionRef.current
      if (
        seamLock ||
        showcaseDragRef.current.dragging ||
        Math.abs(motion.velocity) > SHOWCASE_VELOCITY_CUTOFF
      ) {
        return
      }
      const block = getBlockHeight()
      if (block <= 0) return
      const st = scrollEl.scrollTop
      if (st >= block * (SHOWCASE_LOOP_COPIES - 1) - SHOWCASE_LOOP_EDGE_PX) {
        seamLock = true
        scrollEl.scrollTop = st - block
        requestAnimationFrame(() => {
          seamLock = false
        })
      } else if (st <= SHOWCASE_LOOP_EDGE_PX) {
        seamLock = true
        scrollEl.scrollTop = st + block
        requestAnimationFrame(() => {
          seamLock = false
        })
      }
    }

    scrollEl.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelled = true
      window.clearTimeout(lateCenter)
      scrollEl.removeEventListener('scroll', onScroll)
    }
  }, [isMenuOpen, navShowcaseStudies.length])

  /** Pointer drag + DNA-style inertia for Selected work rail. */
  useEffect(() => {
    if (!isMenuOpen) return undefined

    const scrollEl = showcaseScrollRef.current
    if (!scrollEl) return undefined

    const drag = showcaseDragRef.current
    const motion = showcaseMotionRef.current
    const captureOpts = { capture: true }

    const getBlockHeight = () => {
      const items = scrollEl.querySelectorAll(':scope > ul > li.fs-nav-showcase-card')
      const n = navShowcaseStudies.length
      if (items.length < n * 2) return 0
      const top0 = items[0].offsetTop
      const topN = items[n].offsetTop
      return Math.max(0, topN - top0)
    }

    const normalizeScrollSeam = () => {
      const block = getBlockHeight()
      if (block <= 0) return
      const st = scrollEl.scrollTop
      if (st >= block * (SHOWCASE_LOOP_COPIES - 1) - SHOWCASE_LOOP_EDGE_PX) {
        scrollEl.scrollTop = st - block
      } else if (st <= SHOWCASE_LOOP_EDGE_PX) {
        scrollEl.scrollTop = st + block
      }
    }

    const stopInertiaLoop = () => {
      if (showcaseRafRef.current) {
        cancelAnimationFrame(showcaseRafRef.current)
        showcaseRafRef.current = 0
      }
    }

    const tick = (now) => {
      const deltaSec = Math.min(0.05, (now - showcaseLastFrameRef.current) / 1000)
      showcaseLastFrameRef.current = now

      if (Math.abs(motion.velocity) > SHOWCASE_VELOCITY_CUTOFF) {
        scrollEl.scrollTop += motion.velocity * deltaSec
        normalizeScrollSeam()
        motion.velocity *= Math.exp(-SHOWCASE_DRAG_FRICTION * deltaSec)
      } else {
        motion.velocity = 0
        normalizeScrollSeam()
        scrollEl.classList.remove('is-inertia')
        showcaseRafRef.current = 0
        return
      }

      showcaseRafRef.current = requestAnimationFrame(tick)
    }

    const startInertiaLoop = () => {
      if (showcaseRafRef.current) return
      scrollEl.classList.add('is-inertia')
      showcaseLastFrameRef.current = performance.now()
      showcaseRafRef.current = requestAnimationFrame(tick)
    }

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      stopInertiaLoop()
      scrollEl.classList.remove('is-inertia')
      motion.velocity = 0
      motion.sampleVelocity = 0

      drag.pointerId = event.pointerId
      drag.dragging = false
      drag.moved = false
      drag.startY = event.clientY
      drag.startScrollTop = scrollEl.scrollTop
      drag.lastPointerY = event.clientY
      drag.lastPointerTime = performance.now()
      drag.pointerDownTarget = event.target
    }

    const onPointerMove = (event) => {
      if (drag.pointerId !== event.pointerId) return

      const deltaY = event.clientY - drag.startY
      if (!drag.dragging) {
        if (Math.abs(deltaY) < SHOWCASE_DRAG_THRESHOLD) return

        drag.dragging = true
        drag.moved = true
        scrollEl.classList.add('is-dragging')
        try {
          scrollEl.setPointerCapture(event.pointerId)
        } catch {
          /* noop */
        }
      }

      event.preventDefault()
      scrollEl.scrollTop = drag.startScrollTop - deltaY

      const now = performance.now()
      const dt = (now - drag.lastPointerTime) / 1000
      if (dt > 0 && dt < 0.08) {
        const instantV = (drag.lastPointerY - event.clientY) / dt
        motion.sampleVelocity = motion.sampleVelocity * 0.55 + instantV * 0.45
      }

      drag.lastPointerY = event.clientY
      drag.lastPointerTime = now
    }

    const endDrag = (event) => {
      if (drag.pointerId !== event.pointerId) return

      const wasDragging = drag.dragging
      const downTarget = drag.pointerDownTarget

      if (!wasDragging) {
        drag.pointerId = null
        drag.pointerDownTarget = null

        const link =
          downTarget instanceof Element
            ? downTarget.closest('.fs-nav-showcase-card a')
            : null
        if (link instanceof HTMLAnchorElement && event.pointerType !== 'mouse') {
          link.click()
        }
        return
      }

      scrollEl.classList.remove('is-dragging')
      normalizeScrollSeam()

      if (drag.moved) {
        if (showcaseReducedMotion) {
          motion.velocity = 0
        } else {
          motion.velocity = motion.sampleVelocity * SHOWCASE_VELOCITY_DAMP
          if (Math.abs(motion.velocity) > SHOWCASE_VELOCITY_CUTOFF) {
            startInertiaLoop()
          } else {
            motion.velocity = 0
          }
        }

        const blockClick = (clickEvent) => {
          clickEvent.preventDefault()
          clickEvent.stopPropagation()
          scrollEl.removeEventListener('click', blockClick, true)
        }
        scrollEl.addEventListener('click', blockClick, true)
      }

      try {
        scrollEl.releasePointerCapture(event.pointerId)
      } catch {
        /* noop */
      }

      drag.pointerId = null
      drag.dragging = false
      drag.moved = false
      drag.pointerDownTarget = null
    }

    const onDragStart = (event) => {
      event.preventDefault()
    }

    scrollEl.addEventListener('pointerdown', onPointerDown, captureOpts)
    scrollEl.addEventListener('pointermove', onPointerMove, { ...captureOpts, passive: false })
    scrollEl.addEventListener('pointerup', endDrag, captureOpts)
    scrollEl.addEventListener('pointercancel', endDrag, captureOpts)
    scrollEl.addEventListener('dragstart', onDragStart, captureOpts)

    return () => {
      stopInertiaLoop()
      scrollEl.classList.remove('is-dragging', 'is-inertia')
      scrollEl.removeEventListener('pointerdown', onPointerDown, captureOpts)
      scrollEl.removeEventListener('pointermove', onPointerMove, captureOpts)
      scrollEl.removeEventListener('pointerup', endDrag, captureOpts)
      scrollEl.removeEventListener('pointercancel', endDrag, captureOpts)
      scrollEl.removeEventListener('dragstart', onDragStart, captureOpts)
      drag.pointerId = null
      drag.dragging = false
      drag.moved = false
      drag.pointerDownTarget = null
      motion.velocity = 0
      motion.sampleVelocity = 0
    }
  }, [isMenuOpen, navShowcaseStudies.length, showcaseReducedMotion])

  const toggleMenu = () => {
    const newCounter = clickCounter === 1 ? 0 : 1
    setClickCounter(newCounter)
    setIsMenuOpen(newCounter === 0)
  }

  const closeOverlay = () => {
    setClickCounter(1)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Navigation Bar - always sticky at top */}
      <nav
        ref={menuRef}
        data-scroll
        data-scroll-sticky
        data-scroll-target="#main"
        className={`nav${isCaseStudiesGallery ? ' nav--case-studies-gallery' : ''}`}
        data-menu-open={isMenuOpen ? 'true' : 'false'}
        data-cursor-suppress
      >
        <div className="nav__brand" data-cursor-suppress>
          <NavPixelLink
            to="/"
            onClick={closeOverlay}
            className={`logo hide flex items-center ${
              navLogoScrollIdle || isMenuOpen || isCaseStudiesGallery ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Ensemble Digital Labs home"
          >
            <AnimatedBrandLogo variant="nav" priority imgAlt="" />
          </NavPixelLink>
        </div>

        {isCaseStudiesGallery && !isMenuOpen ? (
          <h1
            className="nav__page-heading nav__page-heading--in-bar"
            data-gallery-nav-title
          >
            CASE STUDIES GALLERY
          </h1>
        ) : null}

        {isHomeRoute ? (
          <div
            className="pointer-events-none absolute inset-0 z-[998] hidden items-center justify-center px-[clamp(5.75rem,16vw,12rem)] sm:px-[clamp(6.25rem,18vw,14rem)] lg:flex lg:px-[clamp(7rem,22vw,18rem)]"
            aria-hidden={false}
          >
            {/* Mount: intro eyebrow portaled from `HomePageSections` (intro slide only). */}
            <div
              id="home-nav-eyebrow-root"
              className="min-w-0 max-w-[min(100%,34rem)] text-balance text-center sm:max-w-[38rem] md:max-w-[44rem]"
            />
          </div>
        ) : null}

        {/* Compact mark (revealed on scroll when nav logo swap enabled) */}
        <NavPixelLink to="/" onClick={closeOverlay} className="logo-owl reveal" style={{ opacity: 1, display: 'none' }} aria-label="Ensemble Digital Labs home">
          E
        </NavPixelLink>

        {/* Menu Button */}
        <div className="button-menu">
          <button
            type="button"
            className="menu relative border-0 bg-transparent p-0"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div
              ref={menuButtonRef}
              id="menu"
              data-open={isMenuOpen ? 'true' : 'false'}
              className="nav-menu-trigger relative flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 lg:h-16 lg:w-16"
            >
              <span className="nav-menu-trigger__lines" aria-hidden>
                <span ref={hamburgerLine1Ref} className="nav-menu-trigger__line nav-menu-trigger__line--1" />
                <span ref={hamburgerLine2Ref} className="nav-menu-trigger__line nav-menu-trigger__line--2" />
                <span ref={hamburgerLine3Ref} className="nav-menu-trigger__line nav-menu-trigger__line--3" />
              </span>
            </div>
          </button>
        </div>
      </nav>

          {/* Fullscreen Menu — dark grid + indexed links (med-tech / premium agency) */}
          <div
            ref={fullscreenNavRef}
            id="fullscreen-nav"
            data-cursor-suppress
            className="fixed inset-0 z-[999998] h-[100dvh] max-h-[100dvh] overflow-hidden bg-transparent text-zinc-200 pointer-events-none"
          >
            <div ref={expandShellRef} className="fs-nav-expand-shell">
              <div ref={expandBackdropRef} className="fs-nav-expand-backdrop" aria-hidden />

              <div
                ref={navContentRef}
                className="fs-nav-expand-content relative z-10 mx-auto flex h-full min-h-0 max-h-[100dvh] w-full max-w-[1600px] flex-col px-2 pb-5 pt-16 sm:px-3 sm:pb-6 sm:pt-[4.75rem] lg:max-w-none lg:flex-row lg:items-stretch lg:gap-0 lg:px-0 lg:pb-6 lg:pt-[5.25rem]"
              >
              {/* Laptop+ — selected work left; logo E mark right */}
              <aside
                className="fs-nav-showcase-aside pointer-events-auto hidden min-h-0 w-full shrink-0 border-t border-white/[0.08] pt-5 lg:order-1 lg:flex lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:flex-col lg:border-t-0 lg:pt-0 lg:pl-10 lg:pr-2 lg:pb-6 xl:pl-14 xl:pr-3 2xl:pr-4"
                aria-label="Selected work"
              >
                <div
                  ref={showcaseScrollRef}
                  data-cursor-intent="drag"
                  className="fs-nav-showcase-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-2 pr-1 [-webkit-overflow-scrolling:touch] lg:cursor-grab lg:py-0 lg:scroll-pt-4"
                >
                  <ul className="m-0 flex list-none flex-col gap-9 pb-6 pl-0 sm:gap-10 lg:gap-0 lg:pb-4 lg:pt-2">
                    {showcaseCopiesToRender.flatMap((copyIdx) =>
                      navShowcaseStudies.map((study) => (
                      <li
                        key={`nav-work-loop-${copyIdx}-${study.slug}`}
                        data-showcase-loop-copy={copyIdx}
                        {...(copyIdx === (showcaseReducedMotion ? 0 : 1)
                          ? { 'data-showcase-loop-anim': '1' }
                          : {})}
                        className="fs-nav-showcase-card m-0 shrink-0 p-0 lg:flex lg:min-h-0 lg:flex-col lg:py-[min(1.1vh,0.55rem)]"
                      >
                        <NavPixelLink
                          to={`/case-studies/${study.slug}`}
                          onClick={closeOverlay}
                          draggable={false}
                          className="group flex h-full min-h-0 flex-1 flex-col no-underline outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                        >
                          <div className="shrink-0 lg:pr-1">
                            <h3 className="font-display text-[clamp(0.95rem,1.25vw,1.2rem)] font-bold leading-[1.14] tracking-[-0.02em] text-zinc-100 underline decoration-transparent decoration-2 underline-offset-[0.2em] transition-colors duration-300 group-hover:decoration-zinc-400/90 lg:text-[clamp(1.1rem,min(1.75vw,1.5rem),1.7rem)] lg:leading-[1.1] lg:line-clamp-3">
                              {study.title}
                            </h3>
                          </div>
                          <div className="fs-nav-showcase-media-block mt-3 flex items-center gap-3 sm:gap-3.5 lg:mt-3.5">
                            <div className="fs-nav-showcase-media-frame">
                              <img
                                src={study.image}
                                alt=""
                                width={800}
                                height={800}
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                                className="fs-nav-showcase-media-frame__img transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                              />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col justify-center pb-0.5 text-left">
                              <p className="m-0 font-display text-base font-bold leading-tight tracking-[-0.02em] text-white sm:text-lg lg:text-xl">
                                {study.client}
                              </p>
                            </div>
                          </div>
                        </NavPixelLink>
                      </li>
                      ))
                    )}
                  </ul>
                </div>
              </aside>

              <div className="fs-nav-panel-nav pointer-events-auto flex min-h-0 w-full flex-1 flex-col items-center justify-start gap-0 pt-0 sm:pt-0 lg:order-2 lg:h-full lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:flex-col lg:items-stretch lg:justify-center lg:pl-0 lg:pr-8 lg:pt-0 xl:pl-1 xl:pr-10 2xl:pl-2 2xl:pr-12">
                <nav
                  id="offering"
                  className="fs-nav-primary flex min-h-0 w-full max-w-full flex-1 flex-col items-center justify-start overflow-visible lg:min-w-0 lg:items-stretch"
                  aria-label="Primary"
                >
                  <div className="fs-nav-logo-accordion-wrap flex min-h-0 w-full flex-1 flex-col">
                    <div className="fs-nav-logo-mark flex min-h-0 w-full flex-1">
                      <EnsembleLogoNav onLinkClick={closeOverlay} iconSize={38} />
                    </div>
                  </div>
                </nav>
              </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default FullscreenNav
