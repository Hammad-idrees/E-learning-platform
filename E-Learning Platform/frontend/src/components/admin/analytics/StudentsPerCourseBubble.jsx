import React, { useMemo } from "react";

const COLORS = [
  "#ef4444", // red-500
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
  "#6366f1", // indigo-500
  "#a855f7", // purple-500
  "#06b6d4", // cyan-500
  "#84cc16", // lime-500
  "#0ea5e9", // sky-500
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const StudentsPerCourseBubble = ({ courses = [] }) => {
  const bubbles = useMemo(() => {
    const items = courses.map((c, idx) => {
      const name = c.courseTitle || c.title || "Untitled";
      const students = c.enrollmentBreakdown?.approved ?? c.totalUsers ?? 0;
      return { name, students, color: COLORS[idx % COLORS.length] };
    });

    // Sort by students desc and limit to top 12 for legibility
    const sorted = items.sort((a, b) => b.students - a.students).slice(0, 12);

    // Size mapping
    const minSize = 64; // px - increased minimum
    const maxSize = 160; // px - increased maximum
    const values = sorted.map((i) => i.students);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 1);

    return sorted.map((i) => {
      let size;
      if (maxVal === minVal) {
        size = Math.round((minSize + maxSize) / 2);
      } else {
        const t = (i.students - minVal) / (maxVal - minVal);
        size = Math.round(minSize + t * (maxSize - minSize));
      }
      size = clamp(size, minSize, maxSize);
      return { ...i, size };
    });
  }, [courses]);

  const stats = useMemo(() => {
    if (bubbles.length === 0) return { total: 0, highest: 0, average: 0 };

    const total = bubbles.reduce((sum, b) => sum + b.students, 0);
    const highest = Math.max(...bubbles.map((b) => b.students));
    const average = Math.round(total / bubbles.length);

    return { total, highest, average };
  }, [bubbles]);

  if (bubbles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 w-full">
        <div className="text-center py-12">
          <div className="text-gray-400 text-5xl mb-4">🎓</div>
          <div className="text-gray-500 font-medium text-lg">
            No course data available
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Course enrollment data will appear here
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Students per Course Distribution
        </h3>
        <p className="text-gray-600">
          Bubble size represents enrollment numbers • Showing top{" "}
          {bubbles.length} courses
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center">
          <div className="text-blue-600 text-sm font-medium">
            Total Students
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {stats.total.toLocaleString()}
          </div>
          <div className="text-blue-600 text-xs">across all courses</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 text-center">
          <div className="text-emerald-600 text-sm font-medium">
            Highest Enrollment
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {stats.highest.toLocaleString()}
          </div>
          <div className="text-emerald-600 text-xs">most popular course</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 text-center">
          <div className="text-amber-600 text-sm font-medium">
            Average per Course
          </div>
          <div className="text-2xl font-bold text-amber-700">
            {stats.average.toLocaleString()}
          </div>
          <div className="text-amber-600 text-xs">students enrolled</div>
        </div>
      </div>

      {/* Enhanced Bubble Cloud */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 mb-6">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 min-h-[300px]">
          {bubbles.map((b, index) => (
            <div
              key={b.name}
              className="relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Bubble */}
              <div
                className="rounded-full flex items-center justify-center shadow-lg text-white select-none relative overflow-hidden"
                style={{
                  width: b.size,
                  height: b.size,
                  backgroundColor: b.color,
                  boxShadow: `0 4px 20px ${b.color}30, 0 1px 3px rgba(0,0,0,0.1)`,
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
                  }}
                />

                {/* Student count */}
                <div className="relative z-10 text-center">
                  <div
                    className="font-bold text-white leading-tight"
                    style={{
                      fontSize: b.size < 80 ? 14 : b.size < 120 ? 16 : 20,
                    }}
                  >
                    {b.students.toLocaleString()}
                  </div>
                  {b.size >= 100 && (
                    <div
                      className="text-white opacity-90 font-medium"
                      style={{ fontSize: b.size < 120 ? 10 : 12 }}
                    >
                      students
                    </div>
                  )}
                </div>

                {/* Hover tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                  <div className="font-semibold">{b.name}</div>
                  <div>{b.students.toLocaleString()} students</div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              {/* Rank indicator for top 3 */}
              {index < 3 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Course Legend</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bubbles.map((b, index) => (
            <div
              key={b.name}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 min-w-0"
            >
              {/* Color indicator */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="inline-block w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: b.color }}
                />
                {index < 3 && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                    #{index + 1}
                  </span>
                )}
              </div>

              {/* Course info */}
              <div className="min-w-0 flex-1">
                <div
                  className="text-sm font-medium text-gray-800 truncate"
                  title={b.name}
                >
                  {b.name}
                </div>
                <div className="text-xs text-gray-500">
                  {b.students.toLocaleString()} students
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        Enrollment data • Bubble sizes are proportional to student count
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default StudentsPerCourseBubble;
