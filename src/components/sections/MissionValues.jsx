import Container from '../ui/Container'
import { aboutPageContent } from '../../lib/content'

function MissionValues() {
  const { mission, vision, values } = aboutPageContent

  const sections = [
    { ...mission, accent: 'from-growth-from to-growth-to', delay: '0s' },
    { ...vision, accent: 'from-growth-to to-orange-400', delay: '0.2s' },
    { ...values, accent: 'from-orange-400 to-growth-from', delay: '0.4s' },
  ]

  return (
    <section
      className="relative flex min-h-0 items-center overflow-hidden py-20 lg:min-h-screen lg:py-24"
      id="mission-values"
    >
      <Container className="relative z-10 w-full">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-20 animate-fade-in-up">
          <h2 className="font-display mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-white lg:text-4xl xl:text-5xl">
            Transform Imagination into<br />
            <span className="bg-gradient-to-r from-growth-from via-growth-to to-orange-400 bg-clip-text text-transparent">
              Reality: Steps to Build
            </span>
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base leading-relaxed tracking-wide text-white/72 lg:text-lg">
            Bring your vision to life effortlessly—follow our intuitive step-by-step
            process and watch your ideas transform into stunning realities.
          </p>
        </div>

        {/* 3-Column Slim Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {sections.map((item, index) => (
            <div
              key={item.title}
              className="group animate-slide-in-up relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-3xl transition-all duration-700 hover:border-brand-primary/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
              style={{ animationDelay: item.delay }}
            >
              {/* Shine Effect Layer */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

              {/* Edge Glow Highlight */}
              <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              {/* Content Section (Top) */}
              <div className="p-8 lg:p-10 flex flex-col gap-4 relative z-10">
                <span className={`text-[10px] uppercase tracking-[0.3em] font-bold bg-gradient-to-r ${item.accent} bg-clip-text text-transparent opacity-90`}>
                  Phase {index + 1}
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white text-base lg:text-lg font-medium leading-relaxed tracking-wide">
                  {item.subtitle}
                </p>
                <p className="text-white/90 text-sm lg:text-base leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Image Section (Bottom) */}
              <div className="relative mt-auto h-[300px] lg:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                />

                {/* Internal Breathing Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r ${item.accent} blur-[80px] opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-1000 animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <style jsx global>{`
        .stars-container {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 100px 150px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 150px 200px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 250px 250px, #fff, rgba(0,0,0,0));
          background-size: 300px 300px;
          animation: stars-float 60s linear infinite;
        }

        @keyframes stars-float {
          from { background-position: 0 0; }
          to { background-position: -300px -600px; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up { 
          opacity: 0;
          animation: slideInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
    </section>
  )
}

export default MissionValues
