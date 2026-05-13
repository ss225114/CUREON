// components/SidebarActions.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaChevronDown,
  FaUpload,
  FaFolderPlus,
} from "react-icons/fa";
import { useReports } from "../context/LabTestsReportContext";

export default function SidebarActions() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const {
    dark,
    setUploadOpen,
    setFolderOpen,
  } = useReports();

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () =>
      document.removeEventListener("mousedown", closeMenu);
  }, []);

  const handleUpload = () => {
    setOpen(false);
    setUploadOpen(true);
  };

  const handleFolder = () => {
    setOpen(false);
    setFolderOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* New Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.015 }}
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-[#293379] to-[#1e275e] text-white shadow-xl flex items-center justify-between font-medium transition-all"
      >
        <div className="flex items-center gap-2">
          <FaPlus className="text-sm" />
          <span>New</span>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <FaChevronDown className="text-xs opacity-80" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="absolute top-full mt-3 left-0 w-full z-50"
          >
            <div
              className={`rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl ${
                dark
                  ? "bg-[#1A2B42]/95 border-[#1E3A5F]"
                  : "bg-white/95 border-slate-200"
              }`}
            >
              {/* Upload */}
              <button
                onClick={handleUpload}
                className={`w-full px-4 py-4 flex items-center gap-3 transition-all text-left group ${
                  dark
                    ? "hover:bg-[#24344D]"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition ${
                    dark
                      ? "bg-[#111C2E]"
                      : "bg-blue-100"
                  }`}
                >
                  <FaUpload
                    className={
                      dark
                        ? "text-blue-300"
                        : "text-[#293379]"
                    }
                  />
                </div>

                <div>
                  <p
                    className={`text-sm font-semibold ${
                      dark
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    Upload Report
                  </p>

                  <p
                    className={`text-xs ${
                      dark
                        ? "text-slate-400"
                        : "text-gray-500"
                    }`}
                  >
                    PDF, JPG, PNG files
                  </p>
                </div>
              </button>

              {/* Divider */}
              <div
                className={
                  dark
                    ? "border-t border-[#1E3A5F]"
                    : "border-t border-gray-200"
                }
              />

              {/* Folder */}
              <button
                onClick={handleFolder}
                className={`w-full px-4 py-4 flex items-center gap-3 transition-all text-left group ${
                  dark
                    ? "hover:bg-[#24344D]"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition ${
                    dark
                      ? "bg-[#111C2E]"
                      : "bg-green-100"
                  }`}
                >
                  <FaFolderPlus
                    className={
                      dark
                        ? "text-green-400"
                        : "text-green-600"
                    }
                  />
                </div>

                <div>
                  <p
                    className={`text-sm font-semibold ${
                      dark
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    New Folder
                  </p>

                  <p
                    className={`text-xs ${
                      dark
                        ? "text-slate-400"
                        : "text-gray-500"
                    }`}
                  >
                    Organize your reports
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}