import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaVideo,
  FaPhone,
  FaHome,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import AddSlotDialog from "./addSlotDialog";
import { useDashboard } from "../context/dashboardContext";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const currentDay = new Date().getDay();

const getAppointmentTypeIcon = (type) => {
  switch (type) {
    case "video":
      return <FaVideo className="h-3 w-3" />;
    case "phone":
      return <FaPhone className="h-3 w-3" />;
    default:
      return <FaHome className="h-3 w-3" />;
  }
};

const getAppointmentTypeColor = (type) => {
  switch (type) {
    case "video":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "phone":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  }
};

export default function Timetable() {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    slots,
    getSlotsByDate,
    acceptedAppointments,
    selectedDate,
    setSelectedDate,
  } = useDashboard();

  // Separate booked and available slots
  const bookedSlots = slots.filter((slot) => slot.isBooked && !slot.isComplete);
  const availableSlots = slots.filter((slot) => !slot.isBooked);

//   const bookedSlots = slots.filter((slot) => {
//   if (!slot.isBooked) return false;

//   const matchedAppointment = acceptedAppointments.find((appointment) => {
//     const appointmentSlotId =
//       appointment.slotId?._id?.toString() ||
//       appointment.slotId?.toString();

//     return appointmentSlotId === slot._id.toString();
//   });

