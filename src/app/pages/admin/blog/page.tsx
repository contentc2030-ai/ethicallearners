"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Search, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/dashboard-component/ui/table"
import { Badge } from "@/components/dashboard-component/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import BlogDialog from "@/components/admin/blog-dialog"

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

export default function BlogAdminPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

        // Only update state if component is still mounted
        if (isMounted) {
          setBlogs(data || [])
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
        if (isMounted) {
          toast({
            title: "Error",
            description: "Failed to load blog posts",
            variant: "destructive",
          })
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
  }, [toast])

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blog/getAll")
      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }
      const data = await response.json()
      setBlogs(data || [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBlog = () => {
    setCurrentBlog(null)
    setIsDialogOpen(true)
   
  }

  const handleEditBlog = (blog: BlogPost) => {
    setIsDialogOpen(true)
      setCurrentBlog(blog)
  }

  const updateBlog = async (blogData: BlogPost) => {
    try {
      const response = await fetch('/api/blog/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update blog');
      setIsDialogOpen(true)
      setCurrentBlog(blogData)
      fetchBlogs()
      return result;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  };

  const addBlog = async (blogData: Omit<BlogPost, 'id'> | null) => {
    try {
      const response = await fetch('/api/blog/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to add blog');
     
      fetchBlogs()
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/blog/delete?id=${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete blog post")
        }

        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        })

        // Refresh the blog list
        fetchBlogs()
      } catch (error) {
        console.error("Error deleting blog:", error)
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleViewBlog = (id: string) => {
    router.push(`/pages/blog/${id}`)
  }

  const handleDialogClose = (refresh = false) => {
    setIsDialogOpen(false)
    if (refresh) {
      fetchBlogs()
    }
  }

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">
            <span className="text-[#4CC9F0]">Blog</span> Management
          </h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1D2A3F] border-[#4CC9F0]/30 text-white w-full md:w-64"
              />
            </div>
            <Button onClick={handleAddBlog} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
              <Plus className="mr-2 h-4 w-4" /> Add Blog
            </Button>
          </div>
        </div>

        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription className="text-gray-400">Manage your blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#4CC9F0]" />
              </div>
            ) : (
              <div className="rounded-md border border-[#4CC9F0]/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-[#131B2E]">
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Author</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Tags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBlogs.length > 0 ? (
                      filteredBlogs.map((blog) => (
                        <TableRow key={blog._id}>
                          <TableCell>
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-[#0F1729]">
                              {blog.posterImage ? (
                                <img
                                  src={blog.posterImage || "/placeholder.svg"}
                                  alt={blog.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#131B2E]">
                                  <span className="text-[#4CC9F0] text-xs">No Image</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-white">{blog.title}</TableCell>
                          <TableCell className="hidden md:table-cell text-gray-300">{blog.author}</TableCell>
                          <TableCell className="hidden md:table-cell text-gray-300">
                            {format(new Date(blog.date), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {blog.tags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0]">
                                  {tag}
                                </Badge>
                              ))}
                              {blog.tags.length > 2 && (
                                <Badge variant="outline" className="border-gray-500 text-gray-300">
                                  +{blog.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleViewBlog(blog._id)}
                                className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditBlog(blog)}
                                className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDeleteBlog(blog._id)}
                                disabled={isDeleting}
                                className="h-8 w-8 border-red-500/30 text-red-500 hover:bg-red-500/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                          {searchTerm
                            ? "No blog posts found matching your search."
                            : "No blog posts found. Add your first blog post!"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BlogDialog isOpen={isDialogOpen} onClose={handleDialogClose} blog={currentBlog} />
    </div>
  )
}

