import React from "react";
import { BookOpen, GraduationCap, Users, Target } from "lucide-react";
// Import the image
import groupImage from "../../../assets/images/acca.jpg";
const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px] py-14 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
              <BookOpen className="w-4 h-4" />
              Our Story
            </div>

            {/* Enhanced Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2C59] dark:text-white leading-tight mb-6">
              Empowering ACCA Aspirants with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Premium Learning
              </span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-lg sm:text-xl text-[#475569] dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
              AfaqNama is built by qualified professional Afaq Ahmad to offer
              structured, high-quality learning experiences that help you master
              ACCA with confidence and achieve your career goals.
            </p>

            {/* Quick Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F2C59] dark:text-white">
                      Expert-Led
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Learning
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F2C59] dark:text-white">
                      Structured
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Approach
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="flex items-center gap-6 text-sm text-[#64748B] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Qualified Professional </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>High Success Rate</span>
              </div>
            </div>
          </div>

          {/* Enhanced Right Side */}
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-90 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              {/* Image Placeholder */}
              {/* Image Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={groupImage}
                  alt="ACCA Learning Platform"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-white/30 pointer-events-none"></div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
