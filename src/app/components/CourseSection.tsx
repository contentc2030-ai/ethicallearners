import { Shield, Database } from 'lucide-react'
import { CourseCard } from './course-card'


export default function CourseSection() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#0F1729] via-[#131B2E] to-[#0F1729] py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#4CC9F0]">
        Upgrade Your Tech Skills & Secure Your Future
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
        Master the latest in Data Science, Data Analytics, Artificial intelligence, Machine Learning, Full Stack Development, Cybersecurity, and more with our expert-led, hands-on courses!


        </p>
        <div className="grid md:grid-cols-3 justify-items-center sm:mb-12 gap-8">
          <CourseCard
            subtitle="Master the Art of"
            title="Cyber Defense"
            icon={Shield}
            courseName="Advanced Cybersecurity"
            partners={["National Cybersecurity Alliance", "ISACA"]}
            batchSize={40}
            duration="6 months"
            features={[
              "500+ Hands-on Lab Exercises",
              "50+ Real-world Security Projects",
              "AI-powered Threat Detection",
              "Network Security & Ethical Hacking",
              
            ]}
            name='cybersecurity'
          />
         
          <CourseCard 
            subtitle="Harness the Power of"
            title="Secure Data Science"
            icon={Database}
            courseName="Cybersecurity Data Analytics"
            partners={["NIST", "ISC²"]}
            batchSize={40}
            duration="6 months"
            features={[
              "30+ Security Case Studies",
              "Advanced Encryption Techniques",
              "AI in Cybersecurity",
              "Big Data Security Analytics"
            ]}
            name='dataScience'
          />

           <CourseCard
            subtitle="Master the Art of"
            title="Cyber Defense"
            icon={Shield}
            courseName="Advanced Cybersecurity"
            partners={["National Cybersecurity Alliance", "ISACA"]}
            batchSize={40}
            duration="6 months"
            features={[
              "500+ Hands-on Lab Exercises",
              "50+ Real-world Security Projects",
              "AI-powered Threat Detection",
              "Network Security & Ethical Hacking"
            ]}
            name='cybersecurity'
          />
        </div>
      </div>
    </section>
  )
}

