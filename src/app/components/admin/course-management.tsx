"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Pencil,
  Trash2,
  Plus,
  Save,
  Star,
  DollarSign,
  Package,
  Search,
  Upload,
  Check,
  AlertCircle,
  Users,
  BookOpen,
  Layers,
  MessageSquare,
  HelpCircle,
  X,
  BarChart2,
  Briefcase,
  FileText,
  Award,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Switch } from "@/components/dashboard-component/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/dashboard-component/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/dashboard-component/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Badge } from "@/components/dashboard-component/ui/badge"
import { Label } from "@/components/dashboard-component/ui/label"
import { Alert, AlertDescription } from "@/components/dashboard-component/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-component/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/dashboard-component/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-component/ui/select"

// Type for course data
interface Highlight {
  heading: string
  description: string
}

interface AboutPoint {
  heading: string
  description: string
}

interface AboutSection {
  heading: string
  description: string
  points: AboutPoint[],
  image?: string 
}

interface Module {
  name: string
  points: string[]
}

interface Review {
  name: string
  date: string
  image: string
  rating: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface Course {
  id: string
  image: string
  name: string
  description: string
  price: string
  instock: boolean
  rating: string
  duration: string
  tags: string[]
  level: string
  lessons: number
  students: number
  certifications: string
  highlights: Highlight[]
  about: AboutSection
  tools: string[]
  modules: Module[]
  reviews: Review[]
  isPopular: boolean
  mentors: string[]
  frequentQuestions: FAQ[]
}

// Sample initial data
const initialCourses: Course[] = [
  {
    id: "1",
    image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    name: "Advanced Cybersecurity",
    description: "Master the art of securing networks and systems against cyber threats.",
    price: "499",
    instock: true,
    rating: "4.8",
    duration: "6 months",
    tags: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    level: "Advanced",
    lessons: 40,
    students: 1200,
    certifications: "Certified Cybersecurity Professional",
    highlights: [
      {
        heading: "1200+",
        description: "Students Enrolled",
      },
      {
        heading: "40+",
        description: "Hands-on Labs",
      },
    ],
    about: {
      heading: "Why Choose This Course?",
      description: "This course provides in-depth knowledge of cybersecurity principles and practices.",
      points: [
        {
          heading: "Hands-on Labs",
          description: "Work on real-world security scenarios and penetration testing.",
        },
        {
          heading: "Expert Instructors",
          description: "Learn from industry security professionals with years of experience.",
        },
      ],
      image: "",
    },
    tools: [
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    ],
    modules: [
      {
        name: "Introduction to Cybersecurity",
        points: ["Security Fundamentals", "Threat Landscape"],
      },
      {
        name: "Network Security",
        points: ["Firewall Configuration", "Intrusion Detection"],
      },
    ],
    reviews: [
      {
        name: "Jane Smith",
        date: "2025-02-15",
        image: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        rating: "5",
        description: "Excellent course with practical examples!",
      },
    ],
    isPopular: true,
    mentors: ["uuid-1234", "uuid-5678"],
    frequentQuestions: [
      {
        question: "Is prior knowledge required?",
        answer: "Basic networking knowledge is recommended.",
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, a certificate is provided upon completion.",
      },
    ],
  },
]

// Empty course template
const emptyCourse: Omit<Course, "id"> = {
  image: "",
  name: "",
  description: "",
  price: "",
  instock: true,
  rating: "",
  duration: "",
  tags: [],
  level: "Beginner",
  lessons: 0,
  students: 0,
  certifications: "",
  highlights: [
    {
      heading: "",
      description: "",
    },
  ],
  about: {
    heading: "",
    description: "",
    points: [
      {
        heading: "",
        description: "",
      },
    ],
    image: "", // Add this new field
  },
  tools: [],
  modules: [
    {
      name: "",
      points: [""],
    },
  ],
  reviews: [],
  isPopular: false,
  mentors: [],
  frequentQuestions: [
    {
      question: "",
      answer: "",
    },
  ],
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [newTag, setNewTag] = useState("")
  const [newModulePoint, setNewModulePoint] = useState("")

  // Form state
  const [formData, setFormData] = useState<Omit<Course, "id">>({ ...emptyCourse })

  const getCourses=()=>{
    fetch("/api/course/getCourse", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    setCourses(data?.courses)
  })
  .catch((error) => console.error("Error:", error));
  }


