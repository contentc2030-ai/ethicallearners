"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Loader2, MessageSquare, Search, User } from "lucide-react"
import { Button } from "@/components/dashboard-component/ui/button"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboard-component/ui/avatar"
import { Badge } from "@/components/dashboard-component/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dashboard-component/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-component/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockQueries = [
  {
    id: "1",
    studentId: "1",
    studentName: "John Doe",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseId: "1",
    courseName: "Cybersecurity Fundamentals",
    courseCode: "CS101",
    subject: "Question about encryption algorithms",
    message:
      "I'm having trouble understanding the difference between symmetric and asymmetric encryption. Could you please explain the key differences and when to use each?",
    date: "2023-11-10T14:30:00",
    status: "pending",
    response: "",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Jane Smith",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseId: "2",
    courseName: "Network Security",
    courseCode: "CS201",
    subject: "Help with firewall configuration",
    message:
      "I'm working on the lab assignment for firewall configuration but I'm getting an error when trying to set up the rules. The error says 'Invalid port range'. Can you help me troubleshoot this?",
    date: "2023-11-09T10:15:00",
    status: "pending",
    response: "",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Alex Johnson",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseId: "3",
    courseName: "Ethical Hacking",
    courseCode: "CS301",
    subject: "Clarification on penetration testing report",
    message:
      "For the final project, do we need to include remediation steps in the penetration testing report or just the findings?",
    date: "2023-11-08T16:45:00",
    status: "resolved",
    response:
      "Yes, you should definitely include remediation steps in your penetration testing report. A good report not only identifies vulnerabilities but also provides actionable recommendations on how to fix them. This makes your report much more valuable to the client.",
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Sarah Williams",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseId: "1",
    courseName: "Cybersecurity Fundamentals",
    courseCode: "CS101",
    subject: "Extension request for assignment",
    message:
      "Due to a family emergency, I won't be able to submit the assignment by Friday. Would it be possible to get an extension until Monday?",
    date: "2023-11-07T09:20:00",
    status: "resolved",
    response:
      "I'm sorry to hear about your family emergency. Yes, I can grant you an extension until Monday. Please take care of yourself and your family, and let me know if you need any further assistance.",
  },
]

export default function MentorQueries() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      console.log("Sending reply:", { queryId: selectedQuery?.id, reply: replyText })

      toast({
        title: "Reply Sent",
        description: "Your reply has been sent to the student",
      })

      setIsSending(false)
      setIsReplyDialogOpen(false)
      setReplyText("")
    }, 1000)
  }

  const openReplyDialog = (query: any) => {
    setSelectedQuery(query)
    setReplyText(query.response || "")
    setIsReplyDialogOpen(true)
  }

  const getQueriesByStatus = (status: string) => {
    return mockQueries
      .filter((query) => query.status === status)
      .filter(
        (query) =>
          query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.courseCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold">Student Queries</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
          <Input
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#131B2E] border-[#4CC9F0]/30 text-white w-full"
          />
        </div>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1D2A3F] border border-[#4CC9F0]/20 p-1">
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729] text-white"
          >
            Pending Queries
          </TabsTrigger>
          <TabsTrigger
            value="resolved"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729] text-white"
          >
            Resolved Queries
          </TabsTrigger>
        </TabsList>

        {["pending", "resolved"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="bg-[#1D2A3F] border-[#4CC9F0]/20">
              <CardHeader>
                <CardTitle>{tab === "pending" ? "Pending Queries" : "Resolved Queries"}</CardTitle>
                <CardDescription className="text-white">
                  {tab === "pending" ? "Queries awaiting your response" : "Queries you have already addressed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getQueriesByStatus(tab).length === 0 ? (
                  <div className="text-center py-8 text-white">No {tab} queries found</div>
                ) : (
                  <div className="space-y-4">
                    {getQueriesByStatus(tab).map((query) => (
                      <Card key={query.id} className="bg-[#131B2E] border-[#4CC9F0]/20">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={query.studentAvatar} alt={query.studentName} />
                                <AvatarFallback className="bg-[#4CC9F0]/20 text-[#4CC9F0]">
                                  {query.studentName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{query.subject}</CardTitle>
                                <div className="flex items-center gap-2 text-xs text-white">
                                  <span>{query.studentName}</span>
                                  <span>•</span>
                                  <span>{query.courseCode}</span>
                                  <span>•</span>
                                  <span>{format(new Date(query.date), "MMM dd, yyyy")}</span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant={tab === "pending" ? "outline" : "default"}
                              className={
                                tab === "pending"
                                  ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
                                  : "bg-green-500 text-white"
                              }
                            >
                              {tab === "pending" ? "Pending" : "Resolved"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2 pb-4">
                          <p className="text-white whitespace-pre-line">{query.message}</p>

                          {query.response && (
                            <div className="mt-4 pl-4 border-l-2 border-[#4CC9F0]/30">
                              <p className="text-sm text-white mb-1">Your response:</p>
                              <p className="text-white">{query.response}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => openReplyDialog(query)}
                            className={
                              tab === "pending"
                                ? "bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                                : "bg-[#131B2E] border border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                            }
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {tab === "pending" ? "Reply" : "View/Edit Reply"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="bg-[#1D2A3F] text-white border-[#4CC9F0]/20 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reply to Query</DialogTitle>
            <DialogDescription className="text-white">
              {selectedQuery?.studentName} - {selectedQuery?.subject}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-[#131B2E] p-4 rounded-md mb-4">
            <p className="text-white whitespace-pre-line">{selectedQuery?.message}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <User className="h-4 w-4" />
              <span>Replying as {selectedQuery?.courseName} mentor</span>
            </div>

            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              className="bg-[#131B2E] border-[#4CC9F0]/30 text-white min-h-[150px]"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsReplyDialogOpen(false)}
              className="border-[#4CC9F0]/30 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendReply}
              disabled={isSending}
              className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
            >
              {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

