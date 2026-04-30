"use client"

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import assets from "../../../global/constant/assets.const";
import Image from 'next/image';
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success?: boolean;
        message?: string;
    }>({});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", message: "" },
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
                    formName: 'contact',
                    ...values
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                setSubmitStatus({
                    success: true,
                    message: 'Message sent successfully!'
                });
                form.reset();
            } else {
                setSubmitStatus({
                    success: false,
                    message: data.message || 'Failed to send message. Please try again.'
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

    const contactInfo = [
        { icon: MapPin, title: "Bengaluru Office", content: "155, 5th Main Rd, HSR Layout, Bengaluru, Karnataka 560102" },
        { icon: MapPin, title: "Bareilly Office", content: "Near MJP Rohilkhand University, Pilibhit Bypass rd, Bareilly Uttar Pradesh - 243005" },
        { icon: Phone, title: "Phone", content: "+91 9517716419" },
        // { icon: Phone, title: "Phone 02", content: "(555) 123-4567" },
        { icon: Mail, title: "Email", content: "Info@ethicallearner.com" },
        { icon: Clock, title: "Working Hours", content: "Mon to Fri 9 AM - 7 PM, Sat 9 AM - 1 PM" },
    ];

    return (
        <section className="py-16 px-8">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5 }}
                 >
                <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="group">
                            {/* Heading */}
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-[#4CC9F0]/10 group-hover:bg-[#4CC9F0]/20 transition-colors duration-300">
                                    <item.icon className="h-6 w-6 text-[#4CC9F0]" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            </div>
                            <p className="text-gray-400 pl-12">{item.content}</p>
                            
                        </div>
                    ))}
                </div>

                {/* Ethical Learner Image */}
                <div className="mt-8 w-full flex justify-center">
                    <div className="relative w-full max-w-4xl">
                        <Image
                            src={assets.ethicalLearnerText}
                            alt="Education Background"
                            width={800}
                            height={600}
                            className="object-cover opacity-10 w-full h-auto"
                        />
                    </div>
                </div>
            </motion.div>

                {/* Contact Form */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="p-10 bg-[#1D2A3F] border border-[#4CC9F0]/20 rounded-lg lg:ml-20 lg:mr-20">
                        <h3 className="text-2xl font-semibold text-white mb-4">Send Us a Message</h3>
                        
                        {submitStatus.message && (
                            <div className={`p-3 mb-4 rounded ${submitStatus.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Your Name</FormLabel>
                                        <FormControl>
                                            <Input className="bg-[#1D2A3F] border-[#4CC9F0]/20 text-white" placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Your Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" className="bg-[#1D2A3F] border-[#4CC9F0]/20 text-white" placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage  />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="message" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Message</FormLabel>
                                        <FormControl>
                                            <Textarea className="bg-[#1D2A3F] border-[#4CC9F0]/20 text-white min-h-[120px]" placeholder="Tell us about your project..." {...field} />
                                        </FormControl>
                                        <FormMessage  />
                                    </FormItem>
                                )} />
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-[#4CC9F0] text-white hover:bg-[#4CC9F0]/90"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </motion.div>
            </div>
            
            {/* <div className="w-full rounded-lg overflow-hidden bg-[#1D2A3F] border border-[#4CC9F0]/20 h-[50vh] mt-8">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280949822!2d-74.11976373946229!3d40.697403441436425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756436!5m2!1sen!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div> */}
            <div className="w-full rounded-lg overflow-hidden h-[80vh] mt-8">
            <h1 className="text-white text-xl font-semibold text-center mb-6"> <span className="text-[#4CC9F0] text-xl"> One-third of the Earth is Water;</span> the rest belongs to our learners, Shaping the world with curiosity and wisdom.</h1>
                <Image
                    src={assets.LearnerMap2} 
                    alt="Map"
                    width={1000} 
                    height={1000} 
                    className="w-full h-full object-fit" 
                />
            </div>
        </section>
    );
}
