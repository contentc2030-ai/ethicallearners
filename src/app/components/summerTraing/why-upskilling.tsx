"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Benefit {
  title: string
  description: string
  icon: string
}

interface WhyUpskillingProps {
  benefits: Benefit[]
}

const icons = {
  Trophy,
  Star,
  Target,
}

export function WhyUpskilling({ benefits }: WhyUpskillingProps) {
  return (
    <section className="relative py-24 bg-[#0F1729] overflow-hidden border-t border-white/5">
      {/* 1. ARCHITECTURAL BACKGROUND (Matching Hero) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute left-[45%] top-0 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        <div className="absolute bottom-[20%] left-0 w-full h-px bg-gradient-to-r from-white/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left max-w-4xl mb-16 lg:mb-24"
        >
          {/* Symmetrical Accent Line */}
          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
            <div className="h-px w-6 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-xs uppercase tracking-[0.3em] font-bold">
              The Path to Mastery
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Why <span className="text-[#4CC9F0] italic font-serif font-normal">Upskilling</span> <br />
            <span className="text-2xl md:text-3xl text-gray-400 font-light block mt-2">
              is Essential in Today's Market
            </span>
          </h2>
        </motion.div>

        {/* Benefits Grid - Sharp, Structural Units */}
        <div className="grid md:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon as keyof typeof icons] || Star
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Internal Card Structure - Removed rounded corners for Architectural look */}
                <Card className="h-full bg-transparent border-none rounded-none transition-all duration-500 overflow-hidden">
                  {/* Subtle Hover Reveal Overlay */}
                  <div className="absolute inset-0 bg-[#4CC9F0]/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  
                  <CardContent className="p-10 lg:p-12 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
                    {/* Icon Container: Sharp & Technical */}
                    <div className="w-12 h-12 border border-[#4CC9F0]/20 bg-[#4CC9F0]/5 flex items-center justify-center mb-8 group-hover:border-[#4CC9F0]/50 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-[#4CC9F0]" />
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#4CC9F0] transition-colors">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed text-base font-light">
                      {benefit.description}
                    </p>
                    
                    {/* Symmetrical accent bar at bottom - Monospace feel */}
                    <div className="mt-10 flex items-center gap-2">
                       <div className="w-6 h-[1px] bg-[#4CC9F0]" />
                       <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 group-hover:text-[#4CC9F0] transition-colors">
                         Core Benefit 0{index + 1}
                       </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}