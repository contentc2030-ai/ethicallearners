"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Layout } from "@/components/dashboard-component/dashboard-layout"
import { Button } from "@/components/dashboard-component/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/dashboard-component/ui/form"
import { Input } from "@/components/dashboard-component/ui/input"
import { Textarea } from "@/components/dashboard-component/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-component/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Clock, MessageSquare, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ticketSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string(),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

export default function TicketsPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
  })

  const tickets = [
    {
      id: 1,
      title: "Technical Issue with Video Player",
      category: "Technical",
      status: "Open",
      created: "2h ago",
      messages: 3,
      user: "Ahmed K.",
    },
    {
      id: 2,
      title: "Question about Course Material",
      category: "Academic",
      status: "In Progress",
      created: "1d ago",
      messages: 5,
      user: "Sarah M.",
    },
  ]

  function onSubmit(data: z.infer<typeof ticketSchema>) {
    toast({
      title: "Ticket Submitted",
      description: `Your ticket "${data.title}" has been submitted successfully. We'll get back to you soon!`,
    })
    form.reset()
  }

  return (
    <Layout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
          <p className="text-muted-foreground">Create and manage support tickets</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
            <CardDescription>Submit a new support ticket and we&apos;ll respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ticket title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your issue in detail" className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit Ticket</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{ticket.title}</CardTitle>
                  <Button
                    variant="secondary"
                    className={
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    }
                  >
                    {ticket.status}
                  </Button>
                </div>
                <CardDescription>Category: {ticket.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {ticket.user}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {ticket.created}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {ticket.messages} messages
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Ticket Details",
                      description: `Viewing details for: ${ticket.title}`,
                    })
                  }}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

