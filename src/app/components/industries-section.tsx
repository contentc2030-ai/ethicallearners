"use client"

import { motion } from "framer-motion"
import { Truck, Factory, Home, Building2, Building, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const industries = [
  {
    icon: Truck,
    name: "Transportation & Logistics",
  },
  {
    icon: Factory,
    name: "Manufacturing",
  },
  {
    icon: Home,
    name: "Hospitality",
  },
  {
    icon: Building2,
    name: "Financial Services",
  },
  {
    icon: Building,
    name: "Retail",
  },
]

const useCases = ["Onboarding", "SOP training", "Delivery optimization", "Safety training", "Behavioral training"]

const benefits = ["Reduced errors", "Improved customer satisfaction", "Increased efficiency"]

export function IndustriesSection() {
  return (
    <section className="bg-[#0F1729] py-16"> 
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-[#4CC9F0]">Empowering Frontline Heroes</span> Across Every Industry
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20 hover:border-[#4CC9F0]/40 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#4CC9F0]/10">
                          <industry.icon className="h-5 w-5 text-[#4CC9F0]" />
                        </div>
                        <span className="text-white">{industry.name}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#4CC9F0]" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
                <CardHeader>
                  <CardTitle className="text-white">Use Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {useCases.map((useCase, index) => (
                      <li key={index} className="text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
                <CardHeader>
                  <CardTitle className="text-white">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

