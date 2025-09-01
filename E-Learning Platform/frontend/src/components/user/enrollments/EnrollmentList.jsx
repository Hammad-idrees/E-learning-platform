import React from "react";
import EnrollmentCard from "./EnrollmentCard";

const EnrollmentList = ({ enrollments = [] }) => {
  if (!Array.isArray(enrollments) || enrollments.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Header with count */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-[#2563EB] to-[#1d4ed8] rounded-full"></div>
        <h2 className="text-lg font-semibold text-[#1E293B] dark:text-gray-200">
          Your Enrollments
        </h2>
        <span className="px-3 py-1 bg-[#2563EB] text-white rounded-full text-sm font-medium">
          {enrollments.length}
        </span>
      </div>

      {/* Cards Grid with stagger animation */}
      <div className="grid gap-6">
        {enrollments.map((e, index) => (
          <div
            key={
              e._id ||
              `${e.courseId || "course"}-${e.createdAt || Math.random()}`
            }
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <EnrollmentCard enrollment={e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentList;
