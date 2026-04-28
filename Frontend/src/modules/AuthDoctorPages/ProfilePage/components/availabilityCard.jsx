// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaPhone,
//   FaVideo,
//   FaHome,
// } from "react-icons/fa";
// import { useProfile } from "../context/profileContext";

// export default function AvailabilityCard() {
//   const { doctorProfile } = useProfile();

//   const consultationTypes = {
//     "In-person": <FaHome className="h-4 w-4" />,
//     "Video Call": <FaVideo className="h-4 w-4" />,
//     "Phone Call": <FaPhone className="h-4 w-4" />,
//   };

//   return (
//     <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
//       <CardHeader>
//         <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
//           <FaCalendarAlt className="h-5 w-5" />
//           Availability & Contact
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {/* Working Days */}
//         <div>
//           <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
//             Working Days
//           </h3>
//           <div className="flex flex-wrap gap-2">
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//               "Sunday",
//             ].map((day) => (
//               <span
//                 key={day}
//                 className={`px-3 py-2 rounded-lg font-medium ${
//                   doctorProfile?.availability?.workingDays?.includes(day)
//                     ? "bg-gradient-to-r from-[#293379] to-[#3a4a9c] text-white"
//                     : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
//                 }`}
//               >
//                 {day.slice(0, 3)}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Working Hours */}
//         <div>
//           <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//             <FaClock className="h-4 w-4" />
//             Working Hours
//           </h3>
//           <div className="p-4 bg-gradient-to-r from-[#293379]/5 to-[#016b61]/5 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg border border-[#293379]/20 dark:border-gray-700">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-[#293379] dark:text-white">
//                 {doctorProfile?.availability?.workingHours}
//               </div>
//               <p className="text-gray-600 dark:text-gray-400 mt-2">
//                 Standard consultation hours
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Consultation Types */}
//         <div>
//           <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
//             Consultation Types
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             {doctorProfile?.availability?.consultationTypes?.map((type) => (
//               <div
//                 key={type}
//                 className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#293379] dark:hover:border-blue-600 transition-colors duration-200"
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="text-[#293379] dark:text-blue-400">
//                     {consultationTypes[type]}
//                   </div>
//                   <span className="font-medium text-gray-900 dark:text-white">
//                     {type}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Emergency Contact */}
//         <div>
//           <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
//             Emergency Contact
//           </h3>
//           <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200 dark:border-red-800">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <FaPhone className="h-5 w-5 text-red-600 dark:text-red-400" />
//                   <span className="font-bold text-red-700 dark:text-red-300">
//                     Emergency Hotline
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                   Available 24/7 for urgent cases
//                 </p>
//               </div>
//               <div className="text-right">
//                 <div className="text-xl font-bold text-red-700 dark:text-red-300">
//                   {doctorProfile?.availability?.emergencyContact}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaCalendarAlt,
  FaClock,
  FaPhone,
  FaVideo,
  FaHome,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useProfile } from "../context/profileContext";

export default function AvailabilityCard() {
  const { doctorProfile } = useProfile();

  const consultationTypes = {
    "In-person": <FaHome className="h-4 w-4" />,
    "Video Call": <FaVideo className="h-4 w-4" />,
    "Phone Call": <FaPhone className="h-4 w-4" />,
  };

  // Days of the week in order
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Get working hours for each day (this would come from your data structure)
  const getWorkingHoursForDay = (day) => {
    // This is a mock function - you would get this from your actual data
    // For now, return different hours for different days as an example
    const hoursMap = {
      // Monday: "9:00 AM - 5:00 PM",
      // Tuesday: "9:00 AM - 5:00 PM",
      // Wednesday: "10:00 AM - 6:00 PM",
      // Thursday: "9:00 AM - 5:00 PM",
      // Friday: "9:00 AM - 4:00 PM",
      // Saturday: "9:00 AM - 1:00 PM",
      // Sunday: "Closed",
    };
    return hoursMap[day] || "Not available";
  };

  // Check if day is a working day
  const isWorkingDay = (day) => {
    return doctorProfile?.availability?.workingDays?.includes(day);
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaCalendarAlt className="h-5 w-5" />
          Availability & Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Schedule */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Weekly Schedule
          </h3>
          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const isWorking = isWorkingDay(day);
              const workingHours = getWorkingHoursForDay(day);

              return (
                <div
                  key={day}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isWorking
                      ? "border-[#293379]/30 dark:border-blue-700/50 bg-gradient-to-r from-[#293379]/5 to-transparent"
                      : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        isWorking
                          ? "bg-gradient-to-br from-[#293379]/20 to-[#016b61]/20"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <FaClock
                        className={`h-4 w-4 ${
                          isWorking
                            ? "text-[#293379] dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          isWorking
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-500"
                        }`}
                      >
                        {day}
                      </span>
                      <p
                        className={`text-sm ${
                          isWorking
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-gray-500 dark:text-gray-500"
                        }`}
                      >
                        {isWorking ? "Working day" : "Day off"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold ${
                        isWorking
                          ? "text-[#293379] dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-500"
                      }`}
                    >
                      {workingHours}
                    </div>
                    {!isWorking && day === "Saturday" && (
                      <div className="text-xs text-amber-600 dark:text-amber-400">
                        Weekend schedule
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Working Days Summary */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Working Days Summary
          </h3>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => {
              const isWorking = isWorkingDay(day);
              const shortDay = day.slice(0, 3);

              return (
                <span
                  key={day}
                  className={`px-3 py-2 rounded-lg font-medium ${
                    isWorking
                      ? "bg-gradient-to-r from-[#293379] to-[#3a4a9c] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                  title={`${day}: ${getWorkingHoursForDay(day)}`}
                >
                  {shortDay}
                </span>
              );
            })}
          </div>
        </div>

        {/* Consultation Types */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Consultation Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {doctorProfile?.availability?.consultationTypes?.map((type) => (
              <div
                key={type}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-[#293379] dark:hover:border-blue-600 transition-colors duration-200"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="text-[#293379] dark:text-blue-400">
                    {consultationTypes[type]}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Emergency Contact
          </h3>
          <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="font-bold text-red-700 dark:text-red-300">
                    Emergency Hotline
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Available 24/7 for urgent cases only
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-red-700 dark:text-red-300">
                  {doctorProfile?.availability?.emergencyContact || "Not set"}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use for emergencies only
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Note */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <FaClock className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> Appointment availability may vary. Please
              check the schedule for specific day timings. Weekend appointments
              (Saturday) are limited and subject to availability.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}