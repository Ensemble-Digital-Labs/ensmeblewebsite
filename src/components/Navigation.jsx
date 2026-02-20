import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Hide/show logo on scroll (similar to reference)
    const nav = document.querySelector('.nav')
    if (!nav) return

    gsap.to('.logo-text', {
      scrollTrigger: {
        trigger: nav,
        start: '100% 10%',
        end: 'top 20%',
        scrub: true,
      },
      opacity: 0,
      display: 'none',
    })

    gsap.to('.logo-simple', {
      scrollTrigger: {
        trigger: nav,
        start: '100% 10%',
        end: 'top 20%',
        scrub: true,
      },
      opacity: 1,
      display: 'block',
    })
  }, [])

  return (
    <>
      <nav className="nav fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-[999999] transition-all duration-1000">
        <div className="logo-text">
          <div className="flex gap-1">
            {['E', 'N', 'S', 'E', 'M', 'B', 'L', 'E'].map((letter, i) => (
              <span
                key={i}
                className="text-2xl sm:text-3xl font-bold text-brand-secondary font-['Antique_Olive',sans-serif] tracking-tight"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="logo-simple hidden text-brand-secondary text-2xl font-bold">
          E
        </div>

        <div className="flex items-center gap-4">
          <button className="button-outlined px-6 py-3 border border-brand-primary rounded-full text-text-primary text-sm font-medium hover:bg-brand-primary hover:text-white transition-all duration-300">
            Get in touch
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-button relative w-8 h-8 flex flex-col justify-center gap-1.5 cursor-pointer"
          >
            <div className={`line w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`line w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`line w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div
        className={`fullscreen-nav fixed inset-0 bg-bg-primary z-[999998] transition-all duration-1000 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {['Work', 'Solutions', 'Insights', 'Careers', 'Contact'].map((item, i) => (
            <h4
              key={i}
              className="text-6xl sm:text-8xl font-bold text-text-primary hover:text-brand-primary transition-colors cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </h4>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navigation
