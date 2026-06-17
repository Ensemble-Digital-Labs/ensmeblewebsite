import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { HOME_NARRATIVE_SECTIONS } from '../../lib/homeNarrativeSections'
import { cn, prefersReducedMotion, scrollMainToTarget } from '../../lib/utils'
import { useHomeStory } from './HomeStoryViewport'

const RAIL_SECTIONS = HOME_NARRATIVE_SECTIONS.filter(
  (s) => s.id !== 'home-hero' && s.id !== 'home-cta',
)

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

function railNumeral(index) {
  return ROMAN_NUMERALS[index] ?? String(index + 1)
}

/** True only after the hero has mostly left the viewport (scroll position, not IO active id). */
function usePastHero() {
  const location = useLocation()
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (location.pathname !== '/') {
      setPastHero(false)
      return undefined
    }

    const check = () => {
      const hero = document.getElementById('home-hero')
      if (!hero) {
        setPastHero(false)
        return
      }

      const heroRect = hero.getBoundingClientRect()
      const showAt = window.innerHeight * 0.52
      const hideAt = window.innerHeight * 0.64
      setPastHero((prev) => (prev ? heroRect.bottom <= hideAt : heroRect.bottom <= showAt))
    }

    check()

    const main = document.querySelector('#main')
    main?.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    window.addEventListener('ensemble:scroll-ready', check)

    const lenis = typeof window !== 'undefined' ? window.__ensembleLenis : null
    if (lenis?.on) lenis.on('scroll', check)

    return () => {
      main?.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.removeEventListener('ensemble:scroll-ready', check)
      if (lenis?.off) lenis.off('scroll', check)
    }
  }, [location.pathname])

  return pastHero
}

/** Hide chapter rail while the contact CTA band is in view. */
function useInCtaSection() {
  const location = useLocation()
  const [inCta, setInCta] = useState(false)

  useEffect(() => {
    if (location.pathname !== '/') {
      setInCta(false)
      return undefined
    }

    const check = () => {
      const cta = document.getElementById('home-cta')
      if (!cta) {
        setInCta(false)
        return
      }

      const rect = cta.getBoundingClientRect()
      const showAt = window.innerHeight * 0.58
      const hideAt = window.innerHeight * 0.68
      setInCta((prev) => (prev ? rect.top <= hideAt : rect.top <= showAt))
    }

    check()

    const main = document.querySelector('#main')
    main?.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    window.addEventListener('ensemble:scroll-ready', check)

    const lenis = typeof window !== 'undefined' ? window.__ensembleLenis : null
    if (lenis?.on) lenis.on('scroll', check)

    return () => {
      main?.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.removeEventListener('ensemble:scroll-ready', check)
      if (lenis?.off) lenis.off('scroll', check)
    }
  }, [location.pathname])

  return inCta
}

/** Hide chapter rail once the cinematic footer enters view (avoid overlap). */
function useNearFooter() {
  const location = useLocation()
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    if (location.pathname !== '/') {
      setNearFooter(false)
      return undefined
    }

    const check = () => {
      const footer = document.getElementById('ensemble-cinematic-footer')
      if (!footer) {
        setNearFooter(false)
        return
      }

      const footerTop = footer.getBoundingClientRect().top
      setNearFooter(footerTop <= window.innerHeight * 0.78)
    }

    check()

    const main = document.querySelector('#main')
    main?.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    window.addEventListener('ensemble:scroll-ready', check)

    const lenis = typeof window !== 'undefined' ? window.__ensembleLenis : null
    if (lenis?.on) lenis.on('scroll', check)

    return () => {
      main?.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      window.removeEventListener('ensemble:scroll-ready', check)
      if (lenis?.off) lenis.off('scroll', check)
    }
  }, [location.pathname])

  return nearFooter
}

