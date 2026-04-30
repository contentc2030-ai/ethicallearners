'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Phone, ArrowUpRight } from 'lucide-react'
import { 
  SiApple, SiGoogle, SiFacebook, SiAtlassian, SiNetflix, SiSamsung, 
  SiSony, SiTesla, SiUber, SiAirbnb, SiSpotify, SiSlack, SiDropbox, 
  SiReddit, SiEbay, SiPaypal, SiVisa, SiMastercard, SiNike, SiAdidas, 
  SiPuma, SiStarbucks, SiPaytm, SiIntuit, SiQualcomm, SiNvidia, 
  SiFlipkart, SiGoldmansachs, SiIntel, SiTwitch, SiXiaomi, SiHuawei, 
  SiSalesforce, SiBose, SiPanasonic 
} from 'react-icons/si'

const partnersRow1 = [
  { name: 'Apple', Icon: SiApple }, { name: 'Google', Icon: SiGoogle },
  { name: 'Facebook', Icon: SiFacebook }, { name: 'Atlassian', Icon: SiAtlassian },
  { name: 'Paytm', Icon: SiPaytm }, { name: 'Intuit', Icon: SiIntuit },
  { name: 'Qualcomm', Icon: SiQualcomm }, { name: 'Nvidia', Icon: SiNvidia },
  { name: 'Flipkart', Icon: SiFlipkart }, { name: 'Goldmansachs', Icon: SiGoldmansachs }
]

const partnersRow2 = [
  { name: 'Netflix', Icon: SiNetflix }, { name: 'Samsung', Icon: SiSamsung },
  { name: 'Sony', Icon: SiSony }, { name: 'Tesla', Icon: SiTesla },
  { name: 'Uber', Icon: SiUber }, { name: 'Intel', Icon: SiIntel },
  { name: 'Twitch', Icon: SiTwitch }, { name: 'Panasonic', Icon: SiPanasonic }
]

const partnersRow3 = [
  { name: 'Airbnb', Icon: SiAirbnb }, { name: 'Spotify', Icon: SiSpotify },
  { name: 'Slack', Icon: SiSlack }, { name: 'Dropbox', Icon: SiDropbox },
  { name: 'Reddit', Icon: SiReddit }, { name: 'eBay', Icon: SiEbay },
  { name: 'Xiaomi', Icon: SiXiaomi }, { name: 'Huawei', Icon: SiHuawei },
  { name: 'Bose', Icon: SiBose }
]

const LogoRow = ({ partners, xRange, direction = 1 }: { partners: any[], xRange: number[], direction: number }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const xTranslation = useTransform(scrollYProgress, [0, 1], xRange.map(x => x * direction))
  const smoothX = useSpring(xTranslation, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap py-2">
      <motion.div style={{ x: smoothX }} className="flex gap-4 w-max">
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className="flex-none bg-[#1D2A3F]/40 border border-white/5 p-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group rounded-none"
          >
            <partner.Icon className="w-10 h-10 text-white group-hover:text-[#4CC9F0]" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function HiringPartners() {
  return (
    <section className="bg-[#0F1729] py-24 relative overflow-hidden border-t border-white/5">
      
      {/* Background architectural lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-white/20" />
        <div className="absolute right-[5%] top-0 w-px h-full bg-white/20" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Header - Applying Typography Strategy */}
        <div className="max-w-4xl mb-20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-[10px] font-bold tracking-[0.4em] uppercase">Industry Network</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            Hiring across <br />
            <span className="text-[#4CC9F0] italic font-serif font-normal">750+ Companies</span>
          </h2>
          
          <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed border-l border-white/10 pl-6">
            Over 750 renowned companies have successfully onboarded <br />
            <span className="text-white font-medium italic">Ethical Learner</span> graduates globally.
          </p>
        </div>

        {/* Scroll-Linked Motion Carousels */}
        <div className="relative mb-24">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F1729] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F1729] to-transparent z-20 pointer-events-none" />
          
          <div className="space-y-4">
            <LogoRow partners={partnersRow1} xRange={[0, -200]} direction={1} />
            <LogoRow partners={partnersRow2} xRange={[0, -200]} direction={-1} />
            <LogoRow partners={partnersRow3} xRange={[0, -200]} direction={1} />
          </div>
        </div>
        
        {/* Salary Stats - Applying Mono Font for Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {[
            { label: 'Highest Salary', value: '60 LPA' },
            { label: 'Average Salary', value: '8.2 LPA' },
            { label: 'Minimum Salary', value: '6.5 LPA' },
            { label: 'Hiring Partners', value: '750+' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0F1729] p-10 hover:bg-white/[0.02] transition-colors group">
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.3em] mb-6 group-hover:text-[#4CC9F0] transition-colors">{stat.label}</p>
              <p className="text-4xl font-bold text-white tracking-tighter font-mono">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs - Razor Sharp Corners */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="outline" className="rounded-none bg-transparent border-white/10 text-white px-10 py-7 h-auto font-mono text-[10px] tracking-[0.3em] hover:bg-white hover:text-[#0F1729] transition-all">
            VIEW ALL PARTNERS <ArrowUpRight className="ml-2 w-3 h-3" />
          </Button>
          <Button className="rounded-none bg-[#4CC9F0] text-[#0F1729] px-10 py-7 h-auto font-bold text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(76,201,240,0.15)]">
            <Phone className="w-3 h-3 mr-2" />
            REQUEST CALLBACK
          </Button>
        </div>
      </div>
    </section>
  )
}