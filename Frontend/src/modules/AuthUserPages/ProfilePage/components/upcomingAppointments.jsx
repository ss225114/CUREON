import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaVideo, FaMapMarkerAlt } from "react-icons/fa";
import { useProfile } from "../context/profileContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function UpcomingAppointments() {
  const { appointments } = useProfile();
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaCalendarAlt /> Upcoming Appointments
        </CardTitle>
        <Button onClick={() => {navigate("/find-doctors")}} className="bg-[#016b61] hover:bg-[#015951]" size="sm">
          Book New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments?.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 bg-gradient-to-r from-blue-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#293379] dark:hover:border-blue-600 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {appointment.doctorId?.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(appointment.date)} • {appointment.time}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        {appointment.appointmentType}
                      </Badge>
                      {/* <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 flex items-center gap-1">
                        <FaVideo /> Virtual
                      </Badge> */}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-[#293379] text-[#293379] dark:border-blue-600 dark:text-blue-400 hover:bg-[#293379] hover:text-white dark:hover:bg-blue-600"
                    >
                      <FaMapMarkerAlt className="mr-2" /> Directions
                    </Button>
                    {/* <Button className="bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600">
                      Join Call
                    </Button> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FaCalendarAlt className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No upcoming appointments. Book your first consultation!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
