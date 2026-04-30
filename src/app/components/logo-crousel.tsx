'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardDescription } from '@/components/ui/card'
import assets from '../../global/constant/assets.const'
import { motion, useAnimation } from "framer-motion";
// import BgDesign from '../assets/backgroundDesign.png'

const companies = [
  { name: 'Amazon', url: assets.learner3 },
  { name: 'Walmart', url: assets.learner4 },
  { name: 'ZS Asso.', url: assets.learner5 },
  { name: 'ICAD', url: assets.learner6 },
  { name: 'Tata Elec.', url: assets.learner7 },
  { name: 'Whatfix', url: assets.learner8 },
  { name: 'Axis Bank', url: assets.learner9 },
  { name: 'Telus Int.', url: assets.learner10 },
  { name: 'Flipkart', url: assets.learner1 },
  { name: 'Walmart', url: assets.learner2 },
  // Duplicate the array for seamless loop
  { name: 'Amazon', url: assets.learner3 },
  { name: 'Walmart', url: assets.learner4 },
  { name: 'ZS Asso.', url: assets.learner5 },
  { name: 'ICAD', url: assets.learner6 },
  { name: 'Tata Elec.', url: assets.learner7 },
  { name: 'Whatfix', url: assets.learner8 },
  { name: 'Axis Bank', url: assets.learner9 },
  { name: 'Telus Int.', url: assets.learner10 },
  { name: 'Flipkart', url: assets.learner1 },
  { name: 'Walmart', url: assets.learner2 },
];



export function LogoCarousel() {
  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
    playOnInit: true,
    speed: 1, // Slower autoplay speed
  }

  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      slidesToScroll: 1,
      dragFree: true, // Allows free-form dragging
    },
    [Autoplay(autoplayOptions) as any]
  )

  return (
    <div className="mt-20 w-full overflow-hidden">
      <h2 className="text-2xl text-[#4CC9F0] text-center mb-8 font-bold">Our Top Performers</h2>
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {companies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-[0_0_100px] min-w-0 mx-4 transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Card className="bg-[#131B2E] p-4 rounded-lg border border-[#4CC9F0]/20 shadow-lg shadow-[#4CC9F0]/5">
                <Image
                  src={company.url}
                  alt={company.name}
                  width={250}
                  height={180}
                  className="h-18 object-contain w-full mb-4 bg-gray-300 rounded-md "
                />
                <CardDescription className="text-center text-gray-400">
                  {company.name}
                </CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



export function BannerImage() {
  return (
    <div className="mt-10 sm:mt-16 md:mt-20 w-full text-center relative">
      {/* Heading */}
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-4 sm:mb-6 md:mb-8 font-bold">
        Achieve Your Goals with Absolute Confidence, Your Success Is Assured!
      </h2>

      {/* Banner Container */}
      <div className="relative w-full overflow-hidden rounded-lg border border-[#4CC9F0]/20 shadow-lg shadow-[#4CC9F0]/5 bg-[#131B2E]">
        <Image
          src={assets.bannerimg}
          alt="Banner"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}



