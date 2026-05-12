import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import { ParallaxDepth, ParallaxThemedBackdrop } from '../ui/ParallaxDepth'
import { howWeHelpClients } from '../../lib/content'

gsap.registerPlugin(ScrollTrigger)

function HowWeHelpClients() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let ctx;
    const initAnimations = () => {
      if (!sectionRef.current || !document.querySelector('#main')) return

      ctx = gsap.context(() => {
        // 1. Section Header Reveal
        gsap.fromTo('.services-heading', 
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.services-heading',
              scroller: "#main",
              start: 'top 85%'
            }
          }
        )

        // 2. Horizontal Grid Reveal
        gsap.fromTo('.service-card-reveal', 
          { y: 40, opacity: 0, scale: 0.95 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            stagger: 0.15, 
            duration: 1.2, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: '.services-grid',
              scroller: "#main",
              start: 'top 80%'
            }
          }
        )

        // 3. 3D Tilt Interaction
        const cards = document.querySelectorAll('.service-card-tilt')
        cards.forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2
            const rotateX = (y - centerY) / 10
            const rotateY = (centerX - x) / 10
            
            gsap.to(card, {
              rotateX: rotateX,
              rotateY: rotateY,
              scale: 1.02,
              duration: 0.5,
              ease: 'power2.out'
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 1,
              ease: 'elastic.out(1, 0.3)'
            })
          })
        })
        
        ScrollTrigger.refresh()
      }, sectionRef)
    }

    const timer = setTimeout(initAnimations, 1200)
    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#FDFDFD] overflow-hidden">
      <ParallaxDepth
        variant="default"
        tone="light"
        className="overflow-hidden py-24 lg:py-32"
        layer1={
          <>
            <ParallaxThemedBackdrop tone="light" />
            <div
              className="absolute inset-0 opacity-[0.42]"
              style={{
                backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </>
        }
      >
      <Container className="relative z-10">
        <div className="services-heading text-center mb-16 px-4">
           <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-rose-50/80 border border-rose-100/90 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em]">Strategic Support</span>
           </div>
           <h2 className="font-display text-4xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
             How Our Services <br className="hidden sm:block" />
             <span className="text-brand-primary">Help You</span>
           </h2>
           <p className="text-lg text-gray-500 mt-6 max-w-2xl mx-auto font-medium">
             From essentials to growth to market leadership, we provide the architectural foundation for your digital success.
           </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 perspective-1000">
          {howWeHelpClients.map((level, idx) => (
            <div key={level.id} className="service-card-reveal h-full">
              <div className="service-card-tilt group h-full relative p-6 lg:p-8 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(233,78,119,0.14)] hover:border-brand-primary/20 flex flex-col will-change-transform preserve-3d">
                
                {/* Tactical Corner Brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gray-100 rounded-tl-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gray-100 rounded-br-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-end mb-4">
                  <div className="w-8 h-8 rounded-lg bg-growth-soft flex items-center justify-center text-brand-primary transform group-hover:rotate-12 transition-transform duration-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {level.name}
                </h3>
                
                {level.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {level.description}
                  </p>
                )}

                <div className="space-y-3">
                  <ul className="space-y-2">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-100 group-hover/item:bg-brand-primary transition-colors duration-300" />
                        <span className="text-sm text-gray-600 font-medium group-hover/item:text-gray-900 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 group-hover:border-brand-primary/10 transition-colors duration-500">
                  <button type="button" className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-[0.2em]">
                    Learn More
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
      </ParallaxDepth>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}

export default HowWeHelpClients
