import {
  FaStar,
  FaUser,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendar,
  FaPhone,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import BookAppointmentDialog from "./BookAppointmentDialog";

export default function DoctorCard({ doctor }) {
  const [availability, setAvailability] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const initials = doctor?.fullName
    ?.split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Fetch doctor availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoadingAvailability(true);

        const today = new Date().toISOString();

        const res = await apiClient.get(
          `/api/appointment/${doctor._id}/availability`,
          {
            params: {
              date: today,
            },
          },
        );

        setAvailability(res.data || []);
      } catch (err) {
        console.error("Failed to fetch availability", err);
      } finally {
        setLoadingAvailability(false);
      }
    };

    if (doctor?._id) {
      fetchAvailability();
    }
  }, [doctor]);

  const availableSlots = availability.filter((s) => !s.isBooked);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-4 border-white">
              <Avatar className="h-full w-full">
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-[#293379] to-[#016b61] text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#293379] dark:text-white mb-1">
                  {doctor.fullName}
                </h3>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {(Array.isArray(doctor.specialization)
                    ? doctor.specialization
                    : [doctor.specialization]
                  )
                    .slice(0, 3)
                    .map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium rounded-full
                        bg-gradient-to-r from-blue-50 to-indigo-50
                        dark:from-blue-900/20 dark:to-indigo-900/20
                        text-[#293379] dark:text-blue-400
                        border border-blue-200 dark:border-blue-800"
                      >
                        {spec.replace(/_/g, " ")}
                      </span>
                    ))}

                  {Array.isArray(doctor.specialization) &&
                    doctor.specialization.length > 3 && (
                      <span
                        className="px-3 py-1 text-sm font-medium rounded-full
                        bg-gray-100 dark:bg-gray-700
                        text-gray-600 dark:text-gray-300"
                      >
                        +{doctor.specialization.length - 3} more
                      </span>
                    )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaUser className="h-4 w-4" />
                    {doctor.gender}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-start gap-2">
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <FaStar className="h-5 w-5 text-amber-500" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {doctor.rating || 4.5}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Hospital */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <FaMapMarkerAlt className="h-5 w-5 text-[#016b61] dark:text-green-400 mt-1" />

                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {doctor.stateMedicalCouncil}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.hospital}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <FaClock className="h-5 w-5 text-[#293379] dark:text-blue-400 mt-1" />

                <div className="w-full">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Availability Today
                  </p>

                  {loadingAvailability ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Loading...
                    </p>
                  ) : availableSlots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.slice(0, 4).map((slot) => (
                        <span
                          key={slot._id}
                          className="px-3 py-1 rounded-full text-xs font-medium
                          bg-white dark:bg-gray-800
                          border border-green-300 dark:border-green-700
                          text-green-700 dark:text-green-400"
                        >
                          {slot.startTime}
                        </span>
                      ))}

                      {availableSlots.length > 4 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          +{availableSlots.length - 4} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-red-500 dark:text-red-400">
                      No slots available today
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-3xl font-bold text-[#293379] dark:text-white">
                  ₹{doctor.consultationFee}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consultation fee at clinic
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* <Button className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#027d70] text-white">
                  <FaCalendar className="mr-2" />
                  Book Clinic Visit
                </Button> */}

                <BookAppointmentDialog doctor={doctor} />

                <Button
                  variant="outline"
                  className="border-[#293379] text-[#293379] dark:border-blue-400 dark:text-blue-400 hover:bg-[#293379]/10 dark:hover:bg-blue-900/20"
                >
                  <FaPhone className="mr-2" />
                  Contact Clinic
                </Button>

                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 dark:border-green-400 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  No Booking Fee
                </span>{" "}
                • Free cancellation until 24 hours before appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}