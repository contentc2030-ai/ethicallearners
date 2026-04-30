'use client'

import { useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, MoreVertical } from 'lucide-react'
import Image from 'next/image'

const courses = [
  {
    title: "Network Security Fundamentals",
    image: "/placeholder.svg?height=200&width=300&text=Network",
    rating: 4.8,
    students: 1200,
    price: "₹29,999"
  },
  {
    title: "Cloud Security & DevSecOps",
    image: "/placeholder.svg?height=200&width=300&text=Cloud",
    rating: 4.9,
    students: 800,
    price: "₹34,999"
  },
  {
    title: "Malware Analysis Mastery",
    image: "/placeholder.svg?height=200&width=300&text=Malware",
    rating: 4.7,
    students: 600,
    price: "₹24,999"
  },{
    title: "Network Security Fundamentals",
    image: "/placeholder.svg?height=200&width=300&text=Network",
    rating: 4.8,
    students: 1200,
    price: "₹29,999"
  },
  {
    title: "Cloud Security & DevSecOps",
    image: "/placeholder.svg?height=200&width=300&text=Cloud",
    rating: 4.9,
    students: 800,
    price: "₹34,999"
  },
  {
    title: "Malware Analysis Mastery",
    image: "/placeholder.svg?height=200&width=300&text=Malware",
    rating: 4.7,
    students: 600,
    price: "₹24,999"
  },
  {
    title: "Network Security Fundamentals",
    image: "/placeholder.svg?height=200&width=300&text=Network",
    rating: 4.8,
    students: 1200,
    price: "₹29,999"
  },
  {
    title: "Cloud Security & DevSecOps",
    image: "/placeholder.svg?height=200&width=300&text=Cloud",
    rating: 4.9,
    students: 800,
    price: "₹34,999"
  },
  {
    title: "Malware Analysis Mastery",
    image: "/placeholder.svg?height=200&width=300&text=Malware",
    rating: 4.7,                                                             
    students: 600,
    price: "₹24,999"
  }
]

export function PopularCourses() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
   
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Popular Courses</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0] hover:text-[#0F1729]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0] hover:text-[#0F1729]"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
  ref={scrollContainerRef}
  className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
>
  {courses.map((course, index) => (
    <Card 
      key={index}
      className="flex-none w-[300px] bg-[#131B2E] border-[#4CC9F0]/20 snap-start"
    >
      <Image
        src={course.image}
        alt={course.title}
        width={300}
        height={200}
        className="w-full h-[200px] object-cover rounded-t-lg"
      />
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-white">{course.title}</h3>
        <div className="flex justify-between text-sm">
          <span className="text-[#4CC9F0]">⭐ {course.rating}</span>
          <span className="text-gray-400">{course.students} students</span>
        </div>
        <div className="text-[#4CC9F0] font-semibold">{course.price}</div>
      </div>
      <div className="relative flex">
      </div>

    </Card>
  ))}
</div>
    </div>
    
  )
}

