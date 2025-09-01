import React from "react";
import {
  Info,
  Clock,
  CheckCircle,
  ArrowRight,
  Mail,
  BookOpen,
  AlertTriangle,
  Users,
} from "lucide-react";

const EnrollmentProcessInfo = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
            <Info className="w-4 h-4" />
            Enrollment Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-4">
            How Enrollment
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Works
            </span>
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">
            Follow these simple steps to enroll in your desired ACCA courses and
            start your learning journey
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-purple-900/10 rounded-3xl p-8 sm:p-12 border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm shadow-xl">
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0F2C59] dark:text-white mb-4">
                Click "Enroll Now"
              </h3>
              <p className="text-[#64748B] dark:text-gray-300 leading-relaxed">
                Select any course and click the blue "Enroll Now" button to
                submit your enrollment request.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F2C59] dark:text-white mb-4">
                Wait for Approval
              </h3>
              <p className="text-[#64748B] dark:text-gray-300 leading-relaxed">
                Your request will be reviewed by our admin team. The button will
                show "Pending Approval" during this time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F2C59] dark:text-white mb-4">
                Access Your Course
              </h3>
              <p className="text-[#64748B] dark:text-gray-300 leading-relaxed">
                Once approved, the button changes to "Access Course" and you can
                start learning immediately.
              </p>
            </div>
          </div>

          {/* Important Notes Section */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/30 dark:border-slate-700/50 shadow-lg">
            <h3 className="text-xl font-semibold text-[#0F2C59] dark:text-white mb-6 flex items-center">
              <ArrowRight className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
              Important Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="text-[#64748B] dark:text-gray-300 space-y-4">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      You'll receive notifications when your enrollment is
                      approved or rejected.
                    </span>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Approved courses will appear in your "My Courses" section
                      for easy access.
                    </span>
                  </div>
                </li>
              </ul>
              <ul className="text-[#64748B] dark:text-gray-300 space-y-4">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      If your enrollment is rejected, you'll see the reason and
                      can contact support for clarification.
                    </span>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      You can track all your enrollment requests in the
                      "Enrollments" section of your dashboard.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentProcessInfo;
