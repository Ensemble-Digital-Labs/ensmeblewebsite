import Container from '../ui/Container'
import { ParallaxDepth } from '../ui/ParallaxDepth'
import { servicesPageContent } from '../../lib/content'

function ServicesHero() {
  return (
    <section className="relative bg-bg-primary overflow-hidden">
      <ParallaxDepth variant="default" tone="light" className="overflow-hidden pt-32 pb-8 lg:pt-48 lg:pb-12">
      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-gray-200 shadow-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Our Expertise</span>
          </div>

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-text-primary mb-8 tracking-tight leading-[1.05] animate-fade-in-up">
            Our <span className="bg-gradient-to-r from-brand-primary via-cyan-400 to-brand-primary bg-clip-text text-transparent italic">Services</span>
          </h1>

          <p className="text-text-secondary text-lg lg:text-xl xl:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {servicesPageContent.hero.subtitle}
          </p>

          {/* Scroll Down Indicator */}
          <div className="flex justify-center animate-bounce-slow pt-4">
            <div className="w-[1px] h-8 bg-gradient-to-b from-brand-primary to-transparent"></div>
          </div>
        </div>
      </Container>
      </ParallaxDepth>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-fade-in-up { 
          opacity: 0;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        .animate-fade-in { 
          opacity: 0;
          animation: fadeIn 1.5s ease-out forwards; 
        }
        .animate-bounce-slow { 
          animation: bounce-slow 2s ease-in-out infinite; 
        }
      `}</style>
    </section>
  )
}

export default ServicesHero
