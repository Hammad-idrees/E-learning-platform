import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ImprovedPublishStatusPie = ({ courses = [] }) => {
  const { published, unpublished, total } = useMemo(() => {
    let published = 0;
    let unpublished = 0;
    courses.forEach((c) => {
      if (c.isPublished) published += 1;
      else unpublished += 1;
    });
    return { published, unpublished, total: published + unpublished };
  }, [courses]);

  const publishedPercentage =
    total > 0 ? ((published / total) * 100).toFixed(1) : 0;
  const unpublishedPercentage =
    total > 0 ? ((unpublished / total) * 100).toFixed(1) : 0;

  const data = {
    labels: ["Published", "Unpublished"],
    datasets: [
      {
        data: [published, unpublished],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // Green
          "rgba(156, 163, 175, 0.8)", // Gray
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(156, 163, 175, 1)"],
        borderWidth: 3,
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(156, 163, 175, 1)",
        ],
        hoverBorderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create custom legend
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        borderColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 2,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} courses (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-lg">
      {/* Header */}
      <div className="text-center mb-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          Course Publish Status
        </h3>
        <p className="text-sm text-gray-600">Total Courses: {total}</p>
      </div>

      {total === 0 ? (
        <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-gray-400 text-3xl mb-2">📚</div>
            <div className="text-gray-500 font-medium">
              No course data available
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="h-60 w-full mb-5">
            <Pie data={data} options={options} />
          </div>

          {/* Digital Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-green-600 text-sm font-medium mb-1">
                Published
              </div>
              <div className="text-2xl font-bold text-green-700">
                {published}
              </div>
              <div className="text-green-600 text-sm">
                {publishedPercentage}%
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-gray-600 text-sm font-medium mb-1">
                Unpublished
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {unpublished}
              </div>
              <div className="text-gray-600 text-sm">
                {unpublishedPercentage}%
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Publication Progress</span>
              <span>{publishedPercentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${publishedPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="text-center">
            {parseFloat(publishedPercentage) >= 80 ? (
              <div className="text-green-600 text-sm font-medium">
                ✅ Great! Most courses are published
              </div>
            ) : parseFloat(publishedPercentage) >= 50 ? (
              <div className="text-amber-600 text-sm font-medium">
                ⚠️ Good progress on publishing
              </div>
            ) : (
              <div className="text-red-600 text-sm font-medium">
                📝 More courses need to be published
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImprovedPublishStatusPie;
