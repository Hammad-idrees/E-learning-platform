import React, { useState } from "react";
import {
  FaArrowLeft,
  FaClock,
  FaVideo,
  FaBookOpen,
  FaGraduationCap,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CourseVideosHeader = ({ course, onBack, videoCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getLevelColor = (level) => {
    const colors = {
      beginner: "bg-green-500 text-white",
      intermediate: "bg-yellow-500 text-white",
      advanced: "bg-red-500 text-white",
      expert: "bg-purple-500 text-white",
    };
    return colors[level?.toLowerCase()] || "bg-blue-500 text-white";
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 px-6 py-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 group"
        >
          <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to My Courses
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-64 h-40 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              {course?.thumbnail?.url && !imageError ? (
                <img
                  src={course.thumbnail.url}
                  alt={course?.title || "Course thumbnail"}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaBookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {course?.title || "Course Videos"}
            </h1>

            {course?.description && (
              <div>
                <p
                  className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                    !isExpanded && course.description.length > 150
                      ? "line-clamp-3"
                      : ""
                  }`}
                >
                  {course.description}
                </p>

                {course.description.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mt-2 inline-flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        Show less <FaChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        Show more <FaChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                <FaVideo className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {videoCount} videos
                </span>
              </div>

              {course?.duration && (
                <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-800">
                  <FaClock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDuration(Math.round(course.duration / 60))}
                  </span>
                </div>
              )}

              {course?.level && (
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseVideosHeader;
