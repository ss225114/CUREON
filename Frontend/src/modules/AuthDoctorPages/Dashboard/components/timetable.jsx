// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaUserMd,
//   FaVideo,
//   FaPhone,
//   FaHome,
//   FaPlus,
// } from "react-icons/fa";

// const timeSlots = [
//   { time: "9:00 AM", available: true, type: "in-person" },
//   { time: "10:00 AM", available: false, patient: "John Smith", type: "video" },
//   { time: "11:00 AM", available: true, type: "phone" },
//   {
//     time: "12:00 PM",
//     available: false,
//     patient: "Emma Wilson",
//     type: "in-person",
//   },
//   { time: "2:00 PM", available: true, type: "in-person" },
//   { time: "3:00 PM", available: false, patient: "Robert Chen", type: "video" },
//   { time: "4:00 PM", available: true, type: "phone" },
//   {
//     time: "5:00 PM",
//     available: false,
//     patient: "Lisa Smith",
//     type: "in-person",
//   },
// ];

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const currentDay = new Date().getDay();

// const getAppointmentTypeIcon = (type) => {
//   switch (type) {
//     case "video":
//       return <FaVideo className="h-3 w-3" />;
//     case "phone":
//       return <FaPhone className="h-3 w-3" />;
//     default:
//       return <FaHome className="h-3 w-3" />;
//   }
// };

// const getAppointmentTypeColor = (type) => {
//   switch (type) {
//     case "video":
//       return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
//     case "phone":
//       return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
//     default:
//       return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
//   }
// };

// export default function Timetable() {
//   // Separate booked and available slots
//   const bookedSlots = timeSlots.filter((slot) => !slot.available);
//   const availableSlots = timeSlots.filter((slot) => slot.available);

//   return (
//     <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
//             <FaCalendarAlt className="h-5 w-5" />
//             Today's Schedule
//           </CardTitle>
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
//           >
//             <FaPlus className="mr-2 h-3 w-3" />
//             Add Slot
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         {/* Day Selector */}
//         <div className="flex overflow-x-auto scrollbar-hide mb-6">
//           {daysOfWeek.map((day, index) => (
//             <div
//               key={day}
//               className={`flex-1 min-w-[80px] text-center p-3 border-b-2 cursor-pointer transition-colors duration-200 ${
//                 index === currentDay - 1
//                   ? "border-[#293379] dark:border-blue-600 bg-gradient-to-b from-[#293379]/5 to-transparent"
//                   : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
//               }`}
//             >
//               <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                 {day}
//               </div>
//               <div
//                 className={`text-lg font-bold mt-1 ${
//                   index === currentDay - 1
//                     ? "text-[#293379] dark:text-blue-400"
//                     : "text-gray-400 dark:text-gray-500"
//                 }`}
//               >
//                 {index === currentDay - 1 ? "15" : 10 + index}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Booked Appointments Section */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
//             Booked Appointments
//           </h3>
//           <div className="space-y-3">
//             {bookedSlots.map((slot, index) => (
//               <div
//                 key={index}
//                 className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-white/50 dark:from-blue-900/10 dark:to-gray-900/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-full bg-gradient-to-br from-[#293379]/20 to-[#016b61]/20">
//                       <FaClock className="h-5 w-5 text-[#016b61] dark:text-green-400" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900 dark:text-white">
//                         {slot.time}
//                       </div>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mt-1 ${getAppointmentTypeColor(
//                           slot.type,
//                         )}`}
//                       >
//                         {getAppointmentTypeIcon(slot.type)}
//                         {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="text-right">
//                       <div className="font-medium text-gray-900 dark:text-white">
//                         {slot.patient}
//                       </div>
//                       <div className="text-sm text-gray-600 dark:text-gray-400">
//                         Patient
//                       </div>
//                     </div>
//                     <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#293379] to-[#016b61] flex items-center justify-center text-white font-bold">
//                       {slot.patient?.charAt(0)}
//                     </div>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
//                     >
//                       Details
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Available Slots Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
//             Available Time Slots
//           </h3>
//           <div className="space-y-4">
//             {availableSlots.map((slot, index) => (
//               <div
//                 key={index}
//                 className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#293379] dark:hover:border-blue-600 transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10">
//                       <FaClock className="h-5 w-5 text-[#293379] dark:text-blue-400" />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900 dark:text-white">
//                         {slot.time}
//                       </div>
//                       <div className="text-sm text-gray-600 dark:text-gray-400">
//                         Available for booking
//                       </div>
//                     </div>
//                   </div>

