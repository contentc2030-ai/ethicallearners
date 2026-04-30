'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TestimonialCard } from './testimonial-card'
import SocialMediaManegement from '../assets/social-media-manegement.svg'


interface TestimonialCardProps {
  name: string
  role: string
  testimonial: string
  image: string
  rating: string
  variant?: 'default' | 'accent'
}
const testimonials: TestimonialCardProps[] = [
  
  
  
  {
    name: 'Madhav Seekri',
    role: 'Data Science Program',
    testimonial: 'Ethical Learner\'s  Data Science program exceeded my expectations with its expert instructors, comprehensive curriculum, and strong focus on ethics. I highly recommend this institute for anyone seeking a rigorous and responsible data science education.',
    image: SocialMediaManegement,
    rating: "4.5/5",
    variant: 'accent'
    
  },
  {
    name: 'Rohit Maurya',
    role: 'Web Development Program',
    testimonial: 'Ethical learner is a best place to learn any technical skill and his trainer is so talented and smart learn many things in ethical learner.',
    image: SocialMediaManegement,
    rating: "5/5",
    
  },
  {
    name: 'Shubhi Sharma',
    role: 'Web Development Program',
    testimonial: 'had a great experience there....i went there for 3 months of trainning in html, css and java script. Trainners are really supportive and their way of explainning things is really marvelous. Don\'t have any doubt just go for it.',
    image: SocialMediaManegement,
    rating: "4/5",
    variant: 'accent'
  },
  {
    name: 'Sanila Chisti',
    role: 'Web Development Program',
    testimonial: 'Ethical Learner is the best place to enhance your programming skills.I have been receiving training of Web development from Tajwar sir and wanted to share my experience.The Course materials are comprehensive and well-organized.All training sessions have been very productive.Tajwar sir is very professional,gives fantastic guidance and constantly encourages me.I wanted to thank Ethical learner team for providing this opportunity.',
    image: SocialMediaManegement,
    rating: "4/5",
   
  },
  {
    name: 'Anagha Bhardwaj',
    role: 'Web Development Program',
    testimonial: 'Ethical Learner has helped me secure 10 Lpa package at Axis Bank as a Software Developer. I am thankful to team Ethical Learner and Tajwar Khan Sir to help me gain programming and software development skills as well as  cloud certification. Their Data Science course is one of the best in industry. I highly recommend Ethical Learner to all!',
    image: SocialMediaManegement,
    rating: "5/5",
    variant: 'accent'
  },
  {
    name: 'Mohd Nazim',
    role: 'Data Science Program',
    testimonial: 'I had to learn data science with amazing skills and learn softskill also . It is great place to learn data science and good environment. Teachar are good and provide best knowledge to learn data science. It is a best place in bareilly to data science.',
    image: SocialMediaManegement,
    rating: "4/5",
    
  },
  {
    name: 'Abhishek Reddy',
    role: ' Ethical Hacking Workshop',
    testimonial: 'I just felt nearly amazed at the workshop. As of now it was my first workshop by ethical learner it was too good to speak. So many things to say but it\'s good to join.',
   image: SocialMediaManegement,
    rating: "4.5/5",
    variant: 'accent'
    
  },
  {
    name: 'Manisha',
    role: 'Ethical Hacking Workshop',
    testimonial: 'Thank you for organizing ethical hacking workshop I have learnt a lot, And want to start my ethical hacking journey. Thank you ☺️',
    image: SocialMediaManegement,
    rating: "4.5/5",
    
    
  }
]

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    })
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0F1729] via-[#131B2E] to-[#0F1729] py-20">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 w-32 h-32 opacity-10">
        <div className="w-full h-full grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#4CC9F0]" />
          ))}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10">
        <div className="w-full h-full grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#4CC9F0]" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-2">
          <p className="text-[#4CC9F0]">OUR TESTIMONIALS</p>
          <h2 className="text-4xl font-bold text-white">
          What Our Enthusiastic <span className="text-[#4CC9F0]">Learners</span> Say About Us  
          </h2>
          <div className="h-1 w-24 bg-[#4CC9F0] mx-auto mt-2 rounded-full" />
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0] hover:text-[#0F1729]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0] hover:text-[#0F1729]"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
