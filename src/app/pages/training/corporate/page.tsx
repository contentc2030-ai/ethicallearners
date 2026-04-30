import { CorporateHero } from "@/components/corporate-hero"
import { SolutionsWheel } from "@/components/solutions-wheel"
import { IndustriesSection } from "@/components/industries-section"
import { Testimonials } from "@/components/testimonials"
import { Partners } from "@/components/partners"
import HiringPartners from "@/components/HiringPartners"
import CourseFAQs from "@/components/CourseFAQs"
import IndustryComponent from "@/components/IndustryComponent"




const testimonialData = {
  title: "Don't Just Take Our Word For It",
  subtitle: "Hear from those who're already working with us",
  testimonials: [
    {
      content:
        "Our experience with skillBetter has been impressive from the start. The demonstrations they provided were not only good but also incredibly informative. Moving forward, when it came to onboarding and implementation, the support was exceptional.",
      author: "Gaurav Rakawat",
      position: "Darkstores Head",
      company: "zepto",
      image: "/placeholder.svg",
    },
    {
      content:
        "Our experience with skillBetter has been impressive from the start. The demonstrations they provided were not only good but also incredibly informative. Moving forward, when it came to onboarding and implementation, the support was exceptional.",
      author: "Gaurav Rakawat",
      position: "Darkstores Head",
      company: "zepto",
      image: "/placeholder.svg",
    },
    {
      content:
        "Our experience with skillBetter has been impressive from the start. The demonstrations they provided were not only good but also incredibly informative. Moving forward, when it came to onboarding and implementation, the support was exceptional.",
      author: "Gaurav Rakawat",
      position: "Darkstores Head",
      company: "zepto",
      image: "/placeholder.svg",
    },
    {
      content:
        "Our experience with skillBetter has been impressive from the start. The demonstrations they provided were not only good but also incredibly informative. Moving forward, when it came to onboarding and implementation, the support was exceptional.",
      author: "Gaurav Rakawat",
      position: "Darkstores Head",
      company: "zepto",
      image: "/placeholder.svg",
    },
    {
      content:
        "Our experience with skillBetter has been impressive from the start. The demonstrations they provided were not only good but also incredibly informative. Moving forward, when it came to onboarding and implementation, the support was exceptional.",
      author: "Gaurav Rakawat",
      position: "Darkstores Head",
      company: "zepto",
      image: "/placeholder.svg",
    },
    // Add more testimonials as needed
  ],
}

const partnersData = {
  title: "Trusted by 500+ Blue Chip Enterprises",
  partners: [
    { name: "IBM", logo: "/placeholder.svg" },
    { name: "Microsoft", logo: "/placeholder.svg" },
    { name: "AWS", logo: "/placeholder.svg" },
    { name: "KPMG", logo: "/placeholder.svg" },
    { name: "Facebook", logo: "/placeholder.svg" },
    { name: "IBM", logo: "/placeholder.svg" },
    { name: "Microsoft", logo: "/placeholder.svg" },
    { name: "AWS", logo: "/placeholder.svg" }, 
    { name: "KPMG", logo: "/placeholder.svg" },
    { name: "Facebook", logo: "/placeholder.svg" },
    { name: "IBM", logo: "/placeholder.svg" },
    { name: "Microsoft", logo: "/placeholder.svg" },
    { name: "AWS", logo: "/placeholder.svg" },
    { name: "KPMG", logo: "/placeholder.svg" },
    { name: "Facebook", logo: "/placeholder.svg" },
    { name: "Atlassian", logo: "/placeholder.svg" }, 
    { name: "Zepto", logo: "/placeholder.svg" },
    {name: "Swiggy", logo: "placeholder.svg" },
    {name: "Google", logo: "/placeholder.svg" },
    {name: "Uber", logo: "/placeholder.svg"},                                           
    // Add more partners as needed
  ],
}

export default function CorporatePage() {                                                         
  return (
    <main className=" bg-[#0F1729] px-4 sm:px-6 lg:px-16 py-8 sm:py-8 lg:py-10 overflow-hidden">
      <CorporateHero />                     
      <SolutionsWheel />
      {/* <IndustriesSection />  */}
      <IndustryComponent />
      <Testimonials {...testimonialData} />
      <HiringPartners />
      <Partners {...partnersData} /> 
      <div className="mt-12">
      <CourseFAQs course="Corporate" />                                                                   
      </div>
        
    </main>
  )
}

