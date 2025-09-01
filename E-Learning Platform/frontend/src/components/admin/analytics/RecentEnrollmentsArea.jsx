import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EnhancedRecentEnrollmentsArea = ({ recent = [] }) => {
  const [timeRange, setTimeRange] = useState("7days"); // 7days, 14days, 30days

  // Generate sample data if none provided
  const sampleData = useMemo(() => {
    if (recent.length > 0) return recent;

    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 15) + 1;
      for (let j = 0; j < count; j++) {
        data.push({
          createdAt: date.toISOString(),
          id: `sample-${i}-${j}`,
        });
      }
    }
    return data;
  }, [recent]);

  const chartData = useMemo(() => {
    const daysToShow =
      timeRange === "7days" ? 7 : timeRange === "14days" ? 14 : 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    const filteredData = sampleData.filter(
      (r) => new Date(r.createdAt) >= cutoffDate
    );

    // Group by date (YYYY-MM-DD)
    const counts = filteredData.reduce((acc, r) => {
      const d = new Date(r.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    // Generate complete date range
    const labels = [];
    const values = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`;
      labels.push(key);
      values.push(counts[key] || 0);
    }

    return {
      labels: labels.map((date) => {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (d.toDateString() === today.toDateString()) return "Today";
        if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
        return `${d.getMonth() + 1}/${d.getDate()}`;
      }),
      values,
      rawDates: labels,
    };
  }, [sampleData, timeRange]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = chartData.values.reduce((sum, val) => sum + val, 0);
    const average = total / chartData.values.length;
    const max = Math.max(...chartData.values);
    const min = Math.min(...chartData.values);

    // Calculate trend (comparing first half vs second half)
    const midpoint = Math.floor(chartData.values.length / 2);
    const firstHalf = chartData.values.slice(0, midpoint);
    const secondHalf = chartData.values.slice(midpoint);
    const firstAvg =
      firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg =
      secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    const trend =
      secondAvg > firstAvg ? "up" : secondAvg < firstAvg ? "down" : "stable";
    const trendPercentage =
      firstAvg > 0 ? (((secondAvg - firstAvg) / firstAvg) * 100).toFixed(1) : 0;

    return {
      total,
      average: average.toFixed(1),
      max,
      min,
      trend,
      trendPercentage,
    };
  }, [chartData.values]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Daily Enrollments",
        data: chartData.values,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(99, 102, 241, 1)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        borderColor: "rgba(99, 102, 241, 0.5)",
        borderWidth: 2,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            const rawDate = chartData.rawDates[index];
            const date = new Date(rawDate);
            return date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          },
          label: function (context) {
            const value = context.parsed.y;
            const total = chartData.values.reduce((sum, val) => sum + val, 0);
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `Enrollments: ${value} (${percentage}% of total)`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "rgba(229, 231, 235, 0.3)",
          lineWidth: 1,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          stepSize: Math.max(1, Math.ceil(stats.max / 5)),
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  const getTrendIcon = () => {
    switch (stats.trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      default:
        return "➡️";
    }
  };

  const getTrendColor = () => {
    switch (stats.trend) {
      case "up":
        return "text-emerald-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Recent Enrollments Requests
          </h2>
          <p className="text-gray-600">Daily enrollment trends over time</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1 mt-4 sm:mt-0">
          {[
            { value: "7days", label: "7D" },
            { value: "14days", label: "14D" },
            { value: "30days", label: "30D" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                timeRange === option.value
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4">
          <div className="text-sm text-indigo-600 font-medium">Total</div>
          <div className="text-2xl font-bold text-indigo-700">
            {stats.total}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="text-sm text-blue-600 font-medium">Daily Average</div>
          <div className="text-2xl font-bold text-blue-700">
            {stats.average}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
          <div className="text-sm text-green-600 font-medium">Peak Day</div>
          <div className="text-2xl font-bold text-green-700">{stats.max}</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
          <div className="text-sm text-purple-600 font-medium">Trend</div>
          <div
            className={`text-lg font-bold flex items-center gap-1 ${getTrendColor()}`}
          >
            <span>{getTrendIcon()}</span>
            <span>{Math.abs(stats.trendPercentage)}%</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        {chartData.labels.length === 0 ? (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl">
            <div className="text-center">
              <div className="text-gray-400 text-4xl mb-2">📊</div>
              <div className="text-gray-500 font-medium">
                No enrollment data available
              </div>
              <div className="text-gray-400 text-sm">
                Data will appear when enrollments are recorded
              </div>
            </div>
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>

      {/* Footer Insights */}
      {chartData.labels.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <div>
              {stats.trend === "up" && (
                <span className="text-emerald-600">
                  📈 Enrollments are trending upward
                </span>
              )}
              {stats.trend === "down" && (
                <span className="text-red-600">
                  📉 Enrollments are trending downward
                </span>
              )}
              {stats.trend === "stable" && (
                <span className="text-gray-600">➡️ Enrollments are stable</span>
              )}
            </div>
            <div>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedRecentEnrollmentsArea;
