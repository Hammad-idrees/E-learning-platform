import React, { useEffect, useState } from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import CoursesGrid from "../../components/user/all-courses/CoursesGrid";
import CoursesHero from "../../components/user/all-courses/CoursesHero";
import CoursesFilters from "../../components/user/all-courses/CoursesFilters";
import EnrollmentProcessInfo from "../../components/user/all-courses/EnrollmentProcessInfo";
import { getPublishedCourses } from "../../services/courses";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPublishedCourses();
        const coursesData = Array.isArray(response?.data)
          ? response.data
          : response?.data?.data || [];
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, sortBy]);

  // Calculate course stats
  const stats = {
    total: courses.length,
    available: courses.filter((course) => !course.isFull).length,
    featured: courses.filter((course) => course.isFeatured).length,
    categories: [...new Set(courses.map((course) => course.category))].length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <StudentHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="relative mb-8">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl"></div>
          </div>

          {/* Main Header Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Learning Hub
            </div>

            {/* Main Title */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2C59] dark:text-white mb-4 leading-tight flex items-center justify-center lg:justify-start gap-3 animate-float">
                <span>Explore Our</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  ACCA Courses
                </span>
                {/* Icon with text animation */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </h1>

              <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                Discover comprehensive ACCA courses designed to accelerate your
                professional growth. Choose from our carefully curated
                curriculum and start your journey to success.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Total Courses */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.total}
                    </div>
                    <div className="text-sm text-[#64748B] dark:text-gray-400">
                      Total Courses
                    </div>
                  </div>
                </div>
              </div>

              {/* Available */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.available}
                    </div>
                    <div className="text-sm text-[#64748B] dark:text-gray-400">
                      Available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <CoursesFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalCourses={filteredCourses.length}
          />
        </div>

        {/* Content Section */}
        <div className="mb-8">
          {error && (
            <div className="bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          <CoursesGrid
            courses={filteredCourses}
            loading={loading}
            error={error}
          />
        </div>

        {/* Enrollment Process Information */}
        <EnrollmentProcessInfo />
      </main>

      <StudentFooter />
    </div>
  );
};

export default Courses;
