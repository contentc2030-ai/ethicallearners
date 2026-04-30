"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Button } from "@/components/dashboard-component/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard-component/ui/form"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-component/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-component/ui/avatar"

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  bio: z.string().max(160, "Bio must not exceed 160 characters."),
  degree: z.string().min(2, "Degree must be at least 2 characters."),
  university: z.string().min(2, "University must be at least 2 characters."),
  graduationYear: z.string().regex(/^\d{4}$/, "Must be a valid year (YYYY)."),
  specialization: z.string().min(2, "Specialization must be at least 2 characters."),
  currentRole: z.string().min(2, "Current role must be at least 2 characters."),
  yearsOfExperience: z.string().regex(/^\d+$/, "Must be a valid number."),
})

export default function ProfilePage() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      bio: "Passionate educator with a focus on Arabic language and Islamic studies.",
      degree: "Master's in Arabic Literature",
      university: "Al-Azhar University",
      graduationYear: "2015",
      specialization: "Classical Arabic",
      currentRole: "Senior Arabic Language Instructor",
      yearsOfExperience: "8",
    },
  })

  function onSubmit(data: z.infer<typeof profileSchema>) {
    console.log(data)
  }

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-purple-100">
            <TabsTrigger value="general" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Education
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Professional
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update your basic profile information.</CardDescription>                     
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">   
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                        Change Avatar
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-purple-200 focus:border-purple-500" />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormDescription>Brief description for your profile. Maximum 160 characters.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Educational Background</CardTitle>
                    <CardDescription>Share your academic qualifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation Year</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="professional">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>Update your current professional status.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currentRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Role</FormLabel>
                          <FormControl>
                            <Input {...field} className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" className="border-purple-200 focus:border-purple-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
                Save Changes
              </Button>
            </form>
          </Form>
        </Tabs>
      </div>
    </Layout>
  )
}

