import { useState } from 'react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { servicesPageContent } from '../../lib/content'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const { faq } = servicesPageContent

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="FAQ"
          className="mb-12 lg:mb-16"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faq.map((item, index) => {
              const isOpen = openIndex === index
              
              return (
                <div
                  key={item.id}
                  className="bg-bg-card rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-brand-primary/50"
                >
                  <button
                    type="button"
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-secondary rounded-xl"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <h3 className="text-lg font-semibold text-text-primary pr-8">
                      {item.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-brand-primary flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  <div
                    id={`faq-answer-${item.id}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-text-secondary leading-relaxed">
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
