import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ToolsCarouselProps {
  tools: { type: string }[];
}

const ToolsCarousel: React.FC<ToolsCarouselProps> = ({ tools=[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Tools You Will Learn</h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Chevron */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-20] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scrollable Tools List */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {tools.map((tool, index) => (
          <div
            key={index}
            className="flex-none w-[200px] h-[100px] p-2 bg-gray-700 border rounded-lg shadow-md text-center flex items-center justify-center"
          >
            <Image
              src={tool.type} 
              alt={`Tool ${index + 1  }`} 
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
        </div>  

        {/* Right Chevron */}
        <button
          onClick={scrollRight}
          className="absolute right-[-20] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ToolsCarousel;
