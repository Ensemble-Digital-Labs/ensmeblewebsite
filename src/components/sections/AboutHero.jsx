import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { aboutPageContent } from '../../lib/content'

function AboutHero() {
  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={aboutPageContent.hero.title}
            subtitle={aboutPageContent.hero.subtitle}
            align="center"
            className="mb-8"
          />
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            {aboutPageContent.hero.description}
          </p>
        </div>
      </Container>
    </section>
  )
}

export default AboutHero
