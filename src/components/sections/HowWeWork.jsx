import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  Lightbulb,
  Palette,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  FileText,
} from 'lucide-react'
import Container from '../ui/Container'
import { DeckPanel } from '../home/HomeDeckPrimitives'
import { servicesPageContent } from '../../lib/content'
import { growthPrimaryStandard } from '../../lib/growthCtaClasses'
import { cn } from '../../lib/utils'

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

    const searchIcons = [BarChart3, Users, Target, TrendingUp]
    const strategyIcons = [Palette, Sparkles, FileText, Lightbulb]

    switch (visualElements.type) {
      case 'search':
        return (
          <div className="relative mx-auto mb-6 flex h-40 w-full max-w-sm flex-col justify-center lg:h-48">
            <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-sm transition-all duration-1000 lg:p-5 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-30 shadow-none'}`}>
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0F1115]/80 px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-[color:var(--color-growth-from)]/85" aria-hidden />
                <div className="truncate text-xs font-medium text-white/45">{visualElements.placeholder}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {visualElements.tags.map((tag, index) => {
                const TagIcon = searchIcons[index] ?? BarChart3
                return (
                  <div
                    key={tag}
                    className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 shadow-xl backdrop-blur-sm transition-all duration-1000 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${isActive ? 'animate-float' : ''}`}
                    style={{ transitionDelay: `${index * 150}ms`, animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-growth-from)]/25 bg-[color:var(--color-growth-from)]/10">
                      <TagIcon className="h-3.5 w-3.5 text-[color:var(--color-growth-to)]" aria-hidden />
                    </div>
                    <span className="truncate text-[9px] font-medium text-white/72">{tag}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'icons':
        return (
          <div className="relative mx-auto mb-6 flex h-40 w-full max-w-sm items-center lg:h-48">
            <div className="relative z-10 grid w-full grid-cols-2 gap-4">
              {visualElements.items.map((item, index) => {
                const ItemIcon = strategyIcons[index] ?? Sparkles
                return (
                  <div
                    key={item}
                    className={`flex flex-col items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 text-center shadow-2xl backdrop-blur-sm transition-all duration-1000 lg:p-5 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-30'} ${isActive ? 'animate-float' : ''}`}
                    style={{ transitionDelay: `${index * 150}ms`, animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-growth-from)]/20 bg-gradient-to-br from-[color:var(--color-growth-from)]/15 to-[color:var(--color-growth-to)]/10 lg:h-14 lg:w-14">
                      <ItemIcon className="h-5 w-5 text-[color:var(--color-growth-to)] lg:h-6 lg:w-6" aria-hidden />
                    </div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/65">{item}</p>
                  </div>
                )
              })}
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-growth-from)]/10 blur-[80px]" />
          </div>
        )

      case 'team':
        return (
          <div className="relative mx-auto mb-6 flex h-40 w-full max-w-sm flex-col justify-center lg:h-48">
            <div className={`rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-sm transition-all duration-1000 lg:p-6 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-30'}`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/45">Your team</div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-[#13151A] bg-gradient-to-br from-[color:var(--color-growth-from)]/40 to-[color:var(--color-growth-to)]/40 opacity-90 shadow-md" />
                  ))}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {visualElements.members.slice(0, 3).map((member) => (
                  <div key={member} className="flex items-center gap-2 rounded-full border border-white/8 bg-[#0F1115]/80 px-3 py-2 opacity-90">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.45)]" />
                    <span className="text-[9px] font-medium text-white/72">{member}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] py-2.5 text-xs font-bold text-white shadow-[0_10px_24px_rgba(234,88,12,0.22)] transition-opacity hover:opacity-90"
              >
                {visualElements.action}
              </Link>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const processCardClass =
    'flex h-full flex-col rounded-[2.5rem] p-8 shadow-none lg:p-10'

  return (
    <section
      className="relative flex min-h-0 items-center overflow-x-clip py-20 lg:min-h-screen lg:max-h-[1080px] lg:py-0"
      id="process"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Left Panel - Hero Card */}
          <div className="mb-12 lg:mb-0">
            <DeckPanel
              className={cn(
                processCardClass,
                'relative z-10 justify-between transition-all duration-500 hover:border-[color:var(--color-growth-from)]/25 lg:max-h-[82vh]',
              )}
            >
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--color-growth-from)]/30 bg-gradient-to-br from-[color:var(--color-growth-from)]/15 to-[color:var(--color-growth-to)]/10 shadow-[0_0_30px_rgba(233,78,119,0.15)] lg:mb-10 lg:h-20 lg:w-20">
                  <Sparkles className="h-7 w-7 text-[color:var(--color-growth-to)] lg:h-8 lg:w-8" aria-hidden />
                </div>

                <h2 className="font-display mb-6 text-3xl font-bold leading-[1.2] tracking-tight text-white lg:mb-8 lg:text-4xl xl:text-5xl">
                  {hero.title}
                </h2>

                <p className="max-w-lg text-base leading-relaxed text-white/68 lg:text-lg xl:text-xl">
                  {hero.description}
                </p>
              </div>

              <Link
                to={hero.cta.link}
                className={cn('group mt-8 gap-3 lg:text-lg', growthPrimaryStandard)}
              >
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden />
                <span>{hero.cta.text}</span>
              </Link>
            </DeckPanel>
          </div>

          {/* Right Panel - Horizontal Carousel */}
          <div className="flex flex-col h-full lg:max-h-[82vh]">
            {/* Unified Phase Navigation - Fixed Alignment */}
            <div className="flex gap-2.5 mb-8 overflow-x-auto pb-4 scrollbar-hide">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(index)}
                  className={`whitespace-nowrap rounded-xl border-2 px-6 py-3.5 text-[10px] font-bold tracking-widest transition-all duration-500 ${activeStep === index
                      ? 'border-[color:var(--color-growth-from)]/45 bg-[color:var(--color-growth-from)]/10 text-[color:var(--color-growth-to)] shadow-[0_0_20px_rgba(233,78,119,0.12)]'
                      : 'border-white/8 bg-white/[0.03] text-white/45 hover:border-white/15'
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
                    <DeckPanel
                      className={cn(
                        processCardClass,
                        'transition-all duration-700',
                        activeStep === index
                          ? 'ring-1 ring-[color:var(--color-growth-from)]/20'
                          : 'scale-[0.98] opacity-40',
                      )}
                    >

                      <div className="flex-shrink-0">
                        {renderVisualMockup(step.visualElements, activeStep === index)}
                      </div>

                      <div className="flex flex-col flex-grow justify-between min-h-0 mt-2">
                        <div className="overflow-hidden">
                          <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-growth-from)] opacity-90">
                            {step.step}
                          </div>
                          <h3 className="mb-4 text-2xl font-bold leading-tight text-white lg:mb-5 lg:text-3xl xl:text-4xl">
                            {step.title}
                          </h3>
                          <p className="line-clamp-3 text-base leading-relaxed text-white/68 lg:line-clamp-none lg:text-lg">
                            {step.description}
                          </p>
                        </div>

                        {/* Smart Progress Indicator */}
                        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-6 lg:mt-8 flex-shrink-0">
                          <div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)] transition-all duration-[6000ms] linear ${activeStep === index ? 'w-full' : 'w-0'
                              }`}
                          ></div>
                        </div>
                      </div>
                    </DeckPanel>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

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
