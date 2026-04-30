"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export default function MentorLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/mentor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      toast({
        title: "Login successful",
        description: "Welcome back to Ethical Learner!",
      })

      // Redirect to mentor dashboard
      router.push("/pages/mentor")
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0F1729] text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image 
            src="/logo.png" 
            alt="Ethical Learner" 
            width={150} 
            height={50} 
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold">Mentor Login</h2>
          <p className="text-gray-400 mt-2">Sign in to access your mentor dashboard</p>
        </div>

        <div className="bg-[#1D2A3F] rounded-lg shadow-lg p-6 mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="bg-[#131B2E] border-[#4CC9F0]/30"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="bg-[#131B2E] border-[#4CC9F0]/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-[#131B2E]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-[#4CC9F0] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/pages/mentor-register" className="text-[#4CC9F0] hover:underline">
              Apply to become a mentor
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 