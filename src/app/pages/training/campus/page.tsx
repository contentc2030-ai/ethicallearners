
import { CampusHero } from "@/components/campus-hero"
import { FeatureGrid } from "@/components/feature-grid"
import { EducatorsSection } from "@/components/educators-section"
import { CampusAdvantages } from "@/components/campus-advantages"
import { EducatorsSectionProps } from "../../../../global/interface/educator.interface"
import { CampusAdvantagesProps } from "../../../../global/interface/advantage.interface"
import CourseFAQs from "@/components/CourseFAQs"


const  educatorsData:EducatorsSectionProps= {
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
    // Add more educators as needed
  ],
}

const advantagesData:CampusAdvantagesProps = {
  title: "An advantage to Campus",
  description:
    "Enrolling your campus for this program will help you strengthen your colleges' reputation, demonstrate better results, build industry connections and help your students become future-technology ready.",
  advantages: [
    {
      icon: "Activity",
      title: "Performance Tracker",
      description:
        "Gain insights into your students' progress like never before. Stay informed about their quiz scores, project completion rates, and coding challenges.",
      iconBg: "bg-purple-500",
    },
    {
      icon: "TrendingUp",
      title: "Skill enhancement",
      description:
        "Through interactive learning, coding exercises, and hands-on projects, your campus will witness a significant boost in students' proficiency.",
      iconBg: "bg-teal-500",
    },
    {
      icon: "Headphones",
      title: "Hiring assistance",
      description:
        "From resume building workshops to interview preparation and connecting them with top-tier companies, our program ensures professional success.",
      iconBg: "bg-pink-500",
    },
    {
      icon: "Users",
      title: "Key account manager",
      description:
        "Our dedicated account manager serves as your direct point of contact, ensuring that your campus's unique needs are understood and catered to.",
      iconBg: "bg-orange-500",
    },
  ],
}

export default function Page() {
  return ( 
    <main  className=" bg-[#0F1729] sm:px-6 lg:px-16 py-8 sm:py-8 lg:py-10 overflow-hidden"> 
      <CampusHero />
      <CampusAdvantages {...advantagesData} />
      <FeatureGrid />
      <EducatorsSection {...educatorsData} />
      <div className="mt-12">
      <CourseFAQs course="Campus" />        
      </div>   
    </main>
  )       
}

