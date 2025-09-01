import React, { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../../services/notifications";
import MarkAllReadButton from "../../components/admin/notifications/MarkAllReadButton";
import DeleteAllButton from "../../components/admin/notifications/DeleteAllButton";
import { Bell, AlertCircle, CheckCircle, Trash2, Clock, X } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyNotifications();
      const list = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setNotifications(list);
    } catch {
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (n) => {
    try {
      await markNotificationAsRead(n._id);
      setNotifications((prev) =>
        prev.map((x) => (x._id === n._id ? { ...x, read: true } : x))
      );
    } catch {
      setError("Failed to mark as read.");
    }
  };

  const handleDelete = async (n) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await deleteNotification(n._id);
      setNotifications((prev) => prev.filter((x) => x._id !== n._id));
    } catch {
      setError("Failed to delete notification.");
    }
  };

  const handleMarkAllUpdate = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  const handleMarkAllError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleDeleteAllUpdate = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  const handleDeleteAllError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => setError(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col gap-6">
            {/* Top Row - Title and Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Notifications
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {unreadCount > 0
                      ? `You have ${unreadCount} unread notification${
                          unreadCount !== 1 ? "s" : ""
                        }`
                      : "All caught up! No new notifications"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {notifications.length}
                      </div>
                      <div className="text-sm text-blue-100">
                        Total Notifications
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {unreadCount}
                      </div>
                      <div className="text-sm text-blue-100">Unread</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <MarkAllReadButton
                notifications={notifications}
                onUpdate={handleMarkAllUpdate}
                onError={handleMarkAllError}
              />
              <DeleteAllButton
                notifications={notifications}
                onUpdate={handleDeleteAllUpdate}
                onError={handleDeleteAllError}
              />
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-medium">{error}</span>
              <button
                onClick={clearError}
                className="ml-auto p-1 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {notifications.map((n, index) => (
              <div
                key={n._id}
                className={`flex items-start gap-4 p-4 transition-colors ${
                  !n.read
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : "border-l-4 border-l-transparent"
                } ${
                  index !== notifications.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Status Icon */}
                <div
                  className={`p-2 rounded-full ${
                    !n.read ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {!n.read ? (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  ) : (
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-800 mb-2">{n.message}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!n.read && (
                    <button
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      onClick={() => handleMarkRead(n)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Read
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    onClick={() => handleDelete(n)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
