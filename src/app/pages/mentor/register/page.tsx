"use client"

import { Suspense } from 'react'
import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash2, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard-component/ui/form"
import { useToast } from "@/hooks/use-toast"

// Import useSearchParams dynamically to avoid SSR issues
const SearchParamsProvider = dynamic(() =>
  import('./SearchParamsProvider').then(mod => mod.SearchParamsProvider),
  { ssr: false }
)

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  image: z.string().optional(),
  experience: z.array(
    z.object({
      institute: z.string().min(1, { message: "Institute name is required" }),
      startYear: z.number().min(1900, { message: "Please enter a valid year" }),
      endYear: z.number().min(1900, { message: "Please enter a valid year" }),
      speciality: z.array(z.string()),
    }),
  ),
  skills: z.array(z.string().min(1, { message: "Skill cannot be empty" })),
  speciality: z.string().min(1, { message: "Speciality is required" }),
  about: z.string().min(10, { message: "About section must be at least 10 characters" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  cv: z.string().optional(),
  socialMedias: z.array(
    z.object({
      name: z.string().min(1, { message: "Platform name is required" }),
      link: z.string().url({ message: "Please enter a valid URL" }),
    }),
  ),
})

type FormValues = z.infer<typeof formSchema>

function MentorRegistrationForm({ email }: { email: string }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newSpeciality, setNewSpeciality] = useState("")

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: email || "",
      phone: "",
      password: "",
      image: "",
      experience: [
        {
          institute: "",
          startYear: new Date().getFullYear(),
          endYear: new Date().getFullYear(),
          speciality: [""],
        },
      ],
      skills: [],
      speciality: "",
      about: "",
      address: "",
      cv: "",
      socialMedias: [
        {
          name: "",
          link: "",
        },
      ],
    },
  })

  // Update email field when query param changes
  useEffect(() => {
    if (email) {
      form.setValue("email", email)
    }
  }, [email, form])

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/mentor/addMentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to register mentor")
      }

      toast({
        title: "Registration Successful",
        description: "Your mentor profile has been created successfully.",
        variant: "default",
      })

      // Redirect to dashboard or confirmation page
      router.push("/mentor/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add a new experience entry
  const addExperience = () => {
    const currentExperience = form.getValues("experience")
    form.setValue("experience", [
      ...currentExperience,
      {
        institute: "",
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear(),
        speciality: [""],
      },
    ])
  }

  // Remove an experience entry
  const removeExperience = (index: number) => {
    const currentExperience = form.getValues("experience")
    if (currentExperience.length > 1) {
      form.setValue(
        "experience",
        currentExperience.filter((_, i) => i !== index),
      )
    }
  }

  // Add a new speciality to an experience
  const addSpecialityToExperience = (experienceIndex: number) => {
    if (!newSpeciality.trim()) return

    const currentExperience = form.getValues("experience")
    const updatedExperience = [...currentExperience]
    updatedExperience[experienceIndex].speciality = [
      ...updatedExperience[experienceIndex].speciality,
      newSpeciality.trim(),
    ]

    form.setValue("experience", updatedExperience)
    setNewSpeciality("")
  }

  // Remove a speciality from an experience
  const removeSpecialityFromExperience = (experienceIndex: number, specialityIndex: number) => {
    const currentExperience = form.getValues("experience")
    const updatedExperience = [...currentExperience]

    if (updatedExperience[experienceIndex].speciality.length > 1) {
      updatedExperience[experienceIndex].speciality = updatedExperience[experienceIndex].speciality.filter(
        (_, i) => i !== specialityIndex,
      )
      form.setValue("experience", updatedExperience)
    }
  }

  // Add a new skill
  const addSkill = () => {
    if (!newSkill.trim()) return

    const currentSkills = form.getValues("skills")
    if (!currentSkills.includes(newSkill.trim())) {
      form.setValue("skills", [...currentSkills, newSkill.trim()])
      setNewSkill("")
    }
  }

  // Remove a skill
  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills")
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index),
    )
  }

  // Add a new social media entry
  const addSocialMedia = () => {
    const currentSocialMedias = form.getValues("socialMedias")
    form.setValue("socialMedias", [
      ...currentSocialMedias,
      {
        name: "",
        link: "",
      },
    ])
  }

  // Remove a social media entry
  const removeSocialMedia = (index: number) => {
    const currentSocialMedias = form.getValues("socialMedias")
    if (currentSocialMedias.length > 1) {
      form.setValue(
        "socialMedias",
        currentSocialMedias.filter((_, i) => i !== index),
      )
    }
  }

  // Handle file uploads (image and CV)
  const handleFileUpload = async (file: File, fieldName: "image" | "cv") => {
    // In a real application, you would upload the file to a storage service
    // For this example, we'll just set a placeholder URL
    const fileUrl = URL.createObjectURL(file)
    form.setValue(fieldName, fileUrl)

    toast({
      title: "File Uploaded",
      description: `Your ${fieldName === "image" ? "profile image" : "CV"} has been uploaded.`,
    })
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen bg-gradient-to-b from-[#0F1729] via-[#131B2E] to-[#0F1729]">
      <Card className="w-full max-w-4xl mx-auto bg-[#1D2A3F] border-[#4CC9F0]/20">
        <CardHeader className="bg-[#131B2E]">
          <CardTitle className="text-2xl text-white">Mentor Registration</CardTitle>
          <CardDescription className="text-gray-400">
            Fill in your details to register as a mentor. Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Name *</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            placeholder="John Doe"
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
                        <FormLabel className="text-gray-200">Email *</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            type="email"
                            placeholder="john.doe@example.com"
                            disabled={!!email}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            placeholder="1234567890"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Password *</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel className="text-gray-200">Profile Image</FormLabel>
                    <div className="flex items-center gap-2">
                      {form.watch("image") && (
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                          <img
                            src={form.watch("image") || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <FormControl>
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload(file, "image")
                            }}
                            className="cursor-pointer bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Address *</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                            placeholder="123 Main St, City, Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">About *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself, your experience, and what you can offer as a mentor..."
                          className="min-h-[100px] bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Professional Information</h3>

                <FormField
                  control={form.control}
                  name="speciality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Primary Speciality *</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          placeholder="e.g., Frontend Development"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel className="text-gray-200">CV/Resume</FormLabel>
                  <div className="flex items-center gap-2">
                    {form.watch("cv") && <div className="text-sm text-muted-foreground">CV uploaded successfully</div>}
                    <FormControl>
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(file, "cv")
                          }}
                          className="cursor-pointer bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>

                <div className="space-y-2">
                  <FormLabel className="text-gray-200">Skills *</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.watch("skills").map((skill, index) => (
                      <div
                        key={index}
                        className="bg-[#131B2E] text-[#4CC9F0] px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                      className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      size="sm"
                      className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {form.formState.errors.skills && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.skills.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Experience</h3>
                  <Button
                    type="button"
                    onClick={addExperience}
                    variant="outline"
                    size="sm"
                    className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Experience
                  </Button>
                </div>

                {form.watch("experience").map((_, index) => (
                  <Card key={index} className="border border-[#4CC9F0]/20 bg-[#1D2A3F]">
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Experience {index + 1}</CardTitle>
                      </div>
                      {form.watch("experience").length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeExperience(index)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mt-1 -mr-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.institute`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200">Institute/Company *</FormLabel>
                            <FormControl>
                              <Input
                                className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                                placeholder="XYZ University"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`experience.${index}.startYear`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">Start Year *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="2015"
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`experience.${index}.endYear`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">End Year *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="2020"
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                  className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormLabel className="text-gray-200">Specialities</FormLabel>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {form.watch(`experience.${index}.speciality`).map((speciality, specialityIndex) => (
                            <div
                              key={specialityIndex}
                              className="bg-[#131B2E] text-[#4CC9F0] px-3 py-1 rounded-full flex items-center gap-1"
                            >
                              {speciality}
                              {form.watch(`experience.${index}.speciality`).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSpecialityFromExperience(index, specialityIndex)}
                                  className="text-primary hover:text-primary/80"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a speciality"
                            value={newSpeciality}
                            onChange={(e) => setNewSpeciality(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addSpecialityToExperience(index)
                              }
                            }}
                            className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          />
                          <Button
                            type="button"
                            onClick={() => addSpecialityToExperience(index)}
                            size="sm"
                            className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Social Media</h3>
                  <Button
                    type="button"
                    onClick={addSocialMedia}
                    variant="outline"
                    size="sm"
                    className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Social Media
                  </Button>
                </div>

                {form.watch("socialMedias").map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`socialMedias.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-gray-200">Platform</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                              placeholder="LinkedIn"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`socialMedias.${index}.link`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-gray-200">URL</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                              placeholder="https://linkedin.com/in/username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("socialMedias").length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeSocialMedia(index)}
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset Form
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Register as Mentor
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default function MentorRegistrationPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <SearchParamsProvider>
        {(email) => <MentorRegistrationForm email={email} />}
      </SearchParamsProvider>
    </Suspense>
  )
}

