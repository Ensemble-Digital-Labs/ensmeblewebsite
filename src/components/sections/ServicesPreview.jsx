import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { servicesPreview } from '../../lib/content'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function ServicesPreview() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    try {
      const cards = cardsRef.current.filter(Boolean)
      if (cards.length === 0) return

      cards.forEach((card, index) => {
        if (!card) return
        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    } catch (error) {
      console.error('ServicesPreview animation error:', error)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-bg-secondary"
    >
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="What We Offer"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {servicesPreview.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Card
                hover
                className="text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 ease-out">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="ghost" size="md" className="group">
              View All Services
              <svg
                className="w-5 h-5 ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default ServicesPreview
