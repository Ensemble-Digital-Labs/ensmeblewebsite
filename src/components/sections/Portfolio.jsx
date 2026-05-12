import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'

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
    color: '#e94e77',
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
  return (
    <section
      id="page3"
      className="portfolio-section relative min-h-screen w-full py-16 md:py-24 bg-bg-primary overflow-hidden"
      data-scroll
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Our Work
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Selected projects across digital experiences and immersive media
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true}
            grabCursor={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="portfolio-carousel pb-14"
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group h-full rounded-2xl overflow-hidden bg-bg-card border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider text-white/95 backdrop-blur-sm"
                      style={{ backgroundColor: `${item.color}cc` }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-text-primary mb-1.5 group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Discover more */}
        <div className="text-center mt-10">
          <Link
            to="/case-studies"
            className="btn-rainbow inline-flex items-center justify-center font-semibold rounded-lg px-8 py-4 text-base border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 transition-colors"
            data-variant="outline"
          >
            Discover more of our work
          </Link>
        </div>
      </div>

      {/* Swiper pagination bullets - styled in index.css if needed */}
      <style>{`
        .portfolio-carousel .swiper-pagination-bullet { background: var(--color-text-muted); opacity: 0.5; }
        .portfolio-carousel .swiper-pagination-bullet-active { background: var(--color-brand-primary); opacity: 1; }
        .portfolio-carousel .swiper-button-next,
        .portfolio-carousel .swiper-button-prev { color: var(--color-brand-primary); }
        .portfolio-carousel .swiper-button-next:after,
        .portfolio-carousel .swiper-button-prev:after { font-size: 1.25rem; font-weight: bold; }
      `}</style>
    </section>
  )
}

export default Portfolio
