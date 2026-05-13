import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import ProfileHeader from "./components/profileHeader";
import ProfileInfoCard from "./components/profileInfoCard";
import MedicalInfoCard from "./components/medicalInfoCard";
import UpcomingAppointments from "./components/upcomingAppointments";
import CompleteProfileForm from "./components/completeProfileForm";
import {
  FaUser,
  FaHeartbeat,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaArrowLeft,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Tab Navigation Component
function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "medical", label: "Medical Info", icon: <FaHeartbeat /> },
    { id: "appointments", label: "Appointments", icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-700 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
            activeTab === tab.id
              ? "text-[#293379] dark:text-blue-400 border-b-2 border-[#293379] dark:border-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Profile Incomplete Banner
function ProfileIncompleteBanner({ onCompleteClick }) {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-amber-400/20 to-amber-500/20 dark:from-amber-900/30 dark:to-amber-800/30 border border-amber-300 dark:border-amber-700 rounded-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-full">
            <FaExclamationTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-amber-800 dark:text-amber-300">
              Complete Your Profile
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Add your medical information to get personalized healthcare
              recommendations
            </p>
          </div>
        </div>
        <Button
          onClick={onCompleteClick}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          Complete Profile Now
        </Button>
      </div>
    </div>
  );
}

// Main Content Component
function ProfileContent() {
  const navigate = useNavigate(); // Added hook
  const { profile, loading, error, isProfileComplete } = useProfile();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCompleteForm, setShowCompleteForm] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-[#293379] dark:border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate("/user-dashboard")}
            className="bg-gray-600 hover:bg-gray-700"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Button>
          <Button className="bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CompleteProfileForm
        isOpen={showCompleteForm}
        onClose={() => setShowCompleteForm(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#293379] dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your personal information, medical records, and
              appointments
            </p>
          </div>

          {/* Back to Dashboard Button */}
          <Button
            onClick={() => navigate("/user-dashboard")}
            variant="outline"
            className="flex items-center gap-2 border-[#293379] text-[#293379] hover:bg-[#293379] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
          >
            <FaArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Profile Completion Banner */}
        {!isProfileComplete && (
          <ProfileIncompleteBanner
            onCompleteClick={() => setShowCompleteForm(true)}
          />
        )}

        {/* Tab Navigation */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profile Header */}
          <ProfileHeader onEditClick={() => setShowCompleteForm(true)} />

          {/* Tab-specific content */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <ProfileInfoCard />
              <MedicalInfoCard profile={profile} />
            </motion.div>
          )}

          {activeTab === "medical" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <MedicalInfoCard profile={profile} />

              {!isProfileComplete && (
                <Card className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-700">
                  <CardContent className="p-6 text-center">
                    <FaExclamationTriangle className="h-12 w-12 text-amber-500 dark:text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                      Complete Your Medical Profile
                    </h3>
                    <p className="text-amber-700 dark:text-amber-400 mb-4">
                      Add your medical history to get personalized healthcare
                      insights
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => navigate("/user-dashboard")}
                        variant="outline"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/30"
                      >
                        <FaArrowLeft className="mr-2" /> Back to Dashboard
                      </Button>
                      <Button
                        onClick={() => setShowCompleteForm(true)}
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Complete Medical Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}

          {activeTab === "appointments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {!isProfileComplete ? (
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                      <FaCalendarAlt className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">
                      Complete Your Profile First
                    </h3>
                    <p className="text-blue-700 dark:text-blue-400 mb-6 max-w-md mx-auto">
                      Before you can book appointments, we need to know more
                      about your medical history and contact information.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={() => navigate("/user-dashboard")}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        <FaArrowLeft className="mr-2" /> Back to Dashboard
                      </Button>
                      <Button
                        onClick={() => setShowCompleteForm(true)}
                        className="bg-[#016b61] hover:bg-[#015951] text-white px-8 py-3"
                      >
                        Complete Profile to Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <UpcomingAppointments />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-8 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Cureon Medical Profile. All rights
            reserved.
          </div>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">
              Verified
            </span>
        </div>
      </footer>
    </>
  );
}

// Helper Components
function SettingItem({ title, description }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/30 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <Button variant="outline" size="sm">
        Configure
      </Button>
    </div>
  );
}

// Main Export
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <ProfileProvider>
        <ProfileContent />
      </ProfileProvider>
    </div>
  );
}