import React from "react";
import { Search, Filter, SortAsc, SortDesc, Calendar, Clock, BookOpen } from "lucide-react";

const CoursesFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  totalCourses 
}) => {
  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 dark:border-slate-700/50 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Search Section */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-blue-200/50 dark:border-slate-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
            />
          </div>
        </div>

        {/* Sort Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-blue-400 w-5 h-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-blue-200/50 dark:border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium bg-blue-50/50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>{totalCourses} {totalCourses === 1 ? 'course' : 'courses'} found</span>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || sortBy !== 'newest') && (
        <div className="mt-6 pt-6 border-t border-blue-200/30 dark:border-slate-600/30">
          <div className="flex flex-wrap gap-3">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                <Search className="w-3 h-3 mr-1" />
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== 'newest' && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200/50 dark:border-green-700/50 shadow-sm">
                {sortBy === 'oldest' ? <Clock className="w-3 h-3 mr-1" /> : <SortAsc className="w-3 h-3 mr-1" />}
                Sorted by: {sortBy === 'oldest' ? 'Oldest First' : 'Title A-Z'}
                <button
                  onClick={() => setSortBy('newest')}
                  className="ml-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesFilters;
