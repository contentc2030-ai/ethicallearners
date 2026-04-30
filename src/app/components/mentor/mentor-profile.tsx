"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Save, Upload } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard-component/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-component/ui/avatar"
import { Badge } from "@/components/dashboard-component/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock mentor data
const mentorData = {
  id: "1",
  name: "Dr. Alan Turing",
  email: "alan.turing@example.com",
  phone: "+1 (555) 123-4567",
  title: "Senior Cybersecurity Mentor",
  department: "Information Security",
  bio: "Dr. Alan Turing is a renowned cybersecurity expert with over 8 years of experience in the field. He specializes in network security, ethical hacking, digital forensics, and cryptography.",
  education: [
    { degree: "Ph.D.", field: "Computer Science", institution: "MIT", year: "2015" },
    { degree: "M.S.", field: "Cybersecurity", institution: "Stanford University", year: "2012" },
    { degree: "B.S.", field: "Computer Engineering", institution: "Carnegie Mellon University", year: "2010" },
  ],
  certifications: [
    { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", year: "2016" },
    { name: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC²", year: "2017" },
    { name: "Offensive Security Certified Professional (OSCP)", issuer: "Offensive Security", year: "2018" },
  ],
  skills: [
    "Network Security",
    "Ethical Hacking",
    "Digital Forensics",
    "Cryptography",
    "Penetration Testing",
    "Malware Analysis",
    "Security Auditing",
  ],
  avatar: "/placeholder.svg?height=200&width=200",
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  title: z.string().min(2, "Title is required"),
  department: z.string().min(2, "Department is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  avatar: z.string().optional(),
})

export default function MentorProfile() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [skills, setSkills] = useState(mentorData.skills)
  const [newSkill, setNewSkill] = useState("")
  const [education, setEducation] = useState(mentorData.education)
  const [certifications, setCertifications] = useState(mentorData.certifications)

  // New education form state
  const [newEducation, setNewEducation] = useState({
    degree: "",
    field: "",
    institution: "",
    year: "",
  })

  // New certification form state
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mentorData.name,
      email: mentorData.email,
      phone: mentorData.phone,
      title: mentorData.title,
      department: mentorData.department,
      bio: mentorData.bio,
      avatar: mentorData.avatar,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      console.log({ ...values, skills, education, certifications })

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })

      setIsSaving(false)
    }, 1000)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // In a real app, this would be an API call to upload the image
    setTimeout(() => {
      // Simulate a successful upload
      const imageUrl = URL.createObjectURL(file)
      form.setValue("avatar", imageUrl)

      toast({
        title: "Avatar Uploaded",
        description: "Your profile picture has been updated",
      })

      setIsUploading(false)
    }, 1000)
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.field && newEducation.institution && newEducation.year) {
      setEducation([...education, { ...newEducation }])
      setNewEducation({ degree: "", field: "", institution: "", year: "" })
    }
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.year) {
      setCertifications([...certifications, { ...newCertification }])
      setNewCertification({ name: "", issuer: "", year: "" })
    }
  }

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription className="text-white">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={form.watch("avatar")} alt={form.watch("name")} />
                    <AvatarFallback className="bg-[#131B2E] text-[#4CC9F0] text-2xl">
                      {form
                        .watch("name")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 bg-[#131B2E] text-[#4CC9F0] hover:bg-[#4CC9F0]/10 px-3 py-2 rounded-md text-sm">
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        Upload Photo
                      </div>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your job title"
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
                    name="department"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-white">Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your department"
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
                    name="bio"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-white">Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a short bio about yourself"
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription className="text-white">Add your areas of expertise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#131B2E] text-[#4CC9F0] hover:bg-[#1D2A3F] cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
                <Button type="button" onClick={addSkill} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription className="text-white">Add your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-[#131B2E] p-4 rounded-lg relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-white hover:text-red-400"
                    onClick={() => removeEducation(index)}
                  >
                    ×
                  </button>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h4 className="font-medium">
                        {edu.degree} in {edu.field}
                      </h4>
                      <p className="text-sm text-white">{edu.institution}</p>
                    </div>
                    <Badge variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0] self-start md:self-center">
                      {edu.year}
                    </Badge>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="Degree (e.g., Ph.D., M.S., B.S.)"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
                <Input
                  value={newEducation.field}
                  onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                  placeholder="Field of Study"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
                <Input
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="Institution"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
                <Input
                  value={newEducation.year}
                  onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                  placeholder="Year"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
              </div>

              <Button
                type="button"
                onClick={addEducation}
                className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729] w-full"
              >
                Add Education
              </Button>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription className="text-white">Add your professional certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-[#131B2E] p-4 rounded-lg relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-white hover:text-red-400"
                    onClick={() => removeCertification(index)}
                  >
                    ×
                  </button>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-white">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0] self-start md:self-center">
                      {cert.year}
                    </Badge>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  placeholder="Certification Name"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
                <Input
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                  placeholder="Issuing Organization"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                />
                <Input
                  value={newCertification.year}
                  onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                  placeholder="Year"
                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white md:col-span-2"
                />
              </div>

              <Button
                type="button"
                onClick={addCertification}
                className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729] w-full"
              >
                Add Certification
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729] px-8">
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

