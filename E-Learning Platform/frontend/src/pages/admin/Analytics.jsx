import React, { useEffect, useMemo, useState } from "react";
import { getCourseStats, getEnrollmentStats } from "../../services/dashboard";
import EnrollmentStatusDonut from "../../components/admin/analytics/EnrollmentStatusDonut";
import RecentEnrollmentsArea from "../../components/admin/analytics/RecentEnrollmentsArea";
import StudentsPerCourseBubble from "../../components/admin/analytics/StudentsPerCourseBubble";
import VideosPerCourseBar from "../../components/admin/analytics/VideosPerCourseBar";
import PublishStatusDonut from "../../components/admin/analytics/PublishStatusDonut";
import DailyActivityHeatmap from "../../components/admin/analytics/DailyActivityHeatmap";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Activity,
  Target,
  Eye,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollmentStats, setEnrollmentStats] = useState(null);
  const [courseStats, setCourseStats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [enrollRes, courseRes] = await Promise.all([
        getEnrollmentStats(),
        getCourseStats(),
      ]);

      // Normalize payloads
      const enrollData = enrollRes?.data || enrollRes;
      const coursesData = courseRes?.data || courseRes;

      setEnrollmentStats(enrollData);
      setCourseStats(Array.isArray(coursesData) ? coursesData : []);
    } catch {
      setError("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
    toast.success("Analytics refreshed successfully!");
  };

  const recentEnrollments = useMemo(() => {
    return enrollmentStats?.recentEnrollments || [];
  }, [enrollmentStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-blue-100 text-lg">
                  Deep insights into your platform's performance and trends
                </p>
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
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading analytics...</div>
          </div>
        ) : (
          /* Keep original grid structure exactly as is */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* 1️⃣ Enrollment Status Distribution */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Enrollment Status Distribution
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Current enrollment breakdown
                  </p>
                </div>
              </div>
              {enrollmentStats && (
                <EnrollmentStatusDonut stats={enrollmentStats} />
              )}
            </div>

            {/* 2️⃣ Recent Enrollments Trend */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    Enrollment Trends (7 Days)
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Weekly enrollment patterns
                  </p>
                </div>
              </div>
              <RecentEnrollmentsArea recent={recentEnrollments} />
            </div>

            {/* 3️⃣ Students per Course (Bubble) */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Students per Course
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Course popularity analysis
                  </p>
                </div>
              </div>
              <StudentsPerCourseBubble courses={courseStats} />
            </div>

            {/* 4️⃣ Videos per Course */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    Videos per Course
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Content distribution overview
                  </p>
                </div>
              </div>
              <VideosPerCourseBar courses={courseStats} />
            </div>

            {/* 5️⃣ Published vs Unpublished */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    Course Publication Status
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Live vs draft courses
                  </p>
                </div>
              </div>
              <PublishStatusDonut courses={courseStats} />
            </div>

            {/* 6️⃣ Daily Activity Heatmap */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                    Daily Platform Activity
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    User engagement patterns
                  </p>
                </div>
              </div>
              <DailyActivityHeatmap courses={courseStats} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
