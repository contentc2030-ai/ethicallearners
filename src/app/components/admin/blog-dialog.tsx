"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/rich-text-editor"

interface BlogDialogProps {
  isOpen: boolean
  onClose: (refresh?: boolean) => void
  blog: {
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
  } | null
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  posterImage: z.string().optional(),
  backgroundImage: z.string().optional(),
  author: z.string().min(1, "Author name is required"),
  date: z.string(),
  tags: z.array(z.string()),
  slug: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function BlogDialog({ isOpen, onClose, blog }: BlogDialogProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [posterImageUploading, setPosterImageUploading] = useState(false)
  const [backgroundImageUploading, setBackgroundImageUploading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      posterImage: "",
      backgroundImage: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      tags: [],
      slug: "",
    },
  })

  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        posterImage: blog.posterImage,
        backgroundImage: blog.backgroundImage,
        author: blog.author,
        date: new Date(blog.date).toISOString().split("T")[0],
        tags: blog.tags,
        slug: blog.slug,
      })
    } else {
      form.reset({
        title: "",
        description: "",
        content: "",
        posterImage: "",
        backgroundImage: "",
        author: "",
        date: new Date().toISOString().split("T")[0],
        tags: [],
        slug: "",
      })
    }
  }, [blog, form])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      const url = blog ? `/api/blog/update` : "/api/blog/add"
      const method = blog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog?{...data,id:blog._id}:data),
      })

      if (!response.ok) {
        throw new Error("Failed to save blog post")
      }

      toast({
        title: "Success",
        description: blog ? "Blog post updated successfully" : "Blog post created successfully",
      })

      onClose(true)
    } catch (error) {
      console.error("Error saving blog:", error)
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !form.getValues("tags").includes(newTag.trim())) {
      form.setValue("tags", [...form.getValues("tags"), newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((tag) => tag !== tagToRemove),
    )
  }

  const handleImageUpload = async (file: File, field: "posterImage" | "backgroundImage") => {
    if (field === "posterImage") {
      setPosterImageUploading(true)
    } else {
      setBackgroundImageUploading(true)
    }

    try {
      // In a real application, you would upload to Cloudinary
      // This is a placeholder for the Cloudinary upload logic
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "zpn6u7rm")

    //   Simulating Cloudinary upload
      const response = await fetch("https://api.cloudinary.com/v1_1/somug/image/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      // For demo purposes, we'll use a local URL
      const imageUrl = data.secure_url

      form.setValue(field, imageUrl)

      toast({
        title: "Image Uploaded",
        description: `${field === "posterImage" ? "Poster" : "Background"} image uploaded successfully`,
      })
    } catch (error) {
      console.error(`Error uploading ${field}:`, error)
      toast({
        title: "Upload Failed",
        description: `Failed to upload ${field === "posterImage" ? "poster" : "background"} image`,
        variant: "destructive",
      })
    } finally {
      if (field === "posterImage") {
        setPosterImageUploading(false)
      } else {
        setBackgroundImageUploading(false)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter blog title"
                          className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Author *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter author name"
                          className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Date *</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-[#131B2E] border-[#4CC9F0]/30 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Tags</FormLabel>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {field.value.map((tag, index) => (
                            <Badge
                              key={index}
                              className="bg-[#131B2E] text-[#4CC9F0] hover:bg-[#1D2A3F] flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-[#4CC9F0] hover:text-[#4CC9F0]/80"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddTag()
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={handleAddTag}
                            className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="posterImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Poster Image</FormLabel>
                      <div className="space-y-2">
                        {field.value && (
                          <div className="w-full h-32 rounded-md overflow-hidden bg-[#131B2E]">
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Poster"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, "posterImage")
                              }}
                              className="bg-[#131B2E] border-[#4CC9F0]/30 text-white cursor-pointer"
                            />
                          </FormControl>
                          {posterImageUploading && <Loader2 className="h-4 w-4 animate-spin text-[#4CC9F0]" />}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backgroundImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Background Image</FormLabel>
                      <div className="space-y-2">
                        {field.value && (
                          <div className="w-full h-32 rounded-md overflow-hidden bg-[#131B2E]">
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Background"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, "backgroundImage")
                              }}
                              className="bg-[#131B2E] border-[#4CC9F0]/30 text-white cursor-pointer"
                            />
                          </FormControl>
                          {backgroundImageUploading && <Loader2 className="h-4 w-4 animate-spin text-[#4CC9F0]" />}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Description *</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter a brief description of your blog post"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Content *</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write your blog post content here"
                      minHeight="300px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose()}
                className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {blog ? "Update" : "Create"} Blog Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

