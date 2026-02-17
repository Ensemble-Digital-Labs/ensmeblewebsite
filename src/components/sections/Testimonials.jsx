import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/testimonials'

function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Testimonials"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <div className="mb-6">
                <svg className="w-12 h-12 text-brand-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-text-primary text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-800">
                <p className="font-semibold text-text-primary">
                  {testimonial.author}
                </p>
                <p className="text-sm text-text-muted">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
