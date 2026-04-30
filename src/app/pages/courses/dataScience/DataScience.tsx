import CourseAbout from "@/components/CourseAbout";
import Image from "next/image";
import React from "react";
import DataScienceImage from "@/assets/DataScienceImage.jpg";
import ToolsCarousel from "@/components/ToolsCarousel";
import Syllabus from "@/components/Syllabus";


const dataScienceData = [
  {
    title: "Introduction to Data Science",
    description: "Learn the core concepts of data science and how to analyze data effectively, ", 
  },
  {
    title: "Data Wrangling",
    description: "Understand how to clean and prepare data for analysis.",
  },
  {
    title: "Machine Learning Basics",
    description: "Explore the basics of machine learning and predictive modeling.",
  },
  {
    title: "Introduction to Data Science",
    description: "Learn the core concepts of data science and how to analyze data effectively.",
  },
  {
    title: "Data Wrangling",
    description: "Understand how to clean and prepare data for analysis.",
  },
  {
    title: "Machine Learning Basics",
    description: "Explore the basics of machine learning and predictive modeling.",
  },
];
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
  {
    type: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  },
  {
    type: "https://pandas.pydata.org/static/img/pandas.svg",
  },
];

const dataScienceSyllabus = [
  
    {
      title: "Introduction to Data Science",
      content: [
        "What is Data Science?",
        "Role of Data Scientists in the Industry",
        "Overview of the Data Science Lifecycle",
        "Applications of Data Science in Different Domains",
        "Introduction to Tools: Python, R, Jupyter Notebooks, etc.",
        "Setting up the Data Science Environment",
        "Role of Data Scientists in the Industry",
        "Overview of the Data Science Lifecycle",
        "Applications of Data Science in Different Domains",
        "Introduction to Tools: Python, R, Jupyter Notebooks, etc.",
        "Setting up the Data Science Environment",
      ],
    },
    {
      title: "Data Wrangling and Preprocessing",
      content: [
        "Understanding Data Types and Structures",
        "Data Cleaning Techniques: Handling Missing and Duplicate Data",
        "Exploratory Data Analysis (EDA): Descriptive Statistics and Visualization",
        "Data Transformation and Feature Scaling",
        "Introduction to Pandas and NumPy for Data Manipulation",
        "Working with Time-Series and Text Data",
      ],
    },
    {
      title: "Data Visualization and Communication",
      content: [
        "Principles of Effective Data Visualization",
        "Creating Visualizations with Matplotlib and Seaborn",
        "Interactive Visualization with Plotly and Dash",
        "Building Dashboards for Data Insights",
        "Visual Storytelling and Communication",
        "Case Studies in Data Visualization",
      ],
    },
    {
      title: "Introduction to Machine Learning",
      content: [
        "What is Machine Learning? Types of Machine Learning",
        "Supervised Learning: Regression and Classification",
        "Unsupervised Learning: Clustering and Dimensionality Reduction",
        "Introduction to Scikit-learn and TensorFlow",
        "Building and Evaluating Machine Learning Models",
        "Overfitting and Regularization Techniques",
      ],
    },
    {
      title: "Advanced Machine Learning Techniques",
      content: [
        "Introduction to Neural Networks and Deep Learning",
        "Working with Natural Language Processing (NLP)",
        "Ensemble Learning: Bagging, Boosting, and Stacking",
        "Time-Series Forecasting and Applications",
        "Introduction to Reinforcement Learning",
        "Deploying Machine Learning Models into Production",
      ],
    },
    {
      title: "Big Data and Real-World Applications",
      content: [
        "Introduction to Big Data and Hadoop",
        "Working with Apache Spark for Big Data Processing",
        "Data Science in the Cloud: AWS, Google Cloud, and Azure",
        "Building Recommendation Systems",
        "Case Studies: Solving Real-World Data Science Problems",
        "Data Science Ethics and Best Practices",
      ],
    },
  ];
  
  



const DataScience: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14 ">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-zinc-100">
        About <span className="text-[#4CC9F0]">Data Science</span> Course
      </h1>

      {/* Brief Description */}
      <p className="text-center text-zinc-100 text-lg mb-10">
        Dive into the world of data science, where you will learn to analyze, model, and derive insights 
        from complex datasets to solve real-world problems.
      </p>

      {/* Course Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* <CourseAbout courseData={dataScienceData} /> */}
        {/* Custom Image */}
        <Image
          src={DataScienceImage}
          alt="Data Science"
          width={600}
          height={400}
          className="rounded-md shadow-md"
          priority
        />
      </div>

      
      {/* Tools Carousel */}
      <DataScienceToolsComponent />
      <DataScienceSyl />
    </div>
  );
};

const DataScienceToolsComponent: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-1 py-4">
      <ToolsCarousel tools={DataScienceTools} />
    </div>
  );
};


const DataScienceSyl: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-12 text-zinc-100 ">
      <div className="max-w-6l mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-zinc-100">
          Course Curriculum
        </h1>
        <p className="text-center mb-10">
          Master data science concepts and tools to analyze, visualize, and model data effectively.
        </p>
        <Syllabus syllabus={dataScienceSyllabus} />
      </div>
    </div>
  );
};


export default DataScience;



