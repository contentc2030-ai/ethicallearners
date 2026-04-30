"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Calendar, User, Search, Clock, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { motion } from "framer-motion"

interface BlogPost {
  _id: string
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

export default function BlogPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/blog/getAll")
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }
        const data = await response.json()

        if (isMounted) {
          setBlogs(data || [])
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)))

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  const featuredBlog = filteredBlogs[0]
  const regularBlogs = filteredBlogs.slice(1)

  const handleReadMore = (id: string) => {
    router.push(`/pages/blog/${id}`)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#4CC9F0]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#4361EE]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <div className="relative py-24 px-4 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #4CC9F0 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4CC9F0]/30 bg-[#4CC9F0]/10 text-[#4CC9F0] text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Insights & Knowledge Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#4CC9F0] to-white bg-clip-text text-transparent">
            Our Blog
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the latest insights, trends, and expert perspectives on technology,
            cybersecurity, and digital innovation.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4CC9F0]" />
            <Input
              placeholder="Search articles, topics, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 bg-[#1D2A3F]/80 backdrop-blur-sm border-[#4CC9F0]/30 text-white placeholder:text-gray-400 rounded-2xl text-lg focus:border-[#4CC9F0] transition-all"
            />
          </div>
        </motion.div>
      </div>

      {/* Filter Tags Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {allTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Badge
                variant={selectedTag === tag ? "default" : "outline"}
                className={`
                  px-4 py-2 text-sm cursor-pointer transition-all duration-300
                  ${selectedTag === tag
                    ? "bg-gradient-to-r from-[#4CC9F0] to-[#4361EE] text-white border-transparent shadow-lg shadow-[#4CC9F0]/30"
                    : "border-[#4CC9F0]/50 text-[#4CC9F0] hover:bg-[#4CC9F0]/10 hover:border-[#4CC9F0]"
                  }
                `}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
          {selectedTag && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="text-gray-400 hover:text-white"
            >
              Clear filters
            </Button>
          )}
        </motion.div>

        {/* Results Count */}
        {!isLoading && (
          <p className="text-center text-gray-400 mt-6">
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-[#4CC9F0] mb-4" />
            <p className="text-gray-400">Loading amazing content...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            {/* Featured Blog */}
            {featuredBlog && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-[#4CC9F0]" />
                  <h2 className="text-2xl font-bold text-[#4CC9F0]">Featured Article</h2>
                </div>

                <Card className="bg-gradient-to-br from-[#1D2A3F] to-[#131B2E] border-[#4CC9F0]/30 overflow-hidden group hover:border-[#4CC9F0] transition-all duration-500">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="h-80 md:h-auto overflow-hidden relative">
                      {featuredBlog.posterImage ? (
                        <img
                          src={featuredBlog.posterImage}
                          alt={featuredBlog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0F1729]">
                          <span className="text-[#4CC9F0]">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A3F] to-transparent opacity-60" />
                    </div>

                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredBlog.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} className="bg-[#4CC9F0]/20 text-[#4CC9F0] border-[#4CC9F0]/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#4CC9F0] transition-colors">
                          {featuredBlog.title}
                        </h3>

                        <div
                          className="text-gray-300 line-clamp-4 mb-6"
                          dangerouslySetInnerHTML={{ __html: featuredBlog.description }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#4CC9F0]" />
                            <span>{featuredBlog.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#4CC9F0]" />
                            <span>{format(new Date(featuredBlog.date), "MMM dd, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#4CC9F0]" />
                            <span>{calculateReadTime(featuredBlog.content)} min read</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleReadMore(featuredBlog._id)}
                          className="bg-gradient-to-r from-[#4CC9F0] to-[#4361EE] hover:from-[#3DB8E0] hover:to-[#3651DD] text-white group/btn"
                        >
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Regular Blog Grid */}
            {regularBlogs.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-8 text-white">More Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularBlogs.map((blog, index) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-[#1D2A3F]/80 backdrop-blur-sm border-[#4CC9F0]/20 overflow-hidden flex flex-col h-full group hover:border-[#4CC9F0] hover:shadow-xl hover:shadow-[#4CC9F0]/20 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-56 overflow-hidden relative">
                          {blog.posterImage ? (
                            <img
                              src={blog.posterImage}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#131B2E]">
                              <span className="text-[#4CC9F0]">No Image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1D2A3F] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0] text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <CardTitle className="text-xl text-white group-hover:text-[#4CC9F0] transition-colors line-clamp-2">
                            {blog.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="flex-grow pb-3">
                          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3 text-[#4CC9F0]" />
                              <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-[#4CC9F0]" />
                              <span>{calculateReadTime(blog.content)} min</span>
                            </div>
                          </div>
                          <div
                            className="text-gray-300 text-sm line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: blog.description }}
                          />
                        </CardContent>

                        <CardFooter className="pt-0">
                          <Button
                            onClick={() => handleReadMore(blog._id)}
                            variant="ghost"
                            className="w-full text-[#4CC9F0] hover:bg-[#4CC9F0]/10 group/btn"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center">
                <Search className="h-12 w-12 text-[#4CC9F0]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Articles Found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedTag
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "No blog posts available yet. Check back soon for amazing content!"}
              </p>
              {(searchTerm || selectedTag) && (
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedTag(null)
                  }}
                  className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
