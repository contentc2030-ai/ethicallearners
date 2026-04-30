"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format, parseISO } from "date-fns"
import { Loader2, Plus, FileText, Calendar, CheckCircle, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard-component/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-component/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-component/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/dashboard-component/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-component/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockCourses = [
  { id: "1", name: "Cybersecurity Fundamentals", code: "CS101" },
  { id: "2", name: "Network Security", code: "CS201" },
  { id: "3", name: "Ethical Hacking", code: "CS301" },
  { id: "4", name: "Digital Forensics", code: "CS401" },
]

const mockTests = [
  {
    id: "1",
    title: "Midterm Exam",
    courseId: "1",
    date: "2023-11-15",
    duration: 120,
    totalMarks: 100,
    description: "Comprehensive exam covering all topics from weeks 1-6",
    status: "published",
    resultsPublished: true,
  },
  {
    id: "2",
    title: "Network Protocols Quiz",
    courseId: "2",
    date: "2023-11-20",
    duration: 45,
    totalMarks: 50,
    description: "Quiz on TCP/IP, UDP, and other network protocols",
    status: "published",
    resultsPublished: false,
  },
  {
    id: "3",
    title: "Penetration Testing Lab",
    courseId: "3",
    date: "2023-11-25",
    duration: 180,
    totalMarks: 100,
    description: "Hands-on lab to test penetration testing skills",
    status: "draft",
    resultsPublished: false,
  },
]

const mockResults = [
  { testId: "1", studentId: "1", studentName: "John Doe", marks: 85, feedback: "Good understanding of core concepts" },
  { testId: "1", studentId: "2", studentName: "Jane Smith", marks: 92, feedback: "Excellent work" },
  {
    testId: "1",
    studentId: "3",
    studentName: "Alex Johnson",
    marks: 78,
    feedback: "Needs improvement in cryptography concepts",
  },
  { testId: "1", studentId: "4", studentName: "Sarah Williams", marks: 88, feedback: "Very good" },
  { testId: "2", studentId: "1", studentName: "John Doe", marks: 42, feedback: "Good understanding of TCP/IP" },
  { testId: "2", studentId: "2", studentName: "Jane Smith", marks: 48, feedback: "Excellent work" },
  {
    testId: "2",
    studentId: "3",
    studentName: "Alex Johnson",
    marks: 35,
    feedback: "Needs improvement in UDP concepts",
  },
]

const testFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  courseId: z.string().min(1, "Please select a course"),
  date: z.string().min(1, "Please select a date"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  totalMarks: z.number().min(1, "Total marks must be at least 1"),
  description: z.string().optional(),
})

const resultFormSchema = z.object({
  marks: z.number().min(0, "Marks cannot be negative").max(z.number().optional() as any, "Marks cannot exceed total marks"),
  feedback: z.string().optional(),
})

