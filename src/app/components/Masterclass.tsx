'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';

const masterclasses = [
  {
    title: "Cybersecurity Techniques",
    image: "/images/ethicalprogram.png",
    duration: "16 Mar, 2024 - 12:00 PM",
    description: "Learn advanced techniques to secure your systems.",
    status: "Archived",
  },
  {
    title: "Cloud Security Best Practices",
    image: "/images/ethicalprogram.png",
    duration: "16 Mar, 2024 - 12:00 PM",
    description: "Master cloud security strategies for modern applications.",
    status: "Archived",
  },
  {
    title: "Ethical Hacking Fundamentals",
    image: "/images/ethicalprogram.png",
    duration: "16 Mar, 2024 - 12:00 PM",
    description: "Get started with ethical hacking and penetration testing.",
    status: "Upcoming",
  },
]

export function MasterclassCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="px-12 py-8">
      {/* 1. Header & Controls: Integrated Row */}
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-[10px] font-bold tracking-[0.3em] uppercase">Live Masterclasses</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">MASTERCLASSES</h2>
        </div>

        <div className="flex gap-px bg-white/10 border border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-none h-10 w-10 text-white hover:bg-white/5 hover:text-[#4CC9F0]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-none h-10 w-10 text-white border-l border-white/10 hover:bg-white/5 hover:text-[#4CC9F0]"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 2. Carousel: Razor-Thin Inset Cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
      >
        {masterclasses.map((masterclass, index) => (
          <div
            key={index}
            className="flex-none w-[320px] group snap-start"
          >
            <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#131B2E]">
              {/* Badge: Monospaced Technical Label */}
              <div className="absolute top-0 right-0 z-10 bg-[#4CC9F0] px-3 py-1">
                <span className="font-mono text-[9px] font-bold text-[#0F1729] uppercase tracking-tighter">
                  {masterclass.status}
                </span>
              </div>

              <Image
                src={masterclass.image}
                alt={masterclass.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729] via-transparent to-transparent opacity-60" />
            </div>

            <div className="pt-4 space-y-3">
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-[#4CC9F0] transition-colors">
                {masterclass.title}
              </h3>
              
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 font-light">
                {masterclass.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span className="font-mono text-[9px] tracking-tighter uppercase">{masterclass.duration}</span>
                </div>
                <Button variant="ghost" className="h-auto p-0 text-[#4CC9F0] hover:bg-transparent hover:text-white font-mono text-[10px] tracking-widest">
                  ENROLL <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Action: Subtle Link */}
      <div className="mt-8 pt-1 flex justify-center">
        <Link href="/pages/masterclass">
          <Button variant="outline" className="rounded-none bg-transparent border-white/10 text-white px-8 py-6 h-auto font-mono text-[10px] tracking-[0.3em] hover:bg-white hover:text-[#0F1729] transition-all">
            VIEW ALL SESSIONS
          </Button>
        </Link>
      </div>
    </div>
  )
}