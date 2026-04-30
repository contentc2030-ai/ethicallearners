import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'

import assets from '../../global/constant/assets.const'

export function InstructorCard() {
  
  return (
    <div className="flex flex-wrap justify-center gap-6 mx-auto mt-16 max-w-7xl">
      {/* Instructor Card 1 */}
      <Card className="bg-gray-800 shadow-md border rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <Image
            src={assets.tajwarKhan}
            alt="Tajwar Khan"
            width={120}
            height={120}
            className="rounded-md w-1/2  border"
          />
          <h2 className="mt-4 text-xl font-bold text-zinc-100">Tajwar Khan</h2>
          <p className="text-[#4CC9F0]">Lead Cybersecurity Instructor</p>

          <div className="mt-2 flex items-center text-gray-500">
            <FaLinkedin className="mr-2" />
            <p>Fractal | Deloitte | Capgemini</p>
          </div>

          <div className="mt-4 flex w-full justify-between text-gray-300">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">5+ Years</p>
              <p className="text-sm">Work Experience</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">3+ Years</p>
              <p className="text-sm">Teaching Experience</p>
            </div>
          </div>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Data Scientist - Fractal | Capgemini | Deloitte | Business Insights | ML & Analysis Specialist
          </p>
        </div>
      </Card>

      {/* Instructor Card 2 */}
      <Card className="bg-gray-800 shadow-md border rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <Image
            src={assets.tajwarKhan}
            alt="Tajwar Khan"
            width={120}
            height={120}
            className="rounded-md w-1/2 border"
          />
          <h2 className="mt-4 text-xl font-bold text-zinc-100">Jane Doe</h2>
          <p className="text-[#4CC9F0]">Senior Web Development Instructor</p>

          <div className="mt-2 flex items-center text-gray-500">
            <FaLinkedin className="mr-2" />
            <p>Google | Meta | Amazon</p>
          </div>

          <div className="mt-4 flex w-full justify-between text-gray-300">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">8+ Years</p>
              <p className="text-sm">Work Experience</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">4+ Years</p>
              <p className="text-sm">Teaching Experience</p>
            </div>
          </div>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Web Developer - Google | Meta | Amazon | Full-Stack Expertise | Mentor & Speaker
          </p>
        </div>
      </Card>
    </div>
  )
}
