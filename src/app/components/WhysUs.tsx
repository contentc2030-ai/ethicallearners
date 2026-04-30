'use client'

import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Users } from 'lucide-react'
import Image from 'next/image'
import Courseimg1 from '../assets/Courseimg1.jpg'
import Courseimg2 from '../assets/Courseimg2.jpg'
import gradientImg from '../assets/abstract-low-poly-with-connecting-lines-dots.jpg'
import TrustedSection from "./TrustedSection"
import assets from "../../global/constant/assets.const"
import { BannerImage } from "./logo-crousel"
import { MasterclassCarousel } from "./Masterclass"

export default function WhoWeAre() {
  return (
    <section className="relative bg-[#0F1729] overflow-hidden min-h-screen py-12 sm:py-16 lg:py-12 px-9">
      {/* Animated blob */}
      <motion.div
        className="absolute left-0 top-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#4CC9F0]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [-10, 10, -10],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <motion.div
        className="absolute right-4 sm:right-10 lg:right-20 bottom-4 sm:bottom-10 lg:bottom-20"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="grid grid-cols-6 gap-1 sm:gap-2 opacity-20 rotate-45">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-[#4CC9F0] rounded-full"
            />
          ))}
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-[#4CC9F0] font-semibold mb-2 text-lg sm:text-base lg:text-4xl text-center">WHO WE ARE</h3>
        <div className="w-full  space-y-6 lg:space-y-1 text-center lg:text-left order-1 lg:order-0 z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-14">
            Pioneers in IT Learning:
            <span className="text-[#4CC9F0] text-3xl sm:text-4xl lg:text-4xl"> Data Science, AI ML, CyberSecurity, Web Development, </span>
            <span className="text-3xl sm:text-4xl lg:text-4xl">and More.</span>
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-10 pt-12 lg:pt-0">

          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left order-1 lg:order-0 z-10">
            <div>


            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="mb-10 lg:text-3xl text-2xl text-white font-semibold md:mt-16 text-left"> <span className="text-[#FFD700]"># No.1</span> in IT Learning, Training, and Development: Trusted by professionals and top companies worldwide.
              </h3>
              <h3 className="mb-20 lg:text-3xl text-2xl text-[#4CC9F0] font-semibold md:mt-20">Why Choose Ethical Learner?</h3>
              {[{
                icon: GraduationCap,
                title: "Expert-Led Mentorship",
                description: "Learn from elite industry professionals with hands-on experience in cybersecurity, web development, and data science."
              }, {
                icon: BookOpen,
                title: " Industry-Aligned Curriculum",
                description: " Stay ahead with a cutting-edge syllabus designed to meet current market demands and employer expectations."
              }, {
                icon: Users,
                title: "Thriving Tech Community",
                description: "Join a vibrant network of learners and professionals, exchange insights, and build valuable industry connections."
              }].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-[#1D2A3F] hover:bg-[#2A3A56] transition-colors"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex-shrink-0 mb-2 sm:mb-0">
                    <feature.icon className="w-10 h-10 text-[#4CC9F0] mx-auto sm:mx-0" />
                  </div>
                  <div>

                    <h3 className="font-semibold text-white mb-1 text-lg">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Images Section */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[500px] lg:h-[600px]  lg:mb-0 order-0 lg:order-1 z-0 ">
            <div className="flex flex-col gap-4">
              {/* First Image Container */}
              <div className="w-full h-72 rounded-md overflow-hidden relative">
                <Image
                  src={Courseimg1}
                  alt="Image 1"
                  layout="fill"
                  className="object-cover"
                />
              </div>

              {/* Second Image Container, hidden on mobile */}
              <div className="w-full h-72 mt-4 rounded-md overflow-hidden relative hidden sm:block">
                <Image
                  src={Courseimg2}
                  alt="Image 2"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-16">
        <BannerImage />
        <div className=" mx-auto px-4 py-8 mt-8">
          <MasterclassCarousel />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8 mt-8">
          <TrustedSection />
        </div>

      </div>
    </section>
  )
}



