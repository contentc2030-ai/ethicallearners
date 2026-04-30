"use client"

import { useState } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Users, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-component/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-component/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard-component/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from "@/components/dashboard-component/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Types
interface Course {
  id: string
  name: string
  code: string
}

interface Meeting {
  id: string
  title: string
  courseId: string
  date: string
  startTime: string
  endTime: string
  description: string
  meetingLink: string
  attendees: number
}

// Mock data
const mockCourses: Course[] = [
  { id: "1", name: "Cybersecurity Fundamentals", code: "CS101" },
  { id: "2", name: "Network Security", code: "CS201" },
  { id: "3", name: "Ethical Hacking", code: "CS301" },
  { id: "4", name: "Digital Forensics", code: "CS401" },
]

const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Weekly Review Session",
    courseId: "1",
    date: "2023-11-15",
    startTime: "10:00",
    endTime: "11:30",
    description: "Weekly review of course material and Q&A session",
    meetingLink: "https://meet.example.com/cs101",
    attendees: 24,
  },
  {
    id: "2",
    title: "Network Protocols Discussion",
    courseId: "2",
    date: "2023-11-16",
    startTime: "14:00",
    endTime: "15:30",
    description: "Deep dive into TCP/IP and other network protocols",
    meetingLink: "https://meet.example.com/cs201",
    attendees: 18,
  },
  {
    id: "3",
    title: "Penetration Testing Workshop",
    courseId: "3",
    date: "2023-11-18",
    startTime: "13:00",
    endTime: "16:00",
    description: "Hands-on workshop on penetration testing techniques",
    meetingLink: "https://meet.example.com/cs301",
    attendees: 15,
  },
]

const meetingFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  courseId: z.string().min(1, "Please select a course"),
  date: z.string().min(1, "Please select a date"),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  description: z.string().optional(),
  meetingLink: z.string().url("Please enter a valid URL"),
})

export default function MentorSchedule() {
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Generate days for the current month view
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      title: "",
      courseId: "",
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      startTime: "09:00",
      endTime: "10:30",
      description: "",
      meetingLink: "https://meet.example.com/",
    },
  })

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1))
  }

  // Select a date
  const selectDate = (date: Date) => {
    setSelectedDate(date)
    form.setValue("date", format(date, "yyyy-MM-dd"))
  }

  // Get meetings for a specific date
  const getMeetingsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return mockMeetings.filter((meeting) => meeting.date === dateStr)
  }

  // Check if a date has meetings
  const hasMeetings = (date: Date) => {
    return getMeetingsForDate(date).length > 0
  }

  // Open create meeting dialog
  const openCreateDialog = () => {
    form.reset({
      title: "",
      courseId: "",
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      startTime: "09:00",
      endTime: "10:30",
      description: "",
      meetingLink: "https://meet.example.com/",
    })
    setIsCreateDialogOpen(true)
  }

  // Handle create meeting
  const handleCreateMeeting = (values: z.infer<typeof meetingFormSchema>) => {
    setIsSaving(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      console.log("Creating meeting:", values)

      toast({
        title: "Meeting Scheduled",
        description: "The meeting has been scheduled successfully",
      })

      setIsSaving(false)
      setIsCreateDialogOpen(false)
      form.reset()
    }, 1000)
  }

  // Delete meeting
  const handleDeleteMeeting = (meetingId: string) => {
    // In a real app, this would be an API call
    console.log("Deleting meeting:", meetingId)

    toast({
      title: "Meeting Deleted",
      description: "The meeting has been deleted successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Meeting Schedule</h2>
        <Button onClick={openCreateDialog} className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>
                <CalendarIcon className="inline-block mr-2 h-5 w-5 text-[#4CC9F0]" />
                Calendar
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={previousMonth}
                  className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextMonth}
                  className="h-8 w-8 border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription className="text-white">Select a date to view or schedule meetings</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-xs font-medium text-white py-1">
                  {day}
                </div>
              ))}

              {/* Fill in empty days at the start of the month */}
              {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                <div key={`empty-start-${i}`} className="h-10 rounded-md"></div>
              ))}

              {/* Days of the month */}
              {daysInMonth.map((day) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const isCurrent = isToday(day)
                const hasEvents = hasMeetings(day)

                return (
                  <button
                    key={day.toString()}
                    type="button"
                    onClick={() => selectDate(day)}
                    className={cn(
                      "h-10 rounded-md flex items-center justify-center text-sm transition-colors relative",
                      isSelected && "bg-[#4CC9F0] text-[#0F1729] font-bold",
                      !isSelected && isCurrent && "border border-[#4CC9F0] text-[#4CC9F0]",
                      !isSelected && !isCurrent && "hover:bg-[#4CC9F0]/10",
                    )}
                  >
                    {format(day, "d")}
                    {hasEvents && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#4CC9F0] rounded-full"></span>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Meetings for selected date */}
        <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Scheduled Meetings</span>
              {selectedDate && (
                <Badge variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0] bg-[#131B2E]">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-white">
              {selectedDate
                ? `Meetings scheduled for ${format(selectedDate, "MMMM d, yyyy")}`
                : "Select a date to view scheduled meetings"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-8 text-white">
                Please select a date from the calendar to view meetings
              </div>
            ) : getMeetingsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8 text-white">No meetings scheduled for this date</div>
            ) : (
              <div className="space-y-4">
                {getMeetingsForDate(selectedDate).map((meeting) => (
                  <Card key={meeting.id} className="bg-[#131B2E] border-[#4CC9F0]/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{meeting.title}</CardTitle>
                        <Badge variant="outline" className="border-[#4CC9F0]/50 text-[#4CC9F0]">
                          {mockCourses.find((c) => c.id === meeting.courseId)?.code || ""}
                        </Badge>
                      </div>
                      <CardDescription className="text-white flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-[#4CC9F0]" />
                          <span>
                            {meeting.startTime} - {meeting.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-[#4CC9F0]" />
                          <span>{meeting.attendees} attendees</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 pb-4">
                      <p className="text-white">{meeting.description}</p>
                      <a
                        href={meeting.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4CC9F0] hover:underline text-sm mt-2 inline-block"
                      >
                        {meeting.meetingLink}
                      </a>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMeeting(meeting.id)}
                        className="h-8 border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel Meeting
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={openCreateDialog}
              disabled={!selectedDate}
              className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729] w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Schedule Meeting for {selectedDate ? format(selectedDate, "MMM d") : "Selected Date"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Create Meeting Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
            <DialogDescription className="text-white">
              Fill in the details to schedule a new meeting
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateMeeting)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Meeting Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meeting title"
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
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Course</FormLabel>
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

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="col-span-3 md:col-span-1">
                      <FormLabel className="text-white">Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-[#131B2E] border-[#4CC9F0]/30 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="col-span-3 md:col-span-1">
                      <FormLabel className="text-white">Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="bg-[#131B2E] border-[#4CC9F0]/30 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="col-span-3 md:col-span-1">
                      <FormLabel className="text-white">End Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="bg-[#131B2E] border-[#4CC9F0]/30 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meeting description"
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
                name="meetingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Meeting Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meeting link"
                        className="bg-[#131B2E] border-[#4CC9F0]/30 text-white"
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
                  Schedule Meeting
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

