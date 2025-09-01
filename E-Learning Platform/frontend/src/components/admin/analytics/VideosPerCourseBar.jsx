import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PlayCircle, BarChart3, TrendingUp, Video } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ImprovedVideosPerCourseBar = ({ courses = [] }) => {
  const chartData = useMemo(() => {
    if (!courses || courses.length === 0) {
      return [];
    }

    // Process actual course data
    const processedData = courses
      .map((course) => ({
        title:
          course.courseTitle ||
          course.title ||
          course.name ||
          "Untitled Course",
        videos:
          course.totalVideos ||
          (Array.isArray(course.videos) ? course.videos.length : 0) ||
          course.videoCount ||
          0,
        id: course._id || course.id || Math.random().toString(36).substr(2, 9),
      }))
      .filter((course) => course.videos > 0) // Only show courses with videos
      .sort((a, b) => b.videos - a.videos) // Sort by video count descending
      .slice(0, 10); // Show top 10 courses

    return processedData;
  }, [courses]);

  // Calculate comprehensive stats
  const stats = useMemo(() => {
    if (chartData.length === 0) {
      return { totalVideos: 0, avgVideos: 0, maxVideos: 0, minVideos: 0 };
    }

    const totalVideos = chartData.reduce(
      (sum, course) => sum + course.videos,
      0
    );
    const avgVideos = (totalVideos / chartData.length).toFixed(1);
    const maxVideos = Math.max(...chartData.map((c) => c.videos));
    const minVideos = Math.min(...chartData.map((c) => c.videos));

    return {
      totalVideos,
      avgVideos: parseFloat(avgVideos),
      maxVideos,
      minVideos,
    };
  }, [chartData]);

  // Generate dynamic gradient colors based on Corporate Blue theme
  const generateColors = () => {
    return chartData.map((item) => {
      const intensity = item.videos / stats.maxVideos;

      // Corporate Blue theme gradients
      if (intensity > 0.8) return "rgba(37, 99, 235, 0.8)"; // Primary Blue
      if (intensity > 0.6) return "rgba(59, 130, 246, 0.8)"; // Lighter Blue
      if (intensity > 0.4) return "rgba(34, 197, 94, 0.8)"; // Success Green
      if (intensity > 0.2) return "rgba(245, 158, 11, 0.8)"; // Warning Amber
      return "rgba(100, 116, 139, 0.8)"; // Slate Gray
    });
  };

  const data = {
    labels: chartData.map((item) => {
      // Smart truncation for better display
      const maxLength = window.innerWidth < 768 ? 12 : 20;
      return item.title.length > maxLength
        ? item.title.substring(0, maxLength) + "..."
        : item.title;
    }),
    datasets: [
      {
        label: "Videos",
        data: chartData.map((item) => item.videos),
        backgroundColor: generateColors(),
        borderColor: generateColors().map((color) => color.replace("0.8", "1")),
        borderWidth: 2,
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
        hoverBackgroundColor: generateColors().map((color) =>
          color.replace("0.8", "0.9")
        ),
        hoverBorderWidth: 3,
        hoverBorderColor: "#2563eb",
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
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#f8fafc",
        bodyColor: "#f8fafc",
        borderColor: "#2563eb",
        borderWidth: 2,
        cornerRadius: 12,
        padding: 16,
        titleFont: {
          size: 14,
          weight: "600",
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: function (context) {
            const index = context[0].dataIndex;
            return chartData[index].title; // Show full title in tooltip
          },
          label: function (context) {
            const videoCount = context.parsed.y;
            const percentage = ((videoCount / stats.totalVideos) * 100).toFixed(
              1
            );
            return [
              `Videos: ${videoCount}`,
              `Percentage: ${percentage}% of total`,
              `Rank: #${context.dataIndex + 1} of ${chartData.length}`,
            ];
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
          color: "#64748b",
          font: {
            size: 12,
            family: "'Inter', 'system-ui', sans-serif",
            weight: "500",
          },
          maxRotation: 45,
          minRotation: 0,
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "rgba(226, 232, 240, 0.5)",
          lineWidth: 1,
          drawTicks: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 12,
            family: "'Inter', 'system-ui', sans-serif",
            weight: "500",
          },
          stepSize: Math.max(1, Math.ceil(stats.maxVideos / 8)),
          padding: 12,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
      delay: (context) => context.dataIndex * 100, // Staggered animation
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  // Empty state
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#2563eb]/5 border border-white/50 p-8 w-full min-h-[600px]">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#64748b]/10 flex items-center justify-center">
            <Video size={40} className="text-[#64748b]" />
          </div>
          <h3 className="text-xl font-semibold text-[#0f172a]">
            No Course Data
          </h3>
          <p className="text-[#64748b] max-w-md">
            No courses found to display video statistics. Add courses with
            videos to see the chart.
          </p>
        </div>
      </div>
    );
  }

  // No videos in courses
  if (chartData.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#2563eb]/5 border border-white/50 p-8 w-full min-h-[600px]">
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
            <PlayCircle size={40} className="text-[#f59e0b]" />
          </div>
          <h3 className="text-xl font-semibold text-[#0f172a]">
            No Videos Found
          </h3>
          <p className="text-[#64748b] max-w-md">
            All courses have 0 videos. Add videos to your courses to see the
            statistics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#2563eb]/5 border border-white/50 hover:shadow-xl hover:shadow-[#2563eb]/10 transition-all duration-500 p-6 w-full min-h-[700px]">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563eb] to-[#1e40af] flex items-center justify-center shadow-lg">
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#0f172a] to-[#1e293b] bg-clip-text text-transparent">
              Videos Per Course
            </h3>
            <p className="text-[#64748b] text-sm">
              Top {chartData.length} courses by video count
            </p>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#2563eb]/10 to-[#1e40af]/20 rounded-xl p-4 border border-[#2563eb]/20">
            <div className="flex items-center gap-2 mb-1">
              <Video size={16} className="text-[#2563eb]" />
              <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                Total Videos
              </span>
            </div>
            <span className="text-2xl font-bold text-[#0f172a]">
              {stats.totalVideos}
            </span>
          </div>

          <div className="bg-gradient-to-br from-[#22c55e]/10 to-[#16a34a]/20 rounded-xl p-4 border border-[#22c55e]/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-[#22c55e]" />
              <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                Average
              </span>
            </div>
            <span className="text-2xl font-bold text-[#0f172a]">
              {stats.avgVideos}
            </span>
          </div>

          <div className="bg-gradient-to-br from-[#f59e0b]/10 to-[#d97706]/20 rounded-xl p-4 border border-[#f59e0b]/20">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 size={16} className="text-[#f59e0b]" />
              <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                Highest
              </span>
            </div>
            <span className="text-2xl font-bold text-[#0f172a]">
              {stats.maxVideos}
            </span>
          </div>

          <div className="bg-gradient-to-br from-[#64748b]/10 to-[#475569]/20 rounded-xl p-4 border border-[#64748b]/20">
            <div className="flex items-center gap-2 mb-1">
              <PlayCircle size={16} className="text-[#64748b]" />
              <span className="text-xs font-medium text-[#64748b] uppercase tracking-wide">
                Lowest
              </span>
            </div>
            <span className="text-2xl font-bold text-[#0f172a]">
              {stats.minVideos}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container with increased height */}
      <div className="h-96 w-full mb-6 bg-gradient-to-t from-[#f8fafc]/50 to-transparent rounded-xl p-4">
        <Bar data={data} options={options} />
      </div>

      {/* Enhanced Legend */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] rounded-xl border border-[#e2e8f0]/50">
        <h4 className="text-sm font-semibold text-[#0f172a] mb-3">
          Performance Categories
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#2563eb] rounded-md shadow-sm"></div>
            <span className="text-[#64748b] font-medium">
              Excellent (25+ videos)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#3b82f6] rounded-md shadow-sm"></div>
            <span className="text-[#64748b] font-medium">
              Good (15-24 videos)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#22c55e] rounded-md shadow-sm"></div>
            <span className="text-[#64748b] font-medium">
              Average (10-14 videos)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#f59e0b] rounded-md shadow-sm"></div>
            <span className="text-[#64748b] font-medium">
              Needs Attention (&lt;10)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedVideosPerCourseBar;
