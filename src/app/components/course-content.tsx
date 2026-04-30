'use client'

import { motion } from 'framer-motion'
import { ReviewSection } from './review-section'
// import { InstructorCard } from './instructor-card'
import { PopularCourses } from './popular-courses'


export function CourseContent() {
  return (
    <div className="bg-[#0F1729] py-0">  {/* py-16*/}
      <div className="container mx-auto px-4 space-y-20 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          
          <ReviewSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* <InstructorCard /> */}
        </motion.div>                                 

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <PopularCourses />
        </motion.div>
      </div>
    </div>
  )
}

