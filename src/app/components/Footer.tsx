"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {  MapPin, Mail, Phone, ShieldCheck, Lock, UserCheck, Factory, GraduationCap, Users, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from "next/navigation"; // Import usePathname hook
import { FaWhatsapp } from "react-icons/fa"
import assets from "../../global/constant/assets.const"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import toast from "react-hot-toast"
import Link from "next/link"

export default function Footer() {
  const pathname = usePathname(); // Get the current path
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [mentorForm, setMentorForm] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  // Check if the path contains 'userDashboard'
  const isUserDashboard = ['/doc', '/pages/userDashboard', '/pages/mentor'].includes(pathname);
  return (
    <>
      {
        !isUserDashboard && <footer className="relative bg-[#0F1729] overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#131B2E]/50 via-transparent to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 py-12 relative z-10">
            {/* Newsletter Section */}
            <div className="bg-[#1D2A3F] rounded-lg p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* <Image src={assets.ethicalLearnerText} alt="Ethical  learner Logo" width={180} height={50} className="h-12" /> */}
              <div className="flex-1 max-w-md flex gap-2">
                <Input type="email" placeholder="Enter Your Email" className="flex-1 bg-[#0F1729] border-[#4CC9F0] text-white" />
                <Button className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                  Subscribe
                </Button>
              </div>
              <div className="flex items-center gap-4 text-[#4CC9F0]">
                {/* <a href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="hover:text-white"><Youtube className="h-5 w-5" /></a> */}
              </div>
            </div>

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
              {/* About Us */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">About Ethical Learner</h3>
                <p className="text-gray-300 mb-4">
                  Empowering the next generation of Tech professionals with cutting-edge education and hands-on training.
                </p>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#4CC9F0]" />
                    <span>Bareilly, Uttar Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#4CC9F0]" />
                    <span>Bengaluru, Karnataka</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#4CC9F0]" />
                    <span>Info@ethicallearner.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#4CC9F0]" />
                    <span>+91 9517716419</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Quick Links</h3>
                <ul className="space-y-2">
                  {['About Ethical Learner', 'Our Courses', 'Expert Instructors', 'Career Services', 'Contact Us', 'Summer Training', 'Become a Mentor'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-300 hover:text-[#4CC9F0] flex items-center gap-2">
                        <span className="text-[#4CC9F0]">›</span> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Courses */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Our Courses</h3>
                <ul className="space-y-2">
                  {['Data Science with Generative AI', 'Ethical Hacking', 'Full Stack Web-Development', 'Cloud Security', 'Incident Response', 'Cybersecurity Management'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-300 hover:text-[#4CC9F0] flex items-center gap-2">
                        <span className="text-[#4CC9F0]">›</span> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Business */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Business</h3>
                <ul className="space-y-2">
                  {['Corporate Traning', 'Campus Traning', 'Chapters', 'Campus Ambassador Program', 'Cyber Safe India 2.0'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-300 hover:text-[#4CC9F0] flex items-center gap-2">
                        <span className="text-[#4CC9F0]">›</span> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Key Features</h3>
                <div className="space-y-4">
                  {[
                    { icon: () => <Image src={assets.automation} alt="Communication Icon" width={24} height={24} />, text: 'Industry' },

                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-[#1D2A3F] p-2 rounded-full">
                        <Icon />
                      </div>
                      <span className="text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Key Features</h3>
                <div className="space-y-4">
                  {[

                    { icon: () => <Image src={assets.training} alt="Communication Icon" width={24} height={24} />, text: 'Expert-Led Training' },

                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-[#1D2A3F] p-2 rounded-full">
                        <div className="h-6 w-6 text-[#4CC9F0]">
                          <Icon />
                        </div>
                      </div>
                      <span className="text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>


              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Key Features</h3>
                <div className="space-y-4">
                  {[

                    { icon: Users, text: 'Free Placement Prep' },

                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-[#1D2A3F] p-2 rounded-full">
                        <Icon className="h-6 w-6 text-[#4CC9F0]" />
                      </div>
                      <span className="text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#4CC9F0]">Key Features</h3>
                <div className="space-y-4">
                  {[

                    { icon: () => <Image src={assets.communication} alt="Communication Icon" width={24} height={24} />, text: 'Free Softskill Prep' },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-[#1D2A3F] p-2 rounded-full">
                        <Icon />
                      </div>
                      <span className="text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>





            {/* Copyright */}
            <div className="mt-12 pt-4 border-t border-gray-800 text-center text-gray-400 flex flex-col md:flex-row justify-between items-center relative gap-4 md:gap-0">
              {/* Footer Text */}
              <div className="text-center w-full">
                <p>© Copyright 2024 by Ethical Learner. All rights reserved.</p>
                <p>Made with ❤️ at Adorway</p>
              </div>

              {/* WhatsApp Icon (Responsive) */}
              <div className="md:absolute md:right-4">
                <a href="https://wa.me/919517716419" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-4xl md:text-5xl text-green-500 hover:text-green-600 transition-transform transform hover:scale-110" />
                </a>
              </div>
            </div>


          </div>


        </footer>
      }
    </>

  )
}

