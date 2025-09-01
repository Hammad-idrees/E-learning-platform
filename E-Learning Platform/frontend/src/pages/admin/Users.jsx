import React, { useState } from "react";
import AllUsersTab from "../../components/admin/users/AllUsersTab";
import UsersByCourseTab from "../../components/admin/users/UsersByCourseTab";
import { Users as UsersIcon, BookOpen, TrendingUp } from "lucide-react";

const tabs = [
  {
    label: "All Users",
    value: "all",
    icon: UsersIcon,
    description: "View and manage all platform users",
  },
  {
    label: "Users by Course",
    value: "byCourse",
    icon: BookOpen,
    description: "Track user enrollments by course",
  },
];

const Users = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#2563eb] to-[#1e40af] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <UsersIcon className="h-6 w-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  User Management
                </h1>
              </div>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
                Manage all AfaqNama users, track enrollments, and monitor
                platform engagement
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-[#22c55e]" />
              <span className="text-sm font-medium">Active Management</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.value}
                    className={`group relative flex-1 min-w-[200px] px-6 py-4 text-left transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-inset ${
                      activeTab === tab.value
                        ? "bg-[#2563eb]/5 text-[#2563eb]"
                        : "text-[#64748b] hover:text-[#2563eb]"
                    }`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg transition-colors ${
                          activeTab === tab.value
                            ? "bg-[#2563eb]/10 text-[#2563eb]"
                            : "bg-gray-100 text-gray-500 group-hover:bg-[#2563eb]/10 group-hover:text-[#2563eb]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm sm:text-base">
                          {tab.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                          {tab.description}
                        </div>
                      </div>
                    </div>

                    {/* Active indicator */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563eb] to-[#1e40af] transform transition-transform duration-300 ${
                        activeTab === tab.value ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="transform transition-all duration-500 ease-in-out">
              {activeTab === "all" && (
                <div className="animate-fadeIn">
                  <AllUsersTab />
                </div>
              )}
              {activeTab === "byCourse" && (
                <div className="animate-fadeIn">
                  <UsersByCourseTab />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Users;
