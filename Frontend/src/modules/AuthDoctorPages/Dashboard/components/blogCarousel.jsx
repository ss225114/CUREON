import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendar,
  FaUser,
  FaClock,
  FaBookOpen,
} from "react-icons/fa";
import { useDashboard } from "../context/dashboardContext";

export default function BlogCarousel() {
  const { blogs } = useDashboard();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length,
    );
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-900/20 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Carousel Navigation */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              onClick={prevSlide}
              size="icon"
              variant="outline"
              className="h-5 w-5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"
            >
              <FaChevronLeft className="h-2 w-2" />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              variant="outline"
              className="h-5 w-5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"
            >
              <FaChevronRight className="h-2 w-2" />
            </Button>
          </div>

          {/* Carousel Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBookOpen className="h-5 w-5 text-[#293379] dark:text-blue-400" />
              <h2 className="text-xl font-bold text-[#293379] dark:text-white">
                Medical Insights & Updates
              </h2>
            </div>

            {blogs.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Featured Blog */}
                <div
                  className="lg:col-span-2 rounded-xl overflow-hidden relative group cursor-pointer"
                  onClick={() => window.open("#", "_blank")}
                >
                  <div
                    className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:cursor-pointer"
                    style={{
                      backgroundImage: `url(${blogs[currentIndex].image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-[#293379] dark:bg-blue-600 rounded-full text-xs font-medium">
                        {blogs[currentIndex].category}
                      </span>
                      <div className="flex items-center gap-1 text-sm">
                        <FaCalendar className="h-3 w-3" />
                        {formatDate(blogs[currentIndex].date)}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {blogs[currentIndex].title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <FaUser className="h-3 w-3" />
                        {blogs[currentIndex].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="h-3 w-3" />
                        {blogs[currentIndex].readTime} read
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Blogs */}
                <div className="space-y-4">
                  {blogs.slice(0, 3).map((blog, index) => (
                    <div
                      key={blog.id}
                      className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                        index === currentIndex
                          ? "border-[#293379] dark:border-blue-600 bg-blue-50/50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-16 w-16 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${blog.image})` }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                              {blog.category}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(blog.date)}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                            {blog.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {blogs.slice(0, 4).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-[#293379] dark:bg-blue-600"
                      : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
