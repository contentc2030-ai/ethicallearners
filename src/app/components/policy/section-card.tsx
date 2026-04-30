"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

export function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 bg-[#1D2A3F] rounded-lg overflow-hidden shadow-lg"
    >
      <div className="bg-gradient-to-r from-[#4CC9F0]/20 to-[#1D2A3F] p-6 flex items-center gap-4">
        <div className="text-[#4CC9F0]">{icon}</div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </motion.div>
  )
}

