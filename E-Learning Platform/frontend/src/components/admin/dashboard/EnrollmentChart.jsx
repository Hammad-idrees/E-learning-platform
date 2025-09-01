import React, { useState } from "react";
import {
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Info,
} from "lucide-react";

const EnrollmentChart = ({ enrollments }) => {
  const [showTooltip, setShowTooltip] = useState(null);
  const { approved, rejected, pending, total } = enrollments;

  // Calculate percentages
  const approvedPercent = total > 0 ? (approved / total) * 100 : 0;
  const rejectedPercent = total > 0 ? (rejected / total) * 100 : 0;
  const pendingPercent = total > 0 ? (pending / total) * 100 : 0;

  const statusData = [
    {
      label: "Approved",
      count: approved,
      percentage: approvedPercent,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      icon: CheckCircle,
      description: "Successfully enrolled students",
    },
    {
      label: "Pending",
      count: pending,
      percentage: pendingPercent,
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      icon: Clock,
      description: "Awaiting review or action",
    },
    {
      label: "Rejected",
      count: rejected,
      percentage: rejectedPercent,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
      icon: XCircle,
      description: "Applications not accepted",
    },
  ];

  const getProgressBarSegments = () => {
    const segments = [];

    if (approvedPercent > 0) {
      segments.push(
        <div
          key="approved"
          className="bg-emerald-500 h-full transition-all duration-700 ease-in-out"
          style={{ width: `${approvedPercent}%` }}
        />
      );
    }

    if (pendingPercent > 0) {
      segments.push(
        <div
          key="pending"
          className="bg-amber-500 h-full transition-all duration-700 ease-in-out"
          style={{ width: `${pendingPercent}%` }}
        />
      );
    }

    if (rejectedPercent > 0) {
      segments.push(
        <div
          key="rejected"
          className="bg-red-500 h-full transition-all duration-700 ease-in-out"
          style={{ width: `${rejectedPercent}%` }}
        />
      );
    }

    return segments;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Enrollment Overview
            </h3>
            <p className="text-sm text-gray-500">Current enrollment status</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">Live Data</span>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Enrollment Distribution
          </span>
          <span className="text-xs text-gray-500">
            {total.toLocaleString()} total
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner">
            <div className="flex h-full">{getProgressBarSegments()}</div>
          </div>
          {/* Hover overlay for progress bar */}
          <div className="absolute inset-0 flex">
            {statusData.map(
              (status, index) =>
                status.percentage > 0 && (
                  <div
                    key={index}
                    className="relative cursor-help transition-opacity hover:opacity-80"
                    style={{ width: `${status.percentage}%` }}
                    onMouseEnter={() => setShowTooltip(index)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    {showTooltip === index && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg">
                        <div className="font-medium">{status.label}</div>
                        <div>
                          {status.count} ({status.percentage.toFixed(1)}%)
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Legend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {statusData.map((status, index) => {
          const Icon = status.icon;
          return (
            <div
              key={index}
              className={`${status.bgColor} ${status.borderColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-sm hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${status.textColor}`} />
                  <span className={`text-sm font-medium ${status.textColor}`}>
                    {status.label}
                  </span>
                </div>
                <div className="group relative">
                  <Info className="w-3 h-3 text-gray-400 cursor-help" />
                  <div className="absolute right-0 top-6 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {status.description}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {status.count.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {status.percentage.toFixed(1)}% of total
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Total Section */}
      <div className="pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              Total Enrollments
            </span>
            <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              All Status
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {approvedPercent > rejectedPercent + pendingPercent ? (
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Mostly approved
                </span>
              ) : (
                <span className="text-amber-600">Needs attention</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentChart;
