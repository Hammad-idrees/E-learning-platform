import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaStar,
  FaArrowRight,
  FaGraduationCap,
  FaPlay,
} from "react-icons/fa";
import { getPublishedCourses } from "../../../services/courses";
import "./../../../../animations.css";

const resolveUrl = (u) => {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  const base = (import.meta.env?.VITE_API_BASE_URL || "").replace(
    /\/?api\/?$/,
    ""
  );
  return `${base}${u.startsWith("/") ? u : "/" + u}`;
};

const HomeOfferedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredCourse, setHoveredCourse] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getPublishedCourses();
        const all = Array.isArray(res?.data)
          ? res.data
          : res?.data?.data || res?.data || [];
        if (Array.isArray(all) && all.length > 4) {
          const indices = new Set();
          while (indices.size < 4) {
            indices.add(Math.floor(Math.random() * all.length));
          }
          setCourses(Array.from(indices).map((i) => all[i]));
        } else {
          setCourses(all.slice(0, 4));
        }
      } catch {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px]">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <FaGraduationCap className="w-4 h-4" />
              Featured Courses
            </div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2C59] dark:text-white">
                Offered Courses
              </h2>
              {/* Green pulsing light */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>

                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-70 animate-ping"></div>
                  <div className="absolute inset-0 border-2 border-green-300/50 rounded-full animate-pulse"></div>
                </div>
              </div>
              
            </div>
            <p className="text-[#64748B] dark:text-gray-300 text-sm sm:text-base">
              Top picks to start your ACCA journey
            </p>
          </div>
          <div className="hidden sm:block">
            <Link
              to="/courses"
              className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0F2C59] hover:from-[#1E40AF] hover:to-[#082041] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Explore All</span>
              <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="relative rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="w-full h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl" />
                  <div className="mt-6 space-y-4">
                    <div className="h-6 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                    <div className="h-4 w-3/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                    <div className="flex gap-4">
                      <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                      <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="w-full h-64 rounded-2xl border-2 border-dashed border-red-200 dark:border-red-700 flex items-center justify-center text-red-500 bg-red-50/50 dark:bg-red-900/10">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <div className="font-medium">{error}</div>
              <div className="text-sm mt-2 opacity-75">
                Please try again later
              </div>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="w-full h-64 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#64748B] dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="text-center">
              <FaBookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <div className="font-medium">No courses available yet</div>
              <div className="text-sm mt-2 opacity-75">
                Check back soon for new courses
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {courses.map((course, index) => {
              const thumb = resolveUrl(course?.thumbnail?.url);
              const isHovered = hoveredCourse === index;

              return (
                <Link
                  key={course._id}
                  to={`/courses`}
                  className={`group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden shadow-lg transition-all duration-500 ease-out cursor-pointer
                    ${
                      isHovered
                        ? "transform scale-102 shadow-2xl border-blue-200 dark:border-blue-700"
                        : "hover:shadow-xl hover:-translate-y-2"
                    }`}
                  onMouseEnter={() => setHoveredCourse(index)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  {/* Course Image */}
                  <div className="relative w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={course.title}
                        className={`w-full h-full object-contain object-center bg-white dark:bg-gray-800 transition-all duration-700 ${
                          isHovered ? "scale-110" : "scale-100"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <div className="flex flex-col items-center gap-3">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm">No thumbnail</span>
                        </div>
                      </div>
                    )}

                    {/* Overlay Effects */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Play Button */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-110">
                        <FaPlay className="w-6 h-6 text-blue-600 ml-1" />
                      </div>
                    </div>

                    {/* Popular Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/90 dark:bg-gray-900/80 text-[#0F2C59] dark:text-gray-100 shadow-lg backdrop-blur-sm">
                        Popular
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 dark:bg-gray-900/95 rounded-full shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        4.8
                      </span>
                      <FaStar className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-8">
                    {/* Title */}
                    <h3
                      className={`text-xl sm:text-2xl font-semibold text-[#1E293B] dark:text-gray-100 line-clamp-2 leading-tight mb-4 transition-colors duration-300 ${
                        isHovered ? "text-[#2563EB] dark:text-blue-400" : ""
                      }`}
                    >
                      {course.title}
                    </h3>

                    {/* Updated Date */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-[#64748B] dark:text-gray-400">
                        Updated{" "}
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-300 font-medium">
                        ACCA
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#0F2C59] rounded-full transform origin-left transition-all duration-1000 ease-out"
                        style={{
                          width: isHovered ? "100%" : "0%",
                          transitionDelay: isHovered ? "200ms" : "0ms",
                        }}
                      />
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        isHovered
                          ? "bg-gradient-to-r from-[#2563EB] to-[#0F2C59] text-white shadow-lg transform scale-105"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {isHovered ? "Enroll Now" : "Learn More"}
                    </button>
                  </div>

                  {/* Ring Effect */}
                  <div className="absolute inset-0 rounded-3xl ring-0 ring-[#2563EB]/0 group-hover:ring-2 group-hover:ring-[#2563EB]/30 transition-all pointer-events-none" />

                  {/* Floating Elements */}
                  {isHovered && (
                    <>
                      <div className="absolute top-1/3 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
                      <div className="absolute bottom-1/3 -left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-80"></div>
                      <div className="absolute top-2/3 -right-4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-70"></div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0F2C59] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Explore All</span>
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeOfferedCourses;
