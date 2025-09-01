import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationsBellDropdown from "../notifications/NotificationsBellDropdown";
import { getMyNotifications } from "../../../services/notifications";
import { useAuth } from "../../../contexts/AuthContext";

const StudentHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const coursesRef = useRef(null);
  const accountRef = useRef(null);

  useEffect(() => {
    const persisted = localStorage.getItem("theme_dark") === "1";
    setDark(persisted);
    document.documentElement.classList.toggle("dark", persisted);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyNotifications();
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setUnreadCount(list.filter((n) => !n.read).length);
      } catch {
        setUnreadCount(0);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target)) {
        setCoursesOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme_dark", next ? "1" : "0");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setAccountOpen(false);
  };

  return (
    <header
      className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b transition-all duration-500 sticky top-0 z-50 ${
        isScrolled
          ? "border-gray-300/50 dark:border-gray-600/50 shadow-lg shadow-gray-200/20 dark:shadow-gray-800/20"
          : "border-gray-200/30 dark:border-gray-700/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-xl">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="5" width="16" height="10" rx="2" ry="2" />
                <path d="M2 17h20v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              AfaqNama
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 relative group ${
                  isActive
                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Home
              <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </NavLink>

            {/* Courses Dropdown */}
            <div className="relative" ref={coursesRef}>
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
              >
                Courses
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    coursesOpen ? "rotate-180" : ""
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
              </button>

              {coursesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <NavLink
                    to="/courses"
                    className="block px-5 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                    onClick={() => setCoursesOpen(false)}
                  >
                    All Courses
                  </NavLink>
                  <NavLink
                    to="/my-courses"
                    className="block px-5 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                    onClick={() => setCoursesOpen(false)}
                  >
                    My Courses
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/enrollments"
              className={({ isActive }) =>
                `px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 relative group ${
                  isActive
                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Enrollments
              <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 relative group ${
                  isActive
                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              Support
              <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 relative group ${
                  isActive
                    ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              About
              <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
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
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <NotificationsBellDropdown
                open={notifOpen}
                onClose={() => setNotifOpen(false)}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group"
            >
              <div className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-200">
                {dark ? (
                  <svg
                    className="w-5 h-5 rotate-0 transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 rotate-0 transition-all duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* User Account */}
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      accountOpen ? "rotate-180" : ""
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
                </button>

                {accountOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>

                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                      onClick={() => setAccountOpen(false)}
                    >
                      Profile Settings
                    </NavLink>

                    <NavLink
                      to="/my-courses"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
                      onClick={() => setAccountOpen(false)}
                    >
                      My Courses
                    </NavLink>

                    <hr className="my-2 border-gray-200 dark:border-gray-600" />

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="px-4 py-6 space-y-3">
              <NavLink
                to="/"
                className="block px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className="block px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Courses
              </NavLink>
              <NavLink
                to="/my-courses"
                className="block px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Courses
              </NavLink>
              <NavLink
                to="/enrollments"
                className="block px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enrollments
              </NavLink>
              <NavLink
                to="/support"
                className="block px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </NavLink>
              <NavLink
                to="/about"
                className="block px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Progress Bar - Placed below header */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

export default StudentHeader;
