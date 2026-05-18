import Container from '../ui/Container'
import { ParallaxDepth } from '../ui/ParallaxDepth'
import { services } from '../../data/services'
import { Link } from 'react-router-dom'
import { Laptop, Server, Globe2, LineChart, Clapperboard } from 'lucide-react'

const servicePaths = {
  1: '/services/software-product',
  2: '/services/it-infrastructure',
  3: '/services/websites-local-seo',
  4: '/services/performance-marketing',
  5: '/services/creative-production',
}

function ServicesGrid() {
  const iconMap = {
    1: Laptop,
    2: Server,
    3: Globe2,
    4: LineChart,
    5: Clapperboard,
  }

  return (
    <section className="bg-bg-primary overflow-hidden">
      <ParallaxDepth variant="default" tone="light" className="pt-8 pb-24 lg:pt-12 lg:pb-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.id] || Laptop

            return (
              <div key={service.id} className="group relative h-full">
                {/* Gradient Border Shell */}
                <div
                  className={`relative h-full rounded-[3rem] p-[1px] bg-gradient-to-br ${service.accent} transition-all duration-700 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)] group-hover:translate-y-[-6px]`}
                >
                  {/* Card Body */}
                  <div className="relative h-full min-h-[260px] lg:min-h-[320px] rounded-[2.8rem] bg-[#0C0E13]/80 backdrop-blur-2xl overflow-hidden border border-white/5 transition-all duration-700 group-hover:border-white/20 group-hover:bg-[#12141B]/90">
                    {/* Content Container */}
                    <div className="p-8 xl:p-10 relative z-20 h-full flex flex-col">
                      <div
                        className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${service.accent} flex items-center justify-center mb-6 xl:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/40`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>

                    <div className="mb-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold bg-white/5 border border-white/10 bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}
                      >
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl xl:text-2xl font-semibold xl:font-bold text-white mb-3 xl:mb-4 group-hover:text-brand-primary transition-colors">
                      {service.title}
                    </h3>

                      <p className="text-gray-300 text-base xl:text-lg leading-relaxed group-hover:text-white transition-colors line-clamp-4">
                        {service.description}
                      </p>

                      {/* Simple Inquire Link */}
                      <Link
                        to={servicePaths[service.id] ?? '/services'}
                        className="mt-auto flex items-center gap-2 text-white font-semibold xl:font-bold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500"
                      >
                        Explore this vertical
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>

                    {/* Image / Ambient Layer */}
                    <div className="absolute inset-0 z-0 opacity-[0.08] group-hover:opacity-[0.22] transition-opacity duration-1000">
                      <img src={service.image} alt="" className="w-full h-full object-cover" />
                    </div>

                    {/* Shine Effect Layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
      </ParallaxDepth>
    </section>
  )
}

export default ServicesGrid
