import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface SyllabusItem {
  title: string;
  content: string[];
}

interface SyllabusProps {
  syllabus: SyllabusItem[];
}

const Syllabus: React.FC<SyllabusProps> = ({ syllabus }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const handleModuleClick = (index: number) => {
    setActiveModule(activeModule === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 ">
      {/* Left Section: Module List */}
      <div className="space-y-4">
      {syllabus.map((item, index) => (
    <div
      key={index}
      onClick={() => handleModuleClick(index)}
      className={`p-4 cursor-pointer border${
        activeModule === index ? " border-[#4CC9F0]" : " border-gray-300"
      } rounded-md shadow-md hover:border-[#4CC9F0]`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-800 md:text-zinc-100">
          {`Module ${index + 1}: ${item.title}`}
        </h3>
        <FaArrowRight
          className={`inline-block ml-2 transition-transform transform ${
            activeModule === index ? "text-[#4CC9F0]" : "text-gray-500"
          }`}
        />
      </div>
    </div>
  ))}
</div>


        

      {/* Right Section: Module Content */}
      <div>
        {activeModule !== null && (
          <div className="p-4 border border-gray-300 rounded-md shadow-md bg-gray-100 md:bg-gray-800">
            <h3 className="text-lg font-bold mb-2 text-[#4CC9F0]">
              {`Module ${activeModule + 1}: ${syllabus[activeModule].title}`}
            </h3>
            <ul className="list-disc list-inside space-y-1 text-zinc-800 md:text-zinc-100">
              {syllabus[activeModule].content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Syllabus;
