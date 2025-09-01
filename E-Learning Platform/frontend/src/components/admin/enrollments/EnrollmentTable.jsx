import React from "react";
import { Loader2 } from "lucide-react";

const EnrollmentTable = ({
  enrollments,
  loading,
  onApprove,
  onReject,
  onDelete,
}) => {
  const getStatusBadge = (status) => {
    const baseClasses = "px-2.5 py-1 rounded-full text-xs font-semibold border";
    switch (status) {
      case "pending":
        return `${baseClasses} bg-yellow-50 text-yellow-700 border-yellow-200`;
      case "approved":
        return `${baseClasses} bg-green-50 text-green-700 border-green-200`;
      case "rejected":
        return `${baseClasses} bg-red-50 text-red-700 border-red-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderUser = (user) => {
    if (Array.isArray(user)) user = user[0];
    if (user && typeof user === "object") {
      const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
      return (
        <>
          <div className="text-sm font-medium text-[#0f172a]">
            {name || user.email || "Unknown Student"}
          </div>
          <div className="text-sm text-gray-500">{user.email || ""}</div>
        </>
      );
    }
    if (typeof user === "string") {
      return <div className="text-sm font-medium text-[#0f172a]">{user}</div>;
    }
    return (
      <div className="text-sm font-medium text-[#0f172a]">Unknown Student</div>
    );
  };

  const renderCourse = (course) => {
    if (Array.isArray(course)) course = course[0];
    if (course && typeof course === "object") {
      return (
        <>
          <div className="text-sm font-medium text-[#0f172a]">
            {course.title || "Unknown Course"}
          </div>
          <div className="text-sm text-gray-500">
            {course.description
              ? `${course.description.substring(0, 50)}...`
              : ""}
          </div>
        </>
      );
    }
    if (typeof course === "string") {
      return <div className="text-sm font-medium text-[#0f172a]">{course}</div>;
    }
    return (
      <div className="text-sm font-medium text-[#0f172a]">Unknown Course</div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-6 w-6 text-[#2563eb] animate-spin" />
        <div className="mt-3 text-sm text-[#64748b]">
          Loading enrollments...
        </div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
        <p className="text-gray-600">No enrollments found for this status.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="min-w-full bg-white">
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Course
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Enrolled Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {enrollments.map((enrollment) => (
            <tr
              key={enrollment._id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                {renderUser(enrollment.user)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {renderCourse(enrollment.course)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusBadge(enrollment.status)}>
                  {enrollment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(enrollment.createdAt || enrollment.enrolledAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex flex-wrap gap-2">
                  {enrollment.status === "pending" && (
                    <>
                      <button
                        onClick={() => onApprove(enrollment)}
                        className="px-3 py-1.5 bg-[#22c55e] text-white rounded-lg hover:bg-[#16a34a] transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(enrollment)}
                        className="px-3 py-1.5 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDelete(enrollment)}
                    className="px-3 py-1.5 bg-[#1e293b] text-white rounded-lg hover:bg-[#334155] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentTable;
