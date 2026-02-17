import Container from '../ui/Container'
import Card from '../ui/Card'
import { aboutPageContent } from '../../lib/content'

function WhyChooseUs() {
  const { whyChooseUs } = aboutPageContent

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-12 lg:mb-16 text-center">
            {whyChooseUs.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseUs.stats.map((stat) => (
              <Card
                key={stat.id}
                className="text-center group transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
              >
                <p className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-lg font-semibold text-text-primary mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-text-muted">
                  {stat.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default WhyChooseUs
