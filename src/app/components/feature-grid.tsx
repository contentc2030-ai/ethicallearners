"use client"

import { motion } from "framer-motion"
import { Play, Users, BookOpen, Video, List, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Play,
    title: "Live classes",
    description: "Watch free online coaching classes by our best educators.",
    href: "#",
  },
  {
    icon: Users,
    title: "Top educators",
    description: "Learn from some of the best educators in the country.",
    href: "#",
  },
  {
    icon: BookOpen,
    title: "Batches",
    description: "Curated batches to simplify the learning journey for your goal.",
    href: "#",
  },
  {
    icon: Video,
    title: "Courses",
    description: "Learn every subject in detail from your favourite educator.",
    href: "#",
  },
  {
    icon: List,
    title: "Playlist",
    description: "High Quality Lectures videos for your entire syllabus.",
    href: "#",
  },
  {
    icon: Target,
    title: "Test series",
    description: "Boost your exam preperation with our test series..",
    href: "#",
  },
]

export function FeatureGrid() {
  return (
    <div className="bg-[#0F1729] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="block p-6 bg-[#1D2A3F] rounded-lg border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-[#4CC9F0]/10">
                      <Icon className="h-6 w-6 text-[#4CC9F0]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                  <div className="mt-4 flex items-center text-[#4CC9F0] text-sm">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

