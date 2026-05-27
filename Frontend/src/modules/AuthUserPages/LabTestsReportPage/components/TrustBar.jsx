// components/TrustBar.jsx
import React from "react";
import { useReports } from "../context/LabTestsReportContext";

export default function TrustBar() {
  const { dark } = useReports();

  return (
    <div className="mt-8 flex justify-center">
      <div
        className={`flex items-center gap-6 px-6 py-3 rounded-2xl border shadow-sm ${
          dark
            ? "bg-[#1A2B42] border-[#1E3A5F]"
            : "bg-white border-slate-100"
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

        <div
          className={`w-px h-4 ${
            dark ? "bg-slate-700" : "bg-slate-200"
          }`}
        />

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