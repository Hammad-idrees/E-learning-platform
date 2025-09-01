import React from "react";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomeAboutAfaqNama = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-20 max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            About AfaqNama
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            <TypeAnimation
              sequence={[
                "Who We Are",
                2000,
                "Our Mission",
                2000,
                "Your Success Partner",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            <TypeAnimation
              sequence={[
                "We help ACCA aspirants master concepts with expert-led videos, structured paths, and supportive guidance—so you can learn confidently and pass with pride.",
                4000,
                "Empowering students with professional expertise, comprehensive resources, and proven methodologies to achieve ACCA certification and career success.",
                4000,
                "Building a community of confident learners through innovative education, personalized support, and results-driven learning experiences.",
                4000,
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5 12.083 12.083 0 015.84 10.578L12 14z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Expert-Led Learning
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Courses designed and delivered by qualified ACCA professionals.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h18M3 12h18M3 17h18"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              <TypeAnimation
                sequence={[
                  "Structured Curriculum",
                  3000,
                  "Organized Learning",
                  3000,
                ]}
                wrapper="span"
                speed={60}
                repeat={Infinity}
              />
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Well-organized learning paths that cover the complete ACCA
              syllabus.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 18.5c3.59 0 6.5-2.91 6.5-6.5S15.59 5.5 12 5.5 5.5 8.41 5.5 12 8.41 18.5 12 18.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Results That Matter
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Proven outcomes with high pass rates and long-term career impact.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <NavLink
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0F2C59] text-white font-semibold hover:from-[#0F2C59] hover:to-[#2563EB] transition-colors shadow-lg"
          >
            Learn more on About Us
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutAfaqNama;
