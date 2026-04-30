'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { PiStudentFill } from "react-icons/pi";
import leftWing from "../assets/wing-left.png";
import rightWing from "../assets/wing-right.png";

const TrustedSection = () => {
  const stats = [
    {
      icon: <FaFacebook className="w-8 h-8 text-[#1877F2]" />,
      rating: "4.9",
      reviews: "700+ Verified Reviews",
      label: "Social Validation"
    },
    {
      icon: <FcGoogle className="w-8 h-8" />,
      rating: "4.7",
      reviews: "2300+ Verified Reviews",
      label: "Platform Trust"
    },
    {
      icon: <PiStudentFill className="w-8 h-8 text-[#4CC9F0]" />,
      rating: "4.8",
      reviews: "Average Course Rating",
      label: "Academic Excellence"
    },
  ];

  return (
    <section className="relative bg-[#0F1729] pt-24 border-t border-white/5 overflow-hidden">
      {/* Background Architectural Blueprint Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute right-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-[10px] font-bold tracking-[0.4em] uppercase">
              Global Recognition
            </span>
            <div className="h-px w-8 bg-[#4CC9F0]" />
          </div>
          
          <div className="relative inline-block px-12">
            {/* Laurel Wings Integrated as Subtle Watermarks */}
            <Image
              src={leftWing}
              alt=""
              width={180}
              height={180}
              className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
            />
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Trusted by <span className="text-[#4CC9F0] italic font-serif font-normal">Learners</span>
            </h2>
            <Image
              src={rightWing}
              alt=""
              width={180}
              height={180}
              className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
            />
          </div>

          <p className="text-gray-400 max-w-2xl text-base md:text-lg font-light leading-relaxed">
            Joining a network of <span className="text-white font-medium">1,00,000+</span> Ethical Learner alumni 
            operating across <span className="text-white font-medium">1,100+</span> global enterprises 
            and <span className="text-white font-medium">4,400+</span> institutions.
          </p>
        </div>

        {/* Technical Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-white/10 max-w-5xl mx-auto bg-[#1D2A3F]/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-10 border-r border-b border-white/10 flex flex-col items-center group hover:bg-white/[0.02] transition-colors"
            >
              {/* Icon Housing */}
              <div className="w-16 h-16 border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-[#4CC9F0]/50 transition-all">
                {stat.icon}
              </div>

              <div className="flex flex-col items-center space-y-2">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.3em]">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white tracking-tighter font-mono">
                    {stat.rating}
                  </span>
                  <span className="text-[#4CC9F0] text-xl">★</span>
                </div>
                <p className="text-gray-400 text-[11px] font-mono uppercase tracking-widest pt-2">
                  {stat.reviews}
                </p>
              </div>

              {/* Architectural Accent Square */}
              <div className="mt-8 w-1 h-1 bg-[#4CC9F0] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustedSection;