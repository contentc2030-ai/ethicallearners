'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Star, ChevronUp, ChevronDown, MoreVertical } from 'lucide-react'
import Image from 'next/image'

interface Review {
  name: string;
  date: string;
  rating: number;
  description: string;
  image?: string;
}

export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const reviewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/course/getCourse"); 
        const data = await response.json();

        console.log("Fetched Review Data:", data); //  Debugging log

        //  Ensure we access `reviews` correctly
        const firstCourse = data.courses && data.courses.length > 0 ? data.courses[0] : null;
        if (firstCourse && firstCourse.reviews) {
          setReviews(firstCourse.reviews);
        } else {
          console.warn("No review data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  // Scroll up
  const scrollUp = () => {
    if (reviewContainerRef.current) {
      reviewContainerRef.current.scrollBy({ top: -150, behavior: "smooth" });
    }
  }

  // Scroll down
  const scrollDown = () => {
    if (reviewContainerRef.current) {
      reviewContainerRef.current.scrollBy({ top: 150, behavior: "smooth" });
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Course Reviews</h2>

          <div className="relative w-full h-[350px]">
            {/* Scroll Up Button */}
            <button
              onClick={scrollUp}
              className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-10"
            >
              <ChevronUp className="w-6 h-6" />
            </button>

            <div className="relative flex">
              {/* Vertical Dots Indicator */}
              <div className="absolute left-0 top-0 h-full flex flex-col items-center justify-center pt-2">
                <MoreVertical className="text-gray-400 h-8 w-8 " />
              </div>

              {/* Scrollable Review List */}
              <div
                ref={reviewContainerRef}
                className="h-[300px] overflow-y-auto space-y-4 scrollbar-hide ml-6"
              >
                {reviews.length === 0 ? (
                  <p className="text-gray-400 text-center">No reviews available.</p>
                ) : (
                  reviews.map((review, index) => (
                    <Card key={index} className="bg-[#131B2E] border-[#4CC9F0]/20 p-4">
                      <div className="flex gap-4">
                        <Image
                          src={review.image || "/placeholder.svg?height=50&width=50&text=U"}
                          alt={review.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-white">{review.name}</h3>
                              <p className="text-sm text-gray-400">{new Date(review.date).toDateString()}</p>
                            </div>
                            <div className="flex gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-[#4CC9F0] text-[#4CC9F0]" />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-300">{review.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Scroll Down Button */}
            <button
              onClick={scrollDown}
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600 z-10"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Add Review Section */}
        <Card className="bg-[#131B2E] border-[#4CC9F0]/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Add a Review</h3>
          <form className="space-y-4">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      i < rating ? 'fill-[#4CC9F0] text-[#4CC9F0]' : 'text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
            <Input 
              placeholder="Your Name" 
              className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
            />
            <Input 
              placeholder="Your Email" 
              type="email"
              className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
            />
            <Textarea 
              placeholder="Your Review" 
              className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
              rows={4}
            />
            <Button className="w-full bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90">
              Submit Review
            </Button>
          </form>
        </Card>
      </div>

      {/* Hide scrollbar styling */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
