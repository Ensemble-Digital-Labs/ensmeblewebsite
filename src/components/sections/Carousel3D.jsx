import { useEffect, useRef, useState } from 'react'
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
    color: '#A374FF',
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
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const dragCursorRef = useRef(null)
  const lastTouchX = useRef(0)

  const totalItems = carouselItems.length
  const angleStep = 360 / totalItems
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const radius = isMobile ? 400 : 750

  useEffect(() => {
    if (!carouselRef.current) return

    // Parallax scroll effect
    gsap.to('.carousel-3d-item', {
      scrollTrigger: {
        trigger: carouselRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: '-30vh',
    })
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    const touch = e.touches[0]
    setStartX(touch.clientX)
    lastTouchX.current = touch.clientX
  }

  const handleMouseMove = (e) => {
    if (!isDragging) {
      // Show drag cursor
      if (dragCursorRef.current) {
        dragCursorRef.current.style.opacity = '1'
        dragCursorRef.current.style.left = `${e.clientX}px`
        dragCursorRef.current.style.top = `${e.clientY / 2.5}px`
      }
      return
    }

    const deltaX = e.clientX - startX
    const sensitivity = 0.5 // Adjust sensitivity for smoother dragging
    const rotationDelta = (deltaX / window.innerWidth) * 360 * sensitivity
    
    // Allow infinite rotation - continuously update rotation without limits
    setRotation((prevRotation) => prevRotation + rotationDelta)
    setStartX(e.clientX) // Update start position for smooth continuous dragging
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    e.preventDefault() // Prevent scrolling while dragging
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - lastTouchX.current
    const sensitivity = 0.5
    const rotationDelta = (deltaX / window.innerWidth) * 360 * sensitivity
    
    // Allow infinite rotation - continuously update rotation without limits
    setRotation((prevRotation) => prevRotation + rotationDelta)
    lastTouchX.current = touch.clientX
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    // Snap to nearest card for easier navigation
    const normalizedRotation = ((rotation % 360) + 360) % 360
    const nearestIndex = Math.round(normalizedRotation / angleStep) % totalItems
    const targetRotation = nearestIndex * angleStep
    
    // Calculate shortest rotation path
    const diff1 = targetRotation - normalizedRotation
    const diff2 = diff1 > 0 ? diff1 - 360 : diff1 + 360
    const shortestDiff = Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2
    
    setRotation(rotation + shortestDiff)
    setCurrentIndex(nearestIndex)
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    // Snap to nearest card for easier navigation on mobile
    const normalizedRotation = ((rotation % 360) + 360) % 360
    const nearestIndex = Math.round(normalizedRotation / angleStep) % totalItems
    const targetRotation = nearestIndex * angleStep
    
    // Calculate shortest rotation path
    const diff1 = targetRotation - normalizedRotation
    const diff2 = diff1 > 0 ? diff1 - 360 : diff1 + 360
    const shortestDiff = Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2
    
    setRotation(rotation + shortestDiff)
    setCurrentIndex(nearestIndex)
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (dragCursorRef.current) {
      dragCursorRef.current.style.opacity = '0'
    }
  }

  const handleItemClick = (index) => {
    // Calculate the shortest rotation path for smooth looping
    const currentNormalized = ((rotation % 360) + 360) % 360
    const targetRotation = index * angleStep
    const diff1 = targetRotation - currentNormalized
    const diff2 = diff1 > 0 ? diff1 - 360 : diff1 + 360
    
    // Choose the shorter path
    const shortestDiff = Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2
    const newRotation = rotation + shortestDiff
    
    setRotation(newRotation)
    setCurrentIndex(index)
  }

  return (
    <section
      id="page3"
      className="carousel-3d-section relative h-screen w-full pt-[30vh] overflow-hidden"
      data-scroll
      data-scroll-section
    >
      {/* Drag Cursor */}
      <div
        ref={dragCursorRef}
        className="drag-cursor fixed w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center pointer-events-none z-[999999] opacity-0 transition-opacity duration-300"
      >
        <span className="text-white text-xs font-medium text-center leading-tight">
          Drag<br />or Click
        </span>
      </div>

      {/* 3D Carousel Container */}
      <div
        ref={carouselRef}
        className="carousel-3d-container relative w-full h-[50vh]"
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-3d-wrapper relative w-full h-full"
          style={{
            transform: `rotateY(${-rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {carouselItems.map((item, index) => {
            const angle = index * angleStep
            const x = Math.sin((angle * Math.PI) / 180) * radius
            const z = Math.cos((angle * Math.PI) / 180) * radius
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                className="carousel-3d-item absolute cursor-pointer"
                style={{
                  width: isMobile ? '70vw' : '35vw',
                  height: isMobile ? '40vh' : '55vh',
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => handleItemClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="image-container relative w-full h-full rounded-[30px] overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: item.color,
                    // All items same size - only scale on hover
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
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

                {/* Text Overlay */}
                <div
                  className="texts absolute bottom-0 left-0 right-0 p-8 transition-opacity duration-300"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: 'rotateY(0deg)',
                  }}
                >
                  <p className="text-white text-lg sm:text-xl mb-2 font-normal leading-tight">
                    {item.description}
                  </p>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <span
                    className="label text-sm uppercase font-medium"
                    style={{
                      color: hoveredIndex === index ? item.color : '#fff',
                      mixBlendMode: 'difference',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Discover More Button */}
      <button
        id="disc-btn"
        className="absolute left-[10%] bottom-[20%] z-[999] bg-transparent border border-brand-primary px-8 py-4 text-white text-sm font-bold rounded-[30px] cursor-pointer hover:bg-brand-primary transition-all duration-300"
      >
        Discover more of our work
      </button>
    </section>
  )
}

export default Carousel3D
