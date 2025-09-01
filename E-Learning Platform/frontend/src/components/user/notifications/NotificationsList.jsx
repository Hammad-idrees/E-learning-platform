import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationsList = ({ items, onRead, onDelete }) => {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center text-[#64748B] dark:text-gray-400">
        No notifications yet.
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {items.map((n) => (
        <NotificationItem
          key={n._id}
          item={n}
          onRead={onRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
