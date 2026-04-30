'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Building } from 'lucide-react'
import { CourseFeatures } from './course-features'
import { FaSackDollar } from 'react-icons/fa6'
// import CourseDetails from './course-details'

interface CourseHeroProps {
  stats: Array<{
    value: string
    label: string
  }>
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

export function CourseHero({ stats, courseDetails }: CourseHeroProps) {
  const [title, setTitle] = useState<string>('Loading...')
  const [badgeText, setBadgeText] = useState<string>('Loading...')

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const response = await fetch("/api/course/getCourse")
        const data = await response.json()

        console.log("Fetched Data:", data)

        if (data.courses && data.courses.length > 0) {
          setTitle(data.courses[0].name)
          setBadgeText(data.courses[0].description)
        } else {
          console.error("No course data found:", data)
          setTitle("No title available")
          setBadgeText("No description available")
        }
      } catch (error) {
        console.error("Error fetching course data:", error)
        setTitle("Failed to load title")
        setBadgeText("Failed to load description")
      }
    }

    fetchCourseData()
  }, [])


  return (
    <div className="relative min-h-[80vh] bg-gradient-to-br from-[#0F1729] via-[#131B2E] to-[#0F1729] overflow-hidden px-4 sm:px-6 md:px-10">


      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            className="space-y-6 col-span-1 lg:col-span-7 px-4 sm:px-6 lg:px-0 w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-4 items-center">
              <Badge
                variant="outline"
                className="bg-[#4CC9F0]/10 text-[#4CC9F0] border-[#4CC9F0]/20"
              >
                AI Powered
              </Badge>

              <Badge
                variant="outline"
                className="bg-[#4CC9F0]/10 text-[#4CC9F0] border-[#4CC9F0]/20"
              >
                <FaSackDollar className="mr-2" /> 100% Money Back Guarantee
              </Badge>
            </div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title}
              <span className="block text-[#4CC9F0]">Learn & Grow</span>
            </motion.h1>

            <p className="text-gray-300 text-base">{badgeText}</p>

            <div className="space-y-4">
              <div className="flex gap-4 items-center text-gray-300">
                <Building className="w-5 h-5 text-[#4CC9F0]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-[#1E293B] rounded-lg p-4 text-center shadow-lg border border-gray-700"
                  >
                    <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#38BDF8]">
                      {stat.value}
                    </h4>
                    <p className="text-gray-400 mt-2 text-sm sm:text-base">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 lg:col-span-5 px-4 sm:px-6 lg:px-0"
          >
            {/* <CourseDetails {...courseDetails} /> */}
          </motion.div>
        </div>

        <CourseFeatures />
      </div>
    </div>
  )
}
