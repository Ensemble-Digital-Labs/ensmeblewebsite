import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import AnimatedBrandLogo from '../AnimatedBrandLogo'
import { footerLinks } from '../../data/navigation'

function Footer() {
  return (
    <footer className="bg-bg-secondary text-text-secondary py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8">
          <div>
            <Link to="/" className="mb-4 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm" aria-label="Ensemble Digital Labs home">
              <AnimatedBrandLogo variant="footer" imgAlt="" />
            </Link>
            <p className="text-text-secondary text-base leading-relaxed">
              Premium digital marketing solutions that drive growth and deliver measurable results.
            </p>
          </div>
          
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="text-text-secondary hover:text-text-primary text-base transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="text-text-secondary hover:text-text-primary text-base transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className="text-text-secondary hover:text-text-primary text-base transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-base text-center sm:text-left">
              © {new Date().getFullYear()} Ensemble Digital Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-text-secondary hover:text-text-primary transition-colors text-base">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-text-secondary hover:text-text-primary transition-colors text-base">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
