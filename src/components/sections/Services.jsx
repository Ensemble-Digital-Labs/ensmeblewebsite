import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/services'

function Services() {
  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="What We Offer"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card key={service.id} hover className="text-center">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Services
