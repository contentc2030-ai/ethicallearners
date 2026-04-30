"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
// import Image from "next/image"
import { Download, Book, FileText, Users } from "lucide-react"
import { CorporateForm } from "./corporate-form"

export function CorporateHero() {
  const features = [
    {
      icon: Book,
      title: "Customized Curriculum",
      description: "Tailored learning paths for your organization",
    },
    {
      icon: FileText,
      title: "Real World Projects",
      description: "Hands-on experience with industry projects",
    },
    {
      icon: Users,
      title: "Hands on Learning",
      description: "Interactive sessions with industry experts",
    },
  ]

  return (
    <div className="relative bg-gradient-to-br from-[#0F1729] via-[#131B2E] to-[#0F1729] overflow-hidden ">


      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            className="space-y-6 lg:col-span-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              #1 Enterprise LMS System
              <span className="block text-[#4CC9F0]">for Upskilling Frontline Workers</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Transform your workforce with our comprehensive corporate training solutions. Custom courses, real-world
              projects, and hands-on learning experiences.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 rounded-lg bg-[#1D2A3F] border border-[#4CC9F0]/20"
                  >
                    <div className="p-3 rounded-lg bg-[#4CC9F0]/10 mb-4">
                      <Icon className="h-6 w-6 text-[#4CC9F0]" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button size="lg" className="bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90">
                <Download className="mr-2 h-4 w-4" /> Download Brochure
              </Button>
              <Button size="lg" variant="outline" className="border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0]/10">
                Request Demo
              </Button>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5">
            <CorporateForm />
          </div>
        </div>
      </div>
    </div>
  )
}

