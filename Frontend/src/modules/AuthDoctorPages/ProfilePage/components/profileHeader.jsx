import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaEdit,
  FaStar,
  FaBriefcaseMedical,
  FaMapMarkerAlt,
  FaCamera,
} from "react-icons/fa";
import { useProfile } from "../context/profileContext";

export default function ProfileHeader() {
  const { doctorProfile, doctorData, setIsEditing } = useProfile();

  // if (!doctorProfile) return null;

  const name = doctorData?.fullName || "Doctor";
  const profileImage = doctorProfile?.personalInfo?.profileImage;

  // Extract initials from full name
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[3])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Image with Avatar Component */}
        <div className="relative group">
          <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
            <Avatar className="h-full w-full">
              <AvatarImage
                src={profileImage}
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-[#293379] to-[#016b61] text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Camera icon for editing */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute bottom-2 right-2 p-2 bg-gradient-to-br from-[#293379] to-[#016b61] rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaCamera className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#293379] dark:text-white">
                {name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 bg-gradient-to-r from-[#293379] to-[#3a4a9c] text-white rounded-full text-sm font-medium flex items-center gap-1">
                  <FaBriefcaseMedical className="h-3 w-3" />
                  {doctorData?.specialization?.[0] ||
                    "Doctor"}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-[#016b61] to-[#018377] text-white rounded-full text-sm font-medium">
                  {doctorData?.degree || "MD"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <FaMapMarkerAlt className="h-4 w-4" />
                  <span>
                    {doctorProfile?.address?.split(",")[0] ||
                      "Location not set"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <FaStar className="h-4 w-4" />
                  <span className="font-semibold">
                    {doctorData?.rating}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({doctorProfile?.statistics?.totalPatients || "0"} patients)
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#018377] text-white font-semibold"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {doctorProfile?.professionalInfo?.bio || "No bio available"}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                label: "Experience",
                value: `${doctorProfile?.statistics?.yearsExperience || "0"} years`,
              },
              {
                label: "Patients",
                value: doctorProfile?.statistics?.totalPatients || "0",
              },
              {
                label: "Consultation Fee",
                value: "₹" + doctorData?.consultationFee || "₹0",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-[#293379] dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}