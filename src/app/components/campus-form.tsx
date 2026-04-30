'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"

const formSchema = z.object({
  instituteName: z.string().min(2, {
    message: "Institute name must be at least 2 characters.",
  }),
  contactPerson: z.string().min(2, {
    message: "Contact person name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
})

export function CampusForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instituteName: "",
      contactPerson: "",
      email: "",
      phone: "",
    },
  })

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
          formName: 'campus',
          ...values
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({
          success: true,
          message: 'Campus registration successful!'
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
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="bg-[#1D2A3F] p-6 rounded-lg border border-[#4CC9F0]/20 max-w-md mx-auto"
>
  <h3 className="text-xl font-semibold text-white mb-6">Register Your Campus</h3>
  
  {submitStatus.message && (
    <div className={`p-3 mb-4 rounded ${submitStatus.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
      {submitStatus.message}
    </div>
  )}

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="instituteName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Institute Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your institute name" 
                {...field}
                className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contactPerson"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Contact Person</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter contact person name" 
                {...field}
                className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                {...field}
                className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-200">Phone Number</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="Enter your phone number" 
                {...field}
                className="bg-[#0F1729] border-[#4CC9F0]/20 text-white"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90"
      >
        {isSubmitting ? "Submitting..." : "Register Now"}
      </Button>
    </form>
  </Form>
</motion.div>

  )
}
