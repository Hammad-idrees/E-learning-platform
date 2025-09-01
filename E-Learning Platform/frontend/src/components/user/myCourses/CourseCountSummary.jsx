import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const CourseCountSummary = ({ count = 0 }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-400">
          Your Enrolled Courses ({count})
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaCheckCircle className="w-4 h-4 text-green-500" />
          <span>All courses approved and ready to learn</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCountSummary;
