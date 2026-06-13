import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/navigation'
import NavPixelLink from './NavPixelLink'
import { caseStudies } from '../lib/content'
import { prefersReducedMotion, setNavOverlayActive, shouldUseNativeMainScroll } from '../lib/utils'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import { growthPrimaryNav } from '../lib/growthCtaClasses'
import { ambientAssets } from '../lib/ambientAssets'

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
  const isNativeOnlyRoute = pathname === '/dna-capital-clone' || pathname === '/case-studies'
  return !isNativeOnlyRoute && !shouldUseNativeMainScroll()
}
/** Tripled list + scroll jump for seamless infinite vertical scroll (showcase rail). */
const SHOWCASE_LOOP_COPIES = 3
const SHOWCASE_LOOP_EDGE_PX = 72

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
  const menuButtonRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const showcaseScrollRef = useRef(null)

  const showcaseLoopCopies = useMemo(
    () => Array.from({ length: SHOWCASE_LOOP_COPIES }, (_, copyIdx) => copyIdx),
    []
  )
  const showcaseReducedMotion = prefersReducedMotion()
  const showcaseCopiesToRender = showcaseReducedMotion ? [0] : showcaseLoopCopies

  useEffect(() => {
    setNavOverlayActive(isMenuOpen)
    return () => setNavOverlayActive(false)
  }, [isMenuOpen])

  const location = useLocation()
  const isHomeRoute = location.pathname === '/'
  const isCaseStudiesGallery = location.pathname === '/case-studies'

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

  useEffect(() => {
    if (prefersReducedMotion()) return

    const full = fullscreenNavRef.current
    const menu1 = menuButtonRef.current
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const line3 = line3Ref.current
    const navCta = document.querySelector('[data-nav-cta]')

    if (!full || !menu1 || !line1 || !line2 || !line3) return

    if (clickCounter === 0) {
      // Menu open — X must read on dark overlay (black lines on transparent = invisible)
      full.style.transform = 'translateY(0%)'
      full.style.pointerEvents = 'auto'

      if (navCta) navCta.style.opacity = '0'
      menu1.style.backgroundColor = 'rgba(8, 12, 18, 0.88)'
      menu1.style.backdropFilter = 'blur(10px)'
      menu1.style.border = '1.5px solid var(--color-brand-primary, #e94e77)'
      menu1.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.45)'
      line1.style.transform = 'rotate(45deg) translate(0, 0)'
      line2.style.opacity = '0'
      line3.style.transform = 'rotate(-45deg) translate(0, 0)'
      line1.style.backgroundColor = '#f4f4f5'
      line2.style.backgroundColor = '#f4f4f5'
      line3.style.backgroundColor = '#f4f4f5'
      line1.style.height = '2px'
      line2.style.height = '2px'
      line3.style.height = '2px'

      // Animate menu items (like poppr)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const menuItems = full.querySelectorAll('.menu-item')
          const contactBlock = full.querySelector('.nav-contacts')
          const showcaseCards = full.querySelectorAll(
            '.fs-nav-showcase-card[data-showcase-loop-anim="1"]'
          )
          const studioVisible =
            typeof window !== 'undefined' &&
            !window.matchMedia('(min-width: 1024px)').matches
          if (menuItems.length > 0) {
            gsap.from(menuItems, {
              opacity: 0,
              y: 56,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.055,
              ease: 'power3.out',
            })
          }
          if (contactBlock && studioVisible) {
            gsap.from(contactBlock, {
              opacity: 0,
              y: 24,
              duration: 0.45,
              delay: 0.08,
              ease: 'power2.out',
            })
          }
          if (showcaseCards.length > 0) {
            gsap.from(showcaseCards, {
              opacity: 0,
              y: 28,
              autoAlpha: 1,
              duration: 0.42,
              stagger: 0.06,
              delay: 0.12,
              ease: 'power2.out',
            })
          }
        })
      })
    } else {
      // Menu closed
      full.style.transform = 'translateY(-100%)'
      full.style.pointerEvents = 'none'
      
      if (navCta) navCta.style.opacity = '1'

      menu1.style.backgroundColor = 'var(--color-brand-primary, #e94e77)'
      menu1.style.border = 'none'
      menu1.style.backdropFilter = ''
      menu1.style.boxShadow = 'none'
      // Reset to 3 lines
      line1.style.transform = 'translateY(-10px)'
      line2.style.transform = 'translateY(0)'
      line2.style.opacity = '1'
      line3.style.transform = 'translateY(10px)'
      line1.style.backgroundColor = '#000'
      line2.style.backgroundColor = '#000'
      line3.style.backgroundColor = '#000'
      line1.style.height = ''
      line2.style.height = ''
      line3.style.height = ''
    }
  }, [clickCounter])

  /** Infinite vertical loop: tripled items, jump scroll when crossing top/bottom band. */
  useEffect(() => {
    if (!isMenuOpen || prefersReducedMotion()) return

    const scrollEl = showcaseScrollRef.current
    if (!scrollEl) return

    const getBlockHeight = () => {
      const items = scrollEl.querySelectorAll(':scope > ul > li.fs-nav-showcase-card')
      const n = caseStudies.length
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
      if (seamLock) return
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
  }, [isMenuOpen, caseStudies.length])

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
      >
        <div className="nav__brand">
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

          {isCaseStudiesGallery && !isMenuOpen ? (
            <h1 className="nav__page-heading nav__page-heading--in-bar">CASE STUDIES GALLERY</h1>
          ) : null}
        </div>

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
          <NavPixelLink
            to="/contact"
            data-nav-cta
            onClick={closeOverlay}
            className={`${growthPrimaryNav} no-underline transition-opacity duration-300`}
          >
            Get in touch
          </NavPixelLink>

          <button
            type="button"
            className="menu relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div
              ref={menuButtonRef}
              id="menu"
              className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-brand-primary flex items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                ref={line1Ref}
                id="line1"
                className="absolute z-[2] h-0.5 w-7 bg-black transition-all duration-1000"
                style={{ transform: 'translateY(-10px)' }}
              />
              <div
                ref={line2Ref}
                id="line2"
                className="absolute z-[2] h-0.5 w-7 bg-black transition-all duration-1000"
                style={{ transform: 'translateY(0)' }}
              />
              <div
                ref={line3Ref}
                id="line3"
                className="absolute z-[2] h-0.5 w-7 bg-black transition-all duration-1000"
                style={{ transform: 'translateY(10px)' }}
              />
              <div
                id="an-cir1"
                className="pointer-events-none anim-circle absolute z-0 h-full w-full rounded-full bg-white opacity-0 shadow-[0_0_20px_rgba(255,255,255,0.35)]"
              />
              <div
                id="an-cir2"
                className="pointer-events-none anim-circle absolute z-0 h-full w-full rounded-full bg-cyan-300 opacity-0 shadow-[0_0_18px_rgba(103,232,249,0.45)]"
              />
            </div>
          </button>
        </div>
      </nav>

          {/* Fullscreen Menu — dark grid + indexed links (med-tech / premium agency) */}
          <div
            ref={fullscreenNavRef}
            id="fullscreen-nav"
            className="fixed inset-0 z-[999998] h-[100dvh] max-h-[100dvh] overflow-hidden bg-transparent text-zinc-200 pointer-events-none transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: 'translateY(-100%)', pointerEvents: 'none' }}
          >
            <img
              src={ambientAssets.navMenuBg}
              alt=""
              width={1920}
              height={1080}
              decoding="async"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
            />

            <div className="relative z-10 mx-auto flex h-full min-h-0 max-h-[100dvh] w-full max-w-[1600px] flex-col gap-3 px-4 pb-5 pt-16 sm:gap-4 sm:px-6 sm:pb-6 sm:pt-[4.75rem] lg:max-w-none lg:flex-row lg:items-stretch lg:gap-0 lg:px-0 lg:py-6 lg:pt-[5.25rem]">
              {/* Nav + studio below lg; from lg: 50% width + subtle read surface (Studio hidden on lg+) */}
              <div className="flex min-h-0 flex-1 flex-col justify-center gap-0 lg:min-h-0 lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:flex-row lg:items-center lg:border-r lg:border-white/[0.06] lg:pl-10 lg:pr-8 xl:pl-14 xl:pr-10">
                <nav
                  id="offering"
                  className="font-display flex min-h-0 flex-1 flex-col justify-center gap-0 lg:min-w-0 lg:flex-1"
                  aria-label="Primary"
                >
                  {navLinks.map((link, index) => (
                    <NavPixelLink
                      key={link.id}
                      to={link.path}
                      className="menu-item group relative flex items-baseline gap-2 border-b border-white/[0.07] py-2 sm:gap-4 sm:py-2.5 md:py-3 no-underline outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                      onClick={closeOverlay}
                    >
                      <span className="w-6 shrink-0 font-mono text-[9px] font-medium tabular-nums tracking-[0.16em] text-cyan-200/45 transition-colors duration-300 group-hover:text-cyan-200/80 sm:w-8 sm:text-[10px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="fs-menu-label relative flex-1 font-display text-[clamp(1.35rem,min(6.2vh,3.65rem),3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-zinc-100 transition-[background-position,color] duration-500">
                        {link.label}
                      </span>
                      <span
                        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-300 via-teal-400 to-amber-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        aria-hidden
                      />
                    </NavPixelLink>
                  ))}
                </nav>

                <aside className="nav-contacts flex shrink-0 flex-col justify-center gap-3 border-t border-rose-400/18 pt-4 sm:gap-3.5 sm:pt-5 lg:hidden">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-rose-300/70 sm:text-[10px]">
                    Studio
                  </p>
                  <a
                    href="mailto:hello@ensemble.digital"
                    className="group relative inline-flex w-fit text-sm font-medium leading-snug text-zinc-200 no-underline transition-colors hover:text-rose-100 sm:text-base"
                  >
                    hello@ensemble<span className="text-growth-to">.</span>digital
                    <span
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-growth-from to-growth-to transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  </a>
                  <a
                    href="tel:+14697040457"
                    className="group relative inline-flex w-fit text-sm font-medium text-zinc-200 no-underline transition-colors hover:text-rose-100 sm:text-base"
                  >
                    +1 (469) 704-0457
                    <span
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-growth-from to-orange-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=11715+Administration+Dr+Suite+226+St.+Louis+MO+63146"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative max-w-md text-sm leading-snug text-zinc-400 no-underline transition-colors hover:text-zinc-200 sm:text-base"
                  >
                    11715 Administration Dr, Suite 226, St. Louis, MO 63146
                    <span
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-growth-from/90 to-growth-to/85 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  </a>
                </aside>
              </div>

              {/* Laptop+ — half width; work list loops vertically (tripled + scroll seam) */}
              <aside
                className="pointer-events-auto hidden min-h-0 w-full shrink-0 border-t border-white/[0.08] pt-5 lg:flex lg:w-1/2 lg:max-w-[50%] lg:flex-none lg:flex-col lg:border-t-0 lg:pl-8 lg:pr-10 lg:pt-4 xl:pl-10 xl:pr-14"
                aria-label="Selected work"
              >
                <p className="mb-2 shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-rose-300/55 sm:text-[10px] lg:mb-3">
                  Selected work
                </p>
                <div
                  ref={showcaseScrollRef}
                  className="fs-nav-showcase-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain py-2 pr-1 [-webkit-overflow-scrolling:touch] lg:h-[min(72svh,calc(100dvh-6.25rem))] lg:max-h-[min(72svh,calc(100dvh-6.25rem))]"
                >
                  <ul className="m-0 flex list-none flex-col gap-9 pb-6 pl-0 sm:gap-10 lg:gap-0 lg:pb-4 lg:pt-0">
                    {showcaseCopiesToRender.flatMap((copyIdx) =>
                      caseStudies.map((study) => (
                      <li
                        key={`nav-work-loop-${copyIdx}-${study.slug}`}
                        data-showcase-loop-copy={copyIdx}
                        {...(copyIdx === (showcaseReducedMotion ? 0 : 1)
                          ? { 'data-showcase-loop-anim': '1' }
                          : {})}
                        className="fs-nav-showcase-card m-0 shrink-0 p-0 lg:flex lg:min-h-[min(52svh,460px)] lg:flex-col lg:py-[min(1.75vh,0.65rem)]"
                      >
                        <NavPixelLink
                          to={`/case-studies/${study.slug}`}
                          onClick={closeOverlay}
                          className="group flex h-full min-h-0 flex-1 flex-col no-underline outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                        >
                          <div className="shrink-0 lg:pr-1">
                            <h3 className="font-display text-[clamp(1.05rem,1.45vw,1.35rem)] font-bold leading-[1.12] tracking-[-0.02em] text-zinc-100 underline decoration-transparent decoration-2 underline-offset-[0.2em] transition-colors duration-300 group-hover:decoration-zinc-400/90 lg:text-[clamp(1.45rem,min(2.5vw,2.15rem),2.5rem)] lg:leading-[1.06] lg:line-clamp-3">
                              {study.title}
                            </h3>
                          </div>
                          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 lg:mt-5 lg:min-h-0 lg:flex-1 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-7">
                            <div className="flex shrink-0 flex-col justify-center gap-1.5 text-left lg:max-w-[11rem] xl:max-w-[13rem]">
                              <p className="m-0 font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-zinc-400 sm:text-[11px]">
                                {study.category}
                              </p>
                              <p className="m-0 font-mono text-[10px] tabular-nums tracking-[0.12em] text-zinc-600" aria-hidden>
                                —
                              </p>
                              <p className="m-0 font-display text-sm font-semibold leading-snug tracking-[-0.01em] text-zinc-200 sm:text-base">
                                {study.client}
                              </p>
                            </div>
                            <div className="relative min-h-[7.5rem] min-w-0 flex-1 self-stretch overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a1220]/80 shadow-[0_8px_28px_rgba(0,0,0,0.22)] lg:min-h-[min(22svh,220px)]">
                              <img
                                src={study.image}
                                alt=""
                                width={800}
                                height={600}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                              />
                            </div>
                          </div>
                        </NavPixelLink>
                      </li>
                      ))
                    )}
                  </ul>
                </div>
              </aside>
            </div>
      </div>
    </>
  )
}

export default FullscreenNav
