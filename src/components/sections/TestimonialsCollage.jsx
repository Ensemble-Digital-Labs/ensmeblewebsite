import { useState } from 'react'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { ParallaxDepth } from '../ui/ParallaxDepth'
import CircularTestimonials from '../ui/CircularTestimonials'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newT = {
      id: `user-${Date.now()}`,
      author: formData.author.trim(),
      role: formData.role.trim(),
      company: formData.company.trim(),
      quote: formData.quote.trim(),
      image:
        formData.image.trim() ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    }
    if (!newT.author || !newT.quote) return
    const next = [...userTestimonials, newT]
    setUserTestimonials(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setFormData({
      author: '',
      role: '',
      company: '',
      quote: '',
      image: '',
    })
    setShowForm(false)
  }

  return (
    <section
      id="testimonials-collage"
      className="relative bg-bg-secondary overflow-hidden"
      data-scroll
      data-scroll-section
    >
      <ParallaxDepth variant="strong" tone="light" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 tracking-tight">
            What our clients say
          </h2>
          <p className="text-center text-text-secondary text-base lg:text-lg max-w-xl mx-auto mb-10 lg:mb-14">
            Swipe or use the arrows to explore stories from practices we support
          </p>

          <CircularTestimonials testimonials={displayList} autoplay />

          {/* Add your testimonial */}
          <div className="max-w-xl mx-auto mt-14 lg:mt-20 text-center">
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
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  Add your testimonial
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, author: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Practice Manager)"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, role: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Company / practice name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, company: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your testimonial *"
                    value={formData.quote}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, quote: e.target.value }))
                    }
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Photo URL (optional)"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, image: e.target.value }))
                    }
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
                  Stored in this browser only. Connect a backend to save
                  permanently.
                </p>
              </form>
            )}
          </div>
        </div>
      </ParallaxDepth>
    </section>
  )
}

export default TestimonialsCollage
