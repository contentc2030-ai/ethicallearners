"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useState } from "react"

interface Testimonial {
  content: string
  author: string
  position: string
  company: string
  image: string
}

interface TestimonialsProps {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export function Testimonials({ title, subtitle, testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="bg-[#0F1729] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">{subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              loop: true,
            }}
         
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                     <Card className="rounded-lg border text-card-foreground shadow-sm bg-[#1D2A3F] border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-colors cursor-pointer">
  <CardContent className="p-6">
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <Image
          src={testimonial.image || "/placeholder.svg"}
          alt={testimonial.author}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-gray-400 mb-3">{testimonial.content}</p>
        <div>
          <p className="font-semibold text-white">{testimonial.author}</p>
          <p className="text-sm text-gray-500">
            {testimonial.position}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

                    </motion.div>
                  </AnimatePresence>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[#1D2A3F] text-white hover:bg-[#4CC9F0]/10" />
            <CarouselNext className="bg-[#1D2A3F] text-white hover:bg-[#4CC9F0]/10" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#4CC9F0]" : "bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

