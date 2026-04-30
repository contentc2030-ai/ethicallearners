import CourseAbout from "@/components/CourseAbout";
import Image from "next/image";
import React from "react";
import CyberImage from "@/assets/CyberImage.jpg";
import ToolsCarousel from "@/components/ToolsCarousel";
import Syllabus from "@/components/Syllabus";
import { InstructorCard } from "@/components/instructor-card";             
import { useEffect, useState } from "react";
 



const CyberSecurity: React.FC = () => {
  const [courseAbout, setCourseAbout] = useState({ heading: '', description: '', points: [] });

  useEffect(() => {
    const fetchCourseAbout = async () => {
      try {
        const response = await fetch("/api/course/getCourse");
        const data = await response.json();

        const aboutData = data?.courses?.[0]?.about || { heading: '', description: '', points: [] };

        setCourseAbout(aboutData);
      } catch (error) {
        console.error("Error fetching course about data:", error);
      }
    };

    fetchCourseAbout();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      {/* Page Heading */}
      
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-zinc-100">
        About <span className="text-[#4CC9F0]">{courseAbout.heading}</span> Course
      </h1>

      <p className="text-center text-zinc-100 text-base md:text-lg mb-10">
        {courseAbout.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="w-full">                                                  
          <CourseAbout courseData={courseAbout} />
        </div>

        <div className="flex justify-center w-full">
          <Image
            src={CyberImage}
            alt={courseAbout.heading}
            width={400}
            height={300}
            className="rounded-md shadow-md object-contain"
            priority
          />
        </div>
      </div>
    
      {/* Instructor Card */}
      <InstructorCard />
      {/* Tools Carousel */}
      <CyberSecurityToolsComponent />
      {/* Syllabus */}
      <CyberSecuritySyl />
    </div>
  );
};

const CyberSecurityToolsComponent: React.FC = () => {

  const [tools, setTools] = useState<{  type: string }[]>([]); // State to store tools

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("/api/course/getCourse"); // Fetch API
        const data = await response.json();

        if (data?.courses?.length > 0) {
          setTools(data.courses[0].tools || []); // Extract and set tools
        }
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    fetchTools();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-1 py-4">
      <ToolsCarousel tools={tools} />
    </div>
  );
};

const CyberSecuritySyl: React.FC = () => {
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await fetch("/api/course/getCourse");
        const data = await response.json();

        // Extract modules and format them
        const formattedSyllabus = data?.courses?.[0]?.modules?.map((module: any) => ({
          title: module.name,
          content: module.points, 
        })) || [];

        setSyllabus(formattedSyllabus);
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };

    fetchSyllabus();
  }, []);

  return (
    <div className="bg-gray-900 py-12 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-zinc-100">
          Course Curriculum
        </h1>
        <p className="text-center text-sm md:text-base mb-10">
          Master CyberSecurity concepts and tools to analyze, learn how to provide CyberSecurity, and Ethical Hacking.
        </p>
        {/* Pass the dynamically fetched syllabus */}
        <Syllabus syllabus={syllabus} />
      </div>
    </div>
  );
};

export default CyberSecurity;