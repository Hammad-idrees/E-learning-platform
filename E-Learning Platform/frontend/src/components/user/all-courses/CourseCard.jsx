import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  Clock,
  X,
  Star,
  Play,
  Users,
  Target,
} from "lucide-react";
import {
  requestEnrollment,
  getEnrollmentStatus,
} from "../../../services/enrollments";
import toast from "react-hot-toast";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const pollingIntervalRef = useRef(null);

  // Check enrollment status on component mount
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      try {
        setLoadingStatus(true);
        const response = await getEnrollmentStatus(course._id);
        const newStatus = response.data?.status || "not_enrolled";
        setEnrollmentStatus(newStatus);

        // If status changed from pending to approved, show notification
        if (newStatus === "approved" && enrollmentStatus === "pending") {
          toast.success(
            `Your enrollment for "${course.title}" has been approved!`
          );
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
        setEnrollmentStatus("not_enrolled");
      } finally {
        setLoadingStatus(false);
      }
    };

    checkEnrollmentStatus();

    // Set up polling for status updates (every 30 seconds)
    pollingIntervalRef.current = setInterval(checkEnrollmentStatus, 30000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [course._id, course.title, enrollmentStatus]);

  const handleEnroll = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking enroll button
    try {
      setEnrolling(true);
      await requestEnrollment(course._id);
      setEnrollmentStatus("pending");
      // Removed manual toast.success since axios interceptor handles it
    } catch (error) {
      console.error("Enrollment error:", error);
      const message =
        error.response?.data?.message || "Failed to submit enrollment request";
      toast.error(message);
    } finally {
      setEnrolling(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/course/${course._id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Render button based on enrollment status
  const renderActionButton = () => {
    if (loadingStatus) {
      return (
        <button
          disabled
          className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </button>
      );
    }

    switch (enrollmentStatus) {
      case "pending":
        return (
          <button
            disabled
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Clock className="w-4 h-4" />
            Pending Approval
          </button>
        );

      case "approved":
        return (
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl">
            <Play className="w-4 h-4" />
            Access Course
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        );

      case "rejected":
        return (
          <button
            disabled
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <X className="w-4 h-4" />
            Enrollment Rejected
          </button>
        );

      default: // not_enrolled
        return (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/btn shadow-lg hover:shadow-xl"
          >
            {enrolling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enrolling...
              </>
            ) : (
              <>
                Enroll Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        );
    }
  };

  return (
    <div
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-blue-200/30 dark:border-slate-700/50 hover:scale-[1.02] hover:border-blue-300/50"
      onClick={handleCardClick}
    >
      {/* Course Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
        {course.thumbnail?.url ? (
          <img
            src={course.thumbnail.url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
          <BookOpen className="w-16 h-16 text-blue-400 dark:text-blue-300" />
        </div>

        {/* ACCA Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <Target className="w-3 h-3 mr-1" />
            ACCA
          </span>
        </div>

        {/* Enrollment Status Badge */}
        {enrollmentStatus && enrollmentStatus !== "not_enrolled" && (
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${
                enrollmentStatus === "approved"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : enrollmentStatus === "pending"
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white"
              }`}
            >
              {enrollmentStatus === "approved" && (
                <Check className="w-3 h-3 mr-1" />
              )}
              {enrollmentStatus === "pending" && (
                <Clock className="w-3 h-3 mr-1" />
              )}
              {enrollmentStatus === "rejected" && (
                <X className="w-3 h-3 mr-1" />
              )}
              {enrollmentStatus.charAt(0).toUpperCase() +
                enrollmentStatus.slice(1)}
            </span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Date */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#0F2C59] dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {course.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2 text-blue-400" />
            <span>Created {formatDate(course.createdAt)}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {showDescription
              ? course.description
              : truncateText(course.description, 120)}
          </p>

          {course.description.length > 120 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDescription(!showDescription);
              }}
              className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              {showDescription ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Read more
                </>
              )}
            </button>
          )}
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            {/* Course level indicator */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Professional</span>
            </div>
            {/* Estimated duration */}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Self-paced</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div onClick={(e) => e.stopPropagation()}>{renderActionButton()}</div>
      </div>
    </div>
  );
};

export default CourseCard;
