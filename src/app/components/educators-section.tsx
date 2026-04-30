"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronRight, Award, ExternalLink } from "lucide-react"
import { EducatorsSectionProps } from "../../global/interface/educator.interface"

// Components restored from previous logic
import HiringPartners from "./HiringPartners"
import TrustedSection from "./TrustedSection"
import CertificationCard from "./CertificationCard"
import { MasterclassCarousel } from "./Masterclass"

const dummyImages = "/images/divedu.png"

export function EducatorsSection({ features, educators }: EducatorsSectionProps) {
  return (
    <section className="bg-[#0F1729] py-24 relative overflow-hidden border-t border-white/5">
      
      {/* 1. ARCHITECTURAL BACKGROUND */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute right-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* 2. HEADER: Editorial Style with Restored Features List */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-[10px] font-bold tracking-[0.4em] uppercase">Faculty Board</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-10">
            Learn from the <br />
            <span className="text-[#4CC9F0] italic font-serif font-normal">Industry Vanguard</span>
          </h2>

          {/* Restored Features List from your original code */}
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                <span className="font-mono text-[10px] font-bold text-gray-500 tracking-widest uppercase">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. GRID: Your Preferred Card Design */}
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-16">
          {educators.map((educator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-[#0F1729] p-8 lg:p-10 transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
                
                {/* IMAGE FRAME: Sharp & Technical */}
                <div className="relative shrink-0">
                  <div className="relative w-32 h-40 lg:w-36 lg:h-48 overflow-hidden border border-white/10 bg-slate-800">
                    <Image 
                      src={dummyImages}
                      alt={educator.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/40 to-transparent" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-full h-full border-r border-b border-[#4CC9F0]/20 -z-10 group-hover:border-[#4CC9F0]/50 transition-colors" />
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 flex flex-col min-h-[160px] lg:min-h-[192px]">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 text-[#4CC9F0]" />
                        <span className="font-mono text-[9px] text-[#4CC9F0] uppercase tracking-widest font-bold">
                          {educator.badge.type}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-[#4CC9F0] transition-colors" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight uppercase leading-none">
                      {educator.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-xs lg:text-sm leading-relaxed font-light mb-6 line-clamp-3">
                    {educator.credentials}
                  </p>

                  {/* STATS: High Contrast & Monospace */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-8">
                      <div className="space-y-1">
                        <p className="font-mono text-lg font-bold text-white tracking-tighter group-hover:text-[#4CC9F0] transition-colors">
                          {educator.stats.watchMins}
                        </p>
                        <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Watch Mins</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-lg font-bold text-white tracking-tighter group-hover:text-[#4CC9F0] transition-colors">
                          {educator.stats.followers}
                        </p>
                        <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Followers</p>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="p-0 h-auto group/btn text-white hover:text-[#4CC9F0] hover:bg-transparent transition-all">
                       <span className="font-mono text-[9px] font-bold tracking-[0.2em]">DOSSIER</span>
                       <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-[#4CC9F0]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* 4. FOOTER BUTTON */}
        <div className="mb-12 flex justify-center">
          <Button className="rounded-none bg-transparent border border-white/20 text-white px-10 py-7 font-mono text-xs tracking-[0.3em] hover:bg-white hover:text-[#0F1729] transition-all">
            EXPLORE FULL FACULTY
          </Button>
        </div>

        {/* 5. RESTORED SUBSECTIONS: Integrated with Editorial Spacing */}
        <div className="">
          
          
          {/* Hiring Partners Section with Decorative Dividers */}
          <div className="relative py-10">
            <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
            <HiringPartners />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
          </div>

          {/* Certification Section */}
          <CertificationCard imageUrl="/images/cert-dummy.jpg" altText="Certification Preview" />

          {/* Masterclass Section */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              {/* <div className="h-px w-10 bg-[#4CC9F0]" /> */}
              {/* <h3 className="font-mono text-[10px] font-bold text-white tracking-[0.4em] uppercase">Live Masterclasses</h3> */}
            </div>
            <MasterclassCarousel />
          </div>

          {/* Trusted By Section */}
          <TrustedSection />
        </div>

      </div>
    </section> 
  )
}