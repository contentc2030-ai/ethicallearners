"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

interface Mentor {
  name: string;
  position: string;
  image: string;
  socials: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}

interface MeetMentorsProps {
  mentors: Mentor[];
}

export function MeetMentors({ mentors }: MeetMentorsProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet <span className="text-[#4CC9F0]">the Mentor</span>
          </h2>
          <p className="text-gray-400">
            Learn from industry experts with years of practical experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <div className="bg-[#1D2A3F] border-[#4CC9F0]/20 border rounded-lg">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={mentor.image || "/placeholder.svg"}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{mentor.position}</p>
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href={mentor.socials.twitter}
                      className="text-gray-400 hover:text-[#4CC9F0] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaTwitter className="h-5 w-5" />
                    </a>
                    <a
                      href={mentor.socials.linkedin}
                      className="text-gray-400 hover:text-[#4CC9F0] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={mentor.socials.github}
                      className="text-gray-400 hover:text-[#4CC9F0] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaGithub className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
