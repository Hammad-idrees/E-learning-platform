import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const ImprovedCourseVisualization = ({ courseStats = [] }) => {
  const [chartType, setChartType] = useState("line"); // 'line' or 'area'
  const [showPercentages, setShowPercentages] = useState(false);

  const data = useMemo(() => {
    const list = courseStats.map((c) => {
      const approved = c.enrollmentBreakdown?.approved || 0;
      const pending = c.enrollmentBreakdown?.pending || 0;
      const rejected = c.enrollmentBreakdown?.rejected || 0;
      const total = approved + pending + rejected;

      return {
        name: c.courseTitle || c.title || "Untitled",
        shortName:
          (c.courseTitle || c.title || "Untitled").length > 25
            ? (c.courseTitle || c.title || "Untitled").substring(0, 22) + "..."
            : c.courseTitle || c.title || "Untitled",
        approved:
          showPercentages && total > 0
            ? Math.round((approved / total) * 100)
            : approved,
        pending:
          showPercentages && total > 0
            ? Math.round((pending / total) * 100)
            : pending,
        rejected:
          showPercentages && total > 0
            ? Math.round((rejected / total) * 100)
            : rejected,
        total: showPercentages ? 100 : total,
        rawApproved: approved,
        rawPending: pending,
        rawRejected: rejected,
        rawTotal: total,
      };
    });

    return list
      .filter((item) => item.rawTotal > 0)
      .sort((a, b) => b.rawTotal - a.rawTotal)
      .slice(0, 10);
  }, [courseStats, showPercentages]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg text-sm">
          <div className="font-semibold mb-2 text-gray-800">{data.name}</div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2 bg-green-500"></span>
                Approved:
              </span>
              <span className="font-medium">
                {showPercentages ? `${data.approved}%` : `${data.rawApproved}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2 bg-amber-500"></span>
                Pending:
              </span>
              <span className="font-medium">
                {showPercentages ? `${data.pending}%` : `${data.rawPending}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2 bg-red-500"></span>
                Rejected:
              </span>
              <span className="font-medium">
                {showPercentages ? `${data.rejected}%` : `${data.rawRejected}`}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{data.rawTotal}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="shortName"
          stroke="#6b7280"
          fontSize={11}
          angle={-35}
          textAnchor="end"
          height={80}
          interval={0}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          label={{
            value: showPercentages ? "Percentage (%)" : "Number of Students",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: "12px", fill: "#6b7280" },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ fontSize: 12 }}
        />
        <Line
          type="monotone"
          dataKey="approved"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
          name="Approved"
        />
        <Line
          type="monotone"
          dataKey="pending"
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#f59e0b", strokeWidth: 2 }}
          name="Pending"
        />
        <Line
          type="monotone"
          dataKey="rejected"
          stroke="#ef4444"
          strokeWidth={3}
          dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
          name="Rejected"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="shortName"
          stroke="#6b7280"
          fontSize={11}
          angle={-35}
          textAnchor="end"
          height={80}
          interval={0}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          label={{
            value: showPercentages ? "Percentage (%)" : "Number of Students",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: "12px", fill: "#6b7280" },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ fontSize: 12 }}
        />
        <Area
          type="monotone"
          dataKey="approved"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Approved"
        />
        <Area
          type="monotone"
          dataKey="pending"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Pending"
        />
        <Area
          type="monotone"
          dataKey="rejected"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Rejected"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === "line"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType("area")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              chartType === "area"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Area Chart
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showPercentages}
            onChange={(e) => setShowPercentages(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Show as percentages
        </label>
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Course Enrollment Status - Top 10 by Total Enrollments
        </h3>

        <div className="h-96">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No course data available
            </div>
          ) : (
            <>
              {chartType === "line" && renderLineChart()}
              {chartType === "area" && renderAreaChart()}
            </>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-green-800 text-sm font-medium">
              Total Approved
            </div>
            <div className="text-green-900 text-xl font-bold">
              {data.reduce((sum, course) => sum + course.rawApproved, 0)}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-amber-800 text-sm font-medium">
              Total Pending
            </div>
            <div className="text-amber-900 text-xl font-bold">
              {data.reduce((sum, course) => sum + course.rawPending, 0)}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-red-800 text-sm font-medium">
              Total Rejected
            </div>
            <div className="text-red-900 text-xl font-bold">
              {data.reduce((sum, course) => sum + course.rawRejected, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedCourseVisualization;
