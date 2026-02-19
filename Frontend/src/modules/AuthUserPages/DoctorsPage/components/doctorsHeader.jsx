import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaMapMarkerAlt,
  FaHome,
  FaUser,
  FaMoon,
  FaSun,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function DoctorsHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock user data
  const user = {
    name: "Sanjana Biswas",
    email: "sanjana17317@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjana",
  };

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd update the theme context here
    document.documentElement.classList.toggle("dark");
  };

  // Marquee text items
  const marqueeItems = [
    {
      text: "Find Verified Doctors Near You",
      icon: <FaCheckCircle className="inline mr-2" />,
    },
    {
      text: "95% Patient Satisfaction Rate",
      icon: <FaStar className="inline mr-2" />,
    },
    {
      text: "100% Secure Booking & Payments",
      icon: <FaShieldAlt className="inline mr-2" />,
    },
    {
      text: "Instant Appointment Booking",
      icon: <FaClock className="inline mr-2" />,
    },
    {
      text: "500+ Expert Doctors Available",
      icon: <FaStethoscope className="inline mr-2" />,
    },
    {
      text: "No Hidden Fees or Booking Charges",
      icon: <FaCheckCircle className="inline mr-2" />,
    },
    {
      text: "Easy Online Consultations",
      icon: <FaCheckCircle className="inline mr-2" />,
    },
    {
      text: "Detailed Doctor Profiles & Reviews",
      icon: <FaCheckCircle className="inline mr-2" />,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 sm:p-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md sticky top-0 z-50 shadow-xl transition-colors border-b border-white/10 dark:border-gray-700/30">
        {/* Logo - Left Side */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293379] dark:text-blue-300 tracking-wide hover:cursor-default">
            Cureon
          </h1>
        </div>

        {/* Navigation Icons and User - Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Home Icon - Circular */}
          <a
            href="/user-dashboard"
            className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600"
            title="Home"
          >
            <FaHome className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-[#293379] dark:hover:text-blue-400" />
          </a>

          {/* Profile Icon - Circular */}
          <a
            href="/userprofile"
            className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600"
            title="My Profile"
          >
            <FaUser className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-[#293379] dark:hover:text-blue-400" />
          </a>

          {/* Dark Mode Toggle - Circular */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/80 flex items-center justify-center transition-all duration-300 border border-gray-300 dark:border-gray-600"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <FaSun className="h-5 w-5 text-yellow-500" />
            ) : (
              <FaMoon className="h-5 w-5 text-[#293379]" />
            )}
          </button>

          {/* User Avatar - Circular */}
          <div className="flex items-center gap-3 group relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-800 dark:to-blue-600 flex items-center justify-center border-2 border-white/50 dark:border-gray-700/50">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-transparent">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User Name - Hidden on mobile, shown on medium+ screens */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {user.name.split(" ")[0]} {/* Show only first name */}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">User</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#293379]/20 via-[#016b61]/20 to-[#293379]/20" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#293379]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#016b61]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-flex p-4 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl mb-6">
            <FaStethoscope className="h-12 w-12 text-[#293379] dark:text-blue-400" />
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#293379] dark:text-white mb-4">
            Your Home for Health
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Find and book appointments with trusted healthcare professionals
          </p>

          {/* Location badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-full mb-8">
            <FaMapMarkerAlt className="h-5 w-5 text-[#016b61] dark:text-green-400" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Bangalore
            </span>
          </div>

          {/* Scrolling Marquee Text - Now below Bangalore */}
          <div className="relative bg-gradient-to-r from-[#293379]/10 to-[#016b61]/10 dark:from-[#293379]/20 dark:to-[#016b61]/20 overflow-hidden border-y border-gray-200/50 dark:border-gray-700/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="py-2">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...marqueeItems, ...marqueeItems].map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center mx-8 text-sm font-medium text-[#293379] dark:text-blue-400"
                  >
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                    {index < marqueeItems.length * 2 - 1 && (
                      <div className="ml-8 w-1 h-1 rounded-full bg-[#016b61] dark:bg-green-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}