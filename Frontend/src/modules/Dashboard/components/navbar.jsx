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
            className="flex items-center space-x-2 px-5 py-2.5 text-white dark:text-gray-900 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              backgroundColor: darkMode ? "#a5b4fc" : "#293379",
            }}
          >
            <FaEnvelope size={16} />
            <span className="font-semibold">Contact Us</span>
          </button>

          {/* Help */}
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
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

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Welcome back!
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user}
                  </p>
                </div>

                <ul className="flex flex-col py-2">
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 transition-colors duration-300">
                    <Link
                      to="/userprofile"
                      className="text-gray-800 dark:text-gray-200"
                    >
                      Your Profile
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    Prescriptions
                  </li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    Test Reports
                  </li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    Chat History
                  </li>
                </ul>

                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl">
                  <button
                    onClick={logout}
                    className="text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-300 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN — FIXED CSS */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-gray-200 dark:border-gray-800 fixed top-[60px] left-0 w-full z-40"
        >
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              Welcome back!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user}</p>
          </div>

          <div className="p-4 space-y-3">
            <button
              className="flex items-center justify-between w-full p-3 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
              style={{
                backgroundColor: darkMode ? "#a5b4fc" : "#293379",
              }}
            >
              <div className="flex items-center">
                <FaEnvelope className="mr-3" />
                <span>Contact Us</span>
              </div>
            </button>

            <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="flex items-center">
                <FaQuestionCircle className="mr-3 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Help</span>
              </div>
            </button>

            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="flex items-center">
                {darkMode ? (
                  <FaSun className="mr-3 text-yellow-500" />
                ) : (
                  <FaMoon className="mr-3 text-blue-600 dark:text-blue-400" />
                )}
                <span className="text-gray-700 dark:text-gray-300">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {darkMode ? "ON" : "OFF"}
              </span>
            </button>

            {/* Profile */}
            <Link
              to="/userprofile"
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaUserCircle
                  size={20}
                  className="mr-3 text-[#293379] dark:text-blue-400"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Your Profile
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
