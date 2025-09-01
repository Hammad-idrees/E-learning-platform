import React, { useState } from "react";
import { Trophy, Star, Users, Target, Eye, Download } from "lucide-react";
import { motion } from "framer-motion";

// Import results images
import result1 from "../../../assets/results/Result_1.jpg";
import result2 from "../../../assets/results/Result_2.jpg";
import result3 from "../../../assets/results/Result_3.jpg";
import result4 from "../../../assets/results/Result_4.jpg";
import result5 from "../../../assets/results/Result_5.jpg";
import group1 from "../../../assets/results/Group_1.jpg";
import group2 from "../../../assets/results/Group_2.jpg";

const results = [
  {
    id: 1,
    image: result1,
    title: "Student Achievement",
    category: "Individual Success",
    description: "Outstanding performance in ACCA-MA1",
  },
  {
    id: 2,
    image: result2,
    title: "Academic Excellence",
    category: "Individual Success",
    description: "Remarkable results in ACCA-BT",
  },
  {
    id: 3,
    image: result3,
    title: "Professional Milestone",
    category: "Individual Success",
    description: "Wonderful achievement in ACCA-MA2",
  },
  {
    id: 4,
    image: result4,
    title: "Learning Achievement",
    category: "Individual Success",
    description: "Exceptional progress in ACCA-MA1",
  },
  {
    id: 5,
    image: result5,
    title: "Certification Success",
    category: "Individual Success",
    description: "Outstanding performance in ACCA-FD-MA1",
  },
  {
    id: 6,
    image: group1,
    title: "Group Achievement",
  },
  {
    id: 7,
    image: group2,
    title: "Collaborative Success",
  },
];

const ResultsGrid = () => {
  const [selectedResult, setSelectedResult] = useState(null);

  const openModal = (result) => {
    setSelectedResult(result);
  };

  const closeModal = () => {
    setSelectedResult(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-32 h-32 bg-teal-200/20 dark:bg-teal-800/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-200/10 dark:bg-cyan-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-4 shadow-sm border border-emerald-200/50 dark:border-emerald-700/50">
            <Trophy className="w-4 h-4" />
            Student Achievements
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-3">
            Success Stories & Results
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-400 max-w-2xl mx-auto">
            Discover the remarkable achievements of our students who have
            excelled in their ACCA journey and professional development through
            our comprehensive learning platform.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                95%
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-400">
                Success Rate
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">
                300+
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-400">
                Students Enrolled
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                85%
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-400">
                Completion Rate
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                90%
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-400">
                Satisfaction
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#0F2C59] dark:text-white text-center mb-8">
            Student Results Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => openModal(result)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700">
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="px-2 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-medium text-white">
                            {result.category}
                          </span>
                        </div>
                        <div className="px-2 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-medium text-white">
                            {result.year}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                        {result.title}
                      </h4>
                      <p className="text-gray-200 text-xs line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 mr-2">
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Download className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        result.category === "Individual Success"
                          ? "bg-emerald-500/90 text-white"
                          : "bg-blue-500/90 text-white"
                      }`}
                    >
                      {result.category === "Individual Success"
                        ? "Individual"
                        : "Team"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Trophy className="w-5 h-5" />
            <span>Join Our Success Stories</span>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {selectedResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 p-4 flex items-center justify-center">
              <img
                src={selectedResult.image}
                alt={selectedResult.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedResult.category === "Individual Success"
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {selectedResult.category}
                </div>
                <div className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-medium">
                  {selectedResult.year}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0F2C59] dark:text-white mb-3">
                {selectedResult.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {selectedResult.description}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ResultsGrid;
