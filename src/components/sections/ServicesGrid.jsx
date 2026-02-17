import Container from '../ui/Container'
import { services } from '../../data/services'
import { Link } from 'react-router-dom'

function ServicesGrid() {
  return (
    <section className="pt-8 pb-24 lg:pt-12 lg:pb-32 bg-[#0A0A0B] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative h-[400px] lg:h-[450px] rounded-[3rem] bg-[#13151A]/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-700 hover:border-white/20 hover:bg-[#13151A]/60 hover:-translate-y-2 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            >
              {/* Content Container */}
              <div className="p-10 relative z-20 h-full flex flex-col">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20`}>
                  {service.icon}
                </div>

                <div className="mb-2">
                  <span className={`text-[10px] uppercase tracking-[0.3em] font-bold bg-gradient-to-r ${service.accent} bg-clip-text text-transparent opacity-80`}>
                    {service.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-4">
                  {service.description}
                </p>

                {/* Simple Inquire Link */}
                <Link to="/contact" className="mt-auto flex items-center gap-2 text-white font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Inquire Now
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
      </Container>
    </section>
  )
}

export default ServicesGrid
