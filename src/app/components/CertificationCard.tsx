"use client"

import Image from "next/image";
import assets from "../../global/constant/assets.const";
import { ShieldCheck, Lock } from "lucide-react";

interface CertificationCardProps {
  imageUrl: string; 
  altText: string; 
}

export default function CertificationCard({ imageUrl, altText }: CertificationCardProps) {
  return (
    <div className="w-full py-12">
      {/* Container with sharp architectural borders */}
      <div className="relative w-full bg-[#1D2A3F]/30 border border-white/10 overflow-hidden flex flex-col md:flex-row items-stretch min-h-[400px]">
        
        {/* Background Decorative Grid (Blueprint style) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#4CC9F0 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        {/* Left Side - Editorial Content */}
        <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10 border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-[10px] font-bold tracking-[0.4em] uppercase">Validation</span>
          </div>
          
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
            Professional <br />
            <span className="text-[#4CC9F0] italic font-serif font-normal">Credentialing</span>
          </h2>
          
          <p className="text-gray-400 mt-6 text-sm lg:text-base font-light leading-relaxed max-w-md">
            Solidify your technical expertise. Upon successful program completion, receive a verified industry-standard certification to accelerate your professional trajectory.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-mono text-xl text-white font-bold tracking-tighter uppercase">Verified</span>
              <span className="font-mono text-[8px] text-gray-500 tracking-[0.2em] uppercase">ID: 882-TECH</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="font-mono text-xl text-white font-bold tracking-tighter uppercase">Secure</span>
              <span className="font-mono text-[8px] text-gray-500 tracking-[0.2em] uppercase">Blockchain Backed</span>
            </div>
          </div>
        </div>

        {/* Right Side - The Certificate Visual */}
        <div className="md:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-[#0F1729]/50 relative overflow-hidden group">
          
          {/* Framed Certificate with Inset Shadow */}
          <div className="relative w-full max-w-md aspect-[1.4/1] shadow-2xl">
            {/* Blurred Overlay / Lock State */}
            <div className="absolute inset-0 bg-[#0F1729]/60 backdrop-blur-[4px] z-20 flex flex-col items-center justify-center border border-white/10 transition-all duration-700 group-hover:backdrop-blur-[2px] group-hover:bg-[#0F1729]/40">
              <div className="relative">
                <div className="absolute inset-0 bg-[#4CC9F0]/20 blur-xl rounded-full" />
                <Lock className="w-10 h-10 text-[#4CC9F0] relative z-10" />
              </div>
              <span className="mt-4 font-mono text-[9px] text-[#4CC9F0] font-bold tracking-[0.4em] uppercase">Unlocked on Completion</span>
            </div>
            
            {/* Certificate Image */}
            <div className="absolute inset-0 border border-white/5 bg-slate-900 overflow-hidden">
              <Image
                src={assets.TempCertificate}
                alt={altText}
                fill
                className="object-cover opacity-60 grayscale scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
            </div>

            {/* Corner Decorative Brackets */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#4CC9F0] z-30" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#4CC9F0] z-30" />
          </div>
        </div>
      </div>
    </div>
  );
}