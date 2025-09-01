import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Auto redirect countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div
        className={`max-w-2xl w-full text-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          {/* Icon Section */}
          <div
            className={`transition-all duration-800 delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8">
              <svg
                className="w-12 h-12 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v3m0-3h3m-3 0H9m-4-8V9a4 4 0 118 0v2.5M7 13h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                />
              </svg>
            </div>
          </div>

          {/* Error Code */}
          <div
            className={`transition-all duration-800 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-8xl md:text-9xl font-black text-gray-200 dark:text-gray-700 mb-4 select-none">
              403
            </div>
          </div>

          {/* Title */}
          <div
            className={`transition-all duration-800 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h1>
          </div>

          {/* Description */}
          <div
            className={`transition-all duration-800 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
              You don't have permission to access this page.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-8">
              Please contact your administrator if you believe this is an error,
              or return to the homepage to continue browsing.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`transition-all duration-800 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#2563EB] hover:bg-[#0F2C59] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go to Homepage
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>

          {/* Auto-redirect Notice */}
          <div
            className={`mt-8 transition-all duration-800 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Redirecting to homepage in {countdown} seconds
                </span>
              </div>
            </div>
          </div>

          {/* Additional Help */}
          <div
            className={`mt-6 transition-all duration-800 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
