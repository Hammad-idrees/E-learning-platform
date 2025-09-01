import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        <div className="absolute top-3 left-3">
          <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-4 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
