import React from "react";

const Step = ({ step, title, children }) => (
  <div className="relative p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold shadow">
      {step}
    </div>
    <h4 className="text-[#0F2C59] dark:text-gray-100 font-semibold mb-1">
      {title}
    </h4>
    <p className="text-sm text-[#64748B] dark:text-gray-400">{children}</p>
  </div>
);

const SupportGuide = () => {
  return (
    <section id="guide" className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300">
        User Guide
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Step step="1" title="Create your account">
          Sign up with your email and verify to access all features.
        </Step>
        <Step step="2" title="Browse courses">
          Explore available courses, view details and select the best fit.
        </Step>
        <Step step="3" title="Request enrollment">
          Submit an enrollment request. Track status in Enrollments.
        </Step>
        <Step step="4" title="Get approved">
          Once approved, your course appears in My Courses to start learning.
        </Step>
        <Step step="5" title="Watch lessons">
          Stream videos with adaptive quality and resume where you left off.
        </Step>
        <Step step="6" title="Stay updated">
          Check notifications for approvals, updates, and announcements.
        </Step>
      </div>
    </section>
  );
};

export default SupportGuide;
