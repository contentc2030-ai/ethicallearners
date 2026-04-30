// /components/ToolCard.tsx
import React from "react";
import Image from "next/image";

interface ToolCardProps {
  image: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ image }) => {
  return (
    <div className="flex-none bg-gray-700 p-4 rounded-lg shadow-md min-w-[200px] text-center">
      <Image
        src={image}
        alt="Tool"
        width={150}
        height={100}
        className="rounded-md mx-auto"
        priority
      />
      {/* <h3 className="text-sm font-medium text-gray-100 mt-2">{name}</h3> */}
    </div>
  );
};

export default ToolCard;
