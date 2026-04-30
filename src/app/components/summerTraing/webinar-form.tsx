"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"  
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export default function WebinarForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName: 'webinar',
          ...values
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({
          success: true,
          message: 'Webinar registration successful!'
        });
        form.reset();
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className=" bg-[#0F1729] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Join Our Webinar Today</h1>
          <p className="text-gray-400">
            Please use the form below to get in touch, and we&apos;ll be sure to respond to you as soon as possible.
          </p>
        </div>

        {submitStatus.message && (
          <div className={`p-3 rounded mx-auto max-w-2xl ${submitStatus.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* Contact Information */}
          <Card className="p-6 bg-white/5 border-0">
            <h2 className="text-lg font-semibold text-white mb-6">Our Free Webinar Today form</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#4CC9F0]" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-400">123 Street,Anywhere USA</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#4CC9F0]" />
                </div>
                <div>
                  <p className="font-medium">Give us a call</p>
                  <p className="text-sm text-gray-400">+555 666 999</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-[#4CC9F0]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#4CC9F0]" />
                </div>
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-sm text-gray-400">info@Our.FreeWebinar.com</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Form */}
          <Card className="p-6 bg-white/5 border-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            {...field}
                            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            {...field}
                            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-0 text-white">
                              <SelectValue placeholder="Subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Phone No"
                            {...field}
                            className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="E-mail"
                          {...field}
                          className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          {...field}
                          className="bg-white/5 border-0 text-white placeholder:text-gray-400 min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#4CC9F0] hover:bg-[#4CC9F0]/90 text-white"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

