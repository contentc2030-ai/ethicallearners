"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from "react"
import TrustedSection from "./TrustedSection"

interface Partner {
  name: string
  logo: string
}

interface PartnersProps {
  title: string
  partners: Partner[]
}

export function Partners({ title, partners }: PartnersProps) {
  const plugin = React.useMemo(() => Autoplay({ delay: 2000, stopOnInteraction: true }), [])

  return (
    <section className="bg-[#0F1729] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        </motion.div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-center p-4"
                  >
                    <div className="relative w-32 h-16">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        fill
                        className="object-contain filter brightness-0 invert"
                      />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[#1D2A3F] text-white hover:bg-[#4CC9F0]/10" />
            <CarouselNext className="bg-[#1D2A3F] text-white hover:bg-[#4CC9F0]/10" />
          </Carousel>
          <TrustedSection />
        </div>
      </div>
    </section>
  )
}

