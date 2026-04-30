"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useApi } from "@/hooks/useApi"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z.string().min(10, {
    message: "Password must be at least 10 characters.",
  }),
})

export function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: ""
    },
  })
  const { data, error, isLoading, request } = useApi<any[]>("/api/auth/signup", "post",);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    await request(values).then((response) => {
      toast({
        title: "Success",
        description: "Your action was successful!",
      });
    }).catch((error) => {
      toast({
        title: "Error",
        description: "Your action was successful!",
      });
    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                  className="rounded-lg bg-[#0F1729] border-none text-white placeholder:text-gray-500 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.3)] focus:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(76,201,240,0.1)] transition-shadow text-sm md:text-base"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs md:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="rounded-lg bg-[#0F1729] border-none text-white placeholder:text-gray-500 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.3)] focus:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(76,201,240,0.1)] transition-shadow text-sm md:text-base"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs md:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="rounded-lg bg-[#0F1729] border-none text-white placeholder:text-gray-500 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.3)] focus:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(76,201,240,0.1)] transition-shadow text-sm md:text-base"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs md:text-sm" />
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
                  type="number"
                  placeholder="Phone Number"
                  {...field}
                  className="rounded-lg bg-[#0F1729] border-none text-white placeholder:text-gray-500 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0px_2px_8px_rgba(0,0,0,0.3)] focus:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2),0_0_0_3px_rgba(76,201,240,0.1)] transition-shadow text-sm md:text-base"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs md:text-sm" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full bg-[#4CC9F0] text-[#0F1729] hover:bg-[#4CC9F0]/90 text-sm md:text-base"
        >
          SIGN UP
        </Button>
      </form>
    </Form>
  )
}

