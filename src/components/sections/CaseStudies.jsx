import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import { caseStudies } from '../../data/caseStudies'

function CaseStudies() {
  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <Container>
        <SectionHeading
          title="Case Studies"
          subtitle="Our Work"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {caseStudies.map((study) => (
            <Card key={study.id} hover className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full mb-3">
                  {study.category}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {study.client}
                </p>
                <p className="text-text-secondary mb-4">
                  {study.description}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-800">
                <p className="text-2xl font-bold text-brand-primary">
                  {study.result}
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/casestudies">
            <Button variant="outline" size="lg">
              View All Case Studies
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default CaseStudies
