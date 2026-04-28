import { useRef } from 'react'
import { testimonials as initialTestimonials } from '../../data/testimonials'
import { useCinematicSectionReveal } from '../../lib/cinematicSectionReveal'
import { ParallaxDepth } from '../ui/ParallaxDepth'
import CircularTestimonials from '../ui/CircularTestimonials'

function TestimonialsCollage({ userTestimonials = [] }) {
  const sectionRef = useRef(null)
  useCinematicSectionReveal(sectionRef)

  const testimonials = [...initialTestimonials, ...userTestimonials]
  const displayList = testimonials.slice(-8)

  return (
    <section
      ref={sectionRef}
      id="testimonials-collage"
      className="relative isolate min-h-[100svh] overflow-x-hidden bg-[#030712] text-zinc-100"
      data-scroll
      aria-label="Client testimonials"
    >
      <ParallaxDepth
        variant="strong"
        tone="dark"
        scrollLayerParallax={false}
        className="box-border min-h-[100svh] w-full py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h2
            data-cinematic-reveal="lead"
            className="mb-4 text-center text-3xl font-black tracking-tighter text-zinc-50 sm:text-4xl lg:text-5xl"
          >
            What our clients say
          </h2>
          <p
            data-cinematic-reveal="block"
            className="mx-auto max-w-xl text-center text-base text-zinc-400 lg:text-lg"
          >
            Swipe or use the arrows to explore stories from practices we support
          </p>

          <div data-cinematic-reveal="block" className="mt-10 lg:mt-12">
            <CircularTestimonials testimonials={displayList} autoplay />
          </div>
        </div>
      </ParallaxDepth>
    </section>
  )
}

export default TestimonialsCollage
