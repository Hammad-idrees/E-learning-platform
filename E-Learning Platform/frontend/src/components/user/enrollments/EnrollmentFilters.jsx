import React from "react";

const EnrollmentFilters = ({ status, onChange }) => {
  const filters = [
    { key: "all", label: "All", icon: "📚" },
    { key: "approved", label: "Approved", icon: "✅" },
    { key: "pending", label: "Pending", icon: "⏳" },
    { key: "rejected", label: "Rejected", icon: "❌" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const isActive = status === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange(f.key)}
              className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 transform hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white border-transparent shadow-lg hover:shadow-xl"
                  : "bg-gray-50 dark:bg-gray-800 text-[#0F2C59] dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-[#2563EB] dark:hover:border-blue-400"
              }`}
            >
              <span className="text-xs">{f.icon}</span>
              {f.label}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EnrollmentFilters;