/** PopArt-style chapter rail — pops in after hero; desktop rail on the right (lg+). */
export default function HomeSectionIndex() {
  const story = useHomeStory()
  const location = useLocation()
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const itemRefs = useRef([])
  const playedInRef = useRef(false)
  const pastHero = usePastHero()
  const inCtaSection = useInCtaSection()
  const nearFooter = useNearFooter()
  const railVisible = pastHero && !inCtaSection && !nearFooter
  const [mounted, setMounted] = useState(false)

  const activeSlug = story?.activeSectionId ?? HOME_NARRATIVE_SECTIONS[0]?.id ?? ''

  useEffect(() => {
    setMounted(true)
  }, [])

  const onJump = (id) => {
    if (story?.goToSlideById) {
      void story.goToSlideById(id)
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    scrollMainToTarget(el)
  }

  /* Slide rail in + stagger items (once per hero exit) */
  useLayoutEffect(() => {
    if (!railVisible || !navRef.current || prefersReducedMotion()) return undefined

    const nav = navRef.current
    const items = itemRefs.current.filter(Boolean)

    if (!playedInRef.current) {
      playedInRef.current = true
      const inner = nav.querySelector('.home-scroll-spy__inner')
      gsap.fromTo(
        nav,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.62, ease: 'power3.out' },
      )
      if (inner) {
        gsap.fromTo(
          inner,
          { x: 28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' },
        )
      }
      gsap.fromTo(
        items,
        { x: 16, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.48, stagger: 0.07, ease: 'power3.out', delay: 0.12 },
      )
    }

    return undefined
  }, [railVisible])

  useEffect(() => {
    if (!railVisible) playedInRef.current = false
  }, [railVisible])

  /* Hide rail when back at hero or approaching footer */
  useLayoutEffect(() => {
    if (!navRef.current || prefersReducedMotion()) return undefined
    if (!railVisible) {
      const inner = navRef.current.querySelector('.home-scroll-spy__inner')
      gsap.set(navRef.current, { autoAlpha: 0 })
      if (inner) gsap.set(inner, { x: 28, autoAlpha: 0 })
    }
    return undefined
  }, [railVisible])

  /* Active indicator slides along the rail */
  useLayoutEffect(() => {
    if (!railVisible || !indicatorRef.current || !navRef.current) return undefined

    const activeIdx = RAIL_SECTIONS.findIndex((s) => s.id === activeSlug)
    const targetEl = activeIdx >= 0 ? itemRefs.current[activeIdx] : null
    if (!targetEl) return undefined

    if (prefersReducedMotion()) {
      gsap.set(indicatorRef.current, {
        top: targetEl.offsetTop + targetEl.offsetHeight / 2,
      })
      return undefined
    }

    gsap.to(indicatorRef.current, {
      top: targetEl.offsetTop + targetEl.offsetHeight / 2,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    })

    return undefined
  }, [activeSlug, railVisible, mounted])

  if (location.pathname !== '/') return null

  return (
    <>
      {/* Desktop — chapter rail on the right (lg+) */}
      <nav
        ref={navRef}
        aria-label="Homepage story sections"
        aria-hidden={!railVisible}
        className={cn(
          'home-scroll-spy home-scroll-spy--right pointer-events-none fixed z-[24] hidden lg:block',
          'right-[max(1.25rem,env(safe-area-inset-right))]',
          railVisible ? 'home-scroll-spy--visible' : 'home-scroll-spy--hidden',
        )}
      >
        <div className="home-scroll-spy__inner pointer-events-auto relative pr-1.5">
          <span className="home-scroll-spy__track" aria-hidden />
          <span ref={indicatorRef} className="home-scroll-spy__indicator" aria-hidden />

          <ol className="relative flex flex-col gap-0">
            {RAIL_SECTIONS.map((section, idx) => {
              const num = railNumeral(idx)
              const active = section.id === activeSlug
              return (
                <li
                  key={section.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el
                  }}
                >
                  <button
                    type="button"
                    title={section.label}
                    aria-label={`Jump to chapter ${num}: ${section.label}`}
                    aria-current={active ? 'step' : undefined}
                    onClick={() => onJump(section.id)}
                    className={cn(
                      'home-scroll-spy__item group flex min-h-[2.75rem] w-full flex-row-reverse items-center justify-end gap-1 py-1.5 pl-1 text-right transition-[opacity,color] duration-300',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300/80',
                      active ? 'is-active' : 'opacity-45 hover:opacity-80',
                    )}
                  >
                    <span
                      className={cn(
                        'home-scroll-spy__num font-display text-sm font-bold tabular-nums tracking-[0.12em] transition-all duration-300',
                        active ? 'scale-110 text-cyan-200' : 'text-white/50 group-hover:text-white/75',
                      )}
                    >
                      {num}
                    </span>
                    <span
                      className={cn(
                        'home-scroll-spy__label text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] transition-colors duration-300',
                        active ? 'text-white' : 'text-white/45 group-hover:text-white/70',
                      )}
                    >
                      {section.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </nav>

      {/* Mobile / tablet — compact right rail */}
      <nav
        aria-label="Homepage story sections"
        className={cn(
          'pointer-events-none fixed z-[24] lg:hidden',
          'right-[max(0.75rem,env(safe-area-inset-right))]',
          'top-1/2 -translate-y-1/2',
          pastHero && !inCtaSection && !nearFooter ? 'opacity-100' : 'pointer-events-none opacity-0',
          'transition-opacity duration-500',
        )}
      >
        <div className="pointer-events-auto flex flex-col items-end gap-0.5 pr-0.5">
          <ol className="flex flex-col items-end gap-0.5">
            {RAIL_SECTIONS.map((section, idx) => {
              const num = railNumeral(idx)
              const active = section.id === activeSlug
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    aria-label={`Jump to ${section.label}`}
                    aria-current={active ? 'step' : undefined}
                    onClick={() => onJump(section.id)}
                    className={cn(
                      'flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full transition-colors',
                      active ? 'bg-white/10 text-cyan-200' : 'text-white/35',
                    )}
                  >
                    <span className="font-display text-[10px] font-bold tabular-nums">{num}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </>
  )
}
