import React from "react";
import {
  FaCheck,
  FaClock,
  FaTimes,
  FaCalendarAlt,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

const StatusBadge = ({ status = "pending" }) => {
  const getStatusConfig = (status) => {
    const configs = {
      approved: {
        bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        icon: <FaCheck className="w-3 h-3" />,
        text: "Approved",
      },
      pending: {
        bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        icon: <FaClock className="w-3 h-3" />,
        text: "Pending",
      },
      rejected: {
        bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        icon: <FaTimes className="w-3 h-3" />,
        text: "Rejected",
      },
    };
    return configs[status] || configs.pending;
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg}`}
    >
      {config.icon}
      {config.text}
    </span>
  );
};

const EnrollmentCard = ({ enrollment }) => {
  const course = enrollment?.course || enrollment?.courseId || {};
  const title = course?.title || "Course";
  const thumbnail = course?.thumbnail?.url || null;
  const status = (enrollment?.status || "pending").toLowerCase();
  const dateStr = enrollment?.createdAt
    ? new Date(enrollment.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const rejectionReason = enrollment?.rejectionReason || "";

  const getStatusMessage = () => {
    const messages = {
      pending: {
        text: "Your enrollment request is under review.",
        color: "text-yellow-700 dark:text-yellow-300",
      },
      approved: {
        text: "Access granted! You can now start learning.",
        color: "text-green-700 dark:text-green-300",
      },
      rejected: {
        text: `Request declined${
          rejectionReason ? `: ${rejectionReason}` : "."
        }`,
        color: "text-red-700 dark:text-red-300",
      },
    };
    return messages[status] || messages.pending;
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail Section */}
        <div className="w-full sm:w-72 h-48 sm:h-52 bg-gray-100 dark:bg-gray-700 flex-shrink-0 overflow-hidden relative flex items-center justify-center p-4">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
            <FaBookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Hover overlay for approved courses - removed black overlay, just show arrow */}
          {status === "approved" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                <FaArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaCalendarAlt className="w-3 h-3" />
                <span>Enrolled on {dateStr}</span>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Status Message */}
          <div
            className={`mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border-l-4 ${
              status === "approved"
                ? "border-green-500"
                : status === "pending"
                ? "border-yellow-500"
                : "border-red-500"
            }`}
          >
            <p className={`font-medium ${statusMessage.color}`}>
              {statusMessage.text}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between">
            {status === "approved" ? (
              <a
                href="/my-courses"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Continue Learning
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <button
                disabled
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  status === "pending"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                }`}
              >
                {status === "pending" ? "Awaiting Approval" : "Not Available"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;
