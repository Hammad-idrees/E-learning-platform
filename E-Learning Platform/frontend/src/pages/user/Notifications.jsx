import React, { useEffect, useState } from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import NotificationsToolbar from "../../components/user/notifications/NotificationsToolbar";
import NotificationsList from "../../components/user/notifications/NotificationsList";
import {
  getMyNotifications,
  markNotificationAsRead,
  deleteNotification,
  markAllNotificationsRead,
  deleteAllNotifications,
} from "../../services/notifications";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActing, setIsActing] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getMyNotifications();
      const data = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];
      setItems(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch {
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onReadAll = async () => {
    try {
      setIsActing(true);
      await markAllNotificationsRead();
      await load();
    } finally {
      setIsActing(false);
    }
  };

  const onDeleteAll = async () => {
    try {
      setIsActing(true);
      await deleteAllNotifications();
      await load();
    } finally {
      setIsActing(false);
    }
  };

  const onRead = async (id) => {
    await markNotificationAsRead(id);
    setItems((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  };

  const onDelete = async (id) => {
    await deleteNotification(id);
    setItems((prev) => prev.filter((n) => n._id !== id));
  };

  const navigate = useNavigate();

  // Calculate notification stats
  const stats = {
    total: items.length,
    unread: items.filter((n) => !n.read).length,
    read: items.filter((n) => n.read).length,
    today: items.filter((n) => {
      const today = new Date().toDateString();
      const notificationDate = new Date(n.createdAt).toDateString();
      return today === notificationDate;
    }).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <StudentHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="relative mb-8">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-800/10 rounded-full blur-3xl"></div>
          </div>

          {/* Main Header Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-3.5-3.5v-2.5c0-3.1-2.4-5.6-5.5-5.6s-5.5 2.5-5.5 5.6v2.5L2 17h5m6 0v1c0 1.4-1.1 2.5-2.5 2.5S8 19.4 8 18v-1m6 0H9"
                />
              </svg>
              Stay Connected
            </div>

            {/* Main Title */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2C59] dark:text-white mb-4 leading-tight">
                Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Notifications
                </span>
              </h1>
              <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                Stay updated with your account activities, course updates, and
                important announcements
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-3.5-3.5v-2.5c0-3.1-2.4-5.6-5.5-5.6s-5.5 2.5-5.5 5.6v2.5L2 17h5m6 0v1c0 1.4-1.1 2.5-2.5 2.5S8 19.4 8 18v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.total}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Total
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.read}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Read
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.unread}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Unread
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.today}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <NotificationsToolbar
          count={items.length}
          onReadAll={onReadAll}
          onDeleteAll={onDeleteAll}
          onBack={() => navigate("/")}
          acting={isActing}
        />

        {/* Content */}
        {loading ? (
          <div className="grid gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-white/50 dark:bg-slate-800/50 animate-pulse border border-gray-200/50 dark:border-slate-700/50"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 dark:border-red-700 bg-red-50/80 dark:bg-red-900/20 p-4 sm:p-6 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-red-700 dark:text-red-300 font-medium">
                {error}
              </span>
            </div>
          </div>
        ) : (
          <NotificationsList
            items={items}
            onRead={onRead}
            onDelete={onDelete}
          />
        )}
      </main>
      <StudentFooter />
    </div>
  );
};

export default Notifications;
