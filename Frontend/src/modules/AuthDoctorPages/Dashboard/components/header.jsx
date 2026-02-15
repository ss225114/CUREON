import { useState, useRef, useEffect, use } from "react";
import { useAuth } from "@/modules/Auth/context/authContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
  FaCalendar,
  FaCalendarAlt,
  FaUser,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDashboard } from "../context/dashboardContext";

export default function Header() {
  const { doctorData, isDarkMode, toggleDarkMode } = useDashboard();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const logout = useAuth();

  const handleMenuItemClick = (action) => {
    
    setIsProfileMenuOpen(false);

    switch (action) {
      case "profile":
        navigate("/doctor-profile");
        break;
      case "documents":
        // Navigate to documents page
        break;
        case "appointments":
        navigate("/doctor-appointments");
        break;
      case "signout":
        logout();
        navigate("/");
        break;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Welcome message */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-[#293379] to-[#3a4a9c] rounded-full">
              <FaUserCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#293379] dark:text-white">
                Welcome,{" "}
                <span className="text-[#016b61] dark:text-blue-400">
                  {doctorData?.fullName}
                </span>
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>{currentDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                    {doctorData?.specialization?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-5 w-5 text-[#293379]" />
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Notifications"
            >
              <FaBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>

            {/* Profile with dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 pl-3 border-l border-gray-300 dark:border-gray-700 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {doctorData?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {doctorData?.hospital}
                  </p>
                </div>
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#293379] to-[#016b61] flex items-center justify-center text-white font-bold">
                    {doctorData?.fullName?.charAt(0)}
                  </div>
                </div>
              </button>

              {/* Dropdown menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-2">
                    {/* Profile item */}
                    <button
                      onClick={() => handleMenuItemClick("profile")}
                      className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 flex items-center justify-center text-[#293379] dark:text-blue-400">
                        <FaUser className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Your Profile
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          View and edit your profile
                        </div>
                      </div>
                    </button>

                    {/* All Appointments item */}
                    <button
                      onClick={() => handleMenuItemClick("appointments")}
                      className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 flex items-center justify-center text-[#293379] dark:text-blue-400">
                        <FaCalendar className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          All Appointments
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          View all scheduled appointments
                        </div>
                      </div>
                    </button>

                    {/* Documents item */}
                    <button
                      onClick={() => handleMenuItemClick("documents")}
                      className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 flex items-center justify-center text-[#293379] dark:text-blue-400">
                        <FaFileMedical className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Patient's Documents
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Access patient medical records
                        </div>
                      </div>
                    </button>

                    {/* Divider */}
                    <div className="my-1 border-t border-gray-200 dark:border-gray-800"></div>

                    {/* Sign Out item */}
                    <button
                      onClick={() => handleMenuItemClick("signout")}
                      className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-red-50 cursor-pointer dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center text-red-600 dark:text-red-400">
                        <FaSignOutAlt className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-red-600 dark:text-red-400">
                          Sign Out
                        </div>
                        <div className="text-xs text-red-500 dark:text-red-500/80">
                          Log out of your account
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
