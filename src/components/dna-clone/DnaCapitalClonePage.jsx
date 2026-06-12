import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import DnaCapitalHelixCanvas from './DnaCapitalHelixCanvas'
import DnaCapitalLogo from './DnaCapitalLogo'
import {
  DNA_CAPITAL_NAV,
  DNA_CAPITAL_SECTIONS,
  DNA_CAPITAL_STATS_HERO,
} from '../../lib/dnaCapitalContent'
import { DNA_CAPITAL_HERO_LINES } from '../../lib/dnaCapitalTokens'
import { prefersReducedMotion, scrollMainToTarget } from '../../lib/utils'
import '../../styles/dna-capital-clone.css'

function DnaStat({ value, suffix, label }) {
  const valueRef = useRef(null)

  useEffect(() => {
    const el = valueRef.current
    const stat = el?.closest('.dna-clone-stat')
    if (!el || !stat) return undefined

    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`
      return undefined
    }

    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1800

        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - (1 - t) ** 2
          const n = value * eased
          const rounded = value % 1 === 0 ? Math.round(n) : n.toFixed(1)
          el.textContent = `${rounded}${suffix}`
          if (t < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
      },
      { root: document.getElementById('main'), threshold: 0.15 },
    )

    observer.observe(stat)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, suffix])

  return (
    <div className="dna-clone-stat">
      <div className="dna-clone-stat-value" ref={valueRef}>
        0{suffix}
      </div>
      <p className="dna-clone-stat-label">{label}</p>
    </div>
  )
}

function scrollToHash(hash) {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  const main = document.getElementById('main')
  if (main) {
    main.scrollTo({ top: el.offsetTop - 24, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    return
  }
  scrollMainToTarget(el, { duration: 1.05 })
}

/** dnacapital.com recreation — `/dna-capital-clone` (isolated native scroll, no Lenis). */
export default function DnaCapitalClonePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showHelix, setShowHelix] = useState(false)
  const overlayNavRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('dna-clone-active')
    return () => document.documentElement.classList.remove('dna-clone-active')
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* Defer WebGL until content is painted — avoids flash/crash on first frame */
  useEffect(() => {
    const t = window.setTimeout(() => setShowHelix(true), 500)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!menuOpen || prefersReducedMotion() || !overlayNavRef.current) return undefined

    const links = overlayNavRef.current.querySelectorAll('a')
    gsap.fromTo(
      links,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.06,
      },
    )

    return undefined
  }, [menuOpen])

  const closeMenu = (hash) => {
    setMenuOpen(false)
    if (hash) window.setTimeout(() => scrollToHash(hash), 420)
  }

  return (
    <div
      id="dna-clone-scroll"
      className="dna-clone-root relative min-h-full"
      style={{ backgroundColor: '#070708', color: '#ffffff' }}
    >
      {showHelix ? (
        <DnaCapitalHelixCanvas scrollRootId="main" />
      ) : (
        <div
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{ background: '#070708' }}
          aria-hidden
        />
      )}

      <header className="dna-clone-header">
        <a
          href="#dna-clone-hero"
          className="dna-clone-logo"
          onClick={(e) => {
            e.preventDefault()
            scrollToHash('#dna-clone-hero')
          }}
        >
          <DnaCapitalLogo />
          <span>DNA Capital</span>
        </a>
        <button
          type="button"
          className="dna-clone-menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="dna-clone-menu"
        >
          Menu
        </button>
      </header>

      <div
        id="dna-clone-menu"
        className={`dna-clone-overlay${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <button type="button" className="dna-clone-close" onClick={() => setMenuOpen(false)}>
          Close
        </button>
        <div className="dna-clone-overlay-inner">
          <nav ref={overlayNavRef} className="dna-clone-overlay-nav" aria-label="Primary">
            {DNA_CAPITAL_NAV.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  closeMenu(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="dna-clone-overlay-mark" aria-hidden>
            <DnaCapitalLogo />
          </div>
        </div>
      </div>

      <section className="dna-clone-hero" id="dna-clone-hero" aria-label="Introduction">
        <h1>
          {DNA_CAPITAL_HERO_LINES.map((line) => (
            <span key={line} className="dna-clone-hero-line">
              {line}
            </span>
          ))}
        </h1>
        <div className="dna-clone-scroll-hint" aria-hidden>
          <span>Scroll to explore</span>
          <span />
        </div>
      </section>

      <section className="dna-clone-stats" aria-label="Key metrics">
        {DNA_CAPITAL_STATS_HERO.map((stat) => (
          <DnaStat key={stat.label} {...stat} />
        ))}
      </section>

      {DNA_CAPITAL_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`dna-clone-section dna-clone-section--content${
            section.columns ? ' dna-clone-section--wide' : ''
          }`}
        >
          {section.eyebrow ? <p className="dna-clone-eyebrow">{section.eyebrow}</p> : null}
          <h2 className={section.id === 'team' ? 'dna-clone-section-title--lg' : undefined}>
            {section.title}
          </h2>
          <p>{section.body}</p>
          {section.body2 ? <p>{section.body2}</p> : null}

          {section.columns ? (
            <div className="dna-clone-columns">
              {section.columns.map((col) => (
                <div key={col.title}>
                  <h3>{col.title}</h3>
                  <p>{col.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          {section.stats ? (
            <div className="dna-clone-stats dna-clone-section-stats">
              {section.stats.map((stat) => (
                <DnaStat key={stat.label} {...stat} />
              ))}
            </div>
          ) : null}
        </section>
      ))}

      <footer id="contact" className="dna-clone-footer">
        <span>© 2026 DNA Capital</span>
        <div className="dna-clone-footer-links">
          <a href="#contact">Legal and Regulatory Information</a>
          <a href="#contact">Terms &amp; conditions</a>
        </div>
        <div className="dna-clone-footer-lang">
          <span>EN</span>
          <span>PT</span>
        </div>
      </footer>
    </div>
  )
}
