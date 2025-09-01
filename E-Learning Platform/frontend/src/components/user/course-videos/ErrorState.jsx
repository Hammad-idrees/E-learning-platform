import React from "react";
import { FaExclamationTriangle, FaSync } from "react-icons/fa";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {error ||
            "We couldn't load the course videos. Please try again or contact support if the problem persists."}
        </p>

        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSync className="w-4 h-4" />
            Try Again
          </button>

          <div className="text-sm text-gray-500">
            <p>If the problem continues, please:</p>
            <ul className="mt-2 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Refresh the page</li>
              <li>• Contact support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
