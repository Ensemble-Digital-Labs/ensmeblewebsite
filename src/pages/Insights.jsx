import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'

const insights = [
  {
    id: 1,
    title: 'The Future of Digital Marketing in 2024',
    excerpt: 'Exploring emerging trends and technologies that will shape the digital marketing landscape.',
    category: 'Marketing',
    date: 'March 15, 2024',
  },
  {
    id: 2,
    title: 'Building Brand Loyalty Through Digital Experiences',
    excerpt: 'How immersive digital experiences create lasting connections with your audience.',
    category: 'Strategy',
    date: 'March 10, 2024',
  },
  {
    id: 3,
    title: 'Data-Driven Decision Making for Growth',
    excerpt: 'Leveraging analytics to make informed decisions that drive sustainable business growth.',
    category: 'Analytics',
    date: 'March 5, 2024',
  },
]

function Insights() {
  return (
    <div className="min-h-screen pt-8 pb-16">
      <Container>
        <SectionHeading
          title="Insights"
          subtitle="Latest Articles"
          className="mb-12 lg:mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {insights.map((insight) => (
            <Card key={insight.id} hover className="flex flex-col">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-primary bg-brand-primary bg-opacity-10 rounded-full mb-4 w-fit">
                {insight.category}
              </span>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {insight.title}
              </h3>
              <p className="text-text-secondary mb-4 flex-grow">
                {insight.excerpt}
              </p>
              <p className="text-sm text-text-muted">
                {insight.date}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Insights
