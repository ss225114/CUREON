import { FaStar, FaUser, FaMapMarkerAlt, FaBuilding, FaCalendar, FaPhone, FaWhatsapp, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="h-40 w-40 rounded-xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#293379] dark:text-white mb-1">
                  {doctor.name}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {doctor.specialization}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaUser className="h-4 w-4" />
                    {doctor.gender}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="h-4 w-4" />
                    {doctor.experience}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-start gap-2">
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    <FaStar className="h-5 w-5 text-amber-500" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {doctor.rating}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.patientStories.toLocaleString()} Patient Stories
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Clinic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <FaMapMarkerAlt className="h-5 w-5 text-[#016b61] dark:text-green-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {doctor.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {doctor.clinic}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <FaBuilding className="h-5 w-5 text-[#293379] dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {doctor.availability}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Consultation fee at clinic
                  </p>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-3xl font-bold text-[#293379] dark:text-white">
                  ₹{doctor.fee}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consultation fee at clinic
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#027d70] text-white"
                >
                  <FaCalendar className="mr-2" />
                  Book Clinic Visit
                </Button>
                
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

            {/* Footer Note */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  No Booking Fee
                </span> • Free cancellation until 24 hours before appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}