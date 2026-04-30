"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronUp } from "lucide-react"

interface TableOfContentsProps {
  sections: { title: string; id: string }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:block"
    >
      <nav className="bg-[#1D2A3F] p-4 rounded-lg shadow-lg">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`text-sm ${
                  activeSection === section.id ? "text-[#4CC9F0] font-semibold" : "text-gray-400 hover:text-[#4CC9F0]"
                } transition-colors`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href="#top"
        className="mt-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#4CC9F0] text-white hover:bg-[#4CC9F0]/80 transition-colors"
      >
        <ChevronUp className="h-6 w-6" />
      </a>
    </motion.div>
  )
}

