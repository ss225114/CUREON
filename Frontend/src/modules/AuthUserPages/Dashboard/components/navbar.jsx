import { useAuth } from "@/modules/Auth/context/authContext";
import React, { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaUser,
  FaCalendar,
  FaFileMedical,
  FaSignOutAlt,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) return JSON.parse(savedMode);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [contactOpen, setContactOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { logout } = useAuth();
  const { user } = useAuth();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Close menus when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center transition-colors duration-300 w-full fixed top-0 left-0 z-50">
        {/* LEFT: Logo + Mobile Button */}
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <FaTimes size={22} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <FaBars size={22} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold tracking-wide"
            style={{ color: darkMode ? "#a5b4fc" : "#293379" }}
          >
            Cureon
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Contact Us */}
          <button
            onClick={() => setContactOpen(true)}
            className="flex items-center space-x-2 px-5 py-2.5 text-white dark:text-gray-900 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              backgroundColor: darkMode ? "#a5b4fc" : "#293379",
            }}
          >
            <FaEnvelope size={16} />
            <span className="font-semibold">Contact Us</span>
          </button>

          {/* Help */}
          <button
            onClick={() => setHelpOpen(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FaQuestionCircle size={16} />
            <span className="font-semibold">Help</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 relative transition-all duration-300 border border-gray-300 dark:border-gray-600"
          >
            {darkMode ? (
              <FaSun size={20} className="text-yellow-400" />
            ) : (
              <FaMoon size={20} className="text-[#293379] dark:text-blue-400" />
            )}
          </button>

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full"
            >
              <FaUserCircle
                size={32}
                className="text-[#293379] dark:text-blue-400"
              />
            </button>

            {/* DESKTOP DROPDOWN */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-fadeIn">
                <div className="p-2">
                  {/* Welcome header */}
                  <div className="px-4 py-3 mb-2 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Welcome back!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user}
                    </p>
                  </div>

                  {/* Profile item */}
                  <Link
                    to="/userprofile"
                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}
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
                  </Link>

                  {/* Divider */}
                  <div className="my-1 border-t border-gray-200 dark:border-gray-800"></div>

                  {/* Sign Out item */}
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
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
      </nav>

      {/* MOBILE MENU DROPDOWN — FIXED POSITIONING */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white dark:bg-gray-900 z-40 overflow-y-auto animate-slideIn"
        >
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Welcome back!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user}</p>
          </div>

          <div className="p-2 space-y-1">
            {/* Profile item */}
            <Link
              to="/userprofile"
              className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
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
            </Link>

            {/* Contact Us item */}
            <button
              onClick={() => {
                setContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 flex items-center justify-center text-[#293379] dark:text-blue-400">
                <FaEnvelope className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  Contact Us
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Get in touch with support
                </div>
              </div>
            </button>

            {/* Help item */}
            <button
              onClick={() => {
                setHelpOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 flex items-center justify-center text-[#293379] dark:text-blue-400">
                <FaQuestionCircle className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  Help
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Get assistance and FAQs
                </div>
              </div>
            </button>

            {/* Theme Toggle item */}
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#293379]/10 to-[#016b61]/10 flex items-center justify-center text-[#293379] dark:text-blue-400">
                {darkMode ? (
                  <FaSun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <FaMoon className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Switch to {darkMode ? "light" : "dark"} theme
                </div>
              </div>
            </button>

            {/* Divider */}
            <div className="my-1 border-t border-gray-200 dark:border-gray-800"></div>

            {/* Sign Out item */}
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
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
      {contactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className={`w-full max-w-md rounded-3xl shadow-2xl border overflow-hidden ${
              darkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: darkMode
                  ? "linear-gradient(135deg,#a5b4fc,#818cf8)"
                  : "linear-gradient(135deg,#293379,#4454d9)",
              }}
            >
              <h2 className="text-xl font-bold text-white">Contact Cureon</h2>

              <button
                onClick={() => setContactOpen(false)}
                className="text-white hover:opacity-80 transition"
              >
                {/* <FaTimes size={18} /> */}
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <FaPhone className="text-[#293379] dark:text-blue-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Phone
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <FaEnvelope className="text-[#293379] dark:text-blue-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@cureon.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                  <FaMapMarkerAlt className="text-[#293379] dark:text-blue-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Cureon Healthcare Pvt. Ltd.
                    <br />
                    Salt Lake Sector V
                    <br />
                    Kolkata, West Bengal, India
                  </p>
                </div>
              </div>

              <button
                onClick={() => setContactOpen(false)}
                className="w-full py-3 rounded-xl text-white font-semibold transition"
                style={{
                  backgroundColor: darkMode ? "#818cf8" : "#293379",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {helpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className={`w-full max-w-lg rounded-3xl shadow-2xl border overflow-hidden ${
              darkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: darkMode
                  ? "linear-gradient(135deg,#a5b4fc,#818cf8)"
                  : "linear-gradient(135deg,#293379,#4454d9)",
              }}
            >
              <h2 className="text-xl font-bold text-white">
                Cureon Help Center
              </h2>

              <button
                onClick={() => setHelpOpen(false)}
                className="text-white hover:opacity-80"
              >
                {/* <FaTimes /> */}
              </button>
            </div>

            {/* FAQs */}
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  How do I book an appointment?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Visit the Find Doctors page, choose a doctor, and select an
                  available time slot.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Where can I view my reports?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Open the Tests & Reports section to upload, organize, and view
                  all your medical documents.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  How do I contact support?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Click the Contact Us button to access Cureon's phone number,
                  email, and office address.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Is my medical data secure?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Yes. Cureon stores and processes your data securely using
                  encrypted communication and protected storage.
                </p>
              </div>

              <button
                onClick={() => setHelpOpen(false)}
                className="w-full py-3 rounded-xl text-white font-semibold mt-2"
                style={{
                  backgroundColor: darkMode ? "#818cf8" : "#293379",
                }}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;