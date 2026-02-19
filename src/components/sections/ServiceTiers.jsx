import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import { howWeHelpClients } from '../../lib/content'

function HowWeHelpClients() {
  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        <SectionHeading
          title="How Our Services Help You"
          subtitle="From essentials to growth to market leadership"
          className="mb-12 lg:mb-16"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {howWeHelpClients.map((level) => (
            <Card key={level.id} hover className="flex flex-col">
              <h3 className="text-2xl font-bold text-brand-primary mb-2">
                {level.name}
              </h3>
              {level.description && (
                <p className="text-text-secondary text-sm mb-6">
                  {level.description}
                </p>
              )}
              <ul className="space-y-3 text-text-secondary text-sm leading-relaxed flex-grow">
                {level.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-primary mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default HowWeHelpClients
