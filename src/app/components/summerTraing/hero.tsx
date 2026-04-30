"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SummerForm } from "../SummerForm"

interface Stat {
  value: string
  label: string
}

interface HeroProps {
  stats: Stat[]
}

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] lg:h-[90vh] flex items-center bg-[#0F1729] overflow-hidden selection:bg-[#4CC9F0] selection:text-[#0F1729]">
      
      {/* 1. ARCHITECTURAL BACKGROUND */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute left-[45%] top-0 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-white/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-16">
          
          {/* 2. LEFT CONTENT: Optimized for Width, not Height */}
          <div className="lg:w-[55%] flex flex-col justify-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-6 bg-[#4CC9F0]" />
              <span className="font-mono text-[#4CC9F0] text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold">
                No.1 Summer Training Cum Internship Program
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Reduced line-height and slightly smaller text to save vertical space */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                Master a <span className="text-[#4CC9F0] italic font-serif font-normal">New Skill</span> <br />
                <span className="text-xl md:text-2xl xl:text-3xl text-gray-400 font-light block mt-2">
                  This Summer – Accelerate Your Learning!
                </span>
              </h1>
              
              <p className="mt-6 text-gray-400 text-sm md:text-base xl:text-lg max-w-xl leading-relaxed font-light border-l border-white/10 pl-5">
                Gain essential industry skills in just 45 days! No experience? No problem. 
                Our expert-led training helps beginners build a strong professional foundation.
              </p>

              {/* 3. STATS: Compact Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 mt-10 border-t border-white/5 divide-x divide-white/5">
                {(stats && stats.length > 0 ? stats : [
                  { value: "20k+", label: "Students" },
                  { value: "150+", label: "Experts" },
                  { value: "50+", label: "Courses" },
                  { value: "750+", label: "Partners" }
                ]).map((stat, index) => (
                  <div key={index} className="py-5 px-4 first:pl-0 group">
                    <p className="font-mono text-xl xl:text-2xl font-bold text-white group-hover:text-[#4CC9F0] transition-colors">{stat.value}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* 4. ACTIONS */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-white text-[#0F1729] hover:bg-[#4CC9F0] hover:text-[#0F1729] font-bold text-sm px-7 py-5 rounded-none transition-all duration-300">
                  Get Started
                </Button>
                <Button variant="outline" className="border-white/20 bg-transparent hover:bg-white/5 text-white text-sm px-7 py-5 rounded-none transition-all">
                  Explore Now
                </Button>
              </div>
            </motion.div>
          </div>

          {/* 5. RIGHT SIDE: Perfectly Balanced Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-[42%] flex items-center justify-center lg:justify-end"
          >
            {/* Max width increased for a better "Card" feel */}
            <div className="relative w-full max-w-[440px]">
              {/* Proportional decorative brackets */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-[#4CC9F0]/20 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-[#4CC9F0]/20 pointer-events-none" />
              
              <div className="relative bg-[#1D2A3F]/10 backdrop-blur-2xl border border-white/10 p-1 shadow-2xl">
                <div className="border border-white/5 bg-[#0F1729]/60 p-6">
                  {/* Inner spacing increased for a premium feel */}
                  <SummerForm />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}