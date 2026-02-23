import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const STORAGE_KEY = 'ensemble_user_testimonials'

function getStoredTestimonials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function TestimonialsCollage() {
  const sectionRef = useRef(null)
  const tilesRef = useRef([])
  const [activeId, setActiveId] = useState(null)
  const [userTestimonials, setUserTestimonials] = useState(getStoredTestimonials)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    company: '',
    quote: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  })

  const testimonials = [...initialTestimonials, ...userTestimonials]
  const displayList = testimonials.slice(-8)

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const tiles = tilesRef.current.filter(Boolean)
    const scroller = document.querySelector('#main') || window
    tiles.forEach((tile, i) => {
      gsap.fromTo(
        tile,
        { y: 28 },
        {
          y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tile,
            scroller: scroller,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [displayList.length])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newT = {
      id: `user-${Date.now()}`,
      author: formData.author.trim(),
      role: formData.role.trim(),
      company: formData.company.trim(),
      quote: formData.quote.trim(),
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    }
    if (!newT.author || !newT.quote) return
    const next = [...userTestimonials, newT]
    setUserTestimonials(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setFormData({ author: '', role: '', company: '', quote: '', image: '' })
    setShowForm(false)
  }

  return (
    <section
      id="testimonials-collage"
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-bg-secondary overflow-hidden"
      data-scroll
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 tracking-tight">
          What our clients say
        </h2>
        <p className="text-center text-text-secondary text-base lg:text-lg max-w-xl mx-auto mb-12 lg:mb-16">
          Hover over a photo to read their story
        </p>

        {/* Clean grid: same-size tiles, no overlap */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {displayList.map((t, index) => {
            const isActive = activeId === t.id
            return (
              <div
                key={t.id}
                ref={(el) => (tilesRef.current[index] = el)}
                className="relative aspect-square min-h-[140px] rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                onMouseEnter={() => setActiveId(t.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Photo: same size, object-cover; animated on hover */}
                <img
                  src={t.image}
                  alt={t.author}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover popup card */}
                <div
                  className={`absolute inset-2 flex flex-col justify-end p-4 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-xl transition-all duration-300 ease-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <p className="text-text-primary text-sm leading-relaxed line-clamp-4 mb-2">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-semibold text-text-primary text-sm">{t.author}</p>
                  {(t.role || t.company) && (
                    <p className="text-xs text-text-muted">
                      {[t.role, t.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>

                {!isActive && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium truncate">{t.author}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Add your testimonial */}
        <div className="max-w-xl mx-auto mt-16 text-center">
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-full border-2 border-dashed border-brand-primary text-brand-primary font-semibold text-sm hover:bg-brand-primary/10 transition-colors"
            >
              + Share your experience
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="text-left bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">Add your testimonial</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name *"
                  value={formData.author}
                  onChange={(e) => setFormData((d) => ({ ...d, author: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Practice Manager)"
                  value={formData.role}
                  onChange={(e) => setFormData((d) => ({ ...d, role: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company / practice name"
                  value={formData.company}
                  onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
                <textarea
                  placeholder="Your testimonial *"
                  value={formData.quote}
                  onChange={(e) => setFormData((d) => ({ ...d, quote: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                  required
                />
                <input
                  type="url"
                  placeholder="Photo URL (optional)"
                  value={formData.image}
                  onChange={(e) => setFormData((d) => ({ ...d, image: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-text-secondary hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-primary text-white font-medium hover:opacity-90"
                >
                  Submit
                </button>
              </div>
              <p className="text-xs text-text-muted mt-3">
                Stored in this browser only. Connect a backend to save permanently.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCollage
