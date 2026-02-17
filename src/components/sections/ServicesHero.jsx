import Container from '../ui/Container'
import { servicesPageContent } from '../../lib/content'

function ServicesHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12 bg-[#0A0A0B] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-brand-primary/5 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] opacity-20"></div>
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">Our Expertise</span>
          </div>

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.05] animate-fade-in-up">
            Our <span className="bg-gradient-to-r from-brand-primary via-purple-400 to-brand-primary bg-clip-text text-transparent italic">Services</span>
          </h1>

          <p className="text-gray-400 text-lg lg:text-xl xl:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {servicesPageContent.hero.subtitle}
          </p>

          {/* Scroll Down Indicator */}
          <div className="flex justify-center animate-bounce-slow pt-4">
            <div className="w-[1px] h-8 bg-gradient-to-b from-brand-primary to-transparent"></div>
          </div>
        </div>
      </Container>

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
