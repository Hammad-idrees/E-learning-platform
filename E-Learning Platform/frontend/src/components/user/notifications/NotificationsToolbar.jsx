import React from "react";
import { ArrowLeft, CheckCircle, Trash2 } from "lucide-react";

const NotificationsToolbar = ({
  count,
  onReadAll,
  onDeleteAll,
  onBack,
  acting,
}) => {
  return (
    <div className="mb-6">
      {/* Enhanced Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      {/* Enhanced Header and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0F2C59] dark:text-white">
            Manage Notifications
          </h2>
          <p className="text-[#64748B] dark:text-gray-400 mt-1">
            {count === 0
              ? "No notifications to manage"
              : `${count} notification${count !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {count > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={onReadAll}
              disabled={acting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all as read
            </button>
            <button
              onClick={onDeleteAll}
              disabled={acting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              Delete all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsToolbar;