  const addCourses=()=>{
    fetch("/api/course/addCourse", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
  .then((response) => response.json())
  .then((data) => {
    if(data?.courses)
    {
      setCourses(data?.courses)
      showNotification("success", "Course added successfully")
    }

    resetForm();
    getCourses();
  })
  .catch((error) => console.error("Error:", error));
  }
  const deleteCourse=()=>{
    fetch("/api/course/deleteCourse", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({id:currentCourse?.id}),
})
  .then((response) => response.json())
  .then((data) => {
    setIsDeleteDialogOpen(false)
    setCurrentCourse(null)
    showNotification("success", "Course deleted successfully")
    getCourses()
  })
  .catch((error) => console.error("Error:", error));
  }
  const updateCourse=()=>{
    fetch("/api/course/updateCourse", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...formData,id:currentCourse?.id}),
})
  .then((response) => response.json())
  .then((data) => {
    getCourses()
    setIsEditDialogOpen(false)
    setCurrentCourse(null)
    resetForm()
    showNotification("success", "Course updated successfully")
  })
  .catch((error) => console.error("Error:", error));
  }



  useEffect(()=>{
    getCourses();
  },[])

  // Filter courses based on search term
  const filteredCourses = courses?.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Handle form input changes for basic fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle nested object changes
  const handleNestedChange = (objectName: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [objectName]: {
        ...(typeof prev[objectName] === "object" && prev[objectName] !== null ? prev[objectName] : {}),
        [field]: value,
      },
    }));
  };

  // Handle switch toggle
  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }))
  }

  // Handle select change
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle number input change
  const handleNumberChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: Number.parseInt(value) || 0 }))
  }

  // Reset form data
  const resetForm = () => {
    setFormData({ ...emptyCourse })
    setActiveTab("basic")
  }

  // Add a tag
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  // Add a highlight
  const handleAddHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { heading: "", description: "" }],
    }))
  }

  // Update highlight
  const handleHighlightChange = (index: number, field: keyof Highlight, value: string) => {
    setFormData((prev) => {
      const updatedHighlights = [...prev.highlights]
      updatedHighlights[index] = { ...updatedHighlights[index], [field]: value }
      return { ...prev, highlights: updatedHighlights }
    })
  }

  // Remove a highlight
  const handleRemoveHighlight = (highlightIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== highlightIndex),
    }))
  }

  // Add a tool (image)
  const handleAddTool = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create form data for upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "zpn6u7rm") // Replace with your upload preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/somug/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          tools: [...prev.tools, data.secure_url],
        }))
        showNotification("success", "Tool image uploaded successfully")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      showNotification("error", "Failed to upload tool image")
    } finally {
      setIsUploading(false)
    }
  }

  // Remove a tool
  const handleRemoveTool = (toolUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((tool) => tool !== toolUrl),
    }))
  }

  // Handle direct file upload to Cloudinary for course image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create form data for upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "zpn6u7rm") // Replace with your upload preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/somug/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image: data.secure_url }))
        showNotification("success", "Image uploaded successfully")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      showNotification("error", "Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create form data for upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "zpn6u7rm") // Replace with your upload preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/somug/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          about: {
            ...prev.about,
            image: data.secure_url,
          },
        }))
        showNotification("success", "About image uploaded successfully")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      showNotification("error", "Failed to upload about image")
    } finally {
      setIsUploading(false)
    }
  }

  // Add a module
  const handleAddModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, { name: "", points: [""] }],
    }))
  }

  // Update module name
  const handleModuleNameChange = (index: number, name: string) => {
    setFormData((prev) => {
      const updatedModules = [...prev.modules]
      updatedModules[index] = { ...updatedModules[index], name }
      return { ...prev, modules: updatedModules }
    })
  }

  // Add a point to a module
  const handleAddModulePoint = (moduleIndex: number) => {
    if (newModulePoint.trim()) {
      setFormData((prev) => {
        const updatedModules = [...prev.modules]
        updatedModules[moduleIndex] = {
          ...updatedModules[moduleIndex],
          points: [...updatedModules[moduleIndex].points, newModulePoint.trim()],
        }
        return { ...prev, modules: updatedModules }
      })
      setNewModulePoint("")
    }
  }

  // Remove a point from a module
  const handleRemoveModulePoint = (moduleIndex: number, pointIndex: number) => {
    setFormData((prev) => {
      const updatedModules = [...prev.modules]
      updatedModules[moduleIndex] = {
        ...updatedModules[moduleIndex],
        points: updatedModules[moduleIndex].points.filter((_, i) => i !== pointIndex),
      }
      return { ...prev, modules: updatedModules }
    })
  }

  // Remove a module
  const handleRemoveModule = (moduleIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== moduleIndex),
    }))
  }

  // Add a FAQ
  const handleAddFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      frequentQuestions: [...prev.frequentQuestions, { question: "", answer: "" }],
    }))
  }

  // Update FAQ
  const handleFAQChange = (index: number, field: "question" | "answer", value: string) => {
    setFormData((prev) => {
      const updatedFAQs = [...prev.frequentQuestions]
      updatedFAQs[index] = { ...updatedFAQs[index], [field]: value }
      return { ...prev, frequentQuestions: updatedFAQs }
    })
  }

  // Remove a FAQ
  const handleRemoveFAQ = (faqIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      frequentQuestions: prev.frequentQuestions.filter((_, i) => i !== faqIndex),
    }))
  }

  // Add a review
  const handleAddReview = () => {
    setFormData((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        {
          name: "",
          date: new Date().toISOString().split("T")[0],
          image: "",
          rating: "5",
          description: "",
        },
      ],
    }))
  }

  // Update review
  const handleReviewChange = (index: number, field: keyof Review, value: string) => {
    setFormData((prev) => {
      const updatedReviews = [...prev.reviews]
      updatedReviews[index] = { ...updatedReviews[index], [field]: value }
      return { ...prev, reviews: updatedReviews }
    })
  }

  // Remove a review
  const handleRemoveReview = (reviewIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== reviewIndex),
    }))
  }

  // Update about point
  const handleAboutPointChange = (index: number, field: keyof AboutPoint, value: string) => {
    setFormData((prev) => {
      const updatedPoints = [...prev.about.points]
      updatedPoints[index] = { ...updatedPoints[index], [field]: value }
      return {
        ...prev,
        about: {
          ...prev.about,
          points: updatedPoints,
        },
      }
    })
  }

  // Add an about point
  const handleAddAboutPoint = () => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        points: [...prev.about.points, { heading: "", description: "" }],
      },
    }))
  }

  // Remove an about point
  const handleRemoveAboutPoint = (pointIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        points: prev.about.points.filter((_, i) => i !== pointIndex),
      },
    }))
  }

  // Add a mentor
  const handleAddMentor = (mentorId: string) => {
    if (mentorId.trim() && !formData.mentors.includes(mentorId.trim())) {
      setFormData((prev) => ({
        ...prev,
        mentors: [...prev.mentors, mentorId.trim()],
      }))
    }
  }

  // Remove a mentor
  const handleRemoveMentor = (mentorId: string) => {
    setFormData((prev) => ({
      ...prev,
      mentors: prev.mentors.filter((id) => id !== mentorId),
    }))
  }

  // Add new course
  const handleAddCourse = () => {
    // Basic validation 
    if (!formData.name || !formData.price || !formData.duration) {
      showNotification("error", "Please fill in all required fields")
      return
    }

    setIsAddDialogOpen(false)
    addCourses()
  }

  // Edit course
  const handleEditCourse = () => {
    if (!currentCourse) return

    // Basic validation
    const errors = validateFormData()
    if (errors.length > 0) {
      showNotification("error", `Please fill in all required fields: ${errors.join(", ")}`)
      return
    }

    const courseData: Course={...formData,id:currentCourse.id}

    setCurrentCourse(courseData)

    setIsEditDialogOpen(false)
    updateCourse()
  }

    // Validate all form fields
    const validateFormData = (): string[] => {
      const errors: string[] = []
  
      // Basic info validation
      if (!formData.name) errors.push("Course Name")
      if (!formData.description) errors.push("Description")
      if (!formData.price) errors.push("Price")
      if (!formData.duration) errors.push("Duration")
      if (formData.tags.length === 0) errors.push("Tags")
  
      // Details validation
      if (!formData.level) errors.push("Level")
      if (!formData.certifications) errors.push("Certifications")
  
      // Highlights validation
      for (let i = 0; i < formData.highlights.length; i++) {
        if (!formData.highlights[i].heading || !formData.highlights[i].description) {
          errors.push(`Highlight ${i + 1}`)
          break
        }
      }
  
      // About section validation
      if (!formData.about.heading) errors.push("About Heading")
      if (!formData.about.description) errors.push("About Description")
  
      for (let i = 0; i < formData.about.points.length; i++) {
        if (!formData.about.points[i].heading || !formData.about.points[i].description) {
          errors.push(`About Point ${i + 1}`)
          break
        }
      }
  
      // Modules validation
      for (let i = 0; i < formData.modules.length; i++) {
        if (!formData.modules[i].name) {
          errors.push(`Module ${i + 1} Name`)
          break
        }
  
        for (let j = 0; j < formData.modules[i].points.length; j++) {
          if (!formData.modules[i].points[j]) {
            errors.push(`Module ${i + 1} Point ${j + 1}`)
            break
          }
        }
      }
  
      // FAQs validation
      for (let i = 0; i < formData.frequentQuestions.length; i++) {
        if (!formData.frequentQuestions[i].question || !formData.frequentQuestions[i].answer) {
          errors.push(`FAQ ${i + 1}`)
          break
        }
      }
      console.log(errors)
      return errors
    }

  // Delete course
  const handleDeleteCourse = () => {
    if (!currentCourse) return

    deleteCourse()


  }

  // Open edit dialog and set current course
  const openEditDialog = (course: Course) => {
    setCurrentCourse(course)
    setFormData({
      image: course.image,
      name: course.name,
      description: course.description,
      price: course.price,
      instock: course.instock,
      rating: course.rating,
      duration: course.duration,
      tags: [...course.tags],
      level: course.level,
      lessons: course.lessons,
      students: course.students,
      certifications: course.certifications,
      highlights: course.highlights.map((highlight) => ({ ...highlight })),
      about: {
        heading: course.about.heading,
        description: course.about.description,
        points: course.about.points.map((point) => ({ ...point })),
        image:course.about.image
      },
      tools: [...course.tools],
      modules: course.modules.map((module) => ({
        name: module.name,
        points: [...module.points],
      })),
      reviews: course.reviews.map((review) => ({ ...review })),
      isPopular: course.isPopular,
      mentors: [...course.mentors],
      frequentQuestions: course.frequentQuestions.map((faq) => ({ ...faq })),
    })
    setIsEditDialogOpen(true)
  }

  // Open delete dialog and set current course
  const openDeleteDialog = (course: Course) => {
    setCurrentCourse(course)
    setIsDeleteDialogOpen(true)
  }

  // Show notification
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)                           
  }

  // Handle review image upload
  const handleReviewImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, reviewIndex: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Create form data for upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "zpn6u7rm") // Replace with your upload preset

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/somug/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()

      if (data.secure_url) {
        handleReviewChange(reviewIndex, "image", data.secure_url)
        showNotification("success", "Review image uploaded successfully")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      showNotification("error", "Failed to upload review image")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729] text-white p-6">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">
            <span className="text-[#4CC9F0]">Cyber</span>Security Course Management
          </h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1D2A3F] border-[#4CC9F0]/30 text-white w-full md:w-64"
              />
            </div>
            <Button
              onClick={() => {
                resetForm()
                setIsAddDialogOpen(true)
              }}
              className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <Alert
            className={`mb-4 ${
              notification.type === "success"
                ? "bg-green-500/20 border-green-500/50"
                : "bg-red-500/20 border-red-500/50"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertDescription className="test-white">{notification.message}</AlertDescription>
          </Alert>
        )}

        {/* Course Table */}
        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription className="text-gray-400">Manage your cybersecurity courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[#4CC9F0]/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-[#131B2E]">
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Level</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-[#0F1729]">
                            {course.image ? (
                              <img
                                src={course.image || "/placeholder.svg"}
                                alt={course.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#131B2E]">
                                <Package className="h-6 w-6 text-[#4CC9F0]" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2 text-white">
                            {course.name}
                            {course.isPopular && (
                              <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Popular</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate text-white">{course.description}</TableCell>
                        <TableCell className="text-white">${course.price}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0]">
                            {course.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={course.instock ? "default" : "outline"}
                            className={
                              course.instock
                                ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                                : "border-red-500/50 text-red-500"
                            }
                          >
                            {course.instock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {course.tags?.slice(0, 2).map((tag, i) => (
                              <Badge key={i} variant="outline" className="border-gray-500 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                            {course?.tags?.length > 2 && (
                              <Badge variant="outline" className="border-gray-500 text-gray-300">
                                +{course?.tags?.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog(course)}
                              className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openDeleteDialog(course)}
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
                      <TableCell colSpan={8} className="text-center py-8 text-gray-400">
                        No courses found. Try a different search or add a new course.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Form Dialog (Add/Edit) */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (isAddDialogOpen) setIsAddDialogOpen(open)
          if (isEditDialogOpen) setIsEditDialogOpen(open)
        }}
      >
                <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[900px] md:max-w-[1000px] lg:max-w-[1200px] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isAddDialogOpen ? "Add New Course" : "Edit Course"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to {isAddDialogOpen ? "add a new" : "update the"}  course.
              
            </DialogDescription>
          </DialogHeader>
          {notification && (
          <Alert
            className={`mb-4 ${
              notification.type === "success"
                ? "bg-green-500/20 border-green-500/50"
                : "bg-red-500/20 border-red-500/50"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertDescription className="text-white">{notification.message}</AlertDescription>
          </Alert>
        )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-[#131B2E] mb-4">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-[#4CC9F0]/20 data-[state=active]:text-[#4CC9F0]"
              >
                <FileText className="w-4 h-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-[#4CC9F0]/20 data-[state=active]:text-[#4CC9F0]"
              >
                <Layers className="w-4 h-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-[#4CC9F0]/20 data-[state=active]:text-[#4CC9F0]"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-[#4CC9F0]/20 data-[state=active]:text-[#4CC9F0]"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Reviews & FAQs
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Course Image</Label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-[#131B2E] flex items-center justify-center">
                    {formData.image ? (
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Course preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-[#4CC9F0]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="relative">
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                        disabled={isUploading}
                      />
                    </div>
                    {isUploading && (
                      <div className="text-sm text-[#4CC9F0] flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#4CC9F0]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Course Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter course name"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                  required
                />
              </div>

              {/* Course Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white min-h-[100px]"
                />
              </div>

              {/* Price, Rating, Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="299"
                      className="pl-10 bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <div className="relative">
                    <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="rating"
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="4.5"
                      className="pl-10 bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="6 months"
                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} className="bg-[#131B2E] text-white hover:bg-[#1D2A3F] flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  ))}
 <Button
                    type="button"
                    onClick={()=>{setNewTag('Summer Traning')}}
                    className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                  >
                    Mark As Summer Trainng
                  </Button>
                  <Button
                    type="button"
                    onClick={()=>{setNewTag('Master Class')}}
                    className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                  >
                   Mark As Master Class
                  </Button>
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

              {/* In Stock Switch & Popular */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-[#131B2E] rounded-md">
                  <Label htmlFor="instock" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#4CC9F0]" />
                    Available in Stock
                  </Label>
                  <Switch
                    id="instock"
                    checked={formData.instock}
                    onCheckedChange={(checked) => handleSwitchChange("instock", checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#131B2E] rounded-md">
                  <Label htmlFor="isPopular" className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-[#4CC9F0]" />
                    Mark as Popular
                  </Label>
                  <Switch
                    id="isPopular"
                    checked={formData.isPopular}
                    onCheckedChange={(checked) => handleSwitchChange("isPopular", checked)}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4">
              {/* Level, Lessons, Students */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)}>
                    <SelectTrigger className="bg-[#131B2E] border-[#4CC9F0]/30 text-white">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1D2A3F] border-[#4CC9F0]/30 text-white">
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lessons">Number of Lessons</Label>
                  <Input
                    id="lessons"
                    type="number"
                    min="0"
                    value={formData.lessons}
                    onChange={(e) => handleNumberChange("lessons", e.target.value)}
                    placeholder="40"
                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="students">Number of Students</Label>
                  <Input
                    id="students"
                    type="number"
                    min="0"
                    value={formData.students}
                    onChange={(e) => handleNumberChange("students", e.target.value)}
                    placeholder="1500"
                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                  />
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="Certified Cybersecurity Professional"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Highlights</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddHighlight}
                    className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Highlight
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="p-4 bg-[#131B2E] rounded-md space-y-2 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveHighlight(index)}
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`highlight-heading-${index}`}>
                            <Award className="h-4 w-4 inline-block mr-1" /> Heading
                          </Label>
                          <Input
                            id={`highlight-heading-${index}`}
                            value={highlight.heading}
                            onChange={(e) => handleHighlightChange(index, "heading", e.target.value)}
                            placeholder="1500+"
                            className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`highlight-description-${index}`}>Description</Label>
                          <Input
                            id={`highlight-description-${index}`}
                            value={highlight.description}
                            onChange={(e) => handleHighlightChange(index, "description", e.target.value)}
                            placeholder="Students Enrolled"
                            className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-4">
                <Label>About Section</Label>
                <div className="space-y-2">
                  <Label htmlFor="about-heading">Heading</Label>
                  <Input
                    id="about-heading"
                    value={formData.about.heading}
                    onChange={(e) => handleNestedChange("about", "heading", e.target.value)}
                    placeholder="Why Choose This Course?"
                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-description">Description</Label>
                  <Textarea
                    id="about-description"
                    value={formData.about.description}
                    onChange={(e) => handleNestedChange("about", "description", e.target.value)}
                    placeholder="This course provides in-depth knowledge..."
                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white min-h-[80px]"
                  />
                </div>
                                {/* About Image */}
                                <div className="space-y-2 mt-4">
                  <Label htmlFor="about-image">About Image</Label>
                  <div className="space-y-2">
                    {formData.about.image && (
                      <div className="w-full h-40 rounded-md overflow-hidden bg-[#131B2E]">
                        <img
                          src={formData.about.image || "/placeholder.svg"}
                          alt="About section"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Input
                          id="about-image"
                          type="file"
                          accept="image/*"
                          onChange={handleAboutImageUpload}
                          className="bg-[#131B2E] border-[#4CC9F0]/30 text-white cursor-pointer"
                        />
                      {isUploading && <Loader2 className="h-4 w-4 animate-spin text-[#4CC9F0]" />}
                    </div>
                  </div>
                </div>

                {/* About Points */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Key Points</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddAboutPoint}
                      className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Point
                    </Button>
                  </div>

                  {formData.about.points.map((point, index) => (
                    <div key={index} className="p-4 bg-[#131B2E] rounded-md space-y-2 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAboutPoint(index)}
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="space-y-2 pt-2">
                        <Label htmlFor={`point-heading-${index}`}>Heading</Label>
                        <Input
                          id={`point-heading-${index}`}
                          value={point.heading}
                          onChange={(e) => handleAboutPointChange(index, "heading", e.target.value)}
                          placeholder="Hands-on Projects"
                          className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`point-description-${index}`}>Description</Label>
                        <Input
                          id={`point-description-${index}`}
                          value={point.description}
                          onChange={(e) => handleAboutPointChange(index, "description", e.target.value)}
                          placeholder="Work on real-world projects..."
                          className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools (Images) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Tools & Technologies (Images)</Label>
                  <div className="relative">
                    <Input
                      id="tool-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAddTool}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <Label
                      htmlFor="tool-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10 h-8 px-3"
                    >
                      <Upload className="h-4 w-4 mr-1" /> Upload Tool
                    </Label>
                  </div>
                </div>

                {isUploading && (
                  <div className="text-sm text-[#4CC9F0] flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#4CC9F0]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.tools.map((tool, index) => (
                    <div key={index} className="relative group">
                      <div className="w-full h-24 rounded-md overflow-hidden bg-[#131B2E]">
                        <img
                          src={tool || "/placeholder.svg"}
                          alt={`Tool ${index + 1}`}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveTool(tool)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentors */}
              <div className="space-y-2">
                <Label>Mentors (IDs)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.mentors.map((mentor, index) => (
                    <Badge key={index} className="bg-[#131B2E] text-white hover:bg-[#1D2A3F] flex items-center gap-1">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {mentor}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveMentor(mentor)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="mentor-id"
                    placeholder="Add mentor ID"
                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddMentor(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = document.getElementById("mentor-id") as HTMLInputElement
                      if (input) {
                        handleAddMentor(input.value)
                        input.value = ""
                      }
                    }}
                    className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              {/* Modules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Course Modules</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddModule}
                    className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Module
                  </Button>
                </div>

                <Accordion type="multiple" className="w-full"  defaultValue={formData.modules.map((_, index) => `module-${index}`)}>
                  {formData.modules.map((module, moduleIndex) => (
                    <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`} className="border-[#4CC9F0]/20">
                      <div className="flex items-center">
                        <AccordionTrigger className="flex-1 hover:no-underline">
                          {module.name || `Module ${moduleIndex + 1}`}
                        </AccordionTrigger>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveModule(moduleIndex)
                          }}
                          className="h-8 w-8 mr-2 text-gray-400 hover:text-red-500 hover:bg-transparent"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <AccordionContent className="pt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`module-name-${moduleIndex}`}>Module Name</Label>
                            <Input
                              id={`module-name-${moduleIndex}`}
                              value={module.name}
                              onChange={(e) => handleModuleNameChange(moduleIndex, e.target.value)}
                              placeholder="Module Name"
                              className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Module Points</Label>
                            <div className="space-y-2">
                              {module.points.map((point, pointIndex) => (
                                <div key={pointIndex} className="flex items-center gap-2">
                                  <Input
                                    value={point}
                                    onChange={(e) => {
                                      const updatedModules = [...formData.modules]
                                      updatedModules[moduleIndex].points[pointIndex] = e.target.value
                                      setFormData((prev) => ({ ...prev, modules: updatedModules }))
                                    }}
                                    placeholder="Module point"
                                    className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveModulePoint(moduleIndex, pointIndex)}
                                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-transparent"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Input
                                value={newModulePoint}
                                onChange={(e) => setNewModulePoint(e.target.value)}
                                placeholder="Add new point"
                                className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleAddModulePoint(moduleIndex)
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                onClick={() => handleAddModulePoint(moduleIndex)}
                                className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* Reviews & FAQs Tab */}
            <TabsContent value="reviews" className="space-y-4">
              {/* Reviews */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Student Reviews</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddReview}
                    className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Review
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.reviews.map((review, reviewIndex) => (
                    <div key={reviewIndex} className="p-4 bg-[#131B2E] rounded-md space-y-4 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveReview(reviewIndex)}
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`review-name-${reviewIndex}`}>Reviewer Name</Label>
                          <Input
                            id={`review-name-${reviewIndex}`}
                            value={review.name}
                            onChange={(e) => handleReviewChange(reviewIndex, "name", e.target.value)}
                            placeholder="John Doe"
                            className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`review-date-${reviewIndex}`}>Review Date</Label>
                          <Input
                            id={`review-date-${reviewIndex}`}
                            type="date"
                            value={review.date}
                            onChange={(e) => handleReviewChange(reviewIndex, "date", e.target.value)}
                            className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`review-image-${reviewIndex}`}>Reviewer Image</Label>
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0F1729] flex-shrink-0">
                              {review.image ? (
                                <img
                                  src={review.image || "/placeholder.svg"}
                                  alt={review.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#0F1729]">
                                  <Users className="h-4 w-4 text-[#4CC9F0]" />
                                </div>
                              )}
                            </div>
                            <Input
                              id={`review-image-${reviewIndex}`}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleReviewImageUpload(e, reviewIndex)}
                              className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`review-rating-${reviewIndex}`}>Rating (1-5)</Label>
                          <Select
                            value={review.rating}
                            onValueChange={(value) => handleReviewChange(reviewIndex, "rating", value)}
                          >
                            <SelectTrigger className="bg-[#0F1729] border-[#4CC9F0]/30 text-white">
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1D2A3F] border-[#4CC9F0]/30 text-white">
                              <SelectItem value="1">1 Star</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="5">5 Stars</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`review-description-${reviewIndex}`}>Review Text</Label>
                        <Textarea
                          id={`review-description-${reviewIndex}`}
                          value={review.description}
                          onChange={(e) => handleReviewChange(reviewIndex, "description", e.target.value)}
                          placeholder="Great course with practical examples!"
                          className="bg-[#0F1729] border-[#4CC9F0]/30 text-white min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Frequently Asked Questions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFAQ}
                    className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add FAQ
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.frequentQuestions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="p-4 bg-[#131B2E] rounded-md space-y-4 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFAQ(faqIndex)}
                        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      >
                        <X className="h-4 w-4" />
                      </Button>

                      <div className="space-y-2">
                        <Label htmlFor={`faq-question-${faqIndex}`}>
                          <HelpCircle className="h-4 w-4 inline-block mr-1" /> Question
                        </Label>
                        <Input
                          id={`faq-question-${faqIndex}`}
                          value={faq.question}
                          onChange={(e) => handleFAQChange(faqIndex, "question", e.target.value)}
                          placeholder="Is prior knowledge required?"
                          className="bg-[#0F1729] border-[#4CC9F0]/30 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`faq-answer-${faqIndex}`}>
                          <MessageSquare className="h-4 w-4 inline-block mr-1" /> Answer
                        </Label>
                        <Textarea
                          id={`faq-answer-${faqIndex}`}
                          value={faq.answer}
                          onChange={(e) => handleFAQChange(faqIndex, "answer", e.target.value)}
                          placeholder="Basic networking knowledge is recommended."
                          className="bg-[#0F1729] border-[#4CC9F0]/30 text-white min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                if (isAddDialogOpen) setIsAddDialogOpen(false)
                if (isEditDialogOpen) setIsEditDialogOpen(false)
              }}
              className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
            >
              Cancel
            </Button>
            <Button
              onClick={isAddDialogOpen ? handleAddCourse : handleEditCourse}
              className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
            >
              <Save className="mr-2 h-4 w-4" />
              {isAddDialogOpen ? "Save Course" : "Update Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentCourse && (
              <div className="flex items-center gap-4 p-4 rounded-md bg-[#131B2E]">
                <div className="w-12 h-12 rounded-md overflow-hidden bg-[#0F1729] flex-shrink-0">
                  {currentCourse.image ? (
                    <img
                      src={currentCourse.image || "/placeholder.svg"}
                      alt={currentCourse.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#131B2E]">
                      <Package className="h-6 w-6 text-[#4CC9F0]" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{currentCourse.name}</h3>
                  <p className="text-sm text-gray-400">
                    ${currentCourse.price} • {currentCourse.duration}
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteCourse} className="bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

