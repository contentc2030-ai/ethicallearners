"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Download, ArrowRight } from "lucide-react"
import { CampusForm } from "./campus-form"
import HiringPartners from "./HiringPartners"
import assets from "../../global/constant/assets.const"
import { BannerImage } from "./logo-crousel"


export function CampusHero() {
  return (
    <div className="relative bg-gradient-to-br from-[#0F1729] via-[#131B2E] to-[#0F1729] overflow-hidden">


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
              Crack Campus Recruitment
              <span className="block text-[#4CC9F0]">Training with Professional Training</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              A B2B program that focuses on technical campus training to enable students to become interview ready and
              employable.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90">
                <Download className="mr-2 h-4 w-4" /> Download Brochure
              </Button>
              <Button size="lg" variant="outline" className="border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0]/10">
                Try learning for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-gray-400 mb-4">Over 10,000+ learners trust us for online and offline coaching</p>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5">
            <CampusForm />
          </div>
        </div>
      </div>

      <motion.div
              className="  w-screen px-16 sm:px-16"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
     

            </motion.div>

      <div className="container mx-auto px-16 py-10">
        <BannerImage />

      </div>
            
    </div>
    
    
  )
}
