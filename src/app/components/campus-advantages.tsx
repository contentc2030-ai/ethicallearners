"use client"

import { motion } from "framer-motion"
import { icons } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampusAdvantagesProps } from "../../global/interface/advantage.interface"
import TrustedSection from "./TrustedSection"
import HiringPartners from "./HiringPartners"


export function CampusAdvantages({ title, description, advantages }: CampusAdvantagesProps) {
  return (
    <section className="bg-[#0F1729] py-16">            
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((advantage, index) => {
            const Icon = icons[advantage.icon]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1D2A3F] rounded-lg p-6 border border-[#4CC9F0]/20"
              >
                <div className={`w-12 h-12 rounded-lg ${advantage.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-400">{advantage.description}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90">
            Apply Now
          </Button>
        </div>
      </div>
     
    </section>
  )
}

