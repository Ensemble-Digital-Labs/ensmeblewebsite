import { useState } from 'react'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import FormButton from '../components/ui/FormButton'
import ContactHero from '../components/sections/ContactHero'

const budgetOptions = [
  { value: '', label: 'Select budget range' },
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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '',
          message: '',
        })
        setIsSuccess(false)
      }, 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <ContactHero />

      <section className="py-16 lg:py-24 bg-bg-secondary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="lg:order-1">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Send us a message
              </h3>

              {isSuccess ? (
                <div
                  className="p-4 mb-6 rounded-lg bg-green-500/10 border border-green-500/20"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-500">Message sent successfully!</p>
                      <p className="text-sm text-text-secondary mt-1">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  error={errors.name}
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  error={errors.email}
                />

                <Input
                  id="company"
                  name="company"
                  type="text"
                  label="Company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                />

                <Select
                  id="budget"
                  name="budget"
                  label="Project Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  options={budgetOptions.slice(1)}
                  placeholder={budgetOptions[0].label}
                />

                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={6}
                  error={errors.message}
                />

                <FormButton
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Send Message
                </FormButton>
              </form>
            </Card>

            {/* Contact Details */}
            <div className="space-y-6 lg:order-2">
              <Card>
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-text-muted mb-2 uppercase tracking-wider">
                      Email
                    </p>
                    <a
                      href="mailto:hello@ensemble.digital"
                      className="text-lg text-text-primary hover:text-brand-primary transition-colors"
                    >
                      hello@ensemble.digital
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-2 uppercase tracking-wider">
                      Phone
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="text-lg text-text-primary hover:text-brand-primary transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-2 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-lg text-text-primary">
                      123 Digital Street<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2 text-text-secondary">
                  <p className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12 lg:mt-16">
            <Card className="p-0 overflow-hidden">
              <div className="relative w-full h-64 lg:h-96 bg-bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-text-muted">
                    Map placeholder - Embed your map here
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Contact
