'use client'

import { motion } from 'framer-motion'
import { Code, Target, Users, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: "Code Everyday",
    items: [
      "Practitioner-led Live Classes",
      "Booster Practice Sessions",
      "Full Day Doubt Support"
    ]
  },
  {
    icon: Target,
    title: "Personalized Progress Evaluation",
    items: [
      "Weekly Test",
      "1:1 Mentorship",
      "Soft Skill Sessions"
    ]
  },
  {
    icon: Users,
    title: "Interview Preparation Every Month",
    items: [
      "Mock Interviews",
      "Geekathon",
      "Real World Projects"
    ]
  },
  {
    icon: BookOpen,
    title: "Intensive Placement Assistance",
    items: [
      "Profile Building",
      "Interview Preparation",
      "Job Referrals"
    ]
  }
]


export function CourseFeatures() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2 
        className="text-4xl font-bold text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Course <span className="text-[#4CC9F0]">Offers</span>
      </motion.h2>
      <motion.p 
        className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Build your skills step-by-step with our momentum-driven approach.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              className="bg-[#1D2A3F] rounded-lg p-6 border border-[#4CC9F0]/20 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#4CC9F0]/10">
                  <Icon className="w-5 h-5 text-[#4CC9F0]" />
                </div>
                <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
              </div>
              <ul className="space-y-3 mt-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

