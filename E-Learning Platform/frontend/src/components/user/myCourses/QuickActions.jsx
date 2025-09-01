import React from "react";
import { FaBookOpen, FaCheckCircle, FaHeadset } from "react-icons/fa";

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mt-6">
      <h3 className="text-lg font-semibold text-[#0F2C59] dark:text-blue-400 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Browse Courses */}
        <a
          href="/courses"
          className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
        >
          <FaBookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <p className="font-medium text-[#0F2C59] dark:text-blue-400">
              Browse More Courses
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discover new learning opportunities
            </p>
          </div>
        </a>

        {/* View Enrollments */}
        <a
          href="/enrollments"
          className="flex items-center p-4 bg-green-60 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
        >
          <FaCheckCircle className="w-6 h-6 text-green-700 dark:text-green-400 mr-3" />
          <div>
            <p className="font-medium text-[#0F2C59] dark:text-blue-400">
              View Enrollments
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check your enrollment status
            </p>
          </div>
        </a>

        {/* Support */}
        <a
          href="/support"
          className="flex items-center p-4 
             bg-purple-50 dark:bg-purple-900/20 
             rounded-lg 
             hover:bg-purple-100 dark:hover:bg-purple-800/40 
             transition-colors group"
        >
          <FaHeadset className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 transition-colors group-hover:text-purple-700 dark:group-hover:text-purple-300" />
          <div>
            <p className="font-medium text-[#0F2C59] dark:text-blue-400 group-hover:text-purple-800 dark:group-hover:text-purple-200">
              Support
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300">
              Get help with your courses
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default QuickActions;
