import React, { useEffect, useMemo, useState } from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import EnrollmentFilters from "../../components/user/enrollments/EnrollmentFilters";
import EnrollmentEmpty from "../../components/user/enrollments/EnrollmentEmpty";
import EnrollmentList from "../../components/user/enrollments/EnrollmentList";
import { getMyEnrollments } from "../../services/enrollments";
import { BookOpen, GraduationCap, TrendingUp, Users } from "lucide-react";

const Enrollments = () => {
  const [status, setStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const res = await getMyEnrollments();
        // Expecting { success, data } shape; fallback to array
        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        if (mounted) setItems(data);
      } catch {
        if (mounted) setError("Failed to load enrollments");
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (status === "all") return items;
    return items.filter((e) => (e?.status || "").toLowerCase() === status);
  }, [items, status]);

  // Calculate stats for the header
  const stats = useMemo(() => {
    const total = items.length;
    const approved = items.filter((e) => e?.status === "approved").length;
    const pending = items.filter((e) => e?.status === "pending").length;
    const rejected = items.filter((e) => e?.status === "rejected").length;

    return { total, approved, pending, rejected };
  }, [items]);

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
              <BookOpen className="w-4 h-4" />
              Learning Journey
            </div>

            {/* Main Title */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F2C59] dark:text-white mb-4 leading-tight">
                My Enrolled
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Courses
                </span>
              </h1>
              <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                Track your learning progress, manage your enrollments, and
                continue your journey towards ACCA success
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.total}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Total Courses
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-green-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.approved}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Approved
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.pending}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Pending
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F2C59] dark:text-white">
                      {stats.rejected}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-gray-400">
                      Rejected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mb-6 rounded-2xl border border-blue-200/60 dark:border-blue-900/40 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 sm:p-6 backdrop-blur-sm shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Enrollment Process
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                Your enrollment requests are reviewed by our admin team. You'll
                receive a notification once a request is approved or rejected.
                This process typically takes 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <EnrollmentFilters status={status} onChange={setStatus} />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-white/50 dark:bg-slate-800/50 animate-pulse border border-gray-200/50 dark:border-slate-700/50"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 dark:border-red-700 bg-red-50/80 dark:bg-red-900/20 p-4 sm:p-6 backdrop-blur-sm shadow-lg">
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
        ) : filtered.length === 0 ? (
          <EnrollmentEmpty />
        ) : (
          <EnrollmentList enrollments={filtered} />
        )}
      </main>
      <StudentFooter />
    </div>
  );
};

export default Enrollments;
