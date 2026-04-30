'use client'

import { motion } from 'framer-motion'
import { CourseHero } from '@/components/course-hero'
import { CourseContent } from '@/components/course-content'
import TrustedSection from '@/components/TrustedSection'
import DataScience from './DataScience'
import CourseFAQs from '@/components/CourseFAQs'
import CertificationCard from '@/components/CertificationCard'


export default function CoursePage() {
    const courseData:CourseHeroProps ={
        title: "Advanced Data Science",
        subtitle: "with AI and Machine Learning",
        badgeText: "Harness the power of data to drive innovation and make informed decisions",
        features: [
          "Master Data Analysis, Machine Learning, and Artificial Intelligence",
          "Hands-on projects with real-world datasets and industry tools",
          "Develop predictive models and data-driven solutions for business challenges"
        ],
        stats: [
          { value: "1500+", label: "Data Scientists Trained" },
          { value: "15 LPA", label: "Average CTC" },
          { value: "52 LPA", label: "Highest Package" },
          { value: "6.5 LPA", label: "Minimum Package"},
          { value: "600+", label: "Industry Partners" }
        ],
        collaborators: [
          { name: "DataTech Institute", logo: "/placeholder.svg?height=40&width=120&text=DataTech" },
          { name: "AI Research Labs", logo: "/placeholder.svg?height=40&width=120&text=AI%20Labs" }
        ],
        courseDetails: {
            level: "Advanced",
            duration: "6 Months",
            lessons: 180,
            students: 1500,
            certifications: ["IBM", "Microsoft"],
            language: "English",
            price: "₹49,999"
          }
      }
  return (
    <main className="min-h-screen bg-[#0F1729] text-white overflow-hidden">
        
      <CourseHero {...courseData} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >  
        <DataScience />
        <CourseContent />
        <CertificationCard imageUrl="/path/to/image.jpg" altText="Certification Image" />

        {/* FAQs */}
      <div className="mt-12">
      <CourseFAQs course="DataScience" />
      </div>
        
        <TrustedSection />
      </motion.div>
    </main>
  )
}


interface CourseHeroProps {
    title: string
    subtitle: string
    badgeText: string
    collaborators: { name: string; logo: string }[]
    features: string[]
    stats: { value: string; label: string }[]
    courseDetails: {
        level: string
        duration: string
        lessons: number
        students: number
        certifications: string[]
        language: string
        price: string
        
      }
  }


