interface CourseAboutProps {
  courseData: {
    heading: string;
    description: string;
    points: { heading: string; description: string }[];
  };
}

const CourseAbout: React.FC<CourseAboutProps> = ({ courseData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-center">    
      {/* Course Details */}
      <div>
        <h2 className="font-bold text-xl">{courseData.heading}</h2>
        <p className="text-gray-600 mb-4">{courseData.description}</p>
        {courseData.points.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-lg">{item.heading}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseAbout;
