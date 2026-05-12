import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import { servicesPreview } from '../../lib/content'
import Button from '../ui/Button'

function Services() {
  return (
    <section className="relative py-24 lg:py-32 bg-bg-primary overflow-hidden" id="services">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] opacity-10"></div>
      </div>

      <Container className="relative z-10">
        <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Panel - Hero Content */}
          <div className="lg:col-span-12 xl:col-span-5 mb-16 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-xs font-bold text-white uppercase tracking-widest">Our Expertise</span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Elevate Your Digital<br />
              <span className="bg-gradient-to-r from-brand-primary via-amber-400 to-brand-primary bg-clip-text text-transparent">
                Presence Globally
              </span>
            </h2>

            <p className="text-gray-400 text-lg lg:text-xl mb-10 max-w-xl leading-relaxed">
              We provide comprehensive digital marketing solutions tailored to your unique goals.
              Our team of experts combines strategy, data, and creativity to drive measurable results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="rounded-2xl">
                  Inquire Now
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost" size="lg" className="rounded-2xl border-white/10 text-white hover:bg-white/5">
                  View All Services
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex items-center gap-8 opacity-40 grayscale">
              <span className="text-sm font-bold text-white uppercase tracking-widest">Trusted By Leaders</span>
              {/* Add small partner logos here if available */}
            </div>
          </div>

          {/* Right Panel - Service Grid */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {servicesPreview.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative h-[380px] lg:h-[420px] rounded-[2.5rem] bg-[#13151A]/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-700 hover:border-white/20 hover:bg-[#13151A]/60 hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                >
                  {/* Content Container */}
                  <div className="p-10 relative z-20 h-full flex flex-col">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20`}>
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-200 text-base leading-relaxed group-hover:text-white transition-colors">
                      {service.description}
                    </p>

                    {/* Simple Learn More Link */}
                    <Link to="/services" className="mt-auto flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Learn More
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* Glass Background Highlight Layer */}
                  <div className={`absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br ${service.accent} blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}></div>

                  {/* Subtle Image Background (Faded) */}
                  <div className="absolute inset-0 z-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 grayscale">
                    <img src={service.image} alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Shine Effect Layer */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Services