//                   <Button
//                     size="sm"
//                     className="bg-[#016b61] hover:bg-[#015951] text-white"
//                   >
//                     Book Now
//                   </Button>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#293379]/10 to-[#016b61]/10 border border-[#293379]/20 text-[#293379] dark:text-blue-300 font-medium">
//                     {slot.time}
//                   </div>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
//                   >
//                     <FaVideo className="mr-2 h-3 w-3" />
//                     Video Call
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30"
//                   >
//                     <FaPhone className="mr-2 h-3 w-3" />
//                     Phone Call
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
//                   >
//                     <FaHome className="mr-2 h-3 w-3" />
//                     In-Person
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary */}
//         <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
//           <div className="grid grid-cols-3 gap-4">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-[#293379] dark:text-blue-400">
//                 {bookedSlots.length}
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Appointments Today
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-green-600 dark:text-green-400">
//                 3h 45m
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Total Duration
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
//                 {availableSlots.length}
//               </div>
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 Available Slots
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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
import { useState } from "react";

const timeSlots = [
  { time: "9:00 AM", available: true, type: "in-person" },
  { time: "10:00 AM", available: false, patient: "John Smith", type: "video" },
  { time: "11:00 AM", available: true, type: "phone" },
  {
    time: "12:00 PM",
    available: false,
    patient: "Emma Wilson",
    type: "in-person",
  },
  { time: "2:00 PM", available: true, type: "in-person" },
  { time: "3:00 PM", available: false, patient: "Robert Chen", type: "video" },
  { time: "4:00 PM", available: true, type: "phone" },
  {
    time: "5:00 PM",
    available: false,
    patient: "Lisa Rodriguez",
    type: "in-person",
  },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currentDay = new Date().getDay();

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
  // Separate booked and available slots
  const bookedSlots = timeSlots.filter((slot) => !slot.available);
  const availableSlots = timeSlots.filter((slot) => slot.available);

  // State to track which time slot is showing options
  const [activeTimeSlot, setActiveTimeSlot] = useState(null);

  const handleTimeSlotClick = (time) => {
    setActiveTimeSlot(activeTimeSlot === time ? null : time);
  };

  const handleOptionClick = (time, option) => {
    console.log(`Booking ${time} for ${option}`);
    // Here you would implement the actual booking logic
    setActiveTimeSlot(null);
  };

  const [expandedSlots, setExpandedSlots] = useState({});

  const toggleSlotExpansion = (slotId) => {
    setExpandedSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
            <FaCalendarAlt className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
          >
            <FaPlus className="mr-2 h-3 w-3" />
            Add Slot
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Day Selector */}
        <div className="flex overflow-x-auto scrollbar-hide mb-6">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`flex-1 min-w-[80px] text-center p-3 border-b-2 cursor-pointer transition-colors duration-200 ${
                index === currentDay - 1
                  ? "border-[#293379] dark:border-blue-600 bg-gradient-to-b from-[#293379]/5 to-transparent"
                  : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {day}
              </div>
              <div
                className={`text-lg font-bold mt-1 ${
                  index === currentDay - 1
                    ? "text-[#293379] dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {index === currentDay - 1 ? "15" : 10 + index}
              </div>
            </div>
          ))}
        </div>

        {/* Booked Appointments Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            Booked Appointments
          </h3>
          <div className="space-y-3">
            {bookedSlots.map((slot, index) => {
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
                          {slot.time}
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mt-1 ${getAppointmentTypeColor(
                            slot.type,
                          )}`}
                        >
                          {getAppointmentTypeIcon(slot.type)}
                          {slot.type.charAt(0).toUpperCase() +
                            slot.type.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Right side - Patient info and dropdown */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {slot.patient}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Patient
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#293379] to-[#016b61] flex items-center justify-center text-white font-bold">
                        {slot.patient?.charAt(0)}
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
                              • Duration: 45 minutes
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Type:{" "}
                              {slot.type === "video"
                                ? "Telemedicine"
                                : slot.type === "phone"
                                  ? "Phone Consultation"
                                  : "Clinic Visit"}
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Status: Confirmed
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Notes
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                              Follow-up on previous treatment plan. Bring recent
                              test results.
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
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
                              <Button
                                size="sm"
                                className="bg-[#016b61] hover:bg-[#015951] text-white"
                              >
                                Start Call
                              </Button>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Contact Info
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                              • Phone: (555) 123-4567
                            </div>
                            <div className="text-sm text-gray-800 dark:text-gray-200">
                              • Email: patient@example.com
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
                  <button
                    onClick={() => handleTimeSlotClick(slot.time)}
                    className={`px-4 py-2.5 rounded-full border font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeTimeSlot === slot.time
                        ? "bg-gradient-to-r from-[#293379] to-[#016b61] text-white border-transparent shadow-lg"
                        : "bg-gradient-to-r from-[#293379]/10 to-[#016b61]/10 border-[#293379]/20 text-[#293379] dark:text-blue-300 hover:shadow-md hover:border-[#293379]/40"
                    }`}
                  >
                    <FaClock className="h-3.5 w-3.5" />
                    {slot.time}
                  </button>

                  {/* Options Popup */}
                  {activeTimeSlot === slot.time && (
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
                  )}
                </div>
              ))}
            </div>

            {/* Info Text */}
            <div className="text-sm text-gray-600 dark:text-gray-400 italic">
              Click on any time slot to book an appointment
            </div>
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