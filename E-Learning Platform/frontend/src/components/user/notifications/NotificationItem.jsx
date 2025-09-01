import React from "react";

const NotificationItem = ({ item, onRead, onDelete }) => {
  const isUnread = !item.read;
  return (
    <div
      className={`rounded-xl border p-4 flex items-start justify-between gap-4 ${
        isUnread
          ? "border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      }`}
    >
      <div>
        <div className="text-sm text-[#0F2C59] dark:text-gray-100 font-medium">
          {item.message}
        </div>
        <div className="text-xs text-[#64748B] dark:text-gray-400 mt-1">
          {new Date(item.createdAt).toLocaleString()}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isUnread && (
          <button
            onClick={() => onRead(item._id)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Mark read
          </button>
        )}
        <button
          onClick={() => onDelete(item._id)}
          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-700 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/30"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
