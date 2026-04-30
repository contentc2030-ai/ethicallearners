import { ExpertCard } from '@/components/expert-card'
import { FeatureCard } from '@/components/feature-card'
import { ServiceCard } from '@/components/service-card'
import { BookOpen, Shield, Building, FileText, Users,  Target } from 'lucide-react'
import assets from '../../global/constant/assets.const'

export default function PathWays() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white">
            <div className="container mx-auto px-4 py-16 space-y-20">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">
                    Kickstart Your Tech Journey & Secure Your Future with{' '}
                        <span className="text-[#4CC9F0]">Ethical Learner </span>
                    </h1>
                    <div className="h-1 w-48 bg-[#4CC9F0] mx-auto rounded-full" />
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 ml-4">
                        <div className="h-1/2 bg-[#4CC9F0]" />
                        <div className="h-[51%] lg:h-[52%] border-l-2 border-b-2 border-dashed border-[#4CC9F0] w-[30vw] rounded-bl-lg" />
                        {/* <div className="h-1  w-[80vw] border-b-2 border-dashed border-[#4CC9F0]" /> */}
                    </div>

                    {/* Learn Live Section */}
                    <div className="relative pl-12 mb-20">
                        <div className="absolute left-0 w-8 h-8 bg-[#4CC9F0] rounded-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-[#0F1729]" />
                        </div>
                        <h2 className="text-2xl font-bold mb-16">Learn Live with Industry Experts</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <ExpertCard
                                    key={i}
                                    name={`Expert ${i}`}
                                    role="Senior Security Analyst"
                                    imageUrl={assets.tajwarKhan}
                                />                  
                            ))}
                        </div>
                    </div>

                    {/* Learning Ecosystem Section */}
                    <div className="relative pl-12 mb-20">
                        <div className="absolute left-0 w-8 h-8 bg-[#4CC9F0] rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-[#0F1729]" />
                        </div>
                        <h2 className="text-2xl font-bold mb-8">The Ultimate Learning Ecosystem for Your Tech Growth 🚀</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {[
                                {
                                    title: "1:1 Expert Consultation",
                                    description: " Get personalized guidance and resolve your queries instantly.",
                                    imageUrl: assets.Pathway1
                                },
                                {
                                    title: "Hands-On Learning",
                                    description: "Work on real-world projects and industry scenarios.",
                                    imageUrl: assets.Pathway2
                                },
                                {
                                    title: "Dedicated Mentorship ",
                                    description: "Accelerate your career with expert-led mentorship.",
                                    imageUrl: assets.Pathway3
                                },
                                {
                                    title: "Hackathons & Challenges",
                                    description: "Collaborate, innovate, and test your skills in real-time.",
                                    imageUrl: assets.Pathway4
                                },
                                {
                                    title: "Industry Simulations",
                                    description: "Gain practical experience with real-world case studies.",
                                    imageUrl: assets.Pathway5
                                },
                                {
                                    title: "Job Readiness Support ",
                                    description: " Build a strong portfolio and get placement assistance.",
                                    imageUrl: assets.Pathway6
                                }
                            ].map((feature, i) => (
                                <FeatureCard key={i} {...feature} />
                            ))}
                        </div>
                    </div>

                {/* Career Services Section */}
                    <div className="relative pl-12">
                        <div className="absolute left-0 w-8 h-8 bg-[#4CC9F0] rounded-full flex items-center justify-center">
                            <Building className="w-5 h-5 text-[#0F1729]" />
                        </div>
                        <h2 className="text-2xl font-bold mb-8">Ethical Learner’s Dedicated Career Services 🚀</h2>

                        {/* Top Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ServiceCard
                            icon={FileText}
                            title="Professional Resume Building"
                            description="Create a standout, industry-ready resume."
                            size="large" 
                        />
                        <ServiceCard
                            icon={Users}
                            title="Expert Interview Prep "
                            description=" Get personalized coaching to ace your job interviews."
                            size="large"
                        />
                        <ServiceCard
                            icon={Users}
                            title=" Optimized LinkedIn Profile"
                            description="Enhance your digital presence for top recruiters."
                            size="large" 
                        />
                    </div>


                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <ServiceCard
                                icon={Target}
                                title="Security Certifications"
                                description="Prepare for globally recognized certifications to boost your credibility. Our structured guidance ensures you're well-equipped to pass with confidence."
                                size="large"
                            />
                            <ServiceCard
                                icon={Building}
                                title="Exclusive Job Referrals"
                                description="Get access to 500+ hiring companies actively seeking skilled professionals. We connect you with the right opportunities to accelerate your career growth."
                                size="large"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

