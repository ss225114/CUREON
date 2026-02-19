import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { useAppointments } from "../context/AppointmentsContext";

const Calendar = () => {
  const { selectedDate, setSelectedDate, appointments } = useAppointments();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const getAppointmentsForDate = (date) => {
    try {
      const dateString = date.toISOString().split("T")[0];
      return appointments.filter((app) => app.appointmentDate === dateString);
    } catch (error) {
      return [];
    }
  };

  // Check if date is in the 7-day window (last 4, today, next 2)
  const isDateInDataWindow = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const fourDaysAgo = new Date(today);
    fourDaysAgo.setDate(today.getDate() - 4);

    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    return targetDate >= fourDaysAgo && targetDate <= twoDaysLater;
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const today = new Date();

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    setSelectedDate(newDate);
  };

  const isToday = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return date.toDateString() === selectedDate.toDateString();
  };

  const isDateInWindow = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return isDateInDataWindow(date);
  };

  // Get status counts for dates in window
  const getStatusCounts = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (!isDateInWindow(day)) return null;

    const dateApps = getAppointmentsForDate(date);
    return {
      pending: dateApps.filter((app) => app.status === "pending").length,
      confirmed: dateApps.filter((app) => app.status === "confirmed").length,
      completed: dateApps.filter((app) => app.status === "completed").length,
      rejected: dateApps.filter((app) => app.status === "rejected").length,
    };
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <FaCalendarAlt className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            Appointment Calendar
            {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2 hidden md:inline">
              (Data available for last 4 days, today, and next 2 days)
            </span> */}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigateMonth(-1)}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full"
            >
              <FaChevronLeft className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[140px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <Button
              onClick={() => navigateMonth(1)}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full"
            >
              <FaChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month start */}
          {Array.from({ length: startingDay }).map((_, index) => (
            <div key={`empty-${index}`} className="h-12" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day,
            );
            const dateApps = getAppointmentsForDate(date);
            const hasData = isDateInWindow(day);
            const hasAppointments = dateApps.length > 0;
            const isTodayDate = isToday(day);
            const isSelectedDate = isSelected(day);
            const appointmentCount = getAppointmentsForDate(date).length;
            const statusCounts = getStatusCounts(day);

            return (
              <div key={day} className="flex flex-col items-center">
                <button
                  onClick={() => handleDateClick(day)}
                  className={`
                    relative w-12 h-12 rounded-full transition-all duration-200
                    flex flex-col items-center justify-center
                    ${
                      isTodayDate
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                        : isSelectedDate
                          ? "bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white shadow-md"
                          : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                    }
                    ${hasData && hasAppointments ? "ring-2 ring-offset-2" : ""}
                    ${hasData && hasAppointments ? getAppointmentRingColor(dateApps) : ""}
                  `}
                >
                  <span
                    className={`
                    text-sm font-semibold
                    ${isTodayDate || isSelectedDate ? "text-white" : "text-gray-900 dark:text-gray-200"}
                  `}
                  >
                    {day}
                  </span>

                  {/* Today indicator */}
                  {isTodayDate && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 border-2 border-white dark:border-gray-900 text-white text-[9px] font-bold flex items-center justify-center">
                      T
                    </div>
                  )}

                  {/* Selected date indicator (not today) */}
                  {isSelectedDate && !isTodayDate && (
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gray-800 dark:bg-gray-700 border-2 border-white dark:border-gray-900 text-white text-[9px] font-bold flex items-center justify-center">
                      ✓
                    </div>
                  )}

                  {/* Appointment count badge */}
                  {hasData && hasAppointments && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-white dark:border-gray-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {appointmentCount}
                    </div>
                  )}
                </button>

                {/* Status indicators below the date circle */}
                {hasData && hasAppointments && statusCounts && (
                  <div className="flex gap-1 mt-2">
                    {statusCounts.pending > 0 && (
                      <div
                        className="w-2 h-2 rounded-full bg-amber-500"
                        title={`${statusCounts.pending} pending`}
                      ></div>
                    )}
                    {statusCounts.confirmed > 0 && (
                      <div
                        className="w-2 h-2 rounded-full bg-green-500"
                        title={`${statusCounts.confirmed} confirmed`}
                      ></div>
                    )}
                    {statusCounts.completed > 0 && (
                      <div
                        className="w-2 h-2 rounded-full bg-blue-500"
                        title={`${statusCounts.completed} completed`}
                      ></div>
                    )}
                    {statusCounts.rejected > 0 && (
                      <div
                        className="w-2 h-2 rounded-full bg-red-500"
                        title={`${statusCounts.rejected} rejected`}
                      ></div>
                    )}
                  </div>
                )}

                {/* No appointments indicator for dates in window */}
                {hasData && !hasAppointments && (
                  <div className="mt-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"
                      title="No appointments"
                    ></div>
                  </div>
                )}

                {/* Data window indicator */}
                {hasData && (
                  <div className="mt-1">
                    <div
                      className="w-1 h-1 rounded-full bg-green-500"
                      title="Data available"
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data availability indicator */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data Availability Window
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last 4 days • Today • Next 2 days
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Has data
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  No appointments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Status Indicators
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                color: "bg-amber-500",
                label: "Pending",
                description: "Needs review",
              },
              {
                color: "bg-green-500",
                label: "Confirmed",
                description: "Approved",
              },
              {
                color: "bg-blue-500",
                label: "Completed",
                description: "Finished",
              },
              {
                color: "bg-red-500",
                label: "Rejected",
                description: "Declined",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${item.color}`}
                ></div>
                <div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to determine ring color based on appointments
const getAppointmentRingColor = (appointments) => {
  if (appointments.length === 0) return "";

  const hasPending = appointments.some((app) => app.status === "pending");
  const hasCompleted = appointments.some((app) => app.status === "completed");
  const hasRejected = appointments.some((app) => app.status === "rejected");

  if (hasPending) return "ring-amber-400";
  if (hasRejected) return "ring-red-400";
  if (hasCompleted) return "ring-green-400";
  return "ring-blue-400";
};

export default Calendar;