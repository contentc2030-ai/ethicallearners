"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Shield, HandshakeIcon } from "lucide-react"

export function FeatureCards() {
  const features = [
    {
      icon: <Rocket className="w-5 h-5 text-[#4CC9F0]" />,
      title: "Master Industry Skills in 6 Weeks",
      description: [
        "Hands-on experience in cutting-edge tech.",
        "Live sessions with industry expert mentors.",
        "Real-world projects and interactive tasks.",
      ],
    },
    {
      icon: <Shield className="w-5 h-5 text-[#4CC9F0]" />,
      title: "Maximize Your Summer Break",
      description: [
        "Unlock endless global career opportunities.",
        "Live training with expert guidance.",
        "Earn certifications to boost your resume.",
      ],
    },
    {
      icon: <HandshakeIcon className="w-5 h-5 text-[#4CC9F0]" />,
      title: "Learn Anywhere, Anytime",
      description: [
        "Interactive classes from your home.",
        "Personalized real-time doubt resolution.",
        "Expand your professional peer network.",
      ],
    },
  ];

  return (
    <section className="relative bg-[#0F1729] py-24 border-t border-white/5 overflow-hidden">
      {/* Background Architectural Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-[5%] top-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        <div className="absolute left-[45%] top-0 w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-6 bg-[#4CC9F0]" />
            <span className="font-mono text-[#4CC9F0] text-[10px] uppercase tracking-[0.4em] font-bold">
              Core Advantages
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Program <span className="text-[#4CC9F0] italic font-serif font-normal">Excellence</span>
          </h2>
        </motion.div>

        {/* Structural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-white/10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative border-r border-b border-white/10"
            >
              <Card className="h-full bg-transparent border-none rounded-none overflow-hidden relative group">
                
                {/* TEXTURE LAYER 1: The Noise Grain */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                
                {/* TEXTURE LAYER 2: Inset Dot Matrix (Visible on Hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#4CC9F0 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />

                {/* TEXTURE LAYER 3: Radial Light Follow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CC9F0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <CardContent className="p-10 flex flex-col h-full space-y-10 relative z-10">
                  
                  {/* Technical Icon Housing */}
                  <div className="relative">
                    <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-[#4CC9F0]/50 group-hover:bg-[#4CC9F0]/10 transition-all duration-500">
                      {feature.icon}
                    </div>
                    {/* Architectural Accent Square */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#4CC9F0] opacity-0 group-hover:opacity-100 transition-all" />
                  </div>

                  <div className="space-y-6 flex-grow">
                    <h3 className="text-2xl font-bold text-white leading-tight tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                      {feature.title}
                    </h3>
                    
                    <div className="space-y-4">
                      {feature.description.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4 group/item">
                          <span className="font-mono text-[10px] text-[#4CC9F0] mt-1.5 opacity-40">
                            {idx + 1}.0
                          </span>
                          <p className="text-gray-400 text-sm xl:text-base leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Symmetrical Action Tag */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em] group-hover:text-[#4CC9F0]/70 transition-colors">
                      Verification Required
                    </span>
                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#4CC9F0] group-hover:shadow-[0_0_8px_#4CC9F0] transition-all" />
                  </div>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}