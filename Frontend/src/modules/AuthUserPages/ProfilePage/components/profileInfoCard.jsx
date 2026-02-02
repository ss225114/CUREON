// import { useState } from "react";
// import { useProfile } from "../context/profileContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

// export default function ProfileInfoCard() {
//   const { profile, updateProfile } = useProfile();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ ...profile });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     await updateProfile(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData({ ...profile });
//     setIsEditing(false);
//   };

//   const fields = [
//     { label: "Date of Birth", key: "dateOfBirth", type: "date" },
//     {
//       label: "Gender",
//       key: "gender",
//       type: "select",
//       options: ["Male", "Female", "Other", "Prefer not to say"],
//     },
//     {
//       label: "Blood Group",
//       key: "bloodGroup",
//       type: "select",
//       options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
//     },
//     { label: "Height", key: "height", type: "text" },
//     { label: "Weight", key: "weight", type: "text" },
//   ];

//   return (
//     <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-2xl font-bold text-[#293379] dark:text-white">
//           Personal Information
//         </CardTitle>
//         {!isEditing ? (
//           <Button
//             onClick={() => setIsEditing(true)}
//             className="bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600"
//             size="sm"
//           >
//             <FaEdit className="mr-2" /> Edit
//           </Button>
//         ) : (
//           <div className="flex gap-2">
//             <Button
//               onClick={handleCancel}
//               className="bg-gray-500 hover:bg-gray-600"
//               size="sm"
//             >
//               <FaTimes className="mr-2" /> Cancel
//             </Button>
//             <Button
//               onClick={handleSave}
//               className="bg-[#016b61] hover:bg-[#015951]"
//               size="sm"
//             >
//               <FaSave className="mr-2" /> Save
//             </Button>
//           </div>
//         )}
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {fields.map((field) => (
//             <div key={field.key} className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {field.label}
//               </label>
//               {isEditing ? (
//                 field.type === "select" ? (
//                   <select
//                     value={formData[field.key] || ""}
//                     onChange={(e) => handleChange(field.key, e.target.value)}
//                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white"
//                   >
//                     <option value="">Select {field.label}</option>
//                     {field.options.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type={field.type}
//                     value={formData[field.key] || ""}
//                     onChange={(e) => handleChange(field.key, e.target.value)}
//                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white"
//                   />
//                 )
//               ) : (
//                 <div className="p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg text-gray-800 dark:text-white">
//                   {profile[field.key] || "Not specified"}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Emergency Contact */}
//         <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
//           <h3 className="text-xl font-semibold text-[#293379] dark:text-white mb-4">
//             Emergency Contact
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Name
//               </label>
//               <div className="p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg text-gray-800 dark:text-white">
//                 {profile.emergencyContact?.name || "Not set"}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Phone
//               </label>
//               <div className="p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg text-gray-800 dark:text-white">
//                 {profile.emergencyContact?.phone || "Not set"}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-gray-300">
//                 Relationship
//               </label>
//               <div className="p-3 bg-white/30 dark:bg-gray-700/30 rounded-lg text-gray-800 dark:text-white">
//                 {profile.emergencyContact?.relationship || "Not set"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { useProfile } from "../context/ProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaUserCircle,
  FaPhone,
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

  const infoFields = [
    {
      icon: <FaPhone />,
      label: "Phone",
      value: profile.userData ? profile.userData.personalInfo.phone : "Not set",
    },
    {
      icon: <FaBirthdayCake />,
      label: "Date of Birth",
      value: profile.userData ? profile.userData.personalInfo.DOB : "Not set",
    },
    {
      icon: <FaVenusMars />,
      label: "Gender",
      value: profile.userData ? profile.userData.personalInfo.gender : "Not set",
    },
    {
      icon: <FaTint />,
      label: "Blood Group",
      value: profile.userData ? profile.userData.personalInfo.bloodGrp : "Not set",
    },
    {
      icon: <FaRulerVertical />,
      label: "Height",
      value: profile.userData ? `${profile.userData.personalInfo.height} cm` : "Not set",
    },
    {
      icon: <FaWeight />,
      label: "Weight",
      value: profile.userData ? `${profile.userData.personalInfo.weight} kg` : "Not set",
    },
  ];

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#293379] dark:text-white flex items-center gap-2">
          <FaUserCircle /> Personal Information
        </CardTitle>
        {!profile.isProfileComplete && (
          <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2 mt-2">
            <FaExclamationTriangle /> Complete your profile to see all
            information
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
        {profile.emergencyContact?.name && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-[#293379] dark:text-white mb-4 flex items-center gap-2">
              <FaExclamationTriangle /> Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {profile.emergencyContact.name}
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Phone
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {profile.emergencyContact.phone}
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Relationship
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {profile.emergencyContact.relationship}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}