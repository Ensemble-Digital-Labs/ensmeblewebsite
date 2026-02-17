import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/navigation'
import Button from './ui/Button'
import { prefersReducedMotion } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !navRef.current) return

    try {
      // Hide/show logo on scroll (like reference)
      gsap.to('.logo-full', {
        scrollTrigger: {
          trigger: navRef.current,
          start: 'top -100',
          end: 'top -50',
          scrub: true,
        },
        opacity: 0,
        display: 'none',
      })

      gsap.to('.logo-simple', {
        scrollTrigger: {
          trigger: navRef.current,
          start: 'top -100',
          end: 'top -50',
          scrub: true,
        },
        opacity: 1,
        display: 'block',
      })
    } catch (error) {
      console.error('Navbar animation error:', error)
    }
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const handleMenuClick = (path) => {
    setIsMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? 'bg-bg-primary/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Full Logo */}
            <Link to="/" className="logo-full flex items-center space-x-1">
              {['E', 'N', 'S', 'E', 'M', 'B', 'L', 'E'].map((letter, i) => (
                <span
                  key={i}
                  className="text-2xl lg:text-3xl font-bold text-brand-secondary font-['Antique_Olive',sans-serif] tracking-tight transition-all duration-300"
                >
                  {letter}
                </span>
              ))}
            </Link>

            {/* Simple Logo (shown on scroll) */}
            <Link to="/" className="logo-simple hidden text-brand-secondary text-2xl font-bold opacity-0">
              E
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-300 ease-out ${
                    location.pathname === link.path
                      ? 'text-brand-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact">
                <Button size="sm" variant="outline">
                  Get in touch
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-primary relative z-[999999]"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ease-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ease-out ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ease-out ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div
        className={`fullscreen-nav fixed inset-0 bg-bg-primary z-[999998] transition-all duration-500 ease-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
          {navLinks.map((link, i) => (
            <h4
              key={link.id}
              onClick={() => handleMenuClick(link.path)}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary hover:text-brand-primary transition-colors duration-300 ease-out cursor-pointer"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {link.label}
            </h4>
          ))}
          <div className="mt-8">
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Get in touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default EnhancedNavbar
