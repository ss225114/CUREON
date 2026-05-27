import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaClock,
  FaUser,
  FaStethoscope,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaEllipsisV,
  FaPhone,
  FaVideo,
  FaCalendar,
  FaNotesMedical,
  FaSpinner,
} from "react-icons/fa";
import { useDashboard } from "../context/dashboardContext";

export default function Appointments() {
  const {
    appointments,
    updateAppointmentStatus,
    appointmentActionLoading,
    setSelectedDate,
  } = useDashboard();

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedAppointment, setExpandedAppointment] = useState(null);

  const statusFilters = [
    { value: "all", label: "All", icon: FaStethoscope },
    { value: "pending", label: "Pending", icon: FaClock },
    { value: "accepted", label: "Accepted", icon: FaCheckCircle },
    { value: "declined", label: "Declined", icon: FaTimesCircle },
    { value: "completed", label: "Completed", icon: FaCheckCircle },
    { value: "cancelled", label: "Cancelled", icon: FaTimesCircle },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    if (selectedStatus === "all") return true;
    return apt.status === selectedStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";

      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";

      case "declined":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";

      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";

      case "cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <FaCheckCircle className="h-4 w-4" />;

      case "pending":
        return <FaClock className="h-4 w-4" />;

      case "declined":
        return <FaTimesCircle className="h-4 w-4" />;

      case "completed":
        return <FaCheckCircle className="h-4 w-4" />;

      case "cancelled":
        return <FaTimesCircle className="h-4 w-4" />;

      default:
        return <FaExclamationCircle className="h-4 w-4" />;
    }
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleAppointmentExpansion = (id) => {
    setExpandedAppointment(expandedAppointment === id ? null : id);
  };

  const handleStatusUpdate = async (appointmentId, status, date) => {
    try {
      await updateAppointmentStatus(appointmentId, status, date);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
            <FaStethoscope className="h-5 w-5" />
            Appointments
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedStatus === filter.value
                  ? "bg-gradient-to-r from-[#293379] to-[#3a4a9c] text-white shadow-sm"
                  : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#293379]"
              }`}
            >
              <filter.icon className="h-3 w-3" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Appointments */}
        <div className="space-y-4">
          {filteredAppointments.map((apt) => {
            const isExpanded = expandedAppointment === apt._id;

            return (
              <div
                key={apt._id}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#293379] dark:hover:border-blue-600 transition-all duration-200 bg-white dark:bg-gray-900/40 shadow-sm"
              >
                {/* Main */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 rounded-full">
                      <FaUser className="h-6 w-6 text-[#293379] dark:text-blue-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {apt.patientId?.fullName || "Patient"}
                        </h4>

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                            apt.status,
                          )}`}
                        >
                          {getStatusIcon(apt.status)}

                          {apt.status.charAt(0).toUpperCase() +
                            apt.status.slice(1)}
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        {/* Type */}
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FaStethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Type
                            </div>

                            <div className="font-medium text-gray-900 dark:text-white capitalize">
                              {apt.appointmentType}
                            </div>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <FaClock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Time
                            </div>

                            <div className="font-medium text-gray-900 dark:text-white">
                              {apt.slotId?.startTime}
                            </div>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <FaCalendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Date
                            </div>

                            <div className="font-medium text-gray-900 dark:text-white">
                              {new Date(apt.slotId?.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {/* Fee */}
                        {/* <div className="flex items-center gap-2">
                          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            ₹
                          </div>

                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Fee
                            </div>

                            <div className="font-medium text-gray-900 dark:text-white">
                              ₹{apt.consultationFee}
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Expand */}
                  <button
                    onClick={() => toggleAppointmentExpansion(apt._id)}
                    className="h-7 w-7 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 hover:from-[#293379]/20 hover:to-[#016b61]/20 flex items-center justify-center text-[#293379] dark:text-gray-300 transition-all duration-200"
                  >
                    <FaEllipsisV className="h-3 w-3" />
                  </button>
                </div>

                {/* Symptoms */}
                {apt.symptoms?.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Symptoms:
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {apt.symptoms.map((symptom, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expanded */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                    {/* Notes */}
                    {apt.notes && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <FaNotesMedical className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>

                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-amber-50/50 to-white/50 dark:from-amber-900/10 dark:to-gray-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                          <p className="text-gray-800 dark:text-gray-300">
                            {apt.notes}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      {/* PENDING */}
                      {apt.status === "pending" && (
                        <>
                          <Button
                            onClick={() => {
                              handleStatusUpdate(
                                apt._id,
                                "accepted",
                                apt.slotId?.date,
                              );
                              setSelectedDate(new Date(apt.slotId?.date));
                            }}
                            disabled={appointmentActionLoading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {appointmentActionLoading ? (
                              <FaSpinner className="animate-spin mr-2" />
                            ) : (
                              <FaCheckCircle className="mr-2" />
                            )}
                            Accept
                          </Button>

                          <Button
                            onClick={() =>
                              handleStatusUpdate(apt._id, "declined")
                            }
                            disabled={appointmentActionLoading}
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <FaTimesCircle className="mr-2" />
                            Decline
                          </Button>
                        </>
                      )}

                      {/* ACCEPTED */}
                      {apt.status === "accepted" && (
                        <>
                          {apt.appointmentType === "video" && (
                            <Button className="bg-[#016b61] hover:bg-[#015951] text-white">
                              <FaVideo className="mr-2" />
                              Start Video
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            <FaPhone className="mr-2" />
                            Call Patient
                          </Button>

                          <Button
                            onClick={() =>
                              handleStatusUpdate(
                                apt._id,
                                "completed",
                                apt.slotId?.date,
                              )
                            }
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-50"
                          >
                            Mark Completed
                          </Button>
                        </>
                      )}

                      {/* COMPLETED */}
                      {apt.status === "completed" && (
                        <div className="w-full">
                          <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50/60 to-white dark:from-green-900/10 dark:to-gray-900/20">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                                <FaCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>

                              <div>
                                <h4 className="font-semibold text-green-700 dark:text-green-300">
                                  Appointment Completed
                                </h4>

                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Consultation has been successfully completed.
                                </p>
                              </div>
                            </div>

                            {/* <div className="flex flex-wrap gap-3 mt-4">
                              <Button
                                variant="outline"
                                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              >
                                View Summary
                              </Button>

                              <Button
                                variant="outline"
                                className="border-purple-300 text-purple-700 hover:bg-purple-50"
                              >
                                Add Prescription
                              </Button>

                              <Button
                                variant="outline"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                              >
                                Download Report
                              </Button>
                            </div> */}
                          </div>
                        </div>
                      )}

                      {/* CANCELLED */}
                      {apt.status === "cancelled" && (
                        <div className="w-full">
                          <div className="p-4 rounded-xl border border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50/60 to-white dark:from-red-900/10 dark:to-gray-900/20">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                                <FaTimesCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                              </div>

                              <div>
                                <h4 className="font-semibold text-red-700 dark:text-red-300">
                                  Appointment Cancelled
                                </h4>

                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  This appointment has been cancelled and is no
                                  longer active.
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                              <Button
                                variant="outline"
                                className="border-red-300 text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                disabled
                              >
                                Cancelled
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COMMON */}
                      {apt.status !== "cancelled" &&
                        apt.status !== "completed" &&
                        apt.status !== "pending" && (
                          <Button
                            onClick={() =>
                              handleStatusUpdate(
                                apt._id,
                                "cancelled",
                                apt.slotId?.date,
                              )
                            }
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Cancel Appointment
                          </Button>
                        )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-10">
            <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full inline-flex mb-4">
              <FaClock className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>

            <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No appointments found
            </h4>

            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No appointments match the selected filter
            </p>

            <Button
              onClick={() => setSelectedStatus("all")}
              variant="outline"
              className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white"
            >
              Show All Appointments
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
