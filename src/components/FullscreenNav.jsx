import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/navigation'
import { prefersReducedMotion } from '../lib/utils'

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
  const logoRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const full = fullscreenNavRef.current
    const menu1 = menuButtonRef.current
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const line3 = line3Ref.current
    const logos = logoRefs.current.filter(Boolean)
    const buttonOutlined = document.querySelector('.button-outlined')

    if (!full || !menu1 || !line1 || !line2 || !line3) return

    if (clickCounter === 0) {
      // Menu open - transform 3 lines into X
      full.style.transform = 'translateY(0%)'
      full.style.pointerEvents = 'auto'
      
      logos.forEach((logo) => {
        if (logo) logo.style.color = '#A374FF'
      })

      if (buttonOutlined) buttonOutlined.style.opacity = '0'
      menu1.style.backgroundColor = 'transparent'
      menu1.style.border = '1.5px solid #A374FF'
      // Line 1: rotate 45deg and move to center
      line1.style.transform = 'rotate(45deg) translate(0, 0)'
      // Line 2: hide (opacity 0)
      line2.style.opacity = '0'
      // Line 3: rotate -45deg and move to center
      line3.style.transform = 'rotate(-45deg) translate(0, 0)'

      // Animate menu items (like poppr)
      setTimeout(() => {
        const menuItems = full.querySelectorAll('.menu-item')
        if (menuItems.length > 0) {
          gsap.from(menuItems, {
            opacity: 0,
            y: -400,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          })
        }
      }, 100)
    } else {
      // Menu closed
      full.style.transform = 'translateY(-100%)'
      full.style.pointerEvents = 'none'
      
      if (buttonOutlined) buttonOutlined.style.opacity = '1'
      logos.forEach((logo) => {
        if (logo) logo.style.color = '#17F1D1'
      })

      menu1.style.backgroundColor = '#A374FF'
      menu1.style.border = 'none'
      // Reset to 3 lines
      line1.style.transform = 'translateY(-8px)'
      line2.style.transform = 'translateY(0)'
      line2.style.opacity = '1'
      line3.style.transform = 'translateY(8px)'
      line1.style.backgroundColor = '#fff'
      line2.style.backgroundColor = '#fff'
      line3.style.backgroundColor = '#fff'
    }
  }, [clickCounter])

  const toggleMenu = () => {
    const newCounter = clickCounter === 1 ? 0 : 1
    setClickCounter(newCounter)
    setIsMenuOpen(newCounter === 0)
  }

  const handleMenuClick = (path) => {
    setClickCounter(1)
    setIsMenuOpen(false)
    navigate(path)
  }

  // Logo hide/show on scroll - handled by popprAnimations.js
  // The chasing effect comes from CSS transition on .nav with data-scroll-sticky

  return (
    <>
      {/* Navigation Bar */}
      <nav
        ref={menuRef}
        data-scroll
        data-scroll-sticky
        data-scroll-target="#main"
        className="nav"
      >
        {/* Logo - Full (hidden on scroll) */}
        <Link to="/" className="logo hide">
          {['E', 'N', 'S', 'E', 'M', 'B', 'L', 'E'].map((letter, i) => (
            <span
              key={i}
              ref={(el) => (logoRefs.current[i] = el)}
              className="logo-txt"
            >
              {letter}
            </span>
          ))}
        </Link>

        {/* Logo - Simple (revealed on scroll) */}
        <Link to="/" className="logo-owl reveal" style={{ opacity: 1, display: 'none' }}>
          E
        </Link>

        {/* Menu Button */}
        <div className="button-menu">
          <Link to="/contact" className="nav-cta">
            <button className="button-outlined px-4 sm:px-6 py-2 sm:py-3 border border-brand-primary rounded-full text-white text-xs sm:text-sm font-medium transition-all duration-1000 relative overflow-hidden bg-transparent">
              <span className="button-inner">
                <span className="button-inner-static">
                  <p>Get in touch</p>
                </span>
                <span className="button-inner-hover">
                  <p>Get in touch</p>
                </span>
              </span>
            </button>
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
              className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-brand-primary flex items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div
                ref={line1Ref}
                id="line1"
                className="absolute h-0.5 w-6 bg-white transition-all duration-1000"
                style={{ transform: 'translateY(-8px)' }}
              />
              <div
                ref={line2Ref}
                id="line2"
                className="absolute h-0.5 w-6 bg-white transition-all duration-1000"
                style={{ transform: 'translateY(0)' }}
              />
              <div
                ref={line3Ref}
                id="line3"
                className="absolute h-0.5 w-6 bg-white transition-all duration-1000"
                style={{ transform: 'translateY(8px)' }}
              />
              <div id="an-cir1" className="anim-circle absolute h-full w-full rounded-full bg-yellow-400 opacity-0" />
              <div id="an-cir2" className="anim-circle absolute h-full w-full rounded-full bg-brand-primary opacity-0" />
            </div>
          </button>
        </div>
      </nav>

          {/* Fullscreen Menu */}
          <div
            ref={fullscreenNavRef}
            id="fullscreen-nav"
            className="fixed inset-0 bg-bg-primary z-[999998] transition-all duration-1000 ease-out pointer-events-none overflow-hidden"
            style={{ transform: 'translateY(-100%)', pointerEvents: 'none' }}
          >
        <div id="offering" className="absolute left-[50vw] top-[20vh] w-[40vw] font-antique text-[7vw] tracking-[-5px]">
          {navLinks.map((link, index) => (
            <h4
              key={link.id}
              className="menu-item relative leading-[12vh] cursor-pointer text-text-primary"
              onClick={() => handleMenuClick(link.path)}
            >
              {link.label.split('').map((letter, i) => (
                <span
                  key={i}
                  className={`relative ${i % 2 === 1 ? 'z-[99999]' : ''}`}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
              <div className="cross-line absolute top-1/2 left-0 h-[1.5vh] w-0 transition-all duration-1000 ease-out" />
            </h4>
          ))}
        </div>

        {/* Contact Info */}
        <div className="nav-contacts absolute bottom-0 left-[5vw] flex flex-col justify-center gap-[2vh] w-[22vw] py-8">
          <h5 className="text-brand-primary uppercase text-[0.9vw] font-medium">Get in touch</h5>
          <a
            href="mailto:hello@ensemble.digital"
            className="text-text-primary text-[2.5vw] relative transition-all duration-1000 ease-out no-underline hover:text-brand-primary"
          >
            hello@ensemble<span className="text-brand-primary">.</span>digital
            <span className="line1 absolute bottom-0 left-0 h-[0.5px] w-0 bg-brand-secondary transition-all duration-1000 ease-out" />
          </a>
          <a
            href="tel:+1234567890"
            className="text-text-primary text-[2.5vw] relative transition-all duration-1000 ease-out no-underline hover:text-brand-primary"
          >
            +1 (234) 567-890
            <span className="line1 absolute bottom-0 left-0 h-[0.5px] w-0 bg-brand-secondary transition-all duration-1000 ease-out" />
          </a>
          <a
            href="#"
            className="text-text-primary text-[2.5vw] relative transition-all duration-1000 ease-out no-underline hover:text-brand-primary"
          >
            123 Digital Street
            <span className="line1 absolute bottom-0 left-0 h-[0.5px] w-0 bg-brand-secondary transition-all duration-1000 ease-out" />
          </a>
        </div>
      </div>
    </>
  )
}

export default FullscreenNav
