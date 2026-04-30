"use client";
import { DemoForm } from "./demo-form";
import { Button } from "./ui/button";
import { BannerImage, LogoCarousel } from "./logo-crousel";
import { Target } from "lucide-react";
import gradientImg from "../assets/abstract-low-poly-with-connecting-lines-dots.jpg";
import assets from "../../global/constant/assets.const";

export default function Hero() {
  return (
    <main className="min-h-screen relative bg-[#101624] overflow-hidden px-4 sm:px-6 md:px-10 py-4 sm:py-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 " />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4CC9F0]/5 via-transparent to-[#4361EE]/5" />

      <div className="container mx-auto px-4 py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4CC9F0]/30 bg-[#4CC9F0]/10 text-[#4CC9F0] text-sm">
                <Target className="h-4 w-4" />
                <span>Transform Your Career Path</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Master In-Demand{" "}
                <span className="text-[#4CC9F0]">Tech Skills</span> & Secure
                Your <span className="text-[#4CC9F0]">Dream Job!</span>{" "}
              </h1>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Master{" "}
                <span className="text-[#4CC9F0] font-medium">
                  Data Science, Full Stack Development, AI/ML, Cybersecurity
                </span>{" "}
                and <span className="text-[#4CC9F0] font-medium"></span> more
                through intensive training from industry experts.
              </p>
            </div>

            {
              /* { <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatsCard 
                value="3 Months" 
                label="Intensive Training" 
                className="bg-[#131B2E]/80 border border-[#4CC9F0]/20" 
              />
              <StatsCard 
                value="100%" 
                label="Placement Support" 
                className="bg-[#131B2E]/80 border border-[#4CC9F0]/20" 
              />
              <StatsCard 
                value="20" 
                label="Limited Seats" 
                className="bg-[#131B2E]/80 border border-[#4CC9F0]/20" 
              />
              <StatsCard 
                value="₹0" 
                label="Program Fee*" 
                className="bg-[#131B2E]/80 border border-[#4CC9F0]/20" 
              />
            </div> } */

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10 px-1 ">
                <div className="text-center p-3 bg-[#1D2A3F] rounded-lg">
                  <p className="text-3xl font-bold  text-[#4CC9F0] mt-2">
                    60 LPA
                  </p>
                  <p className="text-gray-400 mt-2">Highest Salary</p>
                </div>
                <div className="text-center p-3 bg-[#1D2A3F] rounded-lg">
                  <p className="text-3xl font-bold  text-[#4CC9F0] mt-2">
                    8.2 LPA
                  </p>
                  <p className="text-gray-400 mt-2">Average Salary</p>
                </div>
                <div className="text-center p-3 bg-[#1D2A3F] rounded-lg">
                  <p className="text-3xl font-bold  text-[#4CC9F0] mt-2">
                    6.5 LPA
                  </p>
                  <p className="text-gray-400 mt-2">Minimum Salary</p>
                </div>
                <div className="text-center p-3 bg-[#1D2A3F] rounded-lg">
                  <p className="text-3xl font-bold  text-[#4CC9F0] mt-2">
                    750+
                  </p>
                  <p className="text-gray-400 mt-2">Hiring Partners</p>
                </div>
              </div>
            }

            <div className="flex gap-4">
              <Button className="bg-[#1D2A3F] hover:bg-[#4CC9F0]/90 text-white text-lg px-8 py-4 h-auto group transition-all duration-300">
                Apply Now
                <Target className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center p-4 sm:p-6 ">
            <DemoForm />
          </div>
        </div>

        <div className="mt-16">
          <LogoCarousel />
          <BannerImage />
        </div>
      </div>
    </main>
  );
}
