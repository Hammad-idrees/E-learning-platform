import React, { useState } from "react";

const QA = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-semibold text-[#0F2C59] dark:text-gray-100">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-[#2563EB] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-[#64748B] dark:text-gray-400">
          {a}
        </div>
      )}
    </div>
  );
};

const SupportFAQ = () => {
  const data = [
    {
      q: "How do I enroll in a course?",
      a: "Open the course and click Request Enrollment, then track status under Enrollments.",
    },
    {
      q: "Where can I see approved courses?",
      a: "Approved courses appear in My Courses with immediate access to videos.",
    },
    {
      q: "I forgot my password.",
      a: "Contact Admin to reset your password.",
    },
    {
      q: "Video not playing?",
      a: "Check your internet speed and try refreshing. If persists, contact support with the video name.",
    },
  ];
  return (
    <section id="faq" className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2C59] dark:text-blue-300">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item, idx) => (
          <QA key={idx} q={item.q} a={item.a} />
        ))}
      </div>
    </section>
  );
};

export default SupportFAQ;
