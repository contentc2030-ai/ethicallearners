"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ProjectCTA() {
  return (
    <section className="py-16 bg-[#1D2A3F]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Want to excel at your Tech Career?</h2>
            <p className="text-xl text-[#4CC9F0]">Let&apos;s talk.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="bg-[#4CC9F0] text-white hover:bg-[#4CC9F0]/90">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

