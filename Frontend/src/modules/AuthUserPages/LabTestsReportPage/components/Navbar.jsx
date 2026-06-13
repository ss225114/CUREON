import React from "react";
import { FaSun, FaMoon, FaUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useReports } from "../context/LabTestsReportContext";

export default function Navbar() {
  const { dark, setDark, sideOpen, setSideOpen } = useReports();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${
        dark
          ? "bg-[#111C2E]/95 border-[#1E3A5F]"
          : "bg-white/95 border-slate-200"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSideOpen(!sideOpen)}
            className={`lg:hidden p-2 rounded-lg transition ${
              dark
                ? "hover:bg-[#1A2B42] text-slate-300"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            ☰
          </button>

          <span
            className={`text-2xl md:text-3xl font-bold tracking-wide select-none ${
              dark ? "text-indigo-300" : "text-[#293379]"
            }`}
          >
            Cureon
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {/* Home Button */}
          <Link
            to="/"
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 shadow-sm ${
              dark
                ? "bg-[#1A2B42] border-[#1E3A5F] text-indigo-300 hover:bg-[#243855]"
                : "bg-white border-slate-200 text-[#293379] hover:bg-slate-100"
            }`}
          >
            <FaHome size={18} />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`w-11 h-11 flex items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 shadow-sm ${
              dark
                ? "bg-[#1A2B42] border-[#1E3A5F] hover:bg-[#243855]"
                : "bg-white border-slate-200 hover:bg-slate-100"
            }`}
          >
            {dark ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-[#293379] text-lg" />
            )}
          </button>

          {/* User Icon */}
          <Link to ="/userprofile"
            className={`rounded-full transition-all duration-300 hover:scale-105 ${
              dark ? "text-indigo-300" : "text-[#293379]"
            }`}
          >
            <FaUserCircle size={36} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
