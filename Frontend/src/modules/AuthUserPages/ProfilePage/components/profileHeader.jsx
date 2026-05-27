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