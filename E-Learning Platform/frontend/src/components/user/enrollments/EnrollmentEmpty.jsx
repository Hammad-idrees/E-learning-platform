import React from "react";

const EnrollmentEmpty = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-12 text-center group hover:shadow-lg transition-all duration-300">
      <div className="max-w-md mx-auto">
        {/* Animated Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-full flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg
              className="w-10 h-10 text-white animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {/* Floating circles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
          <div
            className="absolute -bottom-1 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-70"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <h3 className="text-2xl font-bold text-[#1E293B] dark:text-gray-200 mb-3 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
          No Enrolled Courses Yet
        </h3>
        <p className="text-[#64748B] dark:text-gray-400 mb-8 leading-relaxed">
          Start your learning journey by enrolling in your first course and
          unlock endless possibilities!
        </p>

        {/* Enhanced Button */}
        <a
          href="/courses"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white rounded-xl hover:from-[#0F2C59] hover:to-[#1e3a8a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Browse Courses
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default EnrollmentEmpty;
