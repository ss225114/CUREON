import { ProfileProvider, useProfile } from "./context/profileContext";
import { motion } from "framer-motion";
import ProfileHeader from "./components/ProfileHeader";
import ProfileNavigation from "./components/ProfileNavigation";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ProfessionalInfoCard from "./components/ProfessionalInfoCard";
import AvailabilityCard from "./components/AvailabilityCard";
import StatisticsCard from "./components/StatisticsCard";
import EditProfileForm from "./components/EditProfileForm";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const { doctorProfile, isLoading, activeTab } = useProfile();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-[#293379] dark:border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-[#293379] dark:text-white mb-2">
              Loading Profile...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Getting your professional information ready
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <EditProfileForm />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#293379] dark:text-white">
              Doctor Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your professional information and practice details
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2 border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
          >
            <FaArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Profile Header */}
        <ProfileHeader />

        {/* Navigation */}
        <ProfileNavigation />

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <ProfileInfoCard />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfessionalInfoCard />
                <AvailabilityCard />
              </div>
            </motion.div>
          )}

          {activeTab === "professional" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProfessionalInfoCard />
            </motion.div>
          )}

          {activeTab === "availability" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AvailabilityCard />
            </motion.div>
          )}

          {activeTab === "statistics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StatisticsCard />
            </motion.div>
          )}

          {activeTab === "documents" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 rounded-full inline-flex mb-4">
                    <svg
                      className="h-12 w-12 text-[#293379] dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#293379] dark:text-white mb-2">
                    Documents Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Manage your professional documents, certificates, and patient records.
                    Upload, organize, and access all your important files.
                  </p>
                  <Button className="bg-gradient-to-r from-[#293379] to-[#016b61] hover:from-[#3a4a9c] hover:to-[#018377] text-white">
                    Go to Documents Store
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#293379] dark:text-white mb-6">
                  Account Settings
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Privacy Settings", description: "Control your data privacy and sharing preferences" },
                    { title: "Notification Preferences", description: "Manage how you receive notifications" },
                    { title: "Security Settings", description: "Two-factor authentication and login security" },
                    { title: "Billing Information", description: "Update payment methods and view invoices" },
                  ].map((setting, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {setting.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-8 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Cureon Medical Profile. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Profile ID: {doctorProfile?.id}
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">
              Verified
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main export with provider
export default function ProfilePage() {
  return (
    <ProfileProvider>
      <DoctorProfile />
    </ProfileProvider>
  );
}