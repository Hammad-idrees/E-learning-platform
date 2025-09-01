import { GraduationCap } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { FaUserGraduate, FaUserPlus, FaMedal } from "react-icons/fa";

const cards = [
  {
    icon: <FaUserGraduate className="text-white" />,
    title: "Overall Enrollments",
    value: 300,
    suffix: "+",
    gradient: "from-[#2563EB] to-[#0F2C59]",
    delay: 0.1,
  },
  {
    icon: <FaUserPlus className="text-white" />,
    title: "Overall Sign-ups",
    value: 1500,
    suffix: "+",
    gradient: "from-[#22C55E] to-[#16A34A]",
    delay: 0.2,
  },
  {
    icon: <FaMedal className="text-white" />,
    title: "Student Success Rate",
    value: 90,
    suffix: "%",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    delay: 0.3,
  },
];

const HomeStats = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 shadow-sm border border-blue-200/50 dark:border-blue-700/50">
            <GraduationCap className="w-4 h-4" />
            Statistics
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2C59] dark:text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">
            Key metrics that reflect our growth and student success
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="relative rounded-xl border border-blue-100/60 dark:border-slate-600 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Animated background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
                ></div>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-sm text-[#64748B] dark:text-gray-400 mb-1">
                      {card.title}
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59] dark:text-white">
                      <CountUp
                        end={card.value}
                        duration={3}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                        delay={card.delay}
                      />
                      <span className="ml-1">{card.suffix}</span>
                    </div>
                  </div>
                </div>

                {/* Subtle progress indicator */}
                <div className="mt-4 w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full bg-gradient-to-r ${card.gradient}`}
                    style={{ width: `${Math.min(card.value, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle footer note */}
          <div className="mt-8 text-center text-sm text-[#64748B] dark:text-gray-400">
            <p>Real-time statistics updated regularly</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
