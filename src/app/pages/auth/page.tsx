"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Book, Lightbulb, Users, Trophy } from "lucide-react"
import assets from "../../../global/constant/assets.const"

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true)

  const features = [
    { icon: Book, text: "Access to Top courses" },
    { icon: Lightbulb, text: "Learn from industry experts" },
    { icon: Users, text: "Join a community of learners" },
    { icon: Trophy, text: "Earn certificates" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1729] p-4 overflow-hidden">
      <div className="w-full max-w-[1200px] min-h-[700px] bg-[#1D2A3F] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          {/* Left Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-welcome" : "signup-welcome"}
              initial={{ x: isLogin ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLogin ? 50 : -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 flex flex-col items-center justify-center text-center relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {isLogin ? "Welcome Back!" : "Hello Learners!"}
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-8 max-w-[300px]">
                {isLogin
                  ? "To keep connected with us please login with your personal info"
                  : "Enter your personal details and start your learning journey with us"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="px-6 md:px-10 py-2 rounded-full border-2 border-[#4CC9F0] text-[#4CC9F0] font-semibold hover:bg-[#4CC9F0] hover:text-[#0F1729] transition-colors text-sm md:text-base"
              >
                {isLogin ? "SIGN UP" : "SIGN IN"}
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md"
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#4CC9F0]" />
                    <span className="text-xs md:text-sm text-gray-300 text-left">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-form" : "signup-form"}
              initial={{ x: isLogin ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isLogin ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 flex flex-col items-center justify-center bg-[#1D2A3F]/50 relative z-10"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                {isLogin ? "Sign in to Ethical Learner" : "Create Account"}
              </h1>


              <p className="text-sm md:text-base text-gray-400 mb-6">
                {isLogin ? "or use your email account" : "or use email for registration"}
              </p>

              {isLogin ? <LoginForm /> : <SignupForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={assets.ethicalLearnerText}
            alt="Education Background"
            width={1200}
            height={700}
            className="object-cover opacity-10 bottom-0  absolute"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#0F1729] via-transparent to-[#1D2A3F] opacity-80"
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-4 left-4  md:top-10 md:left-10 bg-[#4CC9F0]/10 p-3 md:p-4 rounded-lg backdrop-blur-sm max-w-[200px] md:max-w-[250px] invisible md:visible lg:visible"
        >
          <h3 className="text-[#4CC9F0] font-bold mb-1 md:mb-2 text-sm md:text-base">Did you know?</h3>
          <p className="text-white text-xs md:text-sm">
            Online learning can be up to 50% more efficient than traditional classroom learning.
          </p>
        </motion.div>



        {/* Background Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#4CC9F0]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-[#4CC9F0]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
    </div>
  )
}

