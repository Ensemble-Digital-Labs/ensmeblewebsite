import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const carouselItems = [
  {
    title: 'E-commerce Platform',
    description: 'Immersive 3D shopping experience',
    category: 'Web • 3D',
    color: '#018BCF',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  },
  {
    title: 'Virtual Reality Showcase',
    description: 'Highlighting urban redevelopment in virtual reality',
    category: 'Web • 360° • VR',
    color: '#90BFD6',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800',
  },
  {
    title: 'Brand Experience',
    description: 'A perfect immersive experience for digital transformation',
    category: 'Web • 3D',
    color: '#0891B2',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
  {
    title: 'Interactive Documentary',
    description: 'Building engagement through interactive storytelling',
    category: 'Web • 360° video',
    color: '#f4d446',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
  {
    title: 'Digital Innovation',
    description: 'Spreading virtual wings in the digital space',
    category: 'Web • 3D',
    color: '#17F1D1',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
  },
  {
    title: 'AR Experience',
    description: 'Transforming reality through augmented experiences',
    category: 'AR • Mobile',
    color: '#6c59ea',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
]

function Carousel3D() {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const totalItems = carouselItems.length
  const angleStep = 360 / totalItems

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const radius = isMobile ? 380 : 620

  useEffect(() => {
    if (!carouselRef.current) return
    gsap.to('.carousel-3d-wrapper', {
      scrollTrigger: {
        trigger: carouselRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: '-12vh',
    })
  }, [])

  const goToIndex = (index) => {
    const targetBase = index * angleStep
    const currentNorm = ((rotation % 360) + 360) % 360
    let diff = (targetBase - currentNorm + 360) % 360
    if (diff > 180) diff -= 360 // take the short way backward
    setRotation((r) => r + diff)
    setCurrentIndex(index)
  }

  const goPrev = () => {
    const prev = (currentIndex - 1 + totalItems) % totalItems
    goToIndex(prev)
  }

  const goNext = () => {
    const next = (currentIndex + 1) % totalItems
    goToIndex(next)
  }

  const handleItemClick = (index) => {
    goToIndex(index)
  }

  return (
    <section
      id="page3"
      className="carousel-3d-section relative min-h-screen w-full pt-[12vh] pb-8 overflow-hidden flex flex-col"
      data-scroll
      data-scroll-section
    >
      {/* 3D Carousel - active in center, one card left + one right; click to spin */}
      <div
        ref={carouselRef}
        className="carousel-3d-container relative w-full h-[50vh] flex-shrink-0 flex items-center justify-center"
        style={{
          perspective: '2200px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="carousel-3d-wrapper relative w-full h-full"
          style={{
            transform: `rotateY(${-rotation}deg)`,
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 50% 0px',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {carouselItems.map((item, index) => {
            const angle = index * angleStep
            const x = Math.sin((angle * Math.PI) / 180) * radius
            const z = Math.cos((angle * Math.PI) / 180) * radius
            const isHovered = hoveredIndex === index
            const normalized = ((rotation % 360) + 360) % 360
            const angleDiff = Math.abs((index * angleStep - normalized + 360) % 360)
            const frontness = 1 - Math.min(angleDiff, 360 - angleDiff) / 180
            const frontScale = 0.92 + 0.16 * frontness
            const isActive = frontness > 0.85

            return (
              <div
                key={index}
                className="carousel-3d-item absolute cursor-pointer"
                style={{
                  width: isMobile ? 280 : 340,
                  height: isMobile ? 200 : 380,
                  left: '50%',
                  top: '50%',
                  marginLeft: isMobile ? -140 : -170,
                  marginTop: isMobile ? -100 : -190,
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg) scale(${frontScale})`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => handleItemClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="image-container relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200/60 bg-bg-card shadow-md"
                  style={{
                    backgroundColor: item.color,
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: isActive ? '0 20px 40px -12px rgba(0,0,0,0.2)' : undefined,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    style={{
                      // Image always at scale(1) - container handles scaling
                      transform: 'scale(1)',
                    }}
                  />
                </div>

                {/* Text overlay - visible on hover or when active */}
                <div
                  className="texts absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-300 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent"
                  style={{
                    opacity: hoveredIndex === index || isActive ? 1 : 0.6,
                    transform: 'rotateY(0deg)',
                  }}
                >
                  <p className="text-white text-sm sm:text-base mb-1 font-normal leading-tight line-clamp-2">
                    {item.description}
                  </p>
                  <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-white/80 text-xs uppercase font-medium tracking-wider mt-1 inline-block">
                    {item.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom bar: Prev | indicator + Discover button | Next */}
      <div className="relative z-[999] grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 pt-16 pb-2">
        <button
          type="button"
          onClick={goPrev}
          className="justify-self-start w-14 h-14 flex-shrink-0 rounded-full bg-bg-primary/90 border-2 border-gray-300 text-text-primary flex items-center justify-center shadow-lg hover:border-brand-primary hover:text-brand-primary transition-colors"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleItemClick(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-brand-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted font-medium">
              {currentIndex + 1} / {carouselItems.length}
            </span>
          </div>
          <Link
            to="/casestudies"
            id="disc-btn"
            className="bg-transparent border border-brand-primary px-8 py-4 text-text-primary text-sm font-bold rounded-[30px] cursor-pointer hover:bg-brand-primary hover:text-white transition-all duration-300 inline-block"
            data-discover="true"
          >
            Discover more of our work
          </Link>
        </div>
        <button
          type="button"
          onClick={goNext}
          className="justify-self-end w-14 h-14 flex-shrink-0 rounded-full bg-bg-primary/90 border-2 border-gray-300 text-text-primary flex items-center justify-center shadow-lg hover:border-brand-primary hover:text-brand-primary transition-colors"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Carousel3D
