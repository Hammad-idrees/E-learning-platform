import React, { useState } from "react";
import {
  Heart,
  Video,
  FileText,
  CheckCircle,
  MessageCircle,
  Star,
  Award,
  Clock,
  Users,
  BookOpen,
} from "lucide-react";

// Import your instructor photo
import instructorPhoto from "../../../assets/images/Afaq-Ahmad.jpg";

const InstructorMessage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
            <Heart className="w-4 h-4" />
            Personal Message from Instructor
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-3">
            Meet Your Guide AFAQ AHMAD
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-400 max-w-2xl mx-auto">
            Learn from an experienced professional dedicated to your achievement
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
          {/* Instructor Photo & Profile */}
          <div className="relative">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-1 shadow-2xl">
              <img
                src={instructorPhoto}
                alt="ACCA Instructor"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl shadow-2xl"></div>
          </div>

          {/* Main Message */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-blue-100 dark:border-slate-700">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F2C59] dark:text-white mb-2">
                  A Personal Message to My Students
                </h3>
                <p className="text-sm text-[#64748B] dark:text-gray-600">
                  From your instructor AFAQ AHMAD
                </p>
              </div>
            </div>

            <div
              className={`text-[#334155] dark:text-gray-300 leading-relaxed space-y-4 ${
                isExpanded ? "" : "max-h-96 overflow-hidden"
              }`}
            >
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                "Hello my dear students..."
              </p>

              <p>
                Welcome to{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  AfaqNama
                </span>
                , where we unfold chapters of learning together. I've created
                this platform to provide you with access to quality education
                from the comfort of your home.
              </p>

              <p>
                You'll have access to <strong>exclusive video lectures</strong>{" "}
                specifically tailored to meet ACCA certification requirements.
                Each lesson is carefully crafted and recorded by me to ensure
                you receive the highest quality instruction.
              </p>

              {isExpanded && (
                <>
                  <p>
                    Beyond videos, you'll receive comprehensive{" "}
                    <strong>practice materials</strong>
                    and question banks that I've developed to help you master
                    each concept through targeted practice.
                  </p>

                  <p>
                    Our program includes <strong>mock exams</strong> that I
                    personally review and grade, providing detailed feedback to
                    help you improve. While we're currently focused on ACCA,
                    we'll soon expand to other professional courses.
                  </p>

                  <p>
                    Even though this is an online platform, I'm committed to
                    monitoring each student's progress closely. Remember -{" "}
                    <strong className="text-indigo-600 dark:text-indigo-400">
                      I'm always watching your progress
                    </strong>{" "}
                    and ready to help when you need it.
                  </p>

                  <p>
                    I welcome your feedback and am available for one-on-one
                    mentoring sessions to ensure your success.
                  </p>

                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Wishing you the best of luck and happy learning with
                    AfaqNama!
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </>
              ) : (
                <>
                  <span>Read Full Message</span>
                  <Star className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group flex-1 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F2C59] dark:text-white">
                Expert Video Lectures
              </h3>
            </div>
            <p className="text-[#64748B] dark:text-gray-400">
              Comprehensive video content tailored specifically to ACCA exam
              requirements and learning objectives.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group flex-1 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F2C59] dark:text-white">
                Personalized Feedback
              </h3>
            </div>
            <p className="text-[#64748B] dark:text-gray-400">
              Mock exams with individualized feedback and guidance to help you
              identify strengths and areas for improvement.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <BookOpen className="w-5 h-5" />
            Begin Your ACCA Journey Today
            <Heart className="w-5 h-5" />
          </button>
          <p className="text-sm text-[#64748B] dark:text-gray-400 mt-4">
            Join thousands of successful students who achieved their ACCA goals
            with our guidance
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstructorMessage;
