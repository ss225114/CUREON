import { useState } from "react";
import { useProfile } from "../context/profileContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit, FaCamera, FaCheck, FaTimes } from "react-icons/fa";

export default function ProfileHeader({ onEditClick }) {
  const { profile, updateAvatar } = useProfile();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!profile) return null;

  const name = profile?.name || "User";
  const email = profile?.email || "";
  const phone = profile?.userData?.phone || "—";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("");

  const handleAvatarUpdate = async () => {
    if (!avatarUrl.trim()) return;

    setUploading(true);
    const result = await updateAvatar(avatarUrl);
    setUploading(false);

    if (result.success) {
      setIsEditingAvatar(false);
      setAvatarUrl("");
    }
  };

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Section */}
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white/80 dark:border-gray-700/80 shadow-lg">
              <AvatarImage src={profile?.avatar} alt={name} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-800 dark:to-blue-600">
                {initials}
              </AvatarFallback>
            </Avatar>

            <button
              onClick={() => setIsEditingAvatar(true)}
              className="absolute bottom-2 right-2 p-2 bg-[#293379] dark:bg-blue-700 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <FaCamera className="h-4 w-4" />
            </button>
          </div>

          {/* Avatar Edit Modal */}
          {isEditingAvatar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold text-[#293379] dark:text-white mb-4">
                  Update Avatar
                </h3>

                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-800 dark:text-white mb-4"
                />

                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => {
                      setIsEditingAvatar(false);
                      setAvatarUrl("");
                    }}
                    className="bg-gray-500 hover:bg-gray-600"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </Button>

                  <Button
                    onClick={handleAvatarUpdate}
                    disabled={uploading || !avatarUrl.trim()}
                    className="bg-[#016b61] hover:bg-[#015951]"
                  >
                    {uploading ? (
                      "Uploading..."
                    ) : (
                      <>
                        <FaCheck className="mr-2" /> Update
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#293379] dark:text-white mb-2">
              {name}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {email} • {phone}
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {profile?.accountCreated && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                  Member since {new Date(profile.accountCreated).getFullYear()}
                </span>
              )}

              {profile?.lastLogin && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                  Last login: {new Date(profile.lastLogin).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={onEditClick}
            className="bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// import { useState, useRef } from "react";
// import { useProfile } from "../context/profileContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   FaEdit,
//   FaCamera,
//   FaExclamationCircle,
//   FaCheckCircle,
//   FaTimes,
//   FaUpload,
//   FaSpinner,
// } from "react-icons/fa";

// export default function ProfileHeader({ onEditClick, userName, userEmail }) {
//   const { profile, isProfileComplete, uploadingAvatar, uploadAvatar } =
//     useProfile();
//   const [isEditingAvatar, setIsEditingAvatar] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [uploadError, setUploadError] = useState(null);
//   const fileInputRef = useRef(null);

//   // Calculate completion percentage
//   const calculateCompletion = () => {
//     if (isProfileComplete) return 100;

//     if (!profile) return 0;

//     const fields = [
//       "phone",
//       "dateOfBirth",
//       "gender",
//       "bloodGroup",
//       "height",
//       "weight",
//       "emergencyContact",
//       "medicalConditions",
//       "allergies",
//       "medications",
//     ];

//     let completed = 0;
//     fields.forEach((field) => {
//       if (field === "emergencyContact") {
//         if (profile[field]?.name && profile[field]?.phone) completed++;
//       } else if (Array.isArray(profile[field])) {
//         if (profile[field]?.length > 0) completed++;
//       } else {
//         if (profile[field]) completed++;
//       }
//     });

//     return Math.round((completed / fields.length) * 100);
//   };

//   const completionPercentage = calculateCompletion();

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     // Validate file type
//     const validTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "image/gif",
//       "image/webp",
//     ];
//     if (!validTypes.includes(file.type)) {
//       setUploadError("Please select a valid image file (JPEG, PNG, GIF, WebP)");
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError("File size should be less than 5MB");
//       return;
//     }

//     setSelectedFile(file);
//     setUploadError(null);

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewUrl(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const result = await uploadAvatar(selectedFile);

//     if (result.success) {
//       setIsEditingAvatar(false);
//       setSelectedFile(null);
//       setPreviewUrl(null);
//       setUploadError(null);
//     } else {
//       setUploadError(result.error || "Failed to upload image");
//     }
//   };

//   const handleCancel = () => {
//     setIsEditingAvatar(false);
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     setUploadError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   // Use provided userName and userEmail or fall back to profile
//   const displayName = userName || profile?.name || "User";
//   const displayEmail = userEmail || profile?.email || "";

//   return (
//     <>
//       <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-0 shadow-xl">
//         <CardContent className="p-8">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             {/* Avatar Section */}
//             <div className="relative group">
//               <Avatar className="h-32 w-32 border-4 border-white/80 dark:border-gray-700/80 shadow-lg">
//                 {profile?.avatar ? (
//                   <AvatarImage
//                     src={profile.avatar}
//                     alt={displayName}
//                     className="object-cover"
//                   />
//                 ) : (
//                   <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-800 dark:to-blue-600">
//                     {displayName
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")
//                       .toUpperCase() || "U"}
//                   </AvatarFallback>
//                 )}
//               </Avatar>

//               <button
//                 onClick={() => setIsEditingAvatar(true)}
//                 className="absolute bottom-2 right-2 p-2 bg-[#293379] dark:bg-blue-700 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
//               >
//                 <FaCamera className="h-4 w-4" />
//               </button>
//             </div>

//             {/* User Info */}
//             <div className="flex-1 text-center md:text-left">
//               <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
//                 <h1 className="text-3xl font-bold text-[#293379] dark:text-white">
//                   {displayName}
//                 </h1>
//                 {isProfileComplete ? (
//                   <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
//                     <FaCheckCircle /> Profile Complete
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
//                     <FaExclamationCircle /> Profile Incomplete
//                   </span>
//                 )}
//               </div>

//               <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
//                 {displayEmail}
//                 {profile?.phone && ` • ${profile.phone}`}
//               </p>

//               {/* Only show completion bar if profile is incomplete */}
//               {!isProfileComplete && (
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Profile Completion
//                     </span>
//                     <span className="text-sm text-amber-600 dark:text-amber-400">
//                       {completionPercentage}%
//                     </span>
//                   </div>
//                   <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
//                       style={{ width: `${completionPercentage}%` }}
//                     />
//                   </div>
//                   <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
//                     Complete your profile to access all features
//                   </p>
//                 </div>
//               )}

//               {/* Only show stats if profile is complete */}
//               {isProfileComplete && profile && (
//                 <div className="flex flex-wrap gap-3">
//                   {profile.accountCreated && (
//                     <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
//                       Member since{" "}
//                       {new Date(profile.accountCreated).getFullYear()}
//                     </span>
//                   )}
//                   {profile.appointments?.length > 0 && (
//                     <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
//                       {profile.appointments.length} Appointments
//                     </span>
//                   )}
//                   {profile.medicalConditions?.length > 0 && (
//                     <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
//                       {profile.medicalConditions.length} Conditions
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Edit Profile Button */}
//             <Button
//               onClick={onEditClick}
//               className="bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600"
//             >
//               <FaEdit className="mr-2" />
//               {isProfileComplete ? "Edit Profile" : "Complete Profile"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Avatar Upload Modal */}
//       {isEditingAvatar && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-[#293379] dark:text-white">
//                 Update Profile Picture
//               </h3>
//               <button
//                 onClick={handleCancel}
//                 className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//                 disabled={uploadingAvatar}
//               >
//                 <FaTimes className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//               </button>
//             </div>

//             {/* File Upload Area */}
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 cursor-pointer transition-colors ${
//                 selectedFile
//                   ? "border-green-500 bg-green-50 dark:bg-green-900/10"
//                   : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
//               }`}
//               onClick={() => !uploadingAvatar && fileInputRef.current?.click()}
//             >
//               {previewUrl ? (
//                 <div className="space-y-3">
//                   <div className="relative mx-auto w-32 h-32">
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded-full border-2 border-white dark:border-gray-700 shadow-md"
//                     />
//                     <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                       <span className="text-white text-sm font-medium">
//                         Change Image
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {selectedFile?.name}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
//                     <FaUpload className="h-8 w-8 text-gray-400 dark:text-gray-500" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-700 dark:text-gray-300">
//                       Click to upload or drag and drop
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                       PNG, JPG, GIF up to 5MB
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".jpg,.jpeg,.png,.gif,.webp"
//                 onChange={handleFileSelect}
//                 className="hidden"
//                 disabled={uploadingAvatar}
//               />
//             </div>

//             {/* Error Message */}
//             {uploadError && (
//               <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
//                 <p className="text-sm text-red-600 dark:text-red-400">
//                   {uploadError}
//                 </p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex gap-3 justify-end">
//               <Button
//                 onClick={handleCancel}
//                 disabled={uploadingAvatar}
//                 variant="outline"
//                 className="border-gray-300 dark:border-gray-600"
//               >
//                 <FaTimes className="mr-2" /> Cancel
//               </Button>

//               <Button
//                 onClick={handleUpload}
//                 disabled={!selectedFile || uploadingAvatar}
//                 className="bg-[#016b61] hover:bg-[#015951]"
//               >
//                 {uploadingAvatar ? (
//                   <>
//                     <FaSpinner className="mr-2 animate-spin" /> Uploading...
//                   </>
//                 ) : (
//                   <>
//                     <FaUpload className="mr-2" /> Upload
//                   </>
//                 )}
//               </Button>
//             </div>

//             {/* Upload Tips */}
//             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 • Use a clear photo of your face for better recognition
//                 <br />
//                 • Square images work best
//                 <br />• File will be stored securely on our servers
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
