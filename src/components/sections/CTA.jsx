import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'

function CTA() {
  return (
    <section className="py-16 lg:py-24 bg-brand-primary">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg sm:text-xl text-white text-opacity-80 mb-8">
            Let's discuss how we can help you achieve your business goals with premium digital marketing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Schedule a Consultation
              </Button>
            </Link>
            <Link to="/casestudies">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-primary">
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTA
