"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { GrAnalytics, GrUserManager } from "react-icons/gr";
import { FaComputer } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaShoppingBag } from "react-icons/fa";

import { ChevronRight } from "lucide-react";

const industries = [
  {
    icon: FaComputer,
    title: "Information Technology",
    useCases: ["Tech Grads IT Bootcamp", "Agile/Scrum", "IT Service Management" , "Cloud Computing", "Java & Programming", "Microservices", "Database Management"],
    benefits: ["Career Growth & Promotion Opportunities", "Higher Earning Potential", "Ability to Work Remotely & Flexibly"],
  },
  {
    icon: GrAnalytics,
    title: "Analytics",
    useCases: ["Database Analyst Bootcamp", "Data Scientist Bootcamp", "Python", "Power BI", "Machine Learning and AI", "Financial Analysis", "Big Data Analytics"],
    benefits: ["Data-Driven Decision Making", "Increased Career Opportunities", "Increased efficiency"],
  },
  {
    icon: GrUserManager,
    title: "Leadership & Management",
    useCases: ["Team Management", "Team building", "Conflict resolution", "Team management", "Strategic Influencing", "Impact Without Authority", "Lateral Thinking"],
    benefits: ["Better guest experience", "Higher staff productivity", "Reduced complaints"],
  },
  {
    icon: HiCurrencyDollar,
    title: "Financial Services",
    useCases: ["Capital Markets", "Corporate Finance", "Finance & Accounting", "Retail Banking", "Investment Banking", "Asset & Wealth Manegement", "Risk & Compliance"],
    benefits: ["Lower fraud risk", "Better regulatory compliance", "Improved trust"],
  },
  {
    icon: FaShoppingBag,
    title: "Retail",
    useCases: ["Sales training", "Inventory management", "Customer engagement"],
    benefits: ["Higher sales", "Better inventory control", "Increased customer retention"], 
  },
];

const IndustryComponent = () => {
  const [activeIndustry, setActiveIndustry] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-4">
        {industries.map((industry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setActiveIndustry(index)}
            className={`p-4 cursor-pointer border rounded-md shadow-md hover:border-[#4CC9F0] transition-colors ${
              activeIndustry === index ? "border-[#4CC9F0] bg-[#1D2A3F]" : "border-gray-300 bg-[#0F1729]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <industry.icon className="h-5 w-5 text-[#4CC9F0]" />
                <h3 className="text-lg font-bold text-white">{industry.title}</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-[#4CC9F0]" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeIndustry !== null && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 border border-[#4CC9F0]/20 rounded-md shadow-md bg-[#1D2A3F]"
            >
              {/* <h3 className="text-lg font-bold mb-2 text-[#4CC9F0]">Use Cases</h3> */}
              <ul className="space-y-2 text-gray-400">
                {industries[activeIndustry].useCases.map((useCase, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-4 border border-[#4CC9F0]/20 rounded-md shadow-md bg-[#1D2A3F]"
            >
              <h3 className="text-lg font-bold mb-2 text-[#4CC9F0]">Benefits</h3>
              <ul className="space-y-2 text-gray-400">
                {industries[activeIndustry].benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndustryComponent;
