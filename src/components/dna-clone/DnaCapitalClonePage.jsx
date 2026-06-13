import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import DnaCapitalHelixCanvas from './DnaCapitalHelixCanvas'
import DnaCapitalLogo from './DnaCapitalLogo'
import { InfluxPrimaryButton } from '../home/influx/HomeInfluxPrimitives'
import { HOME_INFLUX_HERO } from '../../lib/homeInfluxContent'
import {
  DNA_CAPITAL_NAV,
  DNA_CAPITAL_SECTIONS,
  DNA_CAPITAL_STATS_HERO,
} from '../../lib/dnaCapitalContent'
import { DNA_CAPITAL_HERO_LINES, ENSEMBLE_DNA_HERO_LINES } from '../../lib/dnaCapitalTokens'
import { resetDnaCloneIntroProgress, setDnaCloneIntroProgress } from '../../lib/dnaCapitalIntro'
import { prefersReducedMotion } from '../../lib/utils'
import DnaCloneEnsembleAtmosphere from './DnaCloneEnsembleAtmosphere'
import '../../styles/dna-capital-clone.css'
import '../../styles/dna-capital-clone-ensemble.css'

function DnaStat({ value, suffix, label, ring = false }) {
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
    <div className={`dna-clone-stat${ring ? ' dna-clone-stat--ring' : ''}`}>
      <div className={ring ? 'dna-clone-stat-ring' : 'dna-clone-stat-value'} ref={valueRef}>
        0{suffix}
      </div>
      <p className="dna-clone-stat-label">{label}</p>
    </div>
  )
}

function scrollToHash(hash) {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  const main = document.getElementById('main')
  if (!el || !main) return
  const mainRect = main.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  const top = main.scrollTop + elRect.top - mainRect.top - 20
  main.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** DNA Capital experiment — `/experiments` (native scroll, no Lenis). */
export default function DnaCapitalClonePage({ theme = 'dna-capital' }) {
  const isEnsemble = theme === 'ensemble'
  const heroLines = isEnsemble ? ENSEMBLE_DNA_HERO_LINES : DNA_CAPITAL_HERO_LINES
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayNavRef = useRef(null)
  const heroRef = useRef(null)
  const scrollHintRef = useRef(null)
  const heroCtasRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('dna-clone-active')
    if (isEnsemble) {
      document.documentElement.classList.add('dna-clone-active--ensemble')
    }
    return () => {
      document.documentElement.classList.remove('dna-clone-active', 'dna-clone-active--ensemble')
    }
  }, [isEnsemble])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* dnacapital.com load: WebGL ribbon fades in → title lines mask up → scroll hint */
  useEffect(() => {
    resetDnaCloneIntroProgress()

    if (prefersReducedMotion()) {
      setDnaCloneIntroProgress(1)
      return undefined
    }

    const lines = heroRef.current?.querySelectorAll('.dna-clone-hero-line-inner')
    const hint = scrollHintRef.current
    const ctas = heroCtasRef.current
    if (!lines?.length) {
      setDnaCloneIntroProgress(1)
      return undefined
    }

    gsap.set(lines, { y: '108%' })
    if (hint) gsap.set(hint, { autoAlpha: 0, y: 14 })
    if (ctas) gsap.set(ctas, { autoAlpha: 0, y: 20 })

    const introState = { value: 0 }
    const tl = gsap.timeline({
      onUpdate: () => setDnaCloneIntroProgress(introState.value),
    })

    tl.to(introState, { value: 1, duration: 1.65, ease: 'power2.out' }, 0.12)
    tl.to(lines, { y: '0%', duration: 0.92, stagger: 0.1, ease: 'power3.out' }, 0.38)
    if (ctas) {
      tl.to(ctas, { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out' }, 0.88)
    }
    if (hint) {
      tl.to(hint, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power2.out' }, ctas ? 1.12 : 0.92)
    }

    return () => {
      tl.kill()
      resetDnaCloneIntroProgress()
    }
  }, [isEnsemble])

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
      className={`dna-clone-root relative min-h-full${isEnsemble ? ' dna-clone-root--ensemble' : ''}`}
      style={isEnsemble ? undefined : { backgroundColor: '#070708', color: '#ffffff' }}
    >
      {isEnsemble ? <DnaCloneEnsembleAtmosphere scrollRootId="main" /> : null}
      <DnaCapitalHelixCanvas scrollRootId="main" theme={theme} />

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
        <div className="dna-clone-hero__inner" ref={heroRef}>
          <h1 className={isEnsemble ? 'ensemble-editorial-hero' : 'dna-clone-hero-title'}>
            {heroLines.map((line) => (
              <span key={line} className="dna-clone-hero-line">
                <span className="dna-clone-hero-line-mask">
                  <span className="dna-clone-hero-line-inner">{line}</span>
                </span>
              </span>
            ))}
          </h1>
          {isEnsemble ? (
            <div ref={heroCtasRef} className="dna-clone-hero-ctas">
              <InfluxPrimaryButton to={HOME_INFLUX_HERO.primaryCta.link}>
                {HOME_INFLUX_HERO.primaryCta.text}
              </InfluxPrimaryButton>
              <InfluxPrimaryButton to={HOME_INFLUX_HERO.secondaryCta.link}>
                {HOME_INFLUX_HERO.secondaryCta.text}
              </InfluxPrimaryButton>
            </div>
          ) : null}
          <div className="dna-clone-scroll-hint" ref={scrollHintRef} aria-hidden>
            <span>Scroll to explore</span>
            <span />
          </div>
        </div>
      </section>

      <section className="dna-clone-stats" id="dna-clone-stats" aria-label="Key metrics">
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
          }${section.stats ? ' dna-clone-section--split' : ''}`}
        >
          <div className="dna-clone-section__main">
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
          </div>

          {section.stats ? (
            <div className="dna-clone-stats dna-clone-section-stats">
              {section.stats.map((stat) => (
                <DnaStat key={stat.label} {...stat} ring />
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
