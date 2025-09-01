import React, { useState, useEffect } from "react";
import { getEnrollmentStats } from "../../../services/dashboard";

const RecentActivity = () => {
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
  }, []);

  const loadRecentActivity = async () => {
    try {
      setLoading(true);
      const response = await getEnrollmentStats();
      setRecentEnrollments(response.data.recentEnrollments || []);
    } catch (error) {
      console.error("Failed to load recent activity:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recentEnrollments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">No recent activity</div>
        <div className="text-sm text-gray-400">New enrollments will appear here</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentEnrollments.slice(0, 5).map((enrollment) => (
        <div key={enrollment.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">
                {enrollment.user}
              </p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                {enrollment.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">
              Enrolled in {enrollment.course}
            </p>
            <p className="text-xs text-gray-400">
              {formatDate(enrollment.createdAt)}
            </p>
          </div>
        </div>
      ))}
      
      {recentEnrollments.length > 5 && (
        <div className="text-center pt-2">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
