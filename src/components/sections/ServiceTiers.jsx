import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
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
    <section ref={sectionRef} className="relative overflow-hidden py-24 lg:py-32">
      <Container className="relative z-10">
        <div className="services-heading mb-16 px-4 text-center">
           <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl">
             How Our Services <br className="hidden sm:block" />
             <span className="text-brand-primary">Help You</span>
           </h2>
           <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/72">
             From essentials to growth to market leadership, we provide the architectural foundation for your digital success.
           </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 perspective-1000">
          {howWeHelpClients.map((level, idx) => (
            <div key={level.id} className="service-card-reveal h-full">
              <div className="service-card-tilt group relative flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-500 will-change-transform preserve-3d hover:border-brand-primary/25 hover:shadow-[0_40px_80px_-20px_rgba(233,78,119,0.2)] lg:p-8">
                
                {/* Tactical Corner Brackets */}
                <div className="absolute left-4 top-4 h-6 w-6 rounded-tl-md border-l-2 border-t-2 border-white/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 right-4 h-6 w-6 rounded-br-md border-b-2 border-r-2 border-white/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-4 flex items-center justify-end">
                  <div className="flex h-8 w-8 transform items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-brand-primary transition-transform duration-500 group-hover:rotate-12">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                </div>

                <h3 className="mb-2 text-2xl font-black text-white transition-colors duration-300 group-hover:text-brand-primary">
                  {level.name}
                </h3>
                
                {level.description && (
                  <p className="mb-4 text-base leading-relaxed text-white/70">
                    {level.description}
                  </p>
                )}

                <div className="space-y-3">
                  <ul className="space-y-2">
                    {level.features.map((feature, i) => (
                      <li key={i} className="group/item flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/25 transition-colors duration-300 group-hover/item:bg-brand-primary" />
                        <span className="text-base font-medium text-white/75 transition-colors duration-300 group-hover/item:text-white">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6 transition-colors duration-500 group-hover:border-brand-primary/20">
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
