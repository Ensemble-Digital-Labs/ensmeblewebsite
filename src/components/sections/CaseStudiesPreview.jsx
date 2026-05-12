import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { caseStudiesPreview } from '../../lib/content'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

function CaseStudiesPreview() {
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
      className="py-16 lg:py-24 bg-bg-primary"
    >
      <Container>
        <SectionHeading
          title="Case Studies"
          subtitle="Our Work"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudiesPreview.map((study, index) => (
            <div
              key={study.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Card
                hover
                className="flex flex-col group"
              >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full mb-3">
                  {study.category}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {study.client}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {study.description}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-800">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-brand-primary">
                    {study.metric}
                  </p>
                  <p className="text-sm text-text-muted">
                    {study.metricLabel}
                  </p>
                </div>
              </div>
            </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/case-studies">
            <Button variant="ghost" size="md" className="group">
              View All Case Studies
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

export default CaseStudiesPreview