//   // remove completed appointments
//   return matchedAppointment?.status !== "completed";
// });

  const combinedBookedAppointments = bookedSlots.map((slot) => {
    const matchedAppointment = acceptedAppointments.find(
      (appointment) =>
        appointment.slotId?._id === slot._id || appointment.slotId === slot._id,
    );

    return {
      ...slot,
      appointment: matchedAppointment || null,
    };
  });

  // State to track which time slot is showing options
  const [activeTimeSlot, setActiveTimeSlot] = useState(null);

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return "N/A";

    const convertToMinutes = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");

      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }

      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    };

    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(endTime);

    const duration = endMinutes - startMinutes;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    }

    if (hours > 0) {
      return `${hours}h`;
    }

    return `${minutes}m`;
  };

  const getDateForIndex = (index) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sun, 1 = Mon...

    // Convert JS day to your UI index (Mon=0 ... Sun=6)
    const normalizedToday = currentDay === 0 ? 6 : currentDay - 1;

    const diff = index - normalizedToday;

    const newDate = new Date(today);
    newDate.setDate(today.getDate() + diff);

    return newDate;
  };

  const isPastDate = (date) => {
    const today = new Date();

    // Remove time part for accurate comparison
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  const [expandedSlots, setExpandedSlots] = useState({});

  const toggleSlotExpansion = (slotId) => {
    setExpandedSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  };

  useEffect(() => {
    // console.log(selectedDate);
    getSlotsByDate(selectedDate);
  }, [selectedDate]);

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
            <FaCalendarAlt className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <AddSlotDialog date={selectedDate} />
        </div>
      </CardHeader>

      <CardContent>
        {/* Day Selector */}
        <div className="flex overflow-x-auto scrollbar-hide mb-6">
          {daysOfWeek.map((day, index) => {
            const dateObj = getDateForIndex(index);

            const isSelected =
              selectedDate.toDateString() === dateObj.toDateString();

            const isPast = isPastDate(dateObj);

            return (
              <div
                key={day}
                onClick={() => {
                  if (isPast) return; // 🚫 prevent clicking
                  setSelectedDate(dateObj);
                  getSlotsByDate(dateObj);
                }}
                className={`flex-1 min-w-[80px] text-center p-3 border-b-2 transition-all duration-200 ${
                  isPast
                    ? "cursor-not-allowed opacity-40 border-gray-100 dark:border-gray-800"
                    : isSelected
                      ? "cursor-pointer border-[#293379] dark:border-blue-600 bg-gradient-to-b from-[#293379]/5 to-transparent"
                      : "cursor-pointer border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {day}
                </div>

                <div
                  className={`text-lg font-bold mt-1 ${
                    isPast
                      ? "text-gray-500 dark:text-gray-600"
                      : isSelected
                        ? "text-[#293379] dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {dateObj.getDate()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Booked Appointments Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            Booked Appointments
          </h3>
          <div className="space-y-3">
            {combinedBookedAppointments.map((slot, index) => {
              const slotId = `slot_${index}`;
              const isExpanded = expandedSlots[slotId];

              return (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-white/50 dark:from-blue-900/10 dark:to-gray-900/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - Time and appointment type */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-[#293379]/20 to-[#016b61]/20">
                        <FaClock className="h-5 w-5 text-[#016b61] dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {slot.startTime}
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mt-1 ${getAppointmentTypeColor(
                            slot.type || "",
                          )}`}
                        >
                          {getAppointmentTypeIcon(slot.type || "")}
                          {slot.appointment?.appointmentType}
                          {/* {slot.type.charAt(0).toUpperCase() +
                            slot.type.slice(1)} */}
                        </span>
                      </div>
                    </div>

                    {/* Right side - Patient info and dropdown */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {slot.appointment?.patientId?.fullName}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Patient
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#293379] to-[#016b61] flex items-center justify-center text-white font-bold">
                        {slot.appointment?.patientId?.fullName?.charAt(0)}
                      </div>

                      {/* Dropdown toggle button */}
                      <button
                        onClick={() => toggleSlotExpansion(slotId)}
                        className="h-5 w-5 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 hover:from-[#293379]/20 hover:to-[#016b61]/20 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-[#293379] dark:text-gray-300 transition-all duration-200 hover:scale-105"
                      >
                        {isExpanded ? (
                          <FaChevronUp className="h-2.5 w-2.5" />
                        ) : (
                          <FaChevronDown className="h-2.5 w-2.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable details section */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-blue-100 dark:border-blue-800/50 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Appointment Details
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                              • Duration:{" "}
                              {calculateDuration(slot.startTime, slot.endTime)}
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Type:{" "}
                              {slot.appointment?.appointmentType === "video"
                                ? "Telemedicine"
                                : slot.appointment?.appointmentType === "phone"
                                  ? "Phone Consultation"
                                  : "Clinic Visit"}
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Status: Confirmed
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Contact Info
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                              • Phone:{" "}
                              {slot.appointment?.patientId?.userProfile?.phone}
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Email: {slot.appointment?.patientId?.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            Available Time Slots
          </h3>
          <div className="relative">
            {/* Time Capsules */}
            <div className="flex flex-wrap gap-3 mb-6">
              {availableSlots.map((slot, index) => (
                <div key={index} className="relative">
                  {/* Time Capsule */}
                  <div
                    // onClick={() => handleTimeSlotClick(slot.time)}
                    className={`px-4 py-2.5 rounded-full border font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTimeSlot === slot.time
                        ? "bg-gradient-to-r from-[#293379] to-[#016b61] text-white border-transparent shadow-lg"
                        : "bg-gradient-to-r from-[#293379]/10 to-[#016b61]/10 border-[#293379]/20 text-[#293379] dark:text-blue-300"
                    }`}
                  >
                    <FaClock className="h-3.5 w-3.5" />
                    {slot.startTime}
                  </div>

                  {/* Options Popup */}
                  {/* {activeTimeSlot === slot.time && (
                    <div
                      className="absolute top-full left-0 mt-2 z-10 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-3 min-w-[180px] cursor-pointer"
                      onClick={() => setActiveTimeSlot(null)}
                    >
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                        Book {slot.time}
                      </div>
                      <div
                        className="flex justify-center gap-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/50 flex items-center justify-center transition-all duration-200 hover:scale-110"
                          onClick={() => handleOptionClick(slot.time, "video")}
                          title="Video Call"
                        >
                          <FaVideo className="h-4 w-4" />
                        </button>
                        <button
                          className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 flex items-center justify-center transition-all duration-200 hover:scale-110"
                          onClick={() => handleOptionClick(slot.time, "phone")}
                          title="Phone Call"
                        >
                          <FaPhone className="h-4 w-4" />
                        </button>
                        <button
                          className="h-10 w-10 rounded-full bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/50 flex items-center justify-center transition-all duration-200 hover:scale-110"
                          onClick={() =>
                            handleOptionClick(slot.time, "in-person")
                          }
                          title="In-Person"
                        >
                          <FaHome className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              ))}
            </div>

            {/* Info Text
            <div className="text-sm text-gray-600 dark:text-gray-400 italic">
              Click on any time slot to book an appointment
            </div> */}
          </div>
        </div>

        {/* Summary */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#293379] dark:text-blue-400">
                {bookedSlots.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Appointments Today
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                3h 45m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Duration
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {availableSlots.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Available Slots
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

{
  /* <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
                              >
                                Reschedule
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30"
                              >
                                Cancel
                              </Button>
                              {/* <Button
                                size="sm"
                                className="bg-[#016b61] hover:bg-[#015951] text-white"
                              >
                                Start Call
                              </Button> 
                            </div>
</div> */
}
{
  /* <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Contact Info
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                              • Phone: (555) 123-4567
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Email: {slot.appointment.patientId?.email}
                            </div>
</div> */
}
