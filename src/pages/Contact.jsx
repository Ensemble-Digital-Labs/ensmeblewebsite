import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../components/ui/Container'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import FormButton from '../components/ui/FormButton'
import ContactHero from '../components/sections/ContactHero'
import Page5 from '../components/sections/Page5'

gsap.registerPlugin(ScrollTrigger)

const budgetOptions = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-plus', label: '$100,000+' },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef(null)
  const submitBtnRef = useRef(null)

  // 1. Magnetic Physics for Submit Button
  const handleMagnetic = useCallback((e) => {
    const btn = submitBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    
    const distance = Math.sqrt(x*x + y*y)
    const power = 35 // strength of pull
    
    if (distance < 120) {
      gsap.to(btn, {
        x: x * (power / distance),
        y: y * (power / distance),
        duration: 0.6,
        ease: 'power2.out'
      })
    } else {
      gsap.to(btn, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' })
    }
  }, [])

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 2. Entrance for Main Container
      gsap.fromTo('.contact-main-grid', 
        { scale: 0.98, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // 3. Holographic Scan-Line sweep
      gsap.to('.holographic-scan', {
        y: '100%',
        duration: 4,
        repeat: -1,
        ease: 'none',
      })

      // 4. Staggered reveal for form fields
      gsap.fromTo('.form-field-reveal', 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-side',
            start: 'top 85%',
          }
        }
      )

      // 5. Terminal Typing for technical readouts
      const techReadouts = document.querySelectorAll('.typing-label')
      techReadouts.forEach(label => {
        const fullText = label.getAttribute('data-text')
        let curr = ''
        const update = () => {
          if (curr.length < fullText.length) {
            curr += fullText.charAt(curr.length)
            label.textContent = curr + '_'
            setTimeout(update, 40 + Math.random() * 60)
          } else {
            label.textContent = fullText
          }
        }
        ScrollTrigger.create({
          trigger: label,
          start: 'top 95%',
          onEnter: () => setTimeout(update, 500)
        })
      })

      // 6. Reveal for info panels
      gsap.fromTo('.info-panel-reveal', 
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-info-side',
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)

    window.addEventListener('mousemove', handleMagnetic)
    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMagnetic)
    }
  }, [handleMagnetic])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', budget: '', message: '' })
        setIsSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <ContactHero />

      <section ref={sectionRef} id="contact-form" className="py-12 lg:py-24 relative">
        <Container>
          <div className="contact-main-grid flex flex-col lg:flex-row items-stretch bg-white border border-gray-100 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.06)] rounded-xl overflow-hidden relative opacity-0">
            
            {/* Tactical Corner Brackets */}
            <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gray-100 rounded-tl-lg z-50 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gray-100 rounded-br-lg z-50 pointer-events-none" />

            {/* Holographic Scan-Line */}
            <div className="holographic-scan absolute left-0 top-0 w-full h-[150px] bg-gradient-to-b from-transparent via-[#0891B2]/5 to-transparent z-40 pointer-events-none" style={{ transform: 'translateY(-100%)' }} />

            {/* LEFT: Contact Form Side */}
            <div className="contact-form-side flex-1 p-10 lg:p-16 border-r border-gray-50 relative">
              {/* background subtle grid */}
              <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              
              <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
                <div className="mb-12">
                  <span className="typing-label text-[10px] font-mono tracking-[0.4em] font-bold text-[#0891B2]/40 block mb-4 uppercase" data-text="CNCT://START_PROVISIONS">
                    _
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                    Tell us about your <br className="hidden sm:block" /> 
                    <span className="text-[#0891B2] italic font-serif tracking-wide">
                      next mission.
                    </span>
                  </h3>
                </div>

                {isSuccess ? (
                  <div className="p-8 mb-8 rounded-xl bg-green-50 border border-green-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-green-700 text-lg">Message Synchronized!</p>
                        <p className="text-green-600/80 text-sm">We'll respond within 24 standard hours.</p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-8 contact-form-fields" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="form-field-reveal opacity-0">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Miller"
                        required
                        error={errors.name}
                        className="bg-transparent border-0 border-b border-[#0891B2]/40 rounded-none px-0 py-2 shadow-none focus:ring-0 focus:border-[#0891B2]"
                      />
                    </div>
                    <div className="form-field-reveal opacity-0">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Work Email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        error={errors.email}
                        className="bg-transparent border-0 border-b border-[#0891B2]/40 rounded-none px-0 py-2 shadow-none focus:ring-0 focus:border-[#0891B2]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="form-field-reveal opacity-0">
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        label="Organization"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Medical Group Name"
                        className="bg-transparent border-0 border-b border-[#0891B2]/40 rounded-none px-0 py-2 shadow-none focus:ring-0 focus:border-[#0891B2]"
                      />
                    </div>
                    <div className="form-field-reveal opacity-0">
                      <Select
                        id="budget"
                        name="budget"
                        label="Estimated Flux"
                        value={formData.budget}
                        onChange={handleChange}
                        options={budgetOptions}
                        placeholder="Select scale"
                        className="bg-transparent border-0 border-b border-[#0891B2]/40 rounded-none px-0 py-2 shadow-none focus:ring-0 focus:border-[#0891B2]"
                      />
                    </div>
                  </div>

                  <div className="form-field-reveal opacity-0">
                    <Textarea
                      id="message"
                      name="message"
                      label="Briefing"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements..."
                      required
                      rows={5}
                      error={errors.message}
                      className="bg-transparent border-0 border-b border-[#0891B2]/40 rounded-none px-0 py-2 shadow-none focus:ring-0 focus:border-[#0891B2]"
                    />
                  </div>

                  <div className="form-field-reveal opacity-0 pt-4 relative group/btn">
                    <div ref={submitBtnRef} className="inline-block w-full sm:w-auto">
                      <FormButton
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        className="w-full sm:w-auto px-12 h-16 text-sm font-bold tracking-[0.2em] uppercase relative z-10 transition-shadow duration-500 hover:shadow-[0_15px_30px_rgba(8,145,178,0.3)] shadow-lg"
                      >
                        Initialize Link
                      </FormButton>
                      <div className="absolute inset-0 bg-[#0891B2]/10 blur-[20px] rounded-full scale-50 opacity-0 group-hover/btn:scale-110 group-hover/btn:opacity-100 transition-all duration-700 pointer-events-none" />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT: Contact Information & Details */}
            <div className="contact-info-side lg:w-[40%] bg-[#F9FAFB] p-10 lg:p-16 relative overflow-hidden flex flex-col justify-between">
              
              {/* Glassmorphic Indicator Background */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#0891B2]/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-12">
                <div className="info-panel-reveal opacity-0">
                  <span className="typing-label text-[10px] font-mono tracking-[0.4em] font-bold text-[#0891B2]/40 block mb-10 uppercase" data-text="CNCT://INFO_CHANNELS">
                    _
                  </span>
                  
                  <div className="space-y-10">
                    <div className="group/info">
                      <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-3">
                        001 // Primary Node
                      </p>
                      <a
                        href="mailto:hello@ensemble.digital"
                        className="text-xl lg:text-2xl font-bold text-gray-900 group-hover/info:text-[#0891B2] transition-colors duration-300"
                      >
                        hello@ensemble.digital
                      </a>
                    </div>

                    <div className="group/info">
                      <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-3">
                        002 // Voice Sync
                      </p>
                      <a
                        href="tel:+14697040457"
                        className="text-xl lg:text-2xl font-bold text-gray-900 group-hover/info:text-[#0891B2] transition-colors duration-300"
                      >
                        +1 (469) 704-0457
                      </a>
                    </div>

                    <div className="group/info">
                      <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-3">
                        003 // Physical Loc
                      </p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900 leading-[1.4] tracking-tight">
                        11715 Administration Dr,<br />
                        Suite 226, St. Louis, MO 63146
                      </p>
                    </div>
                  </div>
                </div>

                <div className="info-panel-reveal opacity-0 p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] group transition-all duration-500 hover:shadow-[0_45px_90px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2 border-b-4 border-b-[#0891B2]/5 hover:border-b-[#0891B2]/20">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#0891B2] rounded-full animate-pulse" />
                    Sync Window
                  </h4>
                  <div className="space-y-3 font-medium text-gray-500 text-sm">
                    <p className="flex justify-between border-b border-gray-50 pb-2 group-hover:border-gray-100 transition-colors">
                      <span>MON - FRI</span>
                      <span className="text-gray-900">09:00 - 18:00</span>
                    </p>
                    <p className="flex justify-between border-b border-gray-50 pb-2 group-hover:border-gray-100 transition-colors">
                      <span>SATURDAY</span>
                      <span className="text-gray-900">10:00 - 16:00</span>
                    </p>
                    <p className="flex justify-between">
                      <span>SUNDAY</span>
                      <span className="text-[#0891B2]">OFFLINE</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Footnote */}
              <div className="info-panel-reveal mt-12 pt-8 border-t border-gray-100 font-mono text-[9px] text-gray-400 tracking-[0.3em] uppercase opacity-0">
                LAT: 37.7749 // LONG: -122.4194<br/>
                NODE_STATUS: <span className="text-green-500 opacity-80">STABLE</span>
              </div>
            </div>
          </div>

          {/* Map Section - Live Google Map */}
          <div className="mt-16 sm:mt-24 lg:mt-32 opacity-0 form-field-reveal">
            <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-[0_40px_80px_-24px_rgba(15,23,42,0.35)] border border-white/60">
              {/* Soft glow + dotted background to match contact visual language */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0891B2]/5 via-transparent to-[#0891B2]/10" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage: 'radial-gradient(rgba(15,23,42,0.14) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                {/* Map */}
                <div className="relative min-h-[260px] lg:min-h-[320px] overflow-hidden">
                  <iframe
                    title="Ensemble Digital Labs location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.7213652191785!2d-90.45209472380182!3d38.691538261331834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8cb2e5c7f2de9%3A0x4f0c4b7c2c89a9c4!2s11715%20Administration%20Dr%2C%20St.%20Louis%2C%20MO%2063146%2C%20USA!5e0!3m2!1sen!2sus!4v1710000000001"
                    className="h-full w-full border-0"
                    style={{ filter: 'saturate(1.1) contrast(1.02)' }}
                    allowFullScreen
                  />

                  {/* Gradient ring accent in corner */}
                  <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-[#0891B2] via-cyan-400 to-emerald-300 opacity-40 blur-3xl" />
                </div>

                {/* Meta copy, matching reference style */}
                <div className="flex flex-col items-center justify-center px-6 py-8 sm:px-10 sm:py-10 text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F7FB] text-[#0891B2] shadow-[0_18px_45px_rgba(8,145,178,0.35)]">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M12 21s-6-4.8-6-10a6 6 0 1112 0c0 5.2-6 10-6 10z"
                      />
                      <circle cx="12" cy="11" r="2.4" strokeWidth={2} />
                    </svg>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Interactive Map Initialization
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm font-medium tracking-[0.22em] text-gray-500 uppercase">
                    Coordinate Sync: STL_63146 // ACTIVE
                  </p>
                  <p className="mt-4 text-sm text-gray-500 max-w-xs">
                    Visualize our primary node in St. Louis and plan on-site strategy sessions with the
                    Ensemble team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Page5 layout="page" ctaTo="#contact-form" />
    </div>
  )
}

export default Contact