export default function MentorTests() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false)
  const [isViewResultsDialogOpen, setIsViewResultsDialogOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const testForm = useForm<z.infer<typeof testFormSchema>>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      title: "",
      courseId: "",
      date: "",
      duration: 60,
      totalMarks: 100,
      description: "",
    },
  })

  const resultForm = useForm<z.infer<typeof resultFormSchema>>({
    resolver: zodResolver(resultFormSchema),
    defaultValues: {
      marks: 0,
      feedback: "",
    },
  })

  const handleCreateTest = (values: z.infer<typeof testFormSchema>) => {
    setIsSaving(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      console.log("Creating test:", values)

      toast({
        title: "Test Created",
        description: "The test has been created successfully",
      })

      setIsSaving(false)
      setIsCreateDialogOpen(false)
      testForm.reset()
    }, 1000)
  }

  const handleSaveResult = (values: z.infer<typeof resultFormSchema>) => {
    setIsSaving(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      console.log("Saving result:", { ...values, testId: selectedTest?.id, studentId: selectedStudent?.studentId })

      toast({
        title: "Result Saved",
        description: "The result has been saved successfully",
      })

      setIsSaving(false)
      setIsResultDialogOpen(false)
      resultForm.reset()
    }, 1000)
  }

  const handlePublishResults = (testId: string) => {
    setIsPublishing(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      console.log("Publishing results for test:", testId)

      toast({
        title: "Results Published",
        description: "The results have been published to students",
      })

      setIsPublishing(false)
    }, 1000)
  }

  const openCreateDialog = () => {
    testForm.reset()
    setIsCreateDialogOpen(true)
  }

  const openResultDialog = (test: any, student: any) => {
    setSelectedTest(test)
    setSelectedStudent(student)

    // Find existing result if any
    const existingResult = mockResults.find((r) => r.testId === test.id && r.studentId === student.studentId)

    if (existingResult) {
      resultForm.reset({
        marks: existingResult.marks,
        feedback: existingResult.feedback,
      })
    } else {
      resultForm.reset({
        marks: 0,
        feedback: "",
      })
    }

    setIsResultDialogOpen(true)
  }

  const openViewResultsDialog = (test: any) => {
    setSelectedTest(test)
    setIsViewResultsDialogOpen(true)
  }

  const getTestResults = (testId: string) => {
    return mockResults.filter((r) => r.testId === testId)
  }

  const getAverageScore = (testId: string) => {
    const results = getTestResults(testId)
    if (results.length === 0) return 0

    const sum = results.reduce((acc, curr) => acc + curr.marks, 0)
    return Math.round(sum / results.length)
  }

  const getTestsByStatus = (status: string) => {
    if (status === "upcoming") {
      return mockTests.filter((test) => new Date(test.date) >= new Date() && test.status === "published")
    } else if (status === "past") {
      return mockTests.filter((test) => new Date(test.date) < new Date() && test.status === "published")
    } else {
      return mockTests.filter((test) => test.status === "draft")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Test Management</h2>
        <Button onClick={openCreateDialog} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
          <Plus className="mr-2 h-4 w-4" />
          Create Test
        </Button>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1D2A3F] border border-[#4CC9F0]/20 p-1">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729] text-white"
          >
            Upcoming Tests
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729] text-white"
          >
            Past Tests
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729] text-white"
          >
            Draft Tests
          </TabsTrigger>
        </TabsList>

        {["upcoming", "past", "draft"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
              <CardHeader>
                <CardTitle>
                  {tab === "upcoming" ? "Upcoming Tests" : tab === "past" ? "Past Tests" : "Draft Tests"}
                </CardTitle>
                <CardDescription className="text-white">
                  {tab === "upcoming"
                    ? "Tests scheduled for future dates"
                    : tab === "past"
                      ? "Completed tests and their results"
                      : "Tests in draft mode"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getTestsByStatus(tab).length === 0 ? (
                  <div className="text-center py-8 text-white">No {tab} tests found</div>
                ) : (
                  <div className="rounded-md border border-[#4CC9F0]/20 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-[#131B2E]">
                        <TableRow>
                          <TableHead>Test Name</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Total Marks</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getTestsByStatus(tab).map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-[#4CC9F0]" />
                                {test.title}
                              </div>
                            </TableCell>
                            <TableCell>{mockCourses.find((c) => c.id === test.courseId)?.code || ""}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-[#4CC9F0]" />
                                {format(parseISO(test.date), "MMM dd, yyyy")}
                              </div>
                            </TableCell>
                            <TableCell>{test.duration} mins</TableCell>
                            <TableCell>{test.totalMarks} marks</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {tab === "past" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openViewResultsDialog(test)}
                                      className="h-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      Results
                                    </Button>
                                    {!test.resultsPublished && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePublishResults(test.id)}
                                        disabled={isPublishing}
                                        className="h-8 border-green-500/30 text-green-500 hover:bg-green-500/10"
                                      >
                                        {isPublishing ? (
                                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                        ) : (
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                        )}
                                        Publish
                                      </Button>
                                    )}
                                  </>
                                )}
                                {tab === "draft" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                                    >
                                      <Edit className="h-4 w-4 mr-1" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 border-red-500/30 text-red-500 hover:bg-red-500/10"
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Delete
                                    </Button>
                                  </>
                                )}
                                {tab === "upcoming" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Create Test Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Test</DialogTitle>
            <DialogDescription className="text-white">Fill in the details to create a new test</DialogDescription>
          </DialogHeader>

          <Form {...testForm}>
            <form onSubmit={testForm.handleSubmit(handleCreateTest)} className="space-y-4">
              <FormField
                control={testForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Test Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter test title"
                        className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={testForm.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#131B2E] border-[#4CC9F0]/30 text-white">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1D2A3F] border-[#4CC9F0]/30 text-white">
                        {mockCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} ({course.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={testForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-[#131B2E] border-[#4CC9F0]/30 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={testForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Duration (mins)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={testForm.control}
                  name="totalMarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Total Marks</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={testForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter test description"
                        className="bg-[#131B2E] border-[#4CC9F0]/30 text-white min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Test
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Enter Result Dialog */}
      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enter Student Result</DialogTitle>
            <DialogDescription className="text-white">
              {selectedStudent?.studentName} - {selectedTest?.title}
            </DialogDescription>
          </DialogHeader>

          <Form {...resultForm}>
            <form onSubmit={resultForm.handleSubmit(handleSaveResult)} className="space-y-4">
              <FormField
                control={resultForm.control}
                name="marks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Marks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="text-white">Out of {selectedTest?.totalMarks} marks</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={resultForm.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter feedback for the student"
                        className="bg-[#131B2E] border-[#4CC9F0]/30 text-white min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResultDialogOpen(false)}
                  className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Result
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Results Dialog */}
      <Dialog open={isViewResultsDialogOpen} onOpenChange={setIsViewResultsDialogOpen}>
        <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
            <DialogDescription className="text-white">
              {selectedTest?.title} - {mockCourses.find((c) => c.id === selectedTest?.courseId)?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#131B2E] p-3 rounded-md text-center">
                <div className="text-2xl font-bold">{getTestResults(selectedTest?.id).length}</div>
                <div className="text-xs text-white">Students</div>
              </div>
              <div className="bg-[#131B2E] p-3 rounded-md text-center">
                <div className="text-2xl font-bold">{getAverageScore(selectedTest?.id)}%</div>
                <div className="text-xs text-white">Average Score</div>
              </div>
              <div className="bg-[#131B2E] p-3 rounded-md text-center">
                <div className="text-2xl font-bold">{selectedTest?.totalMarks}</div>
                <div className="text-xs text-white">Total Marks</div>
              </div>
            </div>

            <div className="rounded-md border border-[#4CC9F0]/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-[#131B2E]">
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getTestResults(selectedTest?.id).map((result) => (
                    <TableRow key={result.studentId}>
                      <TableCell className="font-medium">{result.studentName}</TableCell>
                      <TableCell>
                        {result.marks}/{selectedTest?.totalMarks}
                      </TableCell>
                      <TableCell>{Math.round((result.marks / selectedTest?.totalMarks) * 100)}%</TableCell>
                      <TableCell className="max-w-[200px] truncate">{result.feedback}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openResultDialog(selectedTest, {
                              studentId: result.studentId,
                              studentName: result.studentName,
                            })
                          }
                          className="h-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsViewResultsDialogOpen(false)}
              className="border-[#4CC9F0]/30 bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

