"use client"

import { motion } from "framer-motion"
import { Database, Cloud, Shield, Code, BarChart, Settings } from "lucide-react"

const solutions = [
  { name: "Digital Business", icon: BarChart, color: "from-green-400 to-green-600" },
  { name: "Data & AI", icon: Database, color: "from-emerald-400 to-emerald-600" },
  { name: "Cloud & DevOps", icon: Cloud, color: "from-cyan-400 to-cyan-600" },
  { name: "Software Development", icon: Code, color: "from-blue-400 to-blue-600" },
  { name: "Cybersecurity", icon: Shield, color: "from-indigo-400 to-indigo-600" },
  { name: "Digital Operations", icon: Settings, color: "from-violet-400 to-violet-600" },
]

export function SolutionsWheel() {
  return (
    <section className="bg-[#0F1729] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comprehensive skills coverage
            <span className="block text-[#4CC9F0]">built for 40+ digital roles</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-[#1D2A3F] rounded-full border border-[#4CC9F0]/20" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div
                  className={`p-6 rounded-lg bg-gradient-to-br ${solution.color} bg-opacity-10 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-colors`}
                >
                  <div className="flex flex-col items-center text-center">
                    <solution.icon className="h-8 w-8 text-white mb-3" />
                    <h3 className="text-md font-semibold text-white">{solution.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

