// /pages/data-science.tsx
import React from "react";
import ToolsCarousel from "@/components/ToolsCarousel";

const DataScienceTools = [
  {

    type: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  },
  {

    type: "https://pandas.pydata.org/static/img/pandas.svg",
  },
  {

    type: "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg",
  },
  {

    type: "https://jupyter.org/assets/main-logo.svg",
  },
];


const DataScienceToolsComponent: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <ToolsCarousel tools={DataScienceTools} />
    </div>
  );
};

export default DataScienceToolsComponent;
