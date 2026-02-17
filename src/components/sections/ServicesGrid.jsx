import Container from '../ui/Container'
import Card from '../ui/Card'
import { services } from '../../data/services'

function ServicesGrid() {
  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              hover
              className="text-center group transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full">
                {service.category}
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ServicesGrid
