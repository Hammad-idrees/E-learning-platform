import React from "react";
import { FaCheckCircle, FaBookOpen } from "react-icons/fa";

const SuccessNote = ({ courseCount = 0 }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 mb-6">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            🎉 Welcome to Your Learning Journey!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-3">
            Congratulations! Your enrollment has been successfully approved by
            our admin team. You now have full access to all course content,
            including videos, materials, and resources.
          </p>
          <div className="flex items-center gap-4 text-sm text-green-600 dark:text-green-400">
            <span className="flex items-center gap-1">
              <FaBookOpen className="w-4 h-4" />
              {courseCount} course{courseCount !== 1 ? "s" : ""} available
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="w-4 h-4" />
              Full access granted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessNote;
