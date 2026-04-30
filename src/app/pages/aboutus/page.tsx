import StatsCounter from "@/components/StatsCounter"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, CheckCircle, Award, Shield } from "lucide-react"
import Link from 'next/link';
import Image from 'next/image';
import assets from "../../../global/constant/assets.const";




export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0F1729] text-white">
            {/* Hero Stats Section */}
            <section className="px-4 py-12 md:px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-1 gap-8 items-center mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#4CC9F0]">About Us</h1>
                            <p className="text-gray-300 text-lg">
                            At Ethical Learner, we believe in making quality tech education accessible and affordable for all. Founded by Tajwar Khan, a renowned security researcher and trainer, Ethical Learner has grown into a leading provider of software and IT training for students, professionals, and corporate clients worldwide.
                            </p> <br />
                            <p className="text-gray-300 text-lg"> 
                              We offer a comprehensive range of educational solutions, including placement-assured training programs, 
                              summer training, global certification courses, faculty development programs (FDPs), 
                              and corporate training. Our expertise spans across Data Science, Full Stack Development, 
                              Cybersecurity, Cloud Computing (AWS & Azure), and more.</p> <br />
                            <p className="text-gray-300 text-lg" > 
                              What sets us apart is our 100% placement-assured training program, backed by a 100% money-back guarantee. 
                              If you complete the program but don’t secure a job, 
                              we refund your entire fee-ensuring a risk-free learning experience.</p> <br />
                            <p className="text-gray-300 text-lg"> 
                              Ethical Learner is trusted by numerous corporate partners and educational institutions. 
                              We provide industry-focused training to help individuals and organizations stay ahead in the ever-evolving tech landscape.</p> <br />
                            <p className="text-gray-300 text-lg"> 
                              With unmatched quality and reliability, 
                              our bootstrapped and profitable company is dedicated to creating employment opportunities and bridging the skill gap in the tech industry. 
                              Join us in shaping a future driven by innovation and expertise!</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="p-6 bg-[#4CC9F0]/5 rounded-lg">
                            <div className="text-4xl font-bold text-[#4CC9F0] mb-2">12</div>
                            <div className="text-sm text-gray-300">Years Experience</div>
                        </div>
                        <div className="p-6 bg-[#4CC9F0]/5 rounded-lg">
                            <div className="text-4xl font-bold text-[#4CC9F0] mb-2">5/5</div>
                            <div className="text-sm text-gray-300">Client Happiness</div>
                        </div>
                        <div className="p-6 bg-[#4CC9F0]/5 rounded-lg">
                            <div className="text-4xl font-bold text-[#4CC9F0] mb-2">700+</div>
                            <div className="text-sm text-gray-300">Projects Completed</div>
                        </div>
                        <div className="p-6 bg-[#4CC9F0]/5 rounded-lg">
                            <div className="text-4xl font-bold text-[#4CC9F0] mb-2">100+</div>
                            <div className="text-sm text-gray-300">Course Offerings</div>
                        </div>
                    </div>

                    {/* Vision Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-[#4CC9F0] ">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-4 text-white">Our Vision For Your Success</h3>
                                <p className="text-[#0F1729]">
                                To be the most trusted and preferred educational service provider, 
                                empowering learners with industry-relevant skills, guaranteed career opportunities, 
                                and exceptional learning experiences that drive success.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#4CC9F0]">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-4 text-white">Our Commitment to Excellence</h3>
                                <p className="text-[#0F1729]">
                                
                                To deliver top-quality, industry-focused education solutions that not only meet but exceed expectations, 
                                ensuring career growth and long-term success for our learners.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="px-4 py-12 md:px-6 bg-[#4CC9F0]/5">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-8">
                        <h2 className="text-sm uppercase tracking-wider text-[#4CC9F0] mb-2">OUR STORY</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Quality Education for All Your Learning Needs</h3>
                    </div>
                    <p className="text-gray-300 max-w-4xl mx-auto text-center mb-12 leading-relaxed">
                    Ethical Learner started with a vision to make quality tech education accessible to all.
                    Founded by Tajwar Khan, we have grown into a future-focused training provider,
                    equipping thousands of learners with industry-relevant skills.
                    </p>
                    <p className="text-gray-300 max-w-4xl mx-auto text-center mb-12 leading-relaxed">
                      We understand that every student’s journey is unique, so we offer comprehensive, 
                      hands-on programs, including placement-assured training with a 100% money-back guarantee. 
                      With a commitment to excellence, we take pride in the success stories we create and continue to shape the future of tech education.</p>

                    {/* Why Choose Us */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold mb-8">We&apos;re the Best Choice for Your Educational Needs</h3>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <Award className="w-6 h-6 text-[#4CC9F0] flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-2">Experienced Professionals</h4>
                                        <p className="text-gray-300">
                                        Our team consists of highly skilled educators with vast industry experience, ensuring top-tier training.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle className="w-6 h-6 text-[#4CC9F0] flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-2">Quality Education</h4>
                                        <p className="text-gray-300">
                                        We focus on delivering excellence in every course, with a structured curriculum designed for optimal learning outcomes.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Shield className="w-6 h-6 text-[#4CC9F0] flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold mb-2">Fully Accredited</h4>
                                        <p className="text-gray-300">
                                        Our programs are industry-recognized, providing learners with certifications and skills that employers value.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="relative z-10 rounded-2xl overflow-hidden bg-[#FFF8E7] p-8">
                                    <div className="absolute top-4 right-4">
                                        <Star className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div className="aspect-square bg-[#4CC9F0]/10 rounded-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-[#4CC9F0]" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            

            {/* Mission Section */}
            <div className="px-4 py-20 md:px-6 ">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#4CC9F0]">Our Mission</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    We are on a mission to revolutionize education through technology. 
                    By integrating cutting-edge learning tools with expert guidance, 
                    we create an engaging and dynamic learning environment where every student can unlock their potential and achieve academic and career excellence.
                    </p>
                </div>
            </div>
            <section className="relative px-4 py-20 md:px-6 overflow-hidden">
              
        <div className="container mx-auto max-w-6xl">
        <div className="space-y-32">
            {/* First Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Developing Confident and Successful Learners</h2>
                <p className="text-gray-300 leading-relaxed">
                At Ethical Learner, we believe in empowering every student to reach their full potential. 
                Our innovative approach blends personalized learning with industry-driven training, 
                ensuring students gain the confidence, skills, and expertise needed to thrive in their careers.
                </p>
                {/* <Button className="bg-[#4CC9F0] text-background hover:bg-[#4CC9F0]/90 rounded-full">View More</Button> */}
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden bg-[#FFF8E7] p-8">
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="absolute -bottom-4 -right-4">
                    <svg width="100" height="40" viewBox="0 0 100 40">
                      <path d="M0 40 Q50 0 100 40" stroke="#4CC9F0" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="aspect-square bg-[#4CC9F0]/10 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#4CC9F0]" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="relative z-10 rounded-2xl overflow-hidden bg-[#FFF8E7] p-8">
                  <div className="absolute top-4 left-4">
                    <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-4 -left-4">
                    <svg width="100" height="40" viewBox="0 0 100 40">
                      <path d="M0 40 Q50 0 100 40" stroke="#4CC9F0" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="aspect-square bg-[#4CC9F0]/10 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#4CC9F0]" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 10h9v2H5zm0-3h9v2H5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Enjoy Learning with a Unique Classroom Experience</h2>
                <p className="text-gray-300 leading-relaxed">
                Our cutting-edge learning platform turns education into an engaging and interactive journey. With personalized content, real-time feedback, 
                and collaborative tools, students experience a dynamic and immersive way of learning that makes education both effective and enjoyable.
                </p>
                {/* <Button className="bg-[#4CC9F0] text-background hover:bg-[#4CC9F0]/90 rounded-full">View More</Button> */}
              </div>
            </div>

            {/* Third Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Passionate Teachers That Make a Difference</h2>
                <p className="text-gray-300 leading-relaxed">
                Behind every successful student is a dedicated educator. At Ethical Learner, 
                our expert instructors leverage advanced tools and resources to create engaging, 
                impactful learning experiences—inspiring and empowering students to excel in their careers.
                </p>
                {/* <Button className="bg-[#4CC9F0] text-background hover:bg-[#4CC9F0]/90 rounded-full">View More</Button> */}
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden bg-[#FFF8E7] p-8">
                  <div className="absolute top-4 right-4">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="absolute -bottom-4 -right-4">
                    <svg width="100" height="40" viewBox="0 0 100 40">
                      <path d="M0 40 Q50 0 100 40" stroke="#4CC9F0" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="aspect-square bg-[#4CC9F0]/10 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#4CC9F0]" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c-.18-.74-.83-1.3-1.46-1.3s-1.28.56-1.46 1.3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
            </div></section>

            {/* Stats Section */}
            
            <section className="px-4 py-20 md:px-6 flex justify-center">
  <div className="container mx-auto max-w-5xl">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 shadow-lg w-48 h-28 md:w-56 md:h-32">
        <StatsCounter end={10000} label="Active Students" />
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 shadow-lg w-48 h-28 md:w-56 md:h-32">
        <StatsCounter end={500} label="Expert Teachers" />
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 shadow-lg w-48 h-28 md:w-56 md:h-32">
        <StatsCounter end={1000} label="Video Lessons" />
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 shadow-lg w-48 h-28 md:w-56 md:h-32">
        <StatsCounter end={95} label="Success Rate" />
      </div>
    </div>
  </div>
</section>


            {/* Contact CTA */}
            <section className="px-4 py-10 md:px-6">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Get Started?</h2> 
                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                    Join thousands of students already learning with us. 
                    Take the next step in your educational journey and unlock endless opportunities today!
                    </p>
                    <Link href="/pages/contactus">
                      <Button className="bg-[#4CC9F0] text-background hover:bg-[#4CC9F0]/90 rounded-full px-8 py-6 text-lg">
                          Contact Us Today
                      </Button>
                  </Link>
                </div>

                <div className="w-full rounded-lg overflow-hidden  h-[80vh] mt-12">
                  <h1 className="text-white text-xl font-semibold text-center"> <span className="text-[#4CC9F0] text-xl"> One-third of the Earth is Water;</span> the rest belongs to our learners, Shaping the world with curiosity and wisdom.</h1>
                            <Image
                                src={assets.LearnerMap2} 
                                alt="Map"
                                width={1000} 
                                height={1000} 
                                className="w-full h-full object-fit" 
                            />
                        </div>
            </section>
            
        </div>
    )
}









