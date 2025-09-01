import React, { useState } from "react";
import { markNotificationAsRead } from "../../../services/notifications";
import { CheckCircle } from "lucide-react";

const MarkAllReadButton = ({ notifications, onUpdate, onError }) => {
  const [markingAllAsRead, setMarkingAllAsRead] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read);
  const unreadCount = unreadNotifications.length;

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    if (
      !window.confirm(`Mark all ${unreadCount} unread notifications as read?`)
    ) {
      return;
    }

    setMarkingAllAsRead(true);

    try {
      // Mark all unread notifications as read
      await Promise.all(
        unreadNotifications.map((n) => markNotificationAsRead(n._id))
      );

      // Update parent component state
      onUpdate(notifications.map((n) => ({ ...n, read: true })));
    } catch {
      onError("Failed to mark all notifications as read.");
    } finally {
      setMarkingAllAsRead(false);
    }
  };

  // Don't render if no unread notifications
  if (unreadCount === 0) return null;

  return (
    <button
      onClick={handleMarkAllAsRead}
      disabled={markingAllAsRead}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
    >
      <CheckCircle className="w-4 h-4" />
      {markingAllAsRead
        ? "Marking all..."
        : `Mark all as read (${unreadCount})`}
    </button>
  );
};

export default MarkAllReadButton;
