import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaCalendarDay,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";
import { useAppointments } from "../context/AppointmentsContext";

const StatsCards = () => {
  const { stats, appointments } = useAppointments();

  // Calculate yesterday's stats for comparison
  const getYesterdayStats = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    const yesterdayApps = appointments.filter(
      (app) => app.appointmentDate === yesterdayString,
    );

    return {
      total: yesterdayApps.length,
      pending: yesterdayApps.filter((app) => app.status === "pending").length,
      confirmed: yesterdayApps.filter((app) => app.status === "confirmed")
        .length,
      completed: yesterdayApps.filter((app) => app.status === "completed")
        .length,
      rejected: yesterdayApps.filter((app) => app.status === "rejected").length,
    };
  };

  const yesterdayStats = getYesterdayStats();

  const calculateChange = (current, previous) => {
    if (previous === 0)
      return current > 0
        ? { value: 100, direction: "up" }
        : { value: 0, direction: "neutral" };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(Math.round(change)),
      direction: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    };
  };

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.total,
      icon: FaCalendarDay,
      color: "blue",
      description: "Scheduled for today",
      change: calculateChange(stats.total, yesterdayStats.total),
      key: "total",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: FaHourglassHalf,
      color: "amber",
      description: "Awaiting confirmation",
      change: calculateChange(stats.pending, yesterdayStats.pending),
      key: "pending",
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      icon: FaCalendarCheck,
      color: "green",
      description: "Approved appointments",
      change: calculateChange(stats.confirmed, yesterdayStats.confirmed),
      key: "confirmed",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: FaCheckCircle,
      color: "teal",
      description: "Finished consultations",
      change: calculateChange(stats.completed, yesterdayStats.completed),
      key: "completed",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: FaTimesCircle,
      color: "rose",
      description: "Cancelled appointments",
      change: calculateChange(stats.rejected, yesterdayStats.rejected),
      key: "rejected",
    },
  ];

  const colorClasses = {
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      light: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
    },
    amber: {
      gradient: "bg-gradient-to-br from-amber-500 to-amber-600",
      light: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
    },
    green: {
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      light: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
    },
    teal: {
      gradient: "bg-gradient-to-br from-teal-500 to-teal-600",
      light: "bg-teal-50 dark:bg-teal-900/20",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-200 dark:border-teal-800",
    },
    rose: {
      gradient: "bg-gradient-to-br from-rose-500 to-rose-600",
      light: "bg-rose-50 dark:bg-rose-900/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-200 dark:border-rose-800",
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statCards.map((stat) => {
        const colors = colorClasses[stat.color];

        return (
          <Card
            key={stat.key}
            className={`group border ${colors.border} bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
          >
            {/* Gradient accent line */}
            <div className={`h-1 w-full ${colors.gradient}`}></div>

            <CardContent className="p-5">
              {/* Main content */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value || 0}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </div>

                {/* Icon with background */}
                <div className={`relative p-3 rounded-xl ${colors.light}`}>
                  <div
                    className={`p-2 rounded-lg ${colors.gradient} shadow-sm`}
                  >
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>

                  {/* Change indicator */}
                  {stat.change.value > 0 && (
                    <div
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        stat.change.direction === "up"
                          ? "bg-green-500 text-white"
                          : stat.change.direction === "down"
                            ? "bg-rose-500 text-white"
                            : "bg-gray-400 text-white"
                      }`}
                    >
                      {stat.change.direction === "up"
                        ? "↑"
                        : stat.change.direction === "down"
                          ? "↓"
                          : "→"}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress section */}
              <div className="space-y-3">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Daily completion
                    </span>
                    <span className={`text-xs font-semibold ${colors.text}`}>
                      {stats.total > 0
                        ? Math.round((stat.value / stats.total) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colors.gradient} transition-all duration-700 ease-out`}
                      style={{
                        width: `${stats.total > 0 ? Math.min((stat.value / stats.total) * 100, 100) : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Change indicator */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <FaChartLine
                      className={`h-3 w-3 ${
                        stat.change.direction === "up"
                          ? "text-green-500"
                          : stat.change.direction === "down"
                            ? "text-rose-500"
                            : "text-gray-400"
                      }`}
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      vs yesterday
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      stat.change.direction === "up"
                        ? "text-green-600 dark:text-green-400"
                        : stat.change.direction === "down"
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {stat.change.direction === "up"
                      ? "+"
                      : stat.change.direction === "down"
                        ? "-"
                        : ""}
                    {stat.change.value}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;