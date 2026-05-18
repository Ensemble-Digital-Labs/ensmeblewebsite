import { useState, useEffect, useRef } from 'react'
import Container from '../ui/Container'
import { ParallaxDepth, ParallaxThemedBackdrop } from '../ui/ParallaxDepth'
import { servicesPageContent } from '../../lib/content'

function HowWeWork() {
  const { howWeWork } = servicesPageContent
  const { hero, steps } = howWeWork
  const [activeStep, setActiveStep] = useState(0)
  const scrollContainerRef = useRef(null)

  // Handle manual step selection
  const scrollToStep = (index) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const stepWidth = container.offsetWidth
    container.scrollTo({
      left: index * stepWidth,
      behavior: 'smooth'
    })
    setActiveStep(index)
  }

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const nextStep = (prev + 1) % steps.length
        scrollToStep(nextStep)
        return nextStep
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [steps.length])

  // Track scroll position for manual swipes
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const stepWidth = container.offsetWidth
    const newActiveStep = Math.round(container.scrollLeft / stepWidth)
    if (newActiveStep !== activeStep) {
      setActiveStep(newActiveStep)
    }
  }

  // Render high-fidelity visual mockups
  const renderVisualMockup = (visualElements, isActive) => {
    if (!visualElements) return null

    switch (visualElements.type) {
      case 'search':
        return (
          <div className="relative w-full max-w-sm mx-auto mb-6 h-40 lg:h-48 flex flex-col justify-center">
            <div className={`bg-[#1A1D23] rounded-2xl p-4 lg:p-5 border border-white/10 shadow-2xl transition-all duration-1000 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-30 shadow-none'}`}>
              <div className="flex items-center gap-3 bg-[#0F1115] rounded-xl px-4 py-3 border border-white/5">
                <span className="text-xl">🔍</span>
                <div className="text-gray-500 font-medium text-xs truncate">{visualElements.placeholder}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {visualElements.tags.map((tag, index) => (
                <div
                  key={tag}
                  className={`bg-[#1A1D23]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 flex items-center gap-2 shadow-xl transition-all duration-1000 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${isActive ? 'animate-float' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms`, animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-sm shadow-inner shrink-0">
                    {['📊', '👥', '🎯', '📈'][index]}
                  </div>
                  <span className="text-gray-300 font-medium text-[9px] truncate">{tag}</span>
                </div>
              ))}
            </div>
            <svg className="absolute -top-10 -left-10 w-full h-full pointer-events-none z-0 opacity-10" viewBox="0 0 400 400">
              <path d="M 50 50 Q 150 100, 50 200 T 50 350" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-brand-primary" />
            </svg>
          </div>
        )

      case 'icons':
        return (
          <div className="relative w-full max-w-sm mx-auto mb-6 h-40 lg:h-48 flex items-center">
            <div className="grid grid-cols-2 gap-4 relative z-10 w-full">
              {visualElements.items.map((item, index) => (
                <div
                  key={item}
                  className={`bg-[#1A1D23] rounded-[1.2rem] p-4 lg:p-5 border border-white/10 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-1000 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-30'} ${isActive ? 'animate-float' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms`, animationDelay: `${index * 0.3}s` }}
                >
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 border border-white/10 flex items-center justify-center mb-2 shadow-inner">
                    <span className="text-xl lg:text-2xl">{['🎨', '✨', '📝', '💡'][index]}</span>
                  </div>
                  <p className="text-white font-bold text-[8px] tracking-widest uppercase opacity-70">{item}</p>
                </div>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
          </div>
        )

      case 'team':
        return (
          <div className="relative w-full max-w-sm mx-auto mb-6 h-40 lg:h-48 flex flex-col justify-center">
            <div className={`bg-[#1A1D23] rounded-[2rem] p-5 lg:p-6 border border-white/10 shadow-2xl transition-all duration-1000 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-30'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">SPECIALISTS</div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A1D23] bg-gradient-to-br from-brand-primary/40 to-amber-600/40 opacity-80 shadow-md"></div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {visualElements.members.slice(0, 3).map((member, index) => (
                  <div key={member} className="flex items-center gap-2 bg-[#0F1115] px-3 py-2 rounded-full border border-white/5 opacity-80">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-gray-300 font-medium text-[9px]">{member}</span>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">+</div>
              </div>

              <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_20px_rgba(59,130,246,0.2)]">
                <span className="text-sm">💬</span>
                {visualElements.action}
              </button>
            </div>
            <div className={`absolute -bottom-4 -right-4 bg-[#0F1115] p-3 rounded-xl border border-white/10 shadow-2xl transition-all duration-1000 delay-500 animate-float-slow ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center text-lg">🚀</div>
                <div>
                  <div className="text-white font-bold text-[8px] uppercase tracking-tight">Active</div>
                  <div className="text-gray-500 text-[7px] font-bold uppercase tracking-widest">Live</div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="relative bg-bg-primary overflow-hidden" id="process">
      <ParallaxDepth
        variant="default"
        tone="light"
        className="flex min-h-screen items-center overflow-hidden py-20 lg:h-screen lg:max-h-[1080px] lg:py-0"
        layer1={
          <>
            <ParallaxThemedBackdrop tone="light" />
            <div className="pointer-events-none absolute inset-0 opacity-25">
              <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-[150px]" />
              <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[150px]" />
            </div>
          </>
        }
      >
      <Container>
        <div className="lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Left Panel - Hero Card */}
          <div className="mb-12 lg:mb-0">
            <div className="relative z-10 p-8 lg:p-10 rounded-[2.5rem] bg-[#13151A] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] flex flex-col h-full lg:max-h-[82vh] justify-between transition-all duration-500 hover:border-brand-primary/20">
              <div>
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500 via-green-400 via-yellow-400 via-orange-500 to-amber-600 p-[2px] mb-6 lg:mb-10 shadow-[0_0_30px_rgba(96,165,250,0.2)]">
                  <div className="w-full h-full rounded-full bg-[#13151A] flex items-center justify-center">
                    <span className="text-3xl lg:text-4xl">{hero.icon}</span>
                  </div>
                </div>

                <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 lg:mb-8 leading-[1.2] tracking-tight">
                  {hero.title}
                </h2>

                <p className="text-gray-400 text-base lg:text-lg xl:text-xl leading-relaxed max-w-lg">
                  {hero.description}
                </p>
              </div>

              <a
                href={hero.cta.link}
                className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-white text-text-primary rounded-2xl font-bold text-base lg:text-lg hover:bg-gray-200 transition-all duration-300 group shadow-[0_15px_30px_rgba(0,0,0,0.08)] w-fit mt-8"
              >
                <span className="text-2xl group-hover:rotate-12 transition-transform">✨</span>
                <span>{hero.cta.text}</span>
              </a>
            </div>
          </div>

          {/* Right Panel - Horizontal Carousel */}
          <div className="flex flex-col h-full lg:max-h-[82vh]">
            {/* Unified Phase Navigation - Fixed Alignment */}
            <div className="flex gap-2.5 mb-8 overflow-x-auto pb-4 scrollbar-hide">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(index)}
                  className={`px-6 py-3.5 rounded-xl font-bold whitespace-nowrap transition-all duration-500 border-2 text-[10px] tracking-widest ${activeStep === index
                      ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                      : 'bg-[#1A1D23] text-gray-400 border-white/5 hover:border-white/10'
                    }`}
                >
                  {step.step.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Carousel Container */}
            <div className="relative flex-grow min-h-0">
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth w-full h-full"
              >
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex-shrink-0 w-full snap-start h-full"
                  >
                    <div className={`p-8 lg:p-10 rounded-[2.5rem] bg-[#13151A] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] transition-all duration-700 flex flex-col h-full ${activeStep === index
                        ? 'opacity-100 scale-100 ring-1 ring-white/10'
                        : 'opacity-10 scale-[0.98] blur-[8px]'
                      }`}>

                      <div className="flex-shrink-0">
                        {renderVisualMockup(step.visualElements, activeStep === index)}
                      </div>

                      <div className="flex flex-col flex-grow justify-between min-h-0 mt-2">
                        <div className="overflow-hidden">
                          <div className="text-brand-primary font-bold text-[9px] tracking-[0.2em] mb-3 uppercase opacity-80">
                            {step.step}
                          </div>
                          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-5 leading-tight">
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-base lg:text-lg leading-relaxed line-clamp-3 lg:line-clamp-none">
                            {step.description}
                          </p>
                        </div>

                        {/* Smart Progress Indicator */}
                        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-6 lg:mt-8 flex-shrink-0">
                          <div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary to-blue-400 transition-all duration-[6000ms] linear ${activeStep === index ? 'w-full' : 'w-0'
                              }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      </ParallaxDepth>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      `}</style>
    </section>
  )
}

export default HowWeWork
