"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import assets from "../../../global/constant/assets.const"

export function ContactHero() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#4CC9F0]/5" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]" />
      </div>
      <div className="absolute inset-0">
        <Image 
          src={assets.abstractDigitalGrid} 
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#4CC9F0] text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
      </div>
    </section>
  )
}
