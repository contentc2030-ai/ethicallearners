'use client'

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight } from 'lucide-react';

export function SummerForm() {
  const [course, setCourse] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !phone || !course) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName: 'summer',
          name,
          email,
          phone: `${countryCode}${phone}`,
          course,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({
          success: true,
          message: 'Form submitted successfully!'
        });
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setCourse('');
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Failed to submit form. Please try again.'
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
  };

  return (
    <div className="bg-[#131B2E] p-6 sm:p-8  rounded-xl border border-[#4CC9F0]/20 shadow-lg shadow-[#4CC9F0]/5 backdrop-blur-sm max-w-xs sm:max-w-sm md:max-w-md w-full mx-auto">
      <div className="space-y-2 mb-6 sm:mb-8">
        <h2 className="text-[#4CC9F0] text-xl sm:text-2xl font-bold text-center">
          Start Your Journey Today
        </h2>
        <p className="text-gray-400 text-sm sm:text-base text-center font-medium">
          Enquire Now and We&apos;ll Call You Back!
        </p>
      </div>

      {submitStatus.message && (
        <div className={`p-3 mb-4 rounded ${submitStatus.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
          {submitStatus.message}
        </div>
      )}

      <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
        <Input
          placeholder="Full Name*"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#0F1729]/80 border-[#4CC9F0]/20 focus:border-[#4CC9F0]/50 text-white placeholder:text-gray-400"
        />

        <Input
          type="email"
          placeholder="Email*"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#0F1729]/80 border-[#4CC9F0]/20 focus:border-[#4CC9F0]/50 text-white placeholder:text-gray-400"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="+91"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full sm:w-16 bg-[#0F1729]/80 border-[#4CC9F0]/20 focus:border-[#4CC9F0]/50 text-white placeholder:text-gray-400"
          />
          <Input
            placeholder="Phone number*"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-[#0F1729]/80 border-[#4CC9F0]/20 focus:border-[#4CC9F0]/50 text-white placeholder:text-gray-400"
          />
        </div>

        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="bg-[#0F1729]/80 border-[#4CC9F0]/20 focus:border-[#4CC9F0]/50 text-white [&>span]:text-gray-400">
            <SelectValue placeholder="Select Program*" />
          </SelectTrigger>
          <SelectContent className="bg-[#131B2E] border-[#4CC9F0]/20">
            <SelectItem
              value="full-stack"
              className="text-white focus:bg-[#4CC9F0]/20 focus:text-white"
            >
              Summer Training 1
            </SelectItem>
            <SelectItem
              value="data-science"
              className="text-white focus:bg-[#4CC9F0]/20 focus:text-white"
            >
              SummerTraining 2
            </SelectItem>
          </SelectContent>
        </Select>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#4CC9F0] hover:bg-[#4CC9F0]/90 text-white font-medium h-11"
        >
          {isSubmitting ? 'Submitting...' : 'Reserve Your Spot'} 
          {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-400">Already registered? </span>
          <a href="#" className="text-[#4CC9F0] hover:text-[#4CC9F0]/90">
            Sign In
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  );
}
