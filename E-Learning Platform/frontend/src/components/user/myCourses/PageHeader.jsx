import React from "react";
import { BookOpen, GraduationCap, TrendingUp, Play } from "lucide-react";
const PageHeader = () => {
  return (
    <div className="relative mb-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Header Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
          <BookOpen className="w-4 h-4" />
          Learning Progress
        </div>

        {/* Main Title */}
        <div className="text-center lg:text-left mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2C59] dark:text-white mb-4 leading-tight">
            <span className="animate-float-3d inline-block">My Learning</span>
            <br />
            <span className="animate-float-3d inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Dashboard
            </span>
          </h1>
          <p className="animate-float-3d text-lg text-[#64748B] dark:text-gray-300 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            Continue your learning journey with your enrolled courses and track
            your progress towards ACCA success
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                  Enrolled
                </div>
                <div className="text-xs text-[#64748B] dark:text-gray-400">
                  Courses
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                  Continue
                </div>
                <div className="text-xs text-[#64748B] dark:text-gray-400">
                  Learning
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                  Track
                </div>
                <div className="text-xs text-[#64748B] dark:text-gray-400">
                  Progress
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                  Achieve
                </div>
                <div className="text-xs text-[#64748B] dark:text-gray-400">
                  Success
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
