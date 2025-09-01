import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUser, FaSignOutAlt, FaBars, FaSearch } from "react-icons/fa";

const Header = ({
  adminName = "Admin",
  adminEmail = "",
  adminAvatar = "",
  notifications = [],
  onProfileClick,
  onLogout,
  onMarkRead,
  onNotificationsClick,
  onMobileToggle,
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Get admin initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileToggle = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotifications(false);
  };

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout?.();
    }
  };

  const handleProfile = () => {
    setShowProfileDropdown(false);
    onProfileClick?.();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm relative z-30">
      {/* Left Section - Mobile Menu & Search */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 text-gray-600 hover:text-[#2563eb] hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>

      {/* Center Section - Welcome Message */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-[#0f172a]">
          Welcome back, <span className="text-[#2563eb]">{adminName}</span>
        </h1>
        <p className="text-sm text-gray-500">
          Here's what's happening with AfaqNama today
        </p>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <div className="relative" ref={notificationDropdownRef}>
          <button
            onClick={handleNotificationToggle}
            className="relative p-2 text-gray-600 hover:text-[#2563eb] hover:bg-gray-100 rounded-lg transition-all duration-200 group"
          >
            <FaBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 transform transition-all duration-200">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white rounded-t-xl">
                <h3 className="font-semibold">Notifications</h3>
                <button
                  className="text-sm hover:underline"
                  onClick={() => {
                    setShowNotifications(false);
                    onNotificationsClick?.();
                  }}
                >
                  View all
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.unread
                          ? "bg-blue-50 border-l-4 border-l-[#2563eb]"
                          : ""
                      }`}
                      onClick={() => {
                        if (notification.unread) onMarkRead?.(notification.id);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-[#0f172a] font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#2563eb] rounded-full mt-1 flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <FaBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={handleProfileToggle}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-full flex items-center justify-center overflow-hidden shadow-md">
              {adminAvatar ? (
                <img
                  src={adminAvatar}
                  alt={adminName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-white">
                  {getInitials(adminName)}
                </span>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <span className="text-sm font-medium text-[#0f172a]">
                {adminName}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  showProfileDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 transform transition-all duration-200">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
                    {adminAvatar ? (
                      <img
                        src={adminAvatar}
                        alt={adminName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white">
                        {getInitials(adminName)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{adminName}</p>
                    {adminEmail && (
                      <p className="text-sm text-blue-100">{adminEmail}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={handleProfile}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-left text-[#0f172a] hover:bg-gray-50 transition-colors group"
                >
                  <FaUser className="w-4 h-4 text-[#2563eb] group-hover:scale-110 transition-transform" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-left text-[#ef4444] hover:bg-red-50 transition-colors group"
                >
                  <FaSignOutAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
