import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const EnrollmentStatusDonut = ({ stats }) => {
  const approved = stats?.approved || 0;
  const rejected = stats?.rejected || 0;
  const pending = stats?.pending || 0;
  const total = stats?.total || approved + rejected + pending || 0;

  const chartData = useMemo(
    () => [
      { name: "Approved", value: approved, color: "#10b981" }, // emerald-500
      { name: "Rejected", value: rejected, color: "#ef4444" }, // red-500
      { name: "Pending", value: pending, color: "#f59e0b" }, // amber-500
    ],
    [approved, rejected, pending]
  );

  const formatPct = (v) => (total > 0 ? ((v / total) * 100).toFixed(1) : 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-black bg-opacity-90 text-white p-3 rounded-lg border border-white/20">
          <div className="font-semibold">{name}</div>
          <div>
            {value.toLocaleString()} ({formatPct(value)}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Chart Container - Made more responsive */}
        <div className="relative w-full lg:w-1/2 min-h-[280px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                cornerRadius={6}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center content */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-2xl font-bold text-gray-800">
              {total.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium text-center">
              Total
            </div>
          </div>
        </div>

        {/* Numeric details */}
        <div className="w-full lg:w-1/2 space-y-3">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="rounded-xl p-3 border transition-all duration-300 hover:shadow-md"
              style={{ borderLeft: `4px solid ${item.color}` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block w-3 h-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatPct(item.value)}% of total
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">applications</div>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${formatPct(item.value)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Approval Rate</div>
            <div className="text-lg font-semibold" style={{ color: "#10b981" }}>
              {formatPct(approved)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Rejection Rate</div>
            <div className="text-lg font-semibold" style={{ color: "#ef4444" }}>
              {formatPct(rejected)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Pending Rate</div>
            <div className="text-lg font-semibold" style={{ color: "#f59e0b" }}>
              {formatPct(pending)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentStatusDonut;
