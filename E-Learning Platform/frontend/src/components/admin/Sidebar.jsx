import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaGraduationCap,
  FaVideo,
  FaBell,
  FaImages,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const navItems = [
  {
    to: "/admin-dashboard/overview",
    label: "Dashboard",
    icon: FaTachometerAlt,
  },
  {
    to: "/admin-dashboard/users",
    label: "Users",
    icon: FaUsers,
  },
  {
    to: "/admin-dashboard/courses",
    label: "Courses",
    icon: FaBook,
  },
  {
    to: "/admin-dashboard/enrollments",
    label: "Enrollments",
    icon: FaGraduationCap,
  },
  {
    to: "/admin-dashboard/videos",
    label: "Videos",
    icon: FaVideo,
  },
  {
    to: "/admin-dashboard/notifications",
    label: "Notifications",
    icon: FaBell,
  },
  {
    to: "/admin-dashboard/banners",
    label: "Banners",
    icon: FaImages,
  },
  {
    to: "/admin-dashboard/analytics",
    label: "Analytics",
    icon: FaChartBar,
  },
  {
    to: "/admin-dashboard/settings",
    label: "Settings",
    icon: FaCog,
  },
];

const Sidebar = ({ isMobileOpen, onMobileToggle }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:relative inset-y-0 left-0 z-50
        transform transition-all duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "w-20" : "w-72"}
        bg-[#1e293b] text-white shadow-xl h-screen flex flex-col
      `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-white truncate">
                  AfaqNama
                </h1>
                <p className="text-xs text-gray-400 truncate">Admin Panel</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Button - Top Right */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <FaChevronRight className="w-4 h-4" />
              ) : (
                <FaChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onMobileToggle}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-gray-300 hover:text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onMobileToggle}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative mx-2
                   ${
                     isActive
                       ? "bg-[#2563eb] text-white shadow-lg"
                       : "text-gray-300 hover:bg-gray-700 hover:text-white"
                   }
                  `
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 font-medium transition-opacity duration-300 opacity-100">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom Section with Version Info */}
        <div className="p-4 border-t border-gray-700">
          {!collapsed && (
            <div className="text-center">
              <p className="text-xs text-gray-400">AfaqNama Admin</p>
              <p className="text-xs text-gray-500">v1.0.0</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
