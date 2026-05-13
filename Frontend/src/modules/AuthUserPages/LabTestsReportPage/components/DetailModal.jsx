// components/DetailModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReports } from "../context/LabTestsReportContext";

export default function DetailModal() {
  const { detailOpen, setDetailOpen, selected, dark } = useReports();

  const fileUrl = `http://localhost:5000/${selected?.filePath}`;

  if (!selected) return null;

  return (
    <AnimatePresence>
      {detailOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDetailOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl ${
              dark ? "bg-[#1A2B42]" : "bg-white"
            }`}
          >
            {/* Header */}
            <div className="bg-[#2D3580] px-6 py-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  {/* <p className="text-xs text-blue-200 mb-1">
                    {selected.date} • {selected.size}
                  </p> */}

                  <h2 className="text-xl font-semibold">{selected.title}</h2>

                  {/* <p className="text-sm text-blue-200 mt-1">
                    {selected.doctor}
                  </p> */}
                </div>

                <button
                  onClick={() => setDetailOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div
                className={`rounded-2xl border p-8 text-center ${
                  dark
                    ? "border-[#1E3A5F] bg-[#111C2E]"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <div className="text-4xl mb-3">📄</div>

                <p
                  className={`text-sm ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {selected.mimeType.substring(12).toUpperCase()}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="bg-[#2D3580] text-white py-3 rounded-2xl text-sm font-medium">
                  Download
                </button>

                <button
                  onClick={() => window.open(fileUrl, "_blank")}
                  className={`py-3 rounded-2xl text-sm font-medium border ${
                    dark
                      ? "border-[#1E3A5F] text-white"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  View
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
