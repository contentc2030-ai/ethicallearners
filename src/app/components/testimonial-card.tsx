import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import assets from '../../global/constant/assets.const'

interface TestimonialCardProps {
  name: string
  role: string
  testimonial: string
  image: string
  rating: string
  variant?: 'default' | 'accent'
}

export function TestimonialCard({
  name,
  role,
  testimonial,
  image,
  rating,
  variant = 'default'
}: TestimonialCardProps) {
  return (
    <Card className={`border-none ${
      variant === 'accent' ? 'bg-[#1D2A3F]' : 'bg-[#131B2E]'
    } relative h-full shadow-lg`}>
      <CardContent className="p-6 space-y-4">
        <Quote className="w-8 h-8 text-[#4CC9F0]" />
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="absolute inset-0 overflow-hidden">
        </div>
          <div>
            <h3 className="font-semibold text-white">{name}</h3>
            <p className="text-sm text-[#4CC9F0]">{role}</p>
          </div>
        </div>
        <p className="text-gray-300">{testimonial}</p>
        <div className="flex justify-between items-center">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-6 h-6 ${i < Number(rating) ? 'text-[#4CC9F0]' : 'text-gray-600'}`}
            fill="gold"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-yellow-400 font-semibold text-xl">{rating}</p>
    </div>

      </CardContent>
    </Card>
  )
}

