'use client'

import React, { useState, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch("/api/course/getCourse"); 
        const data = await response.json();

        console.log("Fetched FAQ Data:", data); // ✅ Debugging log

        // ✅ Ensure we access `frequentQuestions` correctly
        const firstCourse = data.courses && data.courses.length > 0 ? data.courses[0] : null;
        if (firstCourse && firstCourse.frequentQuestions) {
          setFaqData(firstCourse.frequentQuestions);
        } else {
          console.warn("No FAQ data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    }

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-14 text-[#4CC9F0]">
        Frequently Asked Questions
      </h2>
      <div
        className={`space-y-4 ${
          faqData.length > 5 ? "max-h-96 overflow-y-scroll" : ""
        } rounded-md p-4 hide-scrollbar`}
      >
        {faqData.length === 0 ? (
          <p className="text-gray-400 text-center">No FAQs available.</p>
        ) : (
          faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-300 pb-2">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center text-lg font-medium text-zinc-200"
              >
                {item.question}
                <span
                  className={`transform transition-transform duration-200 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-blue-500">{item.answer}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQ;
