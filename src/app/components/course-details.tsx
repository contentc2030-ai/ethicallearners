'use client'

import { useEffect, useState } from 'react'
// Ensure the correct path to the CourseDetails module
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, BookOpen, Users, Award, Globe } from 'lucide-react'


export default function CoursePage() {
  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const response = await fetch('/api/course/getCourse')
        const data = await response.json()
        if (data.courses && data.courses.length > 0) {
          setCourse(data.courses[0])
        }
      } catch (error) {
        console.error('Error fetching course data:', error)
      }
    }

    fetchCourseData()
  }, [])

  if (!course) {
    return <div className="text-white">Loading...</div>
  }
  return (
    <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20 p-4 sm:p-6 w-full sm:w-96 mx-auto">
      <h3 className="text-lg font-semibold text-white mb-4 sm:mb-6">Course Includes:</h3>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4CC9F0]" />
            <span>Level</span>
          </div>
          <span className="text-sm sm:text-base">{course?.level}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#4CC9F0]" />
            <span>Duration</span>
          </div>
          <span className="text-sm sm:text-base">{course?.duration}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4CC9F0]" />
            <span>Lessons</span>
          </div>
          <span className="text-sm sm:text-base">{course?.lessons}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#4CC9F0]" />
            <span>Students</span>
          </div>
          <span className="text-sm sm:text-base">{course?.students}+</span>
        </div>

        <div className="flex flex-wrap items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4CC9F0]" />
            <span>Certifications</span>
          </div>
          <span className="text-sm sm:text-base">{course?.certifications.length}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#4CC9F0]" />
            <span>Language</span>
          </div>
          <span className="text-sm sm:text-base">{course?.language}</span>
        </div>

        <div className="pt-4 border-t border-[#4CC9F0]/20">
          <div className="text-xl sm:text-2xl font-bold text-white mb-4">{course?.price}</div>
          <Button className="w-full bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90">
            Join This Course
          </Button>
        </div>

        <div className="flex justify-center gap-1 pt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CC9F0]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </Card>
  )
}
