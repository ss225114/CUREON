import React from "react";
import { useReports } from "../context/LabTestsReportContext";

export default function TrustBar() {
  const { dark } = useReports();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-center gap-6 px-6 py-3 rounded-2xl border shadow-lg backdrop-blur-md ${
          dark
            ? "bg-[#1A2B42]/95 border-[#1E3A5F]"
            : "bg-white/95 border-slate-200"
        }`}
      >
        <div
          className={`flex items-center gap-2 text-xs font-medium ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#2D3580]" />
          24/7 Support
        </div>

        <div className={`w-px h-4 ${dark ? "bg-slate-700" : "bg-slate-200"}`} />

        <div
          className={`flex items-center gap-2 text-xs font-medium ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#2D3580]" />
          100% Secure
        </div>
      </div>
    </div>
  );
}