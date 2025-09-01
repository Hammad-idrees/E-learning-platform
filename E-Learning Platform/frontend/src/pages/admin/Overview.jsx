import React, { useState, useEffect } from "react";
import { getDashboardOverview } from "../../services/dashboard";
import StatsCards from "../../components/admin/dashboard/StatsCards";
import CourseStatsTable from "../../components/admin/dashboard/CourseStatsTable";
import EnrollmentChart from "../../components/admin/dashboard/EnrollmentChart";
import RecentActivity from "../../components/admin/dashboard/RecentActivity";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StackedEnrollmentsArea from "../../components/admin/dashboard/StackedEnrollmentsArea";
import {
  BarChart3,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Users,
  BookOpen,
  Activity,
  Calendar,
  Zap,
} from "lucide-react";

const Overview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDashboardOverview();
      setDashboardData(response.data);
    } catch (err) {
      setError("Failed to load dashboard data");
      toast.error("Failed to load dashboard data");
      console.error("Dashboard data error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
    toast.success("Dashboard refreshed successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-blue-100 text-lg">
                  Welcome back! Here's what's happening with your platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-100">Last Updated</div>
                    <div className="text-sm font-medium text-white">
                      {new Date(dashboardData.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium border border-white/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 animate-fadeIn">
          <StatsCards summary={dashboardData.summary} />
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 animate-slideInLeft group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Enrollment Status
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Current enrollment breakdown
                </p>
              </div>
            </div>
            <EnrollmentChart enrollments={dashboardData.summary.enrollments} />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 animate-slideInRight group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  Recent Activity
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Latest platform activities
                </p>
              </div>
            </div>
            <RecentActivity />
          </div>
        </div>

        {/* Course Statistics Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-all duration-300 animate-fadeIn group">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Course Statistics
                </h2>
                <p className="text-gray-600 mt-1">
                  Detailed breakdown of all courses and their performance
                </p>
              </div>
            </div>
          </div>
          <CourseStatsTable courseStats={dashboardData.courseStats} />
        </div>

        {/* Stacked Area Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn group">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  Trends by Course
                </h2>
                <p className="text-gray-600 text-sm">
                  Approved, Pending and Rejected stacked per course (top 10)
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin-dashboard/analytics")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Zap className="w-4 h-4" />
              View Detailed Analytics
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          <StackedEnrollmentsArea courseStats={dashboardData.courseStats} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
