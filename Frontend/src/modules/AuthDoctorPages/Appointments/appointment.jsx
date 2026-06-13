import React, { useEffect } from "react";
import {
  AppointmentsProvider,
  useAppointments,
} from "./context/AppointmentsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaClock,
  FaCalendarDay,
  FaUserClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaUserMd,
  FaSignOutAlt,
} from "react-icons/fa";
import Calendar from "./components/Calendar";
import AppointmentCard from "./components/AppointmentCard";
import StatsCards from "./components/StatsCards";

const AppointmentDashboard = () => {
  const {
    selectedDate,
    setSelectedDate,
    todayAppointments,
    upcomingAppointments,
    getAppointmentsForDate,
    stats,
    doctor,
  } = useAppointments();

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);
  // const normalizedSelectedDate = new Date(selectedDate);
  // normalizedSelectedDate.setHours(0, 0, 0, 0);

  // const selectedDateAppointments =
  //   getAppointmentsForDate(normalizedSelectedDate) || [];
  const today = new Date();
  const isTodaySelected = selectedDate.toDateString() === today.toDateString();
  const isPastDate = selectedDate < today;

  useEffect(() => {
    console.log(upcomingAppointments);
    console.log(selectedDate);
    console.log("selected date apts:", selectedDateAppointments);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBackToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Minimal Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#293379] dark:text-white">
                Appointment Management
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage appointments, schedules and patient bookings
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-blue-200/50 dark:border-gray-700/50 rounded-xl px-5 py-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Today's Date
              </div>

              <div className="font-semibold text-[#293379] dark:text-blue-300 mt-1">
                {formatDate(selectedDate)}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <StatsCards /> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calendar & Upcoming */}
          <div className="lg:col-span-2 space-y-6">
            <Calendar />

            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaUserClock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        Upcoming Appointments
                      </CardTitle>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {upcomingAppointments.length} pending
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        isUpcoming={true}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Selected Date Details */}
          <div className="space-y-6">
            {/* Date Summary Card */}
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FaCalendarDay className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    Date Overview
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Date Type
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isTodaySelected
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : isPastDate
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {isTodaySelected
                        ? "Today"
                        : isPastDate
                          ? "Past Date"
                          : "Future Date"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Appointments
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {selectedDateAppointments.length}
                    </span>
                  </div>

                  {selectedDateAppointments.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Status Distribution
                      </div>
                      <div className="space-y-2">
                        {["pending", "accepted", "completed", "rejected"].map(
                          (status) => {
                            const count = selectedDateAppointments.filter(
                              (app) => app.status === status,
                            ).length;
                            if (count === 0) return null;

                            const statusConfig = {
                              pending: { color: "bg-amber-500", icon: FaClock },
                              accepted: {
                                color: "bg-green-500",
                                icon: FaCheckCircle,
                              },
                              completed: {
                                color: "bg-blue-500",
                                icon: FaCheckCircle,
                              },
                              rejected: {
                                color: "bg-red-500",
                                icon: FaTimesCircle,
                              },
                            }[status];

                            const Icon = statusConfig?.icon;

                            return (
                              <div
                                key={status}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`p-1.5 rounded ${statusConfig?.color.replace("bg-", "bg-")} bg-opacity-10`}
                                  >
                                    <Icon
                                      className={`h-3.5 w-3.5 ${statusConfig?.color.replace("bg-", "text-")}`}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                    {status}
                                  </span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {count}
                                </span>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Appointments */}
            {selectedDateAppointments.length > 0 ? (
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaClock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isTodaySelected ? "Today's" : "Selected Date"}{" "}
                        Appointments
                      </CardTitle>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedDateAppointments.length} total
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDateAppointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment._id}
                        appointment={appointment}
                        isUpcoming={
                          !isPastDate && appointment.status === "accepted"
                        }
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <FaExclamationTriangle className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200 mb-2">
                    No Appointments Scheduled
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {isTodaySelected
                      ? "No appointments scheduled for today."
                      : `No appointments scheduled for ${formatDate(selectedDate)}.`}
                  </p>
                  {!isTodaySelected && (
                    <Button
                      onClick={handleBackToToday}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <FaChevronLeft className="mr-2 h-3 w-3" />
                      Back to Today
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 px-4 py-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Cureon Medical Profile. All
              rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Profile ID: {doctor?.id}
              </span>
              <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                Verified
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const AppointmentPage = () => {
  return (
    <AppointmentsProvider>
      <AppointmentDashboard />
    </AppointmentsProvider>
  );
};

export default AppointmentPage;
