import { useRef, useState } from 'react'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'
import { ParallaxDepth } from '../ui/ParallaxDepth'

const DEFAULT_IMAGE = '/assets/images/testimonials/testimonial-user-default.svg'

/**
 * Full-viewport cinematic band: user-submitted testimonial form.
 * Sits below testimonials, above layout `CinematicFooter`.
 *
 * @param {{ onTestimonialAdded: (item: object) => void }} props
 */
function ShareExperienceSection({ onTestimonialAdded }) {
  const sectionRef = useRef(null)
  useCinematicSectionReveal(sectionRef)

  const [formData, setFormData] = useState({
    author: '',
    role: '',
    company: '',
    quote: '',
    image: DEFAULT_IMAGE,
  })
  const [justSubmitted, setJustSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newT = {
      id: `user-${Date.now()}`,
      author: formData.author.trim(),
      role: formData.role.trim(),
      company: formData.company.trim(),
      quote: formData.quote.trim(),
      image: formData.image.trim() || DEFAULT_IMAGE,
    }
    if (!newT.author || !newT.quote) return
    onTestimonialAdded(newT)
    setFormData({
      author: '',
      role: '',
      company: '',
      quote: '',
      image: DEFAULT_IMAGE,
    })
    setJustSubmitted(true)
    window.setTimeout(() => setJustSubmitted(false), 5000)
  }

  return (
    <section
      ref={sectionRef}
      id="share-experience"
      className="relative isolate min-h-[100svh] overflow-x-hidden bg-[#050a14] text-zinc-100"
      data-scroll
      aria-label="Share your experience"
    >
      <ParallaxDepth
        variant="default"
        tone="dark"
        scrollLayerParallax={false}
        className="box-border min-h-[100svh] w-full py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div data-cinematic-reveal="lead" className="mb-6 text-center sm:mb-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-400/80 md:text-xs">
              Your voice
            </p>
            <h2 className="text-3xl font-black tracking-tighter text-zinc-50 sm:text-4xl lg:text-5xl">
              Share your experience
            </h2>
          </div>
          <p
            data-cinematic-reveal="block"
            className="mx-auto mb-10 max-w-lg text-center text-base text-zinc-400 lg:mb-12 lg:text-lg"
          >
            Tell us how we partnered with your practice. Your story may appear in the carousel above—saved
            in this browser until you connect a backend.
          </p>

          <form
            data-cinematic-reveal="block"
            onSubmit={handleSubmit}
            className="footer-glass-pill mx-auto w-full max-w-xl rounded-2xl border border-white/10 p-6 text-left shadow-2xl shadow-black/40 sm:p-8"
          >
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name *"
                value={formData.author}
                onChange={(e) => setFormData((d) => ({ ...d, author: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g. Practice Manager)"
                value={formData.role}
                onChange={(e) => setFormData((d) => ({ ...d, role: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
              <input
                type="text"
                placeholder="Company / practice name"
                value={formData.company}
                onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))}
                className="w-full rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
              <textarea
                placeholder="Your testimonial *"
                value={formData.quote}
                onChange={(e) => setFormData((d) => ({ ...d, quote: e.target.value }))}
                rows={4}
                className="w-full resize-y rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                required
              />
              <input
                type="url"
                placeholder="Photo URL (optional)"
                value={formData.image === DEFAULT_IMAGE ? '' : formData.image}
                onChange={(e) =>
                  setFormData((d) => ({
                    ...d,
                    image: e.target.value.trim() || DEFAULT_IMAGE,
                  }))
                }
                className="w-full rounded-lg border border-white/10 bg-zinc-950/50 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Submit story
              </button>
              {justSubmitted && (
                <span className="text-sm text-cyan-300/90" role="status">
                  Thanks—scroll up to see it in the carousel.
                </span>
              )}
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Stored in this browser only. Connect a backend to save permanently.
            </p>
          </form>
        </div>
      </ParallaxDepth>
    </section>
  )
}

export default ShareExperienceSection
