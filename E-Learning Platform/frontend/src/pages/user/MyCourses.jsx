import React, { useEffect, useState } from "react";
import StudentHeader from "../../components/user/header-footer/StudentHeader";
import StudentFooter from "../../components/user/header-footer/StudentFooter";
import { getMyEnrollments } from "../../services/enrollments";

// Import dedicated MyCourses components
import PageHeader from "../../components/user/myCourses/PageHeader";
import SuccessNote from "../../components/user/myCourses/SuccessNote";
import MyCourseList from "../../components/user/myCourses/MyCourseList";
import LoadingSkeleton from "../../components/user/myCourses/LoadingSkeleton";
import ErrorState from "../../components/user/myCourses/ErrorState";
import EmptyState from "../../components/user/myCourses/EmptyState";
import CourseCountSummary from "../../components/user/myCourses/CourseCountSummary";
import QuickActions from "../../components/user/myCourses/QuickActions";

const MyCourses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const loadEnrollments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getMyEnrollments();
      const data = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];
      const approvedOnly = data.filter(
        (e) => (e?.status || "").toLowerCase() === "approved"
      );
      setItems(approvedOnly);
    } catch {
      setError("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleRetry = () => {
    loadEnrollments();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      <StudentHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader />

        {/* Success Note for Enrolled Users */}
        {items.length > 0 && <SuccessNote courseCount={items.length} />}

        {/* Content Section */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Course Count Summary */}
            <CourseCountSummary count={items.length} />

            {/* Course Grid */}
            <MyCourseList enrollments={items} />

            {/* Quick Actions */}
            <QuickActions />
          </>
        )}
      </main>
      <StudentFooter />
    </div>
  );
};

export default MyCourses;
