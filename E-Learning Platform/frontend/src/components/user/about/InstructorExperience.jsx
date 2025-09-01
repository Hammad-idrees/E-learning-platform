import React from "react";
import {
  Award,
  Star,
  Globe,
  GraduationCap,
  Users,
  Trophy,
  Calendar,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    icon: <Award className="w-6 h-6" />,
    title: "ACCA AFFILIATE AT THE AGE OF 20",
    subtitle: "Clearing All 17 Exams in 3 Years",
    description:
      "Achieved ACCA affiliate status at just 20 years old, completing all 17 examinations in an impressive 3-year timeframe.",
    category: "Professional Achievement",
    year: "2020-2023",
    color: "from-slate-600 to-slate-700",
    bgColor: "from-slate-50 to-slate-100",
    borderColor: "border-slate-300",
  },
  {
    id: 2,
    icon: <Star className="w-6 h-6" />,
    title: "RECOGNIZED AS HIGH ACHIEVER",
    subtitle: "Foundation in Accountancy Level",
    description:
      "Acknowledged for exceptional performance and outstanding results at the Foundation in Accountancy level.",
    category: "Academic Excellence",
    year: "2020",
    color: "from-blue-600 to-blue-700",
    bgColor: "from-blue-50 to-blue-100",
    borderColor: "border-blue-300",
  },
  {
    id: 3,
    icon: <Globe className="w-6 h-6" />,
    title: "ACCLAIMED VOLUNTEER IN AIESEC",
    subtitle: "World's Largest Youth Run Organisation",
    description:
      "Served as a distinguished volunteer in AIESEC, contributing to the world's largest youth-run organization.",
    category: "Leadership & Service",
    year: "2019-2021",
    color: "from-indigo-600 to-indigo-700",
    bgColor: "from-indigo-50 to-indigo-100",
    borderColor: "border-indigo-300",
  },
  {
    id: 4,
    icon: <GraduationCap className="w-6 h-6" />,
    title: "ONE OF FIRST PERSON TO CLAIM BBA DEGREE",
    subtitle: "From PPA Business School France After ACCA",
    description:
      "Pioneered the path by being among the first to obtain a BBA degree from PPA Business School France after completing ACCA.",
    category: "Educational Milestone",
    year: "2023",
    color: "from-emerald-600 to-emerald-700",
    bgColor: "from-emerald-50 to-emerald-100",
    borderColor: "border-emerald-300",
  },
  {
    id: 5,
    icon: <Trophy className="w-6 h-6" />,
    title: "RECOGNISED AT ACCA TUTOR CEREMONY 2024",
    subtitle: "Outstanding Teaching Excellence",
    description:
      "Honored and recognized for exceptional teaching contributions at the prestigious ACCA Tutor Ceremony 2024.",
    category: "Teaching Recognition",
    year: "2024",
    color: "from-amber-600 to-amber-700",
    bgColor: "from-amber-50 to-amber-100",
    borderColor: "border-amber-300",
  },
  {
    id: 6,
    icon: <Users className="w-6 h-6" />,
    title: "REMAINED IN ACCA FACULTY",
    subtitle: "Of Recognised Institutes in Pakistan",
    description:
      "Served as a distinguished ACCA faculty member at recognized educational institutions across Pakistan.",
    category: "Teaching Experience",
    year: "2021-2023",
    color: "from-teal-600 to-teal-700",
    bgColor: "from-teal-50 to-teal-100",
    borderColor: "border-teal-300",
  },
  {
    id: 7,
    icon: <MapPin className="w-6 h-6" />,
    title: "CURRENTLY ASSOCIATED WITH TOP INSTITUTES",
    subtitle: "In Dubai and Qatar as ACCA Faculty",
    description:
      "Currently serving as ACCA faculty at prestigious institutions in Dubai and Qatar, expanding international reach.",
    category: "International Experience",
    year: "2023-Present",
    color: "from-violet-600 to-violet-700",
    bgColor: "from-violet-50 to-violet-100",
    borderColor: "border-violet-300",
  },
];

const InstructorExperience = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200/10 dark:bg-purple-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-medium mb-4 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
            <Award className="w-4 h-4" />
            Professional Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-3">
            Instructor Experience & Achievements
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-400 max-w-3xl mx-auto">
            Discover the remarkable journey of our instructor who has achieved
            extraordinary milestones in professional accounting, education, and
            international recognition at a young age.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 lg:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700"></div>

          {/* Experience Items */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-2 sm:left-6 lg:left-10 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10"></div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-16 lg:ml-20">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${experience.bgColor} dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-sm border ${experience.borderColor} dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${experience.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <div className="text-white">{experience.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-[#0F2C59] dark:text-white mb-2 leading-tight">
                            {experience.title}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base mb-2">
                            {experience.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="px-3 py-1 bg-white/80 dark:bg-slate-700/80 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600">
                          {experience.year}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#64748B] dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                      {experience.description}
                    </p>

                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2">
                      <div
                        className={`px-3 py-1 bg-gradient-to-r ${experience.color} rounded-full text-xs font-medium text-white shadow-sm`}
                      >
                        {experience.category}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-white/10 dark:to-slate-600/10 rounded-full -translate-y-12 translate-x-12"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-2xl font-bold text-[#0F2C59] dark:text-white mb-4">
              A Legacy of Excellence
            </h3>
            <p className="text-[#64748B] dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              From becoming an ACCA affiliate at 20 to teaching at prestigious
              international institutions, our instructor's journey exemplifies
              dedication, expertise, and continuous growth in the field of
              accounting education.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Award className="w-5 h-5" />
            <span>Learn from an Expert</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstructorExperience;
