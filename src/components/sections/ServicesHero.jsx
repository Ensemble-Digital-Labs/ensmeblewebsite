import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { servicesPageContent } from '../../lib/content'

function ServicesHero() {
  return (
    <section className="py-16 lg:py-20 bg-bg-primary">
      <Container>
        <SectionHeading
          title={servicesPageContent.hero.title}
          subtitle={servicesPageContent.hero.subtitle}
          align="center"
        />
      </Container>
    </section>
  )
}

export default ServicesHero
