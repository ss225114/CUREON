// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FaClock,
//   FaUser,
//   FaStethoscope,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaTimesCircle,
// } from "react-icons/fa";
// import { useDashboard } from "../context/dashboardContext";

// export default function Appointments() {
//   const { appointments } = useDashboard();
//   const [selectedStatus, setSelectedStatus] = useState("all");

//   const statusFilters = [
//     { value: "all", label: "All", icon: FaStethoscope },
//     { value: "confirmed", label: "Confirmed", icon: FaCheckCircle },
//     { value: "pending", label: "Pending", icon: FaClock },
//     { value: "cancelled", label: "Cancelled", icon: FaTimesCircle },
//   ];

//   const filteredAppointments = appointments.filter((apt) => {
//     if (selectedStatus === "all") return true;
//     return apt.status === selectedStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
//       case "cancelled":
//         return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "confirmed":
//         return <FaCheckCircle className="h-4 w-4" />;
//       case "pending":
//         return <FaClock className="h-4 w-4" />;
//       case "cancelled":
//         return <FaTimesCircle className="h-4 w-4" />;
//       default:
//         return <FaExclamationCircle className="h-4 w-4" />;
//     }
//   };

//   const formatTime = (dateTime) => {
//     const date = new Date(dateTime);
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
//             <FaStethoscope className="h-5 w-5" />
//             Upcoming Appointments
//           </CardTitle>
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
//           >
//             View All
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         {/* Status Filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {statusFilters.map((filter) => (
//             <Button
//               key={filter.value}
//               variant={selectedStatus === filter.value ? "default" : "outline"}
//               size="sm"
//               onClick={() => setSelectedStatus(filter.value)}
//               className={`flex items-center gap-2 ${
//                 selectedStatus === filter.value
//                   ? "bg-[#293379] text-white dark:bg-blue-600"
//                   : "border-gray-300 dark:border-gray-700"
//               }`}
//             >
//               <filter.icon className="h-3 w-3" />
//               {filter.label}
//             </Button>
//           ))}
//         </div>

//         {/* Appointments List */}
//         <div className="space-y-4">
//           {filteredAppointments.map((apt) => (
//             <div
//               key={apt.id}
//               className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 rounded-full">
//                     <FaUser className="h-5 w-5 text-[#293379] dark:text-blue-400" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       {apt.patientName}
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Age: {apt.patientAge} • {apt.type}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-bold text-lg text-gray-900 dark:text-white">
//                     {formatTime(apt.appointmentTime)}
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     {apt.duration} mins
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center justify-between gap-3">
//                 <div className="flex flex-wrap gap-2">
//                   {apt.symptoms.map((symptom, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
//                     >
//                       {symptom}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
//                       apt.status
//                     )}`}
//                   >
//                     {getStatusIcon(apt.status)}
//                     {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
//                   </span>
//                   <Button size="sm" className="bg-[#016b61] hover:bg-[#015951] text-white">
//                     View Details
//                   </Button>
//                 </div>
//               </div>

//               {apt.notes && (
//                 <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     <span className="font-medium text-gray-700 dark:text-gray-300">
//                       Notes:{" "}
//                     </span>
//                     {apt.notes}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {filteredAppointments.length === 0 && (
//           <div className="text-center py-8">
//             <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full inline-flex mb-3">
//               <FaClock className="h-8 w-8 text-gray-400 dark:text-gray-500" />
//             </div>
//             <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
//               No appointments found
//             </h4>
//             <p className="text-gray-500 dark:text-gray-400">
//               No appointments match the selected filter
//             </p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

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
} from "react-icons/fa";
import { useDashboard } from "../context/dashboardContext";

export default function Appointments() {
  const { appointments } = useDashboard();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedAppointment, setExpandedAppointment] = useState(null);

  const statusFilters = [
    { value: "all", label: "All", icon: FaStethoscope },
    { value: "confirmed", label: "Confirmed", icon: FaCheckCircle },
    { value: "pending", label: "Pending", icon: FaClock },
    { value: "cancelled", label: "Cancelled", icon: FaTimesCircle },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    if (selectedStatus === "all") return true;
    return apt.status === selectedStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="h-4 w-4" />;
      case "pending":
        return <FaClock className="h-4 w-4" />;
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

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
            <FaStethoscope className="h-5 w-5" />
            Upcoming Appointments
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
          >
            View All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedStatus === filter.value
                  ? "bg-gradient-to-r from-[#293379] to-[#3a4a9c] text-white shadow-sm"
                  : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#293379] hover:text-[#293379] dark:hover:border-blue-500 dark:hover:text-blue-400"
              }`}
            >
              <filter.icon className="h-3 w-3" />
              {filter.label}
            </button>
          ))}
        </div>

        {/* Appointments List - Fills the space */}
        <div className="space-y-4">
          {filteredAppointments.map((apt) => {
            const isExpanded = expandedAppointment === apt.id;
            
            return (
              <div
                key={apt.id}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#293379] dark:hover:border-blue-600 transition-all duration-200 bg-white dark:bg-gray-900/40 shadow-sm"
              >
                {/* Top Row - Main Info */}
                <div className="flex items-start justify-between">
                  {/* Left side - Patient Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 rounded-full">
                      <FaUser className="h-6 w-6 text-[#293379] dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          {apt.patientName}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-[#293379]/5 to-[#016b61]/5 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                            Age: {apt.patientAge}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                              apt.status
                            )}`}
                          >
                            {getStatusIcon(apt.status)}
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Details Row */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FaStethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Type</div>
                            <div className="font-medium text-gray-900 dark:text-white">{apt.type}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <FaClock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {formatTime(apt.appointmentTime)} ({apt.duration} min)
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <FaCalendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Date</div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {new Date(apt.appointmentTime).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Action Button */}
                  <button
                    onClick={() => toggleAppointmentExpansion(apt.id)}
                    className="h-7 w-7 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 hover:from-[#293379]/20 hover:to-[#016b61]/20 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-[#293379] dark:text-gray-300 transition-all duration-200 hover:scale-105"
                  >
                    <FaEllipsisV className="h-3 w-3" />
                  </button>
                </div>

                {/* Symptoms Row */}
                {apt.symptoms && apt.symptoms.length > 0 && (
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

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                    {/* Notes Section */}
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
                          <p className="text-gray-800 dark:text-gray-300">{apt.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Actions Section */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        size="default"
                        className="bg-[#016b61] hover:bg-[#015951] text-white px-6"
                      >
                        View Full Details
                      </Button>
                      {apt.status === 'confirmed' && (
                        <>
                          <Button
                            size="default"
                            variant="outline"
                            className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30 px-6"
                          >
                            <FaVideo className="mr-2 h-4 w-4" />
                            Start Video
                          </Button>
                          <Button
                            size="default"
                            variant="outline"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/30 px-6"
                          >
                            <FaPhone className="mr-2 h-4 w-4" />
                            Call Patient
                          </Button>
                        </>
                      )}
                      <Button
                        size="default"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 px-6"
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30 px-6"
                      >
                        Cancel Appointment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
              className="border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
            >
              Show All Appointments
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}