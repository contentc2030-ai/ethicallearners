'use client'

import { motion } from 'framer-motion'
import { CourseHero } from '@/components/course-hero'
import { CourseContent } from '@/components/course-content'     
import TrustedSection from '@/components/TrustedSection'
import CyberSecurity from './CyberSecurity'
import CourseFAQs from '@/components/CourseFAQs'                                 //
import CertificationCard from '@/components/CertificationCard'
import { useEffect, useState } from "react";

export default function CoursePage() {
  const courseData: CourseHeroProps = {
    
    title: "Advanced Cybersecurity",
    subtitle: "with Career Support",
    badgeText: "Master the principles of cybersecurity and learn how to outsmart cyber adversaries. This program blends hands-on practice with in-depth knowledge to secure the digital landscape.",
    features: [
      "Master Ethical Hacking, Penetration Testing, and Incident Response",
      "Industry-recognized certifications and hands-on labs",
      "Build real-world security projects and SOC experience",
    ],
    stats: [
      { value: "1000+", label: "Professionals Trained" },
      { value: "8.2 LPA", label: "Average CTC" },
      { value: "60 LPA", label: "Highest Package" },
      { value: "6.5 LPA", label: "Minimum CTC" },
      { value: "750+", label: "Hiring Partners" },
    ],
    collaborators: [
      { name: "CyberCert Academy", logo: "/placeholder.svg?height=40&width=120&text=CyberCert" },
      { name: "ISACA", logo: "/placeholder.svg?height=40&width=120&text=ISACA" },
    ],
    courseDetails: {
      level: "Advanced",
      duration: "6 Months",
      lessons: 180,
      students: 1500,
      certifications: ["IBM", "Microsoft"],
      language: "English",
      price: "₹49,999",
    },
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

        {/* Course Content */}
        <CyberSecurity />
        <CourseContent />
        <CertificationCard imageUrl="/path/to/image.jpg" altText="Certification Image" />

        {/* FAQs */}
        <div className="mt-12">
          <CourseFAQs course="CyberSecurity" />        
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
