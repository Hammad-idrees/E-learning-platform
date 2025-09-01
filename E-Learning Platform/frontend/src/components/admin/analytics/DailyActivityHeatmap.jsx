import React, { useMemo, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getLoginActivity } from "../../../services/dashboard";

const ImprovedDailyActivity = () => {
  const [loginData, setLoginData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7); // 7, 14, or 30 days

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getLoginActivity();
        const arr = res?.data || res; // { success, data } shape
        setLoginData(Array.isArray(arr) ? arr : []);
      } catch {
        setLoginData([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredData = useMemo(() => {
    if (!loginData.length) return [];

    // Sort by date and take the last N days
    const sorted = [...loginData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sorted.slice(-timeRange);
  }, [loginData, timeRange]);

  const chartData = useMemo(() => {
    return filteredData.map((day, index) => ({
      ...day,
      // Format label based on time range for better display
      displayLabel: (() => {
        const date = new Date(day.date);
        if (timeRange === 7) {
          // Show full date for 7 days
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        } else if (timeRange === 14) {
          // Show every other date for 14 days
          return index % 2 === 0
            ? date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "";
        } else {
          // Show every 3rd date for 30 days
          return index % 3 === 0
            ? date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "";
        }
      })(),
      // Keep full date for tooltip
      fullDate: day.date,
      // Add index for interval calculation
      dataIndex: index,
    }));
  }, [filteredData, timeRange]);

  const stats = useMemo(() => {
    if (!chartData.length) return { peak: 0, average: 0, total: 0 };

    const logins = chartData.map((d) => d.logins || 0);
    const total = logins.reduce((sum, val) => sum + val, 0);
    const peak = Math.max(...logins);
    const average = Math.round(total / chartData.length);

    return { peak, average, total };
  }, [chartData]);

  // Calculate interval for X-axis labels
  const getXAxisInterval = () => {
    if (timeRange === 7) return 0; // Show all labels
    if (timeRange === 14) return 1; // Show every other label
    return 2; // Show every 3rd label for 30 days
  };

  // Generate color based on login count
  const getBarColor = (logins) => {
    const maxLogins = Math.max(...chartData.map((d) => d.logins || 0));
    if (maxLogins === 0) return "#9ca3af";

    const intensity = logins / maxLogins;

    if (intensity > 0.8) return "#3b82f6"; // High - Blue
    if (intensity > 0.6) return "#10b981"; // Good - Green
    if (intensity > 0.4) return "#f59e0b"; // Medium - Amber
    if (intensity > 0.2) return "#ef4444"; // Low - Red
    return "#9ca3af"; // Very low - Gray
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 bg-opacity-95 text-white p-3 rounded-lg border border-blue-400 shadow-lg">
          <p className="font-semibold text-blue-200">{data.fullDate}</p>
          <p className="text-gray-300 text-sm">{data.dayOfWeek}</p>
          <p className="text-white font-medium">Logins: {data.logins}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 w-full">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-gray-500">Loading login data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Daily Login Activity
          </h3>
          <p className="text-gray-600">User login trends over time</p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mt-4 sm:mt-0">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                timeRange === days
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {days}D
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-blue-600 text-sm font-medium">Peak Daily</div>
          <div className="text-2xl font-bold text-blue-700">{stats.peak}</div>
          <div className="text-blue-600 text-xs">highest in period</div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-green-600 text-sm font-medium">
            Daily Average
          </div>
          <div className="text-2xl font-bold text-green-700">
            {stats.average}
          </div>
          <div className="text-green-600 text-xs">logins per day</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="text-purple-600 text-sm font-medium">
            Total Logins
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {stats.total}
          </div>
          <div className="text-purple-600 text-xs">last {timeRange} days</div>
        </div>
      </div>

      {/* Chart - Increased height for better visibility */}
      <div className="h-96 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-gray-400 text-3xl mb-2">📊</div>
              <div className="text-gray-500 font-medium">
                No login data available
              </div>
              <div className="text-gray-400 text-sm">
                Data will appear when users log in
              </div>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 16,
                left: 0,
                bottom: timeRange > 14 ? 70 : 50,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                opacity={0.3}
                vertical={false}
              />
              <XAxis
                dataKey="displayLabel"
                stroke="#6b7280"
                fontSize={timeRange === 30 ? 10 : 11}
                angle={timeRange > 14 ? -45 : 0}
                textAnchor={timeRange > 14 ? "end" : "middle"}
                height={timeRange > 14 ? 70 : 50}
                interval={getXAxisInterval()}
                tick={{ fontSize: timeRange === 30 ? 10 : 11 }}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="logins"
                radius={[4, 4, 0, 0]}
                maxBarSize={timeRange === 30 ? 25 : timeRange === 14 ? 35 : 50}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.logins)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Activity Level Legend */}
      {chartData.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">High Activity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Good Activity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span className="text-gray-600">Medium Activity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Low Activity</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        Showing login activity for the last {timeRange} days • Updated in
        real-time
      </div>
    </div>
  );
};

export default ImprovedDailyActivity;
