import React from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaPlay,
  FaEye,
} from "react-icons/fa";

const CourseInfo = ({ course, enrollmentStatus, onBack }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEnrollmentStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getEnrollmentStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Enrolled";
      case "pending":
        return "Pending Approval";
      case "rejected":
        return "Enrollment Rejected";
      default:
        return "Not Enrolled";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Simple Blue Back Button */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm
               hover:bg-blue-700 active:bg-blue-800
               dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700
               transition-all duration-300 ease-in-out"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </button>
      </div>

      {/* Course Header */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Course Thumbnail */}
          <div className="lg:w-1/3">
            <div className="relative h-64 lg:h-80 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
              {course.thumbnail?.url ? (
                <img
                  src={course.thumbnail.url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className={`w-full h-full flex items-center justify-center ${
                  course.thumbnail?.url ? "hidden" : "flex"
                }`}
                style={{ display: course.thumbnail?.url ? "none" : "flex" }}
              >
                <FaBookOpen className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              </div>

              {/* ACCA Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">
                  ACCA
                </span>
              </div>

              {/* Enrollment Status Badge */}
              {enrollmentStatus && enrollmentStatus !== "not_enrolled" && (
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getEnrollmentStatusColor(
                      enrollmentStatus
                    )}`}
                  >
                    {getEnrollmentStatusText(enrollmentStatus)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Course Details */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0F2C59] dark:text-blue-400 leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-[#64748B] dark:text-gray-300 leading-relaxed">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaPlay className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">
                    {course.videos?.length || 0} Videos
                  </span>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaCalendarAlt className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">
                    Created {formatDate(course.createdAt)}
                  </span>
                </div>

                {course.tableOfContent && course.tableOfContent.length > 0 && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <FaBookOpen className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">
                      {course.tableOfContent.length} Chapters
                    </span>
                  </div>
                )}
              </div>

              {/* Course Access Info */}
              <div className="pt-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <FaEye className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-1">
                        Course Preview Available
                      </p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        You can view all course details, table of contents, and
                        video information.
                        {enrollmentStatus === "approved"
                          ? " You're enrolled and can watch all videos!"
                          : enrollmentStatus === "pending"
                          ? " Your enrollment is pending approval."
                          : enrollmentStatus === "rejected"
                          ? " Your enrollment was not approved."
                          : " Enroll in this course to watch the full videos."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Status Info */}
              {enrollmentStatus && enrollmentStatus !== "not_enrolled" && (
                <div className="pt-2">
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-lg ${getEnrollmentStatusColor(
                      enrollmentStatus
                    )}`}
                  >
                    <span className="font-medium">
                      {getEnrollmentStatusText(enrollmentStatus)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
