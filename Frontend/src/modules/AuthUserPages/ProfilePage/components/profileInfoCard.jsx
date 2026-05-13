import { useProfile } from "../context/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import {
  FaUserCircle,
  FaMobileAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaTint,
  FaRulerVertical,
  FaWeight,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function ProfileInfoCard() {
  const { profile } = useProfile();

  if (!profile) return null;

  // const personalInfo = profile?.userData?.personalInfo || {};
  const emergencyContact = profile?.userData?.emergencyContact || {};

  const infoFields = [
    {
      icon: <FaMobileAlt />,
      label: "Phone",
      value: profile.userData?.phone ?? "Not set",
    },
    {
      icon: <FaBirthdayCake />,
      label: "Date of Birth",
      value: profile.userData?.dateOfBirth
        ? format(parseISO(profile.userData.dateOfBirth), "dd.MM.yyyy")
        : "Not set",
    },
    {
      icon: <FaVenusMars />,
      label: "Gender",
      value: profile.userData?.gender ?? "Not set",
    },
    {
      icon: <FaTint />,
      label: "Blood Group",
      value: profile.userData?.bloodGroup ?? "Not set",
    },
    {
      icon: <FaRulerVertical />,
      label: "Height",
      value: profile.userData?.height
        ? `${profile.userData.height} cm`
        : "Not set",
    },
    {
      icon: <FaWeight />,
      label: "Weight",
      value: profile.userData?.weight
        ? `${profile.userData.weight} kg`
        : "Not set",
    },
  ];

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaUserCircle /> Personal Information
        </CardTitle>

        {!profile?.userData && (
          <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2 mt-2">
            <FaExclamationTriangle />
            Complete your profile to see all information
          </p>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoFields.map((field, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg"
            >
              <div className="text-[#293379] dark:text-blue-400">
                {field.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {field.label}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {field.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        {emergencyContact?.name && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#293379] dark:text-white mb-4 flex items-center gap-2">
              <FaExclamationTriangle /> Emergency Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {emergencyContact.name}
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Phone
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {emergencyContact.phone}
                </p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Relationship
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {emergencyContact.relationship}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
