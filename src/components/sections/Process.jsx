import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import { processSteps } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function Process() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const cards = cardsRef.current.filter(Boolean)

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-bg-secondary"
    >
      <Container>
        <SectionHeading
          title="Ensemble & Your Journey"
          subtitle="A Strategic Partnership for Success"
          className="mb-12 lg:mb-16"
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Timeline line - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary opacity-20" />
            
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-primary border-4 border-bg-secondary group-hover:scale-125 transition-transform duration-300 ease-out z-10" />
                
                <Card hover>
                  <div className="text-4xl font-bold text-brand-primary mb-4 opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-75">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Process
