import { useState } from 'react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { servicesPageContent } from '../../lib/content'
import { ChevronDown } from 'lucide-react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const { faq } = servicesPageContent

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-20 lg:py-28 bg-[#050711] overflow-hidden">
      {/* Subtle ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl opacity-40" />
        <div className="absolute -bottom-32 right-0 w-[520px] h-[520px] rounded-full bg-brand-primary/8 blur-3xl opacity-50" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="FAQ"
          className="mb-10 lg:mb-14 relative z-10"
          invert
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="space-y-4 lg:space-y-5">
            {faq.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] ${
                    isOpen ? 'shadow-[0_24px_80px_rgba(0,0,0,0.9)]' : 'shadow-[0_10px_32px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {/* Accent bar */}
                  <div
                    className={`absolute inset-x-6 top-[1px] h-px rounded-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transform origin-left transition-all duration-300 ${
                      isOpen ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0'
                    }`}
                  />

                  <button
                    type="button"
                    className="w-full px-6 py-5 lg:px-7 lg:py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                          isOpen
                            ? 'border-white/40 bg-white/10 text-white'
                            : 'border-white/15 bg-white/5 text-white/70'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <h3 className="text-base lg:text-lg font-semibold text-white pr-4 group-hover:text-white transition-colors">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/0 text-white transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-white/5 border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${item.id}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="px-6 pb-5 lg:px-7 lg:pb-6 pt-0">
                      <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FAQ
