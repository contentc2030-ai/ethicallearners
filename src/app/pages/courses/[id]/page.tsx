"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  Clock,
  Users,
  Award,
  Globe,
  Star,
  ChevronRight,
  Code,
  BarChart2,
  UserCheck,
  Building,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/dashboard-component/ui/accordion"
import { Card, CardContent } from "@/components/dashboard-component/ui/card"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Input } from "@/components/dashboard-component/ui/input"
import { format } from "date-fns"

interface Mentor {
  _id: string
  name: string
  email: string
  phone: string
  image: string
  experience: {
    institute: string
    startYear: number
    endYear: number
    speciality: string[]
    _id: string
  }[]
  skills: string[]
  speciality: string
  about: string
  address: string
  cv: string
  socialMedias: {
    name: string
    link: string
    _id: string
  }[]
  courseIds: string[]
}

export default function CoursePage() {
  const { id } = useParams()
  const [course, setCourse] = useState<any | null>(null)
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    review: "",
  })

  const [activeModule, setActiveModule] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use the provided data directly
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/course/findById?id=${id}`)
        const data = await response.json()
        setCourse(data?.courses[0])

        // Fetch mentors if course has mentor IDs
        if (data?.courses[0]?.mentors?.length) {
          const mentorResponse = await fetch(`/api/mentor?ids=${data.courses[0].mentors.join(",")}`)
          const mentorData = await mentorResponse.json()
          setMentors(mentorData.mentors)
        }
      } catch (err) {
        setError("Error loading course data. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id])

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the review to an API
    alert("Thank you for your review!")
    setReviewForm({ name: "", email: "", review: "" })
    setSelectedRating(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReviewForm((prev) => ({ ...prev, [name]: value }))
  }

  // Define course features for the "What Course Offers" section
  const courseFeatures = [
    {
      title: "Code Everyday",
      icon: Code,
      items: ["Practitioner-led Live Classes", "Booster Practice Sessions", "Full Day Doubt Support"],
    },
    {
      title: "Personalized Progress Evaluation",
      icon: BarChart2,
      items: ["Weekly Test", "1:1 Mentorship", "Soft Skill Sessions"],
    },
    {
      title: "Interview Preparation Every Month",
      icon: UserCheck,
      items: ["Mock Interviews", "Hackathon", "Real World Projects"],
    },
    {
      title: "Intensive Placement Assistance",
      icon: Building,
      items: ["Profile Building", "Interview Preparation", "Job Referrals"],
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1729] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4CC9F0] border-t-transparent"></div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#0F1729] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#4CC9F0] mb-4">Error</h2>
          <p className="mb-6">{error || "Course not found"}</p>
          <Button className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">Go Back</Button>
        </div>
      </div>
    )
  }

  const parseModulePoints = (pointsString) => {
    if (!pointsString) return []

    const content = pointsString.split("Summary").pop() || pointsString

    return content
      .split("")
      .filter((point) => point.trim().length > 0)
      .map((point) => point.trim())
  }

  return (
    <div className="min-h-screen bg-[#0F1729] text-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 md:px-8">
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex gap-2 mb-4">
                <span className="bg-[#4CC9F0]/20 text-[#4CC9F0] text-xs px-3 py-1 rounded-full">AI Powered</span>
                <span className="bg-green-500/20 text-green-500 text-xs px-3 py-1 rounded-full">
                  100% Money Back Guarantee
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-2">{course.name}</h1>
              <h2 className="text-2xl md:text-3xl text-[#4CC9F0] font-semibold mb-4">with Career Support</h2>

              <p className="text-gray-300 mb-8">{course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {course.highlights.map((stat, index) => (
                  <div key={index} className="bg-[#131B2E] p-4 rounded-lg text-center">
                    <div className="text-xl font-bold text-[#4CC9F0]">{stat.heading}</div>
                    <div className="text-xs text-gray-400">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-[#1D2A3F] rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4">Course Includes:</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#4CC9F0]" />
                      <span>Level</span>
                    </div>
                    <span>{course.level}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#4CC9F0]" />
                      <span>Duration</span>
                    </div>
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-[#4CC9F0]" />
                      <span>Lessons</span>
                    </div>
                    <span>{course.lessons}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#4CC9F0]" />
                      <span>Students</span>
                    </div>
                    <span>{course.students}+</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#4CC9F0]" />
                      <span>Certifications</span>
                    </div>
                    <span>1</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-[#4CC9F0]" />
                      <span>Language</span>
                    </div>
                    <span>English</span>
                  </div>
                </div>

                <div className="text-2xl font-bold mb-4">₹{Number.parseInt(course.price).toLocaleString()}</div>

                <Button className="w-full bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729] mb-4">Join This Course</Button>

                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5"
                      fill={Number.parseFloat(course.rating) >= star ? "#4CC9F0" : "none"}
                      stroke={Number.parseFloat(course.rating) >= star ? "#4CC9F0" : "currentColor"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Course Offers */}
      <section className="py-16 px-4 md:px-8 bg-[#0D1423]">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-2 text-center">
            What Course <span className="text-[#4CC9F0]">Offers</span>
          </h2>
          <p className="text-gray-300 mb-12 text-center">
            Build your skills step-by-step with our momentum-driven approach.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-[#131B2E] border-[#4CC9F0]/20">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Icon className="h-6 w-6 text-[#4CC9F0]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-4">{feature.title}</h3>
                    <ul className="space-y-2">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#4CC9F0] mt-1">•</span>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8 bg-[#0D1423]">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-2 text-center">
            About <span className="text-[#4CC9F0] ">{course.name}</span>
          </h2>
          <p className="text-gray-300 mb-12  text-center max-w-7xl">{course.about.description}</p>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              {course.about.points.map((point, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-semibold">{point.heading}</h3>
                  <p className="text-gray-400">{point.description}</p>
                </div>
              ))}
            </div>

            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={course.about.image || "/placeholder.svg?height=400&width=600&text=WebDevelopment"}
                  alt="About Web Development"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Meet Your <span className="text-[#4CC9F0]">Mentors</span>
          </h2>
          <p className="text-gray-300 mb-12 text-center">
            Learn from industry experts with years of experience in {course.name}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-[#131B2E] rounded-lg p-6 border border-[#4CC9F0]/20 hover:border-[#4CC9F0]/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-[#4CC9F0]/30">
                    <Image
                      src={"/placeholder.svg?height=128&width=128"}
                      alt={mentor.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                  <p className="text-[#4CC9F0] mb-3">{mentor.speciality}</p>

                  {/* Experience */}
                  <div className="w-full mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Experience</h4>
                    {mentor.experience && mentor.experience.length > 0 && (
                      <div className="bg-[#0F1729] p-3 rounded-md">
                        <p className="text-sm font-medium">{mentor.experience[0].institute}</p>
                        <p className="text-xs text-gray-400">
                          {mentor.experience[0].startYear} - {mentor.experience[0].endYear}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mentor.experience[0].speciality.map((spec, i) => (
                            <span key={i} className="text-xs bg-[#4CC9F0]/20 text-[#4CC9F0] px-2 py-0.5 rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="w-full mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                    <div className="flex flex-wrap justify-center gap-1">
                      {mentor.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-[#4CC9F0]/20 text-[#4CC9F0] px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <p className="text-sm text-gray-400 mb-4">{mentor.about}</p>

                  {/* Social Media Links */}
                  {mentor.socialMedias && mentor.socialMedias.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {mentor.socialMedias.map((social, i) => (
                        <a
                          key={i}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4CC9F0] hover:text-[#3DB8E0] transition-colors"
                        >
                          {social.name === "LinkedIn" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          )}
                          {social.name === "GitHub" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          )}
                          {social.name === "Twitter" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Tools You will Learn</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {course.tools.map((tool, index) => (
              <div
                key={index}
                className="bg-[#131B2E] p-4 rounded-lg border border-[#4CC9F0]/20 w-40 h-24 flex items-center justify-center"
              >
                <Image
                  src={tool || "/placeholder.svg?height=60&width=120&text=Tool"}
                  alt={`Tool ${index + 1}`}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Course Curriculum</h2>
          <p className="text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Master Full-Stack Web Development concepts and tools to analyze, build, and deploy professional
            applications.
          </p>

          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            <div className="lg:w-1/2 space-y-4">
              {course.modules.map((module, index) => (
                <div
                  key={index}
                  className="border border-[#4CC9F0]/30 rounded-lg p-4 flex justify-between items-center hover:bg-[#131B2E] transition-colors cursor-pointer"
                  onClick={() => setActiveModule(index)}
                >
                  <span className="font-semibold">
                    Module {index + 1}: {module.name}
                  </span>
                  <ChevronRight className="h-5 w-5 text-[#4CC9F0]" />
                </div>
              ))}
            </div>

            <div className="lg:w-1/2 bg-[#131B2E] border border-[#4CC9F0]/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#4CC9F0] mb-4">
                Module {activeModule + 1}: {course.modules[activeModule]?.name || "Introduction"}
              </h3>
              <ul className="space-y-3">
                {course.modules[activeModule]?.points
                  .map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#4CC9F0] mt-1">•</span>
                      <span className="text-gray-300">{point.trim()}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 md:px-8 bg-[#0D1423]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-8">Course Reviews</h2>

              <div className="space-y-6">
                {course.reviews.map((review, index) => (
                  <div key={index} className="bg-[#131B2E] rounded-lg p-6 border border-[#4CC9F0]/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0F1729]">
                        <Image
                          src={review.image || "/placeholder.svg?height=48&width=48"}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-xs text-gray-400">{format(new Date(review.date), "MMMM dd, yyyy")}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4"
                            fill={review.rating >= star ? "#4CC9F0" : "none"}
                            stroke={review.rating >= star ? "#4CC9F0" : "currentColor"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300">{review.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 mt-16">
              <div className="bg-[#131B2E] rounded-lg p-6 border border-[#4CC9F0]/20">
                <h3 className="text-xl font-semibold mb-4">Add a Review</h3>

                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-6 w-6 cursor-pointer"
                      fill={selectedRating >= star ? "#4CC9F0" : "none"}
                      stroke={selectedRating >= star ? "#4CC9F0" : "currentColor"}
                      onClick={() => setSelectedRating(star)}
                    />
                  ))}
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    placeholder="Your Email"
                    className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    placeholder="Your Review"
                    className="bg-[#0F1729] border-[#4CC9F0]/30 text-white min-h-[100px]"
                    name="review"
                    value={reviewForm.review}
                    onChange={handleInputChange}
                  />
                  <Button type="submit" className="w-full bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {course.frequentQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-[#4CC9F0]/20">
                  <AccordionTrigger className="text-left py-4 hover:no-underline ">
                    <span className="text-[#4CC9F0]"> {faq.question}</span>

                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Similar Courses */}
      <section className="py-16 px-4 md:px-8 bg-[#0D1423]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Courses</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-[#4CC9F0]/30 text-[#4CC9F0]">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-[#4CC9F0]/30 text-[#4CC9F0]">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Network Security Fundamentals", price: "₹29,999", rating: "4.9", students: "1200" },
              { name: "Cloud Security & DevSecOps", price: "₹34,999", rating: "4.9", students: "800" },
              { name: "Malware Analysis Mastery", price: "₹24,999", rating: "4.7", students: "600" },
              { name: "Network Security Advanced", price: "₹29,999", rating: "4.8", students: "900" },
            ].map((item, index) => (
              <div key={index} className="bg-[#131B2E] rounded-lg overflow-hidden border border-[#4CC9F0]/20">
                <div className="h-48 bg-black flex items-center justify-center">
                  <span className="text-[#4CC9F0]">Placeholder</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-[#4CC9F0] fill-[#4CC9F0]" />
                    <span className="text-sm">{item.rating}</span>
                    <span className="text-xs text-gray-400 ml-auto">{item.students} students</span>
                  </div>
                  <div className="text-[#4CC9F0] font-semibold">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}