import { Hero } from "@/components/summerTraing/hero"
import { WhyUpskilling } from "@/components/summerTraing/why-upskilling"
import { LearningPrograms } from "@/components/summerTraing/learning-programs"
import { MeetMentors } from "@/components/summerTraing/meet-mentors"
import WebinarForm from "@/components/summerTraing/webinar-form"
import { FeatureCards } from "@/components/summerTraing/feature-card"
import { EducatorsSection } from "@/components/educators-section"
import EducatorsSectionProps from "@/pages/training/campus/page"



const educatorsData:any= {
  features: ["Proven history of delivering results", "Mentored past rankers", "Unique style of teaching"],
  educators: [
    {
      name: "Sweta Kumari",
      image: "/placeholder.svg",
      badge: {
        type: "LEGEND",
        color: "yellow-500",
      },
      credentials:
        "Mentored 81,000+ Students | My Multiple Students secured AIR Below 100 in GATE | Joined top IISc, IITs & NITs",
      stats: {
        watchMins: "18M",
        followers: "84K",
      },
    },
    {
      name: "Sanket Singh",
      image: "/placeholder.svg",
      badge: {
        type: "EXPERT",
        color: "blue-500",
      },
      credentials: "Ex-SDE @ LinkedIn | Former SDE @ Interviewbit | Google Summer of Code 2019 @ Harvard University",
      stats: {
        watchMins: "9M",
        followers: "14K",
      },
    },
    {
      name: "Sanket Singh",
      image: "/placeholder.svg",
      badge: {
        type: "EXPERT",
        color: "blue-500",
      },
      credentials: "Ex-SDE @ LinkedIn | Former SDE @ Interviewbit | Google Summer of Code 2019 @ Harvard University",
      stats: {
        watchMins: "9M",
        followers: "14K",
      },
    },
    {
      name: "Sanket Singh",
      image: "/placeholder.svg",
      badge: {
        type: "EXPERT",
        color: "blue-500",
      },
      credentials: "Ex-SDE @ LinkedIn | Former SDE @ Interviewbit | Google Summer of Code 2019 @ Harvard University",
      stats: {
        watchMins: "9M",
        followers: "14K",
      },
    },
    {
      name: "Sanket Singh",
      image: "/placeholder.svg",
      badge: {
        type: "EXPERT",
        color: "blue-500",
      },
      credentials: "Ex-SDE @ LinkedIn | Former SDE @ Interviewbit | Google Summer of Code 2019 @ Harvard University",
      stats: {
        watchMins: "9M",
        followers: "14K",
      },
    },
    {
      name: "Sanket Singh",
      image: "/placeholder.svg",
      badge: {
        type: "EXPERT",
        color: "blue-500",
      },
      credentials: "Ex-SDE @ LinkedIn | Former SDE @ Interviewbit | Google Summer of Code 2019 @ Harvard University",
      stats: {
        watchMins: "9M",
        followers: "14K",
      },
    },
    // Add more educators as needed
  ],
}


export default function Page() {
  const stats = [
    { value: "20k+", label: "Active Learners" },
    { value: "150+", label: "Expert Mentors" },
    { value: "800+", label: "Course Library" },
  ]

  const benefits = [
    {
      title: "Increase Your Employability",
      description: "Stay relevant in today's rapidly evolving job market with cutting-edge skills and certifications.",
      icon: "Trophy",
    },
    {
      title: "Boost Your Confidence",
      description: "Master new technologies and approaches to tackle complex challenges with confidence.",
      icon: "Star",
    },
    {
      title: "Achieve Your Goals",
      description: "Create a clear path towards your career objectives with structured learning programs.",
      icon: "Target",
    },
  ]

  const programs = [
    {
      title: "Master New Technologies",
      description: "Learn the latest technologies and frameworks used by leading tech companies.",
      duration: "6-8",
      price: "$249",
      image: "/images/ethicalprogram.png",
    },
    {
      title: "Develop Leadership Skills",
      description: "Build essential leadership capabilities to drive team success and innovation.",
      duration: "4-6",
      price: "$199",
      image: "/images/ethicalprogram.png",
    },
    {
      title: "Improve Soft Skills",
      description: "Enhance communication, collaboration, and problem-solving abilities.",
      duration: "3-4",
      price: "$149",
      image: "/images/ethicalprogram.png",
    },
    {
      title: "Master New Technologies",
      description: "Learn the latest technologies and frameworks used by leading tech companies.",
      duration: "6-8",
      price: "$249",
      image: "/images/ethicalprogram.png",
    },
    {
      title: "Develop Leadership Skills",
      description: "Build essential leadership capabilities to drive team success and innovation.",
      duration: "4-6",
      price: "$199",
      image: "/images/ethicalprogram.png",
    },
    {
      title: "Improve Soft Skills",
      description: "Enhance communication, collaboration, and problem-solving abilities.",
      duration: "3-4",
      price: "$149",
      image: "/images/ethicalprogram.png",
    },
  ]

  const mentors = [
    {
      name: "William James",
      position: "Tech Lead",
      image: "/placeholder.svg?height=300&width=300",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Hadley Emerson",
      position: "Leadership Coach",
      image: "/placeholder.svg?height=300&width=300",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Robert William",
      position: "Career Advisor",
      image: "/placeholder.svg?height=300&width=300",
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ]

  return (
    <main className="min-h-screen bg-[#0F1729] px-4 sm:px-6 lg:px-16 py-8 sm:py-8 lg:py-10 overflow-hidden">
      <Hero stats={stats} />
      <WhyUpskilling benefits={benefits} />
      <LearningPrograms programs={programs} />
      <FeatureCards />
      {/* <MeetMentors mentors={mentors} /> */}
      <EducatorsSection {...educatorsData} />  
      {/* <WebinarForm/> */}
      
    </main>
  )
}

