"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface LegalHeroProps {
  title: string
  description: string
}

export function LegalHero({ title, description }: LegalHeroProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4CC9F0]/20 to-[#0F1729]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-[#4CC9F0]/30"
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">{title}</h1>
          <p className="text-xl text-[#4CC9F0]">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}

