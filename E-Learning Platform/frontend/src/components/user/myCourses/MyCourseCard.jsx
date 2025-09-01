import React from "react";
import {
  FaPlay,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyCourseCard = ({ enrollment }) => {
  const navigate = useNavigate();
  const course = enrollment?.course || enrollment?.courseId || {};
  const title = course?.title || "Course";
  const description = course?.description || "";
  const thumbRaw = course?.thumbnail?.url || course?.thumbnail || null;
  const status = (enrollment?.status || "pending").toLowerCase();
  const dateStr = enrollment?.createdAt
    ? new Date(enrollment.createdAt).toLocaleDateString()
    : "";
  const videoCount = course?.videos?.length || 0;

  // Handle thumbnail display
  const getThumbnailUrl = (thumbRaw) => {
    if (!thumbRaw) return null;
    if (/^https?:\/\//i.test(thumbRaw)) return thumbRaw;
    const API_ORIGIN = new URL(import.meta.env.VITE_API_BASE_URL).origin;
    if (thumbRaw.startsWith("/uploads")) return `${API_ORIGIN}${thumbRaw}`;
    if (thumbRaw.startsWith("uploads/")) return `${API_ORIGIN}/${thumbRaw}`;
    return thumbRaw;
  };

  const thumbnail = getThumbnailUrl(thumbRaw);

  const handleContinueCourse = () => {
    if (status === "approved" && course._id) {
      navigate(`/course-videos/${course._id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-700">
      {/* Course Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-full h-full flex items-center justify-center ${
            thumbnail ? "hidden" : "flex"
          }`}
          style={{ display: thumbnail ? "none" : "flex" }}
        >
          <div className="text-center">
            <FaGraduationCap className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Course Preview
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-700">
            <FaCheckCircle className="w-3 h-3 mr-1" />
            Enrolled
          </span>
        </div>

        {/* Play Button Overlay */}
        {status === "approved" && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white bg-opacity-95 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <FaPlay className="w-6 h-6 text-blue-600 ml-1" />
            </div>
          </div>
        )}

        {/* Course Progress Indicator */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
            {videoCount} videos
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#0F2C59] dark:text-blue-400 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <FaBookOpen className="w-4 h-4" />
              {videoCount} videos
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="w-4 h-4" />
              Enrolled {dateStr}
            </span>
          </div>
        </div>

        {/* Success Message */}
        {status === "approved" && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-start">
              <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-green-800 dark:text-green-200 text-sm font-medium mb-1">
                  Enrollment Approved! 🎉
                </p>
                <p className="text-green-700 dark:text-green-300 text-xs">
                  You now have full access to this course. Start learning at
                  your own pace!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          {status === "approved" ? (
            <button
              onClick={handleContinueCourse}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <FaPlay className="w-4 h-4" />
              Continue Learning
              <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-semibold py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "pending" ? "Awaiting Approval" : "Not Available"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
