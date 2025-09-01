import React from "react";
import { FaBookOpen } from "react-icons/fa";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-red-200 dark:border-red-700 p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaBookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
          Unable to Load Courses
        </h3>
        <p className="text-red-600 dark:text-red-400 text-sm mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
