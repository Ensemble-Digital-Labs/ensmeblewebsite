import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import { aboutPageContent } from '../../lib/content'

function MissionValues() {
  const { mission, values } = aboutPageContent

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        {/* Mission */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            {mission.title}
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
            {mission.description}
          </p>
        </div>

        {/* Values */}
        <div>
          <SectionHeading
            title="Our Values"
            subtitle="What We Stand For"
            align="center"
            className="mb-12 lg:mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value) => (
              <Card
                key={value.id}
                hover
                className="text-center group transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MissionValues
