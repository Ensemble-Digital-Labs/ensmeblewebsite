import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { servicesPageContent } from '../../lib/content'

function HowWeWork() {
  const { howWeWork } = servicesPageContent

  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <Container>
        <SectionHeading
          title={howWeWork.title}
          subtitle={howWeWork.subtitle}
          className="mb-12 lg:mb-16"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {howWeWork.phases.map((phase, index) => (
              <div
                key={phase.id}
                className="relative"
              >
                {/* Connector line - hidden on mobile, visible on desktop */}
                {index < howWeWork.phases.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-brand-primary to-transparent opacity-30 z-0" />
                )}
                
                <div className="bg-bg-card rounded-xl p-6 border border-gray-800 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1 relative z-10">
                  <div className="text-sm font-semibold text-brand-primary mb-2 uppercase tracking-wider">
                    {phase.phase}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HowWeWork
