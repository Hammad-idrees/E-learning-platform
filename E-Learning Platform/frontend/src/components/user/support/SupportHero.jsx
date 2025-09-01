import React from "react";

const SupportHero = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0F2C59] p-6 sm:p-8 text-white shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Support Center
          </h1>
          <p className="text-white/80 mt-1 text-sm sm:text-base">
            We're here to help. Find answers and contact us anytime.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#faq"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
          >
            Browse FAQ
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-white text-[#0F2C59] text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportHero;
