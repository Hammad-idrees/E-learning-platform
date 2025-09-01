import React from "react";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaBookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F2C59] dark:text-blue-400 mb-3">
          No Courses Yet
        </h3>
        <p className="text-[#64748B] dark:text-gray-400 text-lg mb-6">
          You haven't enrolled in any courses yet. Start your learning journey
          by exploring our available courses!
        </p>
        <div className="space-y-3">
          <a
            href="/courses"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold group"
          >
            <FaBookOpen className="w-5 h-5 mr-2" />
            Browse Available Courses
            <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/enrollments"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            View My Enrollments
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
