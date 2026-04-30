"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  posterImage: string
  backgroundImage: string
  author: string
  date: string
  tags: string[]
  slug: string
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const { id } = use(params) 
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/blog/getById?id=${id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog post not found")
          }
          throw new Error("Failed to fetch blog post")
        }

        const data = await response.json()

        // Only update state if component is still mounted
        if (isMounted) {
          setBlog(data)
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
        if (isMounted) {
          setError(error instanceof Error ? error.message : "An unexpected error occurred")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup function to prevent state updates after unmounting
    return () => {
      isMounted = false
    }
  }, [id])

  const handleGoBack = () => {
    router.back()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || "Blog Post",
        text: blog?.description || "",
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#4CC9F0]" />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-[#4CC9F0] mb-4">Error</h1>
        <p className="text-gray-300 mb-6">{error || "Blog post not found"}</p>
        <Button onClick={handleGoBack} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: blog.backgroundImage ? `url(${blog.backgroundImage})` : "none",
            backgroundColor: !blog.backgroundImage ? "#0F1729" : "transparent",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1729]/70 to-[#0F1729]" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
          <div className="max-w-4xl">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <Badge
                  key={`${tag}-${index}`}
                  variant="outline"
                  className="border-[#4CC9F0]/50 text-[#4CC9F0] bg-[#0F1729]/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-[#4CC9F0]" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-[#4CC9F0]" />
                <span>{format(new Date(blog.date), "MMMM dd, yyyy")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>

          <Button
            variant="outline"
            onClick={handleShare}
            className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Description */}
        <div
          className="text-xl text-gray-200 mb-8 p-6 bg-[#1D2A3F] rounded-lg border border-[#4CC9F0]/20"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Main Content */}
        <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  )
}

