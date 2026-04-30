import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { useState, JSX, useEffect } from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useCourseStore } from "@/store/courseStore";

interface Course {
  image: string;
  name: string;
  description: string;
  instock: boolean;
  price: string;
  rating: string;
  duration: number; // Added duration property
}

const renderStars = (rating: number): JSX.Element[] => {
  const stars: JSX.Element[] = [];
  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 !== 0; // Checks for half-star

  for (let i = 0; i < fullStars; i++) {
    stars.push(<IoIosStar key={i} className="text-xl text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(
      <IoIosStarHalf key="half" className="text-xl text-yellow-400" />,
    );
  }

  // Fill remaining with outlined stars if needed
  while (stars.length < 5) {
    stars.push(
      <IoIosStarOutline
        key={`empty-${stars.length}`}
        className="text-xl text-yellow-400"
      />,
    );
  }

  return stars;
};

const CoursePage: React.FC = () => {
  // const allCourses: Course[] = [
  //   { image: "/placeholder.svg", name: "Cyber Security", description: "Cyber Security", price: "499$", instock: true, rating: "4.5/5" },
  //   { image: "/placeholder.svg", name: "Web Development", description: "Web Development", price: "499$", instock: true, rating: "4.6/5"  },
  //   { image: "/placeholder.svg", name: "Data Science", description: "Data Science", price: "499$", instock: true, rating: "4.2/5"  },
  //   { image: "/placeholder.svg", name: "AI/ML", description: "AI & Machine Learning", price: "499$", instock: true, rating: "4.1/5"  },
  //   { image: "/placeholder.svg", name: "Django Flask Framework", description: "Frameworks", price: "499$", instock: true, rating: "4.5/5"  },
  //   { image: "/placeholder.svg", name: "Python", description: "Python Programming", price: "499$", instock: true, rating: "4.8/5"  },
  //   { image: "/placeholder.svg", name: "TypeScript", description: "Tutorial For Beginners", price: "499$", instock: true, rating: "4.6/5"  },
  //   { image: "/placeholder.svg", name: "JavaScript", description: "Basic to Advanced", price: "499$", instock: true, rating: "4.9/5"  },
  //   { image: "/placeholder.svg", name: "Python", description: "Python Programming", price: "499$", instock: true, rating: "4.8/5"  },
  //   { image: "/placeholder.svg", name: "TypeScript", description: "Tutorial For Beginners", price: "499$", instock: true, rating: "4.6/5"  },
  //   { image: "/placeholder.svg", name: "JavaScript", description: "Basic to Advanced", price: "499$", instock: true, rating: "4.9/5"  },
  // ];

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const setSelectedCourse = useCourseStore((state) => state.setSelectedCourse);

  const router = useRouter();

  const handleExplore = (course) => {
    setSelectedCourse(course);
    router.push(`/pages/courses/${course.id}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/course/getCourse");
        const data = await response.json();
        setAllCourses(data?.courses || []); // Update the state with the fetched data  //
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(allCourses);
  }, [allCourses]);

  const loadMoreCourses = () => {
    setVisibleCourses((prev) => Math.min(prev + 8, filteredCourses.length));
  };

  const showLessCourses = () => {
    setVisibleCourses(8); //set visible courses on default screen
  };

  const filterCourses = (courseName: string | null) => {
    if (courseName) {
      setFilteredCourses(
        allCourses.filter((course) => course.name === courseName),
      );
      setSelectedFilter(courseName);
      setVisibleCourses(allCourses.length); // filtered results
    } else {
      setFilteredCourses(allCourses);
      setSelectedFilter(null);
      setVisibleCourses(8);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0F1729] flex flex-col items-center p-6">
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left gap-3">
        {/* Title Section - Aligned to the Left */}
        <div className="w-full md:w-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4CC9F0] xl:mr-20">
            Our Courses <br />
            <span className="text-sm md:text-sm text-white font-normal">
              Check out the list below to enhance your skills.
            </span>
          </h2>
        </div>

        {/* Filter Dropdown - Aligned to the Right */}
        <div className="w-full md:w-auto flex justify-end">
          <select
            className="px-4 py-2 w-full md:w-auto rounded-md bg-[#2A3A56] text-white border border-[#4CC9F0] cursor-pointer"
            onChange={(e) => filterCourses(e.target.value || null)}
            value={selectedFilter || ""}>
            <option value="">All Courses</option>
            {allCourses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {allCourses.length > 0 ? (
    allCourses.map((course, index) => (
      <div key={index} className="border rounded-lg shadow-md p-4 bg-gray-800 text-white">
        
        <div className="relative w-full h-48">
          <Image 
            src={course.image} 
            alt={course.name} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>

        
        <h3 className="text-xl font-semibold mt-4">{course.name}</h3>
        <p className="text-gray-400">{course.description}</p>
        <p className="mt-2"><strong>Price:</strong> ${course.price}</p>
        <p className="mt-1"><strong>Rating:</strong> ⭐{course.rating}</p>
        <p className="mt-1"><strong>Duration:</strong> {course.duration} hours</p>
        <p className={`mt-1 font-bold ${course.instock ? "text-green-500" : "text-red-500"}`}>
          {course.instock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    ))
  ) : (
    <p className="text-white text-center col-span-full">Loading courses...</p>
  )}
</div> */}

      {/* Course Grid */}

      <div className="w-full flex flex-wrap justify-center gap-5 mt-6">
        {filteredCourses.slice(0, visibleCourses).map((elem, index) => (
          <div
            key={index}
            className="w-80 bg-zinc-100 rounded-md overflow-hidden shadow-lg border border-[#2A3A56] hover:border-[#4CC9F0]">
            <div className="relative w-full h-40">
              <Image
                src={elem.image}
                alt={elem.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="w-full px-3 py-4 bg-[#2A3A56]">
              <h3 className="font-semibold text-white">{elem.name}</h3>
              <p className="text-xs mt-2 text-gray-400">{elem.description}</p>
              {/* Price of courses */}

              {/* Ratings & Stars */}
              <div className="flex items-center justify-between mt-2 text-md font-semibold">
                {/* Left: Stars and Rating */}
                <div className="flex items-center">
                  {renderStars(4.8)}
                  <span className="ml-2 text-yellow-400">{elem.rating}</span>
                </div>

                {/* Right: Price */}
                <p className="text-lg text-gray-100 font-semibold">
                  ₹{elem.price}
                </p>
              </div>

              <p className="text-xs mt-2 text-gray-400 font-semibold">
                ⏳ Duration: 6 Weeks
              </p>

              <button
                className="px-3 py-1 text-center mt-2 rounded bg-[#3AB8E0] text-md flex justify-center text-white w-full hover:bg-[#4CC9F0]/70 transition"
                onClick={() => {
                  handleExplore(elem);
                }}>
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {visibleCourses < filteredCourses.length && (
          <button
            onClick={loadMoreCourses}
            className="px-6 py-2 rounded bg-[#4CC9F0] text-white text-lg font-semibold hover:bg-[#3AB8E0] transition">
            See More
          </button>
        )}
        {visibleCourses > 8 && (
          <button
            onClick={showLessCourses}
            className="px-6 py-2 rounded bg-red-500 text-white text-lg font-semibold hover:bg-red-400 transition">
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
