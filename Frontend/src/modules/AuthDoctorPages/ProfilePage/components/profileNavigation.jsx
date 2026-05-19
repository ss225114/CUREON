import { Button } from "@/components/ui/button";
import {
  FaUser,
  FaStethoscope,
  FaCalendarAlt,
  FaChartLine,
  FaBriefcaseMedical,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useProfile } from "../context/profileContext";

const tabs = [
  { id: "overview", label: "Overview", icon: <FaUser /> },
  { id: "professional", label: "Professional", icon: <FaStethoscope /> },
  { id: "availability", label: "Availability", icon: <FaCalendarAlt /> },
];

export default function ProfileNavigation() {
  const { activeTab, setActiveTab } = useProfile();

  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-800 mt-6 mb-8">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-6 py-4 font-medium rounded-none transition-all duration-300 whitespace-nowrap ${
            activeTab === tab.id
              ? "text-[#293379] dark:text-blue-400 border-b-2 border-[#293379] dark:border-blue-400 bg-gradient-to-b from-[#293379]/5 to-transparent"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
          }`}
        >
          {tab.icon}
          {tab.label}
        </Button>
      ))}

      {/* Sign Out Button */}
      {/* <div className="ml-auto flex items-center">
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 px-6 py-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          <FaSignOutAlt />
          Sign Out
        </Button>
      </div> */}
    </div>
  );
}
