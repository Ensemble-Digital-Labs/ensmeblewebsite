import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import { aboutPageContent } from '../../lib/content'

function Team() {
  const { team } = aboutPageContent

  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <Container>
        <SectionHeading
          title="Our Team"
          subtitle="Meet the Experts"
          align="center"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((member) => (
            <Card
              key={member.id}
              hover
              className="text-center group transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
            >
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-bg-secondary">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-brand-primary mb-3">
                {member.role}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {member.bio}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Team
