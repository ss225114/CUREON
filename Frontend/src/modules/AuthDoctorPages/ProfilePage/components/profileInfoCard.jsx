import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaMap, FaVenusMars } from "react-icons/fa";
import { useProfile } from "../context/profileContext";

export default function ProfileInfoCard() {
  const { doctorProfile } = useProfile();

  const personalInfo = [
    {
      icon: <FaUser className="h-4 w-4" />,
      label: "Full Name",
      value: doctorProfile?.personalInfo?.fullName,
    },
    {
      icon: <FaEnvelope className="h-4 w-4" />,
      label: "Email",
      value: doctorProfile?.personalInfo?.email,
    },
    {
      icon: <FaPhone className="h-4 w-4" />,
      label: "Phone",
      value: doctorProfile?.personalInfo?.phone,
    },
    {
      icon: <FaBirthdayCake className="h-4 w-4" />,
      label: "Date of Birth",
      value: new Date(doctorProfile?.personalInfo?.dateOfBirth).toLocaleDateString(),
    },
    {
      icon: <FaVenusMars className="h-4 w-4" />,
      label: "Gender",
      value: doctorProfile?.personalInfo?.gender,
    },
    {
      icon: <FaMap className="h-4 w-4" />,
      label: "Address",
      value: doctorProfile?.personalInfo?.address,
    },
  ];

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaUser className="h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalInfo.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 rounded-full">
                  <div className="text-[#293379] dark:text-blue-400">
                    {info.icon}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {info.label}
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {info.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}