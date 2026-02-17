import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

function ContactHero() {
  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Get In Touch"
            subtitle="Contact Us"
            align="center"
          />
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mt-6">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
        </div>
      </Container>
    </section>
  )
}

export default ContactHero
