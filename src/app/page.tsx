import Hero from './components/Hero'
import CourseSection from './components/CourseSection'
import HiringPartners from './components/HiringPartners'
import PathWays from './components/PathWay'
import { TestimonialsSection } from './components/testimonial-section'
import WhoWeAre from './components/WhysUs'

export default function Home() {
  return (
  <div className="bg-gray-900 text-white px-4 sm:px-6 lg:px-16 py-8 sm:py-8 lg:py-10">
  <Hero />
  <CourseSection />
  <PathWays />
  <TestimonialsSection />
  <HiringPartners />
  <WhoWeAre />
</div>

  )
}

