import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initImagesScroll, initImageHover } from '../../lib/popprAnimations'
import { prefersReducedMotion } from '../../lib/utils'

gsap.registerPlugin(ScrollTrigger)

const portfolioItems = [
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
]

function Portfolio() {
  const sectionRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    // Initialize poppr image scroll and hover effects
    const timer = setTimeout(() => {
      initImagesScroll()
      initImageHover()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="page3"
      className="portfolio-section relative h-screen w-full pt-[30vh] overflow-visible"
      data-scroll
      data-scroll-section
    >
      {/* Drag Cursor */}
      <div className="drag-cursor h-[7vw] w-[7vw] bg-brand-primary fixed z-[999999] rounded-full flex items-center justify-center transition-all duration-1000 ease-out opacity-0 pointer-events-none">
        <span className="text-white text-[1vw] text-center leading-tight">Drag<br />or Click</span>
      </div>

      {/* Swiper Carousel */}
      <div className="swiper-container relative">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          mousewheel={true}
          className="mySwiper"
          style={{
            height: '50vh',
            width: '100vw',
            overflow: 'visible',
            transform: 'skewY(6deg) rotateZ(6deg)',
          }}
          onMouseEnter={() => {
            const cursor = document.querySelector('.drag-cursor')
            if (cursor) cursor.style.opacity = '1'
          }}
          onMouseLeave={() => {
            const cursor = document.querySelector('.drag-cursor')
            if (cursor) cursor.style.opacity = '0'
          }}
          onMouseMove={(e) => {
            const cursor = document.querySelector('.drag-cursor')
            if (cursor) {
              cursor.style.left = `${e.clientX}px`
              cursor.style.top = `${e.pageY / 2.5}px`
            }
          }}
        >
          {portfolioItems.map((item, index) => (
            <SwiperSlide key={index} className="images h-[90vh] w-[40vw] flex flex-col items-center">
              <div
                className="image h-[55vh] w-[35vw] rounded-[30px] overflow-hidden transition-all duration-2000 ease-out"
                data-color={item.color}
                style={{
                  backgroundColor: item.color,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="zoomed h-[55vh] w-[35vw] rounded-[30px] object-cover transition-all duration-2000 ease-out"
                />
              </div>
              <div
                className="texts p-[1vh_5vw] relative top-[-15vh] transform skew-y-[-7deg] rotate-z-[-7deg] transition-all duration-1000 ease-out w-[38vw]"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
              >
                <p className="text-white text-[2vw] font-normal leading-tight mb-2 tracking-[-1px] w-full">
                  {item.description}
                </p>
                <h3 className="text-white text-[3vw] font-antique mb-2 tracking-[-3px]">
                  {item.title}
                </h3>
                <span
                  className="label text-[1vw] uppercase mix-blend-difference"
                  style={{ color: hoveredIndex === index ? item.color : '#fff' }}
                >
                  {item.category}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Discover More Button */}
      <a href="/casestudies">
        <button
          id="disc-btn"
          className="menu nav-cta bg-transparent border border-brand-primary px-[2vw] py-[1vw] text-white text-[1.1vw] font-bold rounded-[30px] absolute left-[10%] bottom-[20%] z-[999] cursor-pointer relative overflow-hidden"
        >
          <span className="button-inner">
            <span className="button-inner-static initial">
              <p>Discover more of our work</p>
            </span>
            <span className="button-inner-hover hovered hovered-disc">
              <p>Discover more of our work</p>
            </span>
          </span>
          <div id="an-cir1" className="anim-circle"></div>
          <div id="an-cir2" className="anim-circle"></div>
        </button>
      </a>
    </section>
  )
}

export default Portfolio
