

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowUpRight } from "lucide-react"

interface Program {
  title: string
  description: string
  duration: string
  price: string
  image: string
}

interface LearningProgramsProps {
  programs: Program[]
}

export function LearningPrograms({ programs }: LearningProgramsProps) {
  return (
    <section className="relative py-24 bg-[#0F1729] overflow-hidden border-t border-white/5">
      
      {/* Architectural Background Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute right-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left max-w-4xl mb-20"
        >
          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
            <div className="h-px w-6 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-xs uppercase tracking-[0.3em] font-bold">
              Curated Pathways
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Our <span className="text-[#4CC9F0] italic font-serif font-normal">Summer Programs</span> <br />
            <span className="text-xl md:text-2xl text-gray-400 font-light block mt-2">
              Expert-led training pathways designed for real-world impact.
            </span>
          </h2>
        </motion.div>

        {/* Structural Grid: Sharp Edges, No Border Radius */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-white/10">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-r border-b border-white/10 relative"
            >
              <Card className="h-full bg-transparent border-none rounded-none overflow-hidden transition-all duration-500">
                {/* Image Area with Technical Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={program.image || "/placeholder.svg"} 
                    alt={program.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Price Tag: Monospace */}
                  <div className="absolute top-4 right-4 bg-[#0F1729]/80 backdrop-blur-md border border-white/10 px-3 py-1">
                    <span className="font-mono text-[#4CC9F0] text-sm font-bold">{program.price}</span>
                  </div>
                </div>

                <CardContent className="p-8 flex flex-col h-[calc(100%-14rem)]">
                  {/* Meta Row: Monospace */}
                  <div className="flex items-center gap-2 text-[#4CC9F0] text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">
                    <Clock className="h-3 w-3" />
                    <span>{program.duration} Weeks Intensive</span>
                  </div>

                  <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#4CC9F0] transition-colors">
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light line-clamp-3">
                    {program.description}
                  </p>
                  
                  {/* Footer: Sharp Action Button */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-[1px] bg-white/20" />
                       <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Module 0{index + 1}</span>
                    </div>

                    <Button 
                      variant="ghost"
                      className="group/btn text-white hover:text-[#04313f] py-3 h-auto font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
                    >
                      Enroll Now
                      <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hover highlight line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4CC9F0] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}