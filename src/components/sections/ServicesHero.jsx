import Container from '../ui/Container'
import { servicesPageContent } from '../../lib/content'

function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-transparent pb-8 pt-24 sm:pt-28 md:pt-32 lg:pb-12 lg:pt-36">
      <Container className="relative z-10 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/75">Our Expertise</span>
          </div>

          <h1 className="animate-fade-in-up font-display mx-auto mb-8 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl xl:text-8xl">
            {servicesPageContent.hero.title}
          </h1>

          <p
            className="animate-fade-in-up mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/72 lg:text-xl xl:text-2xl"
            style={{ animationDelay: '0.2s' }}
          >
            {servicesPageContent.hero.subtitle}
          </p>

          <div className="animate-bounce-slow flex justify-center pt-4">
            <div className="h-8 w-[1px] bg-gradient-to-b from-brand-primary to-transparent" />
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
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
