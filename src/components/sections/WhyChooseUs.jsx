import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'

gsap.registerPlugin(ScrollTrigger)

function WhyChooseUs() {
  const { whyChooseUs, hero } = aboutPageContent
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const gridRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const stats = whyChooseUs?.stats || []
  
  // Dynamic images based on the feature hovered
  const hoverImages = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', // HIPAA
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', // One-Stop
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', // Local Market
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', // Expertise
  ]

  // Perspective tilt handler
  const handleMouseMove = (e) => {
    if (!imageRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    
    gsap.to(imageRef.current, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1200,
    })
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.5,
      ease: 'expo.out'
    })
  }

  useEffect(() => {
    let ctx;
    const initAnimations = () => {
      if (!sectionRef.current || !document.querySelector('#main')) return

      ctx = gsap.context(() => {
        // 1. Heading Entrance
        gsap.fromTo('.section-heading', 
          { y: 60, rotateX: -45, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: "#main",
              start: 'top 85%',
            }
          }
        )

        // 2. Parallax for text
        gsap.to(textRef.current, {
          y: -120,
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: "#main",
            scrub: 1.2,
          }
        })

        // 3. Main Container Reveal
        gsap.fromTo('.main-visual-container',
          { scale: 0.98, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1.8, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              scroller: "#main",
              start: 'top 80%',
            }
          }
        )

        // 4. Grid Stagger
        const cells = gsap.utils.toArray('.blueprint-cell')
        gsap.fromTo(cells, 
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: gridRef.current,
              scroller: "#main",
              start: 'top 90%',
            }
          }
        )
      }, sectionRef)
    }

    const timer = setTimeout(initAnimations, 1200)
    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-[#FDFDFD] overflow-hidden relative">
      {/* Dynamic Background Detail */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <Container className="relative z-10">
        {/* Section Heading with Modern Badging */}
        <div className="section-heading mb-20 lg:mb-28 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0891B2] animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Ensemble Core Advantage</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[0.95]">
            {whyChooseUs.title.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4 mb-2">{word}</span>
            ))}
          </h2>
        </div>

        <div className="main-visual-container flex flex-col lg:flex-row items-stretch gap-0 min-h-[620px] bg-white border border-gray-100 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden relative">
          
          {/* Tactical Corner Brackets */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gray-100 rounded-tl-lg z-50 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gray-100 rounded-br-lg z-50 pointer-events-none" />

          {/* LEFT: Semi-circular image + Large vertical text */}
          <div 
            className="relative w-full lg:w-[45%] bg-[#F9FAFB] flex flex-col justify-center overflow-hidden min-h-[420px] lg:min-h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Vertical Decorative Text - ENSEMBLE */}
            <div ref={textRef} className="absolute left-8 lg:left-10 z-30 pointer-events-none">
              <h2 className="text-[clamp(5rem,12vw,10rem)] font-black leading-none tracking-tighter text-[#0891B2] opacity-[0.15] select-none uppercase"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                ENSEMBLE
              </h2>
            </div>

            {/* Active Feature Coordinate Display */}
            <div className="absolute top-10 left-10 z-40 font-mono text-[9px] text-[#0891B2]/40 tracking-widest hidden lg:block">
              REF://SYS_CORE_00{activeIndex + 1}<br/>
              LOC://ENV_SYNC_OK
            </div>

            {/* Semi-circular Image Container */}
            <div 
              ref={imageRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] lg:w-[90%] aspect-[3/4] overflow-hidden rounded-l-full border-y-[12px] border-l-[12px] border-white shadow-[-40px_0_80px_rgba(0,0,0,0.12)] z-20 bg-gray-50 transition-transform duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {hoverImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-110 ${
                    activeIndex === idx ? 'opacity-100 translate-x-0 grayscale-0' : 'opacity-0 -translate-x-8 grayscale-[1]'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0891B2]/20 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: High-Precision Grid */}
          <div ref={gridRef} className="flex-1 bg-white grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-gray-50 border-l border-gray-50">
            {stats.map((stat, index) => {
              const isActive = activeIndex === index
              return (
                <div
                  key={stat.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`blueprint-cell relative p-12 lg:p-16 transition-all duration-700 cursor-default group overflow-hidden flex flex-col h-full ${
                    isActive ? 'bg-[#0891B2] text-white' : 'bg-white hover:bg-gray-50/50'
                  }`}
                >
                  <div className="relative z-10 h-full flex flex-col">
                    <span className={`text-[10px] font-mono tracking-[0.4em] font-bold uppercase mb-10 block transition-colors duration-500 ${
                      isActive ? 'text-white/50' : 'text-[#0891B2]/40'
                    }`}>
                      00{index + 1} // SYS.MOD
                    </span>
                    
                    <h3 className={`text-3xl lg:text-4xl font-bold mb-8 leading-[1] tracking-tight transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stat.label}
                    </h3>
                    
                    <p className={`text-base lg:text-lg leading-relaxed font-medium transition-colors duration-500 flex-1 max-w-[95%] ${
                      isActive ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {stat.description}
                    </p>

                    {/* Modern Action Trigger */}
                    <div className={`mt-10 transition-all duration-700 transform origin-left ${
                      isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                    }`}>
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
                        View Capability
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic Indicator */}
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[40px] transition-all duration-1000 ${
                    isActive ? 'bg-white/20' : 'bg-[#0891B2]/5'
                  }`} />
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs

