import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import { testimonialsPreview } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function TestimonialsPreview() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const cards = cardsRef.current.filter(Boolean)

    cards.forEach((card, index) => {
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
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-bg-primary"
    >
      <Container>
        <SectionHeading
          title="Client Testimonials"
          subtitle="What Medical Practices Say"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsPreview.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Card
                hover
                className="flex flex-col group"
              >
              <div className="mb-6">
                <svg
                  className="w-12 h-12 text-brand-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-text-primary text-base leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-800">
                <p className="font-semibold text-text-primary">
                  {testimonial.author}
                </p>
                <p className="text-base text-text-muted">
                  {testimonial.company ? `${testimonial.role}, ${testimonial.company}` : testimonial.role}
                </p>
              </div>
            </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsPreview
