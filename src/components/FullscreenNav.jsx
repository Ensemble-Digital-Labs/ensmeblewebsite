import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/navigation'
import { prefersReducedMotion, setNavOverlayActive } from '../lib/utils'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import { growthPrimaryNav } from '../lib/growthCtaClasses'

gsap.registerPlugin(ScrollTrigger)

function FullscreenNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [clickCounter, setClickCounter] = useState(1)
  const menuRef = useRef(null)
  const fullscreenNavRef = useRef(null)
  const menuButtonRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useEffect(() => {
    setNavOverlayActive(isMenuOpen)
    return () => setNavOverlayActive(false)
  }, [isMenuOpen])

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
      // Menu open - transform 3 lines into X
      full.style.transform = 'translateY(0%)'
      full.style.pointerEvents = 'auto'

      if (navCta) navCta.style.opacity = '0'
      menu1.style.backgroundColor = 'transparent'
      menu1.style.border = '1.5px solid var(--color-brand-primary, #e94e77)'
      // Line 1: rotate 45deg and move to center
      line1.style.transform = 'rotate(45deg) translate(0, 0)'
      // Line 2: hide (opacity 0)
      line2.style.opacity = '0'
      // Line 3: rotate -45deg and move to center
      line3.style.transform = 'rotate(-45deg) translate(0, 0)'

      // Animate menu items (like poppr)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const menuItems = full.querySelectorAll('.menu-item')
          const contactBlock = full.querySelector('.nav-contacts')
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
          if (contactBlock) {
            gsap.from(contactBlock, {
              opacity: 0,
              y: 24,
              duration: 0.45,
              delay: 0.08,
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
      // Reset to 3 lines
      line1.style.transform = 'translateY(-10px)'
      line2.style.transform = 'translateY(0)'
      line2.style.opacity = '1'
      line3.style.transform = 'translateY(10px)'
      line1.style.backgroundColor = '#000'
      line2.style.backgroundColor = '#000'
      line3.style.backgroundColor = '#000'
    }
  }, [clickCounter])

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
        className="nav"
        data-menu-open={isMenuOpen ? 'true' : 'false'}
      >
        {/* Logo — image lockup (neon flare lives on section headings, not nav) */}
        <Link to="/" className="logo hide flex items-center" aria-label="Ensemble Digital Labs home">
          <AnimatedBrandLogo variant="nav" priority imgAlt="" />
        </Link>

        {/* Compact mark (revealed on scroll when nav logo swap enabled) */}
        <Link to="/" className="logo-owl reveal" style={{ opacity: 1, display: 'none' }} aria-label="Ensemble Digital Labs home">
          E
        </Link>

        {/* Menu Button */}
        <div className="button-menu">
          <Link
            to="/contact"
            data-nav-cta
            className={`${growthPrimaryNav} no-underline transition-opacity duration-300`}
          >
            Get in touch
          </Link>

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
                className="absolute h-0.5 w-7 bg-black transition-all duration-1000"
                style={{ transform: 'translateY(-10px)' }}
              />
              <div
                ref={line2Ref}
                id="line2"
                className="absolute h-0.5 w-7 bg-black transition-all duration-1000"
                style={{ transform: 'translateY(0)' }}
              />
              <div
                ref={line3Ref}
                id="line3"
                className="absolute h-0.5 w-7 bg-black transition-all duration-1000"
                style={{ transform: 'translateY(10px)' }}
              />
              <div id="an-cir1" className="anim-circle absolute h-full w-full rounded-full bg-yellow-400 opacity-0" />
              <div id="an-cir2" className="anim-circle absolute h-full w-full rounded-full bg-brand-primary opacity-0" />
            </div>
          </button>
        </div>
      </nav>

          {/* Fullscreen Menu — dark grid + indexed links (med-tech / premium agency) */}
          <div
            ref={fullscreenNavRef}
            id="fullscreen-nav"
            className="fixed inset-0 z-[999998] h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#080c10] text-zinc-200 pointer-events-none transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{ transform: 'translateY(-100%)', pointerEvents: 'none' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1018]/95 via-[#080c10] to-[#05080c]" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(rgba(244,114,182,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.055)_1px,transparent_1px)] bg-[length:40px_40px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-24 top-0 h-[min(55vh,480px)] w-[min(70vw,520px)] rounded-full bg-growth-from/[0.09] blur-[90px]"
              aria-hidden
            />

            <div className="relative z-10 mx-auto flex h-full max-h-[100dvh] max-w-[1600px] flex-col gap-3 px-4 pb-5 pt-16 sm:gap-4 sm:px-6 sm:pb-6 sm:pt-[4.75rem] lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-6 lg:pt-[5.25rem]">
              <nav
                id="offering"
                className="font-display flex min-h-0 flex-1 flex-col justify-center gap-0 lg:flex-[1.15] lg:pr-8"
                aria-label="Primary"
              >
                {navLinks.map((link, index) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    className="menu-item group relative flex items-baseline gap-2 border-b border-white/[0.07] py-2 sm:gap-4 sm:py-2.5 md:py-3 no-underline outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c10]"
                    onClick={closeOverlay}
                  >
                    <span className="w-6 shrink-0 font-mono text-[9px] font-medium tabular-nums tracking-[0.16em] text-rose-300/55 sm:w-8 sm:text-[10px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="fs-menu-label relative flex-1 font-display text-[clamp(1.35rem,min(6.2vh,3.65rem),3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-zinc-100 transition-[background-position] duration-500 group-hover:bg-[linear-gradient(90deg,#fce7f3,#fda4af,#f17245,#fbbf24)] group-hover:bg-clip-text group-hover:text-transparent">
                      {link.label}
                    </span>
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-growth-from via-growth-to to-orange-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  </Link>
                ))}
              </nav>

              <aside className="nav-contacts flex shrink-0 flex-col justify-center gap-3 border-t border-rose-400/18 pt-4 sm:gap-3.5 sm:pt-5 lg:mt-0 lg:w-[min(100%,340px)] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:w-[380px]">
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
                  className="group relative max-w-md text-xs leading-snug text-zinc-400 no-underline transition-colors hover:text-zinc-200 sm:text-sm"
                >
                  11715 Administration Dr, Suite 226, St. Louis, MO 63146
                  <span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-growth-from/90 to-growth-to/85 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                </a>
              </aside>
            </div>
      </div>
    </>
  )
}

export default FullscreenNav
