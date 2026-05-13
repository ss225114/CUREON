// components/ReportRow.jsx
import React from "react";

export default function ReportRow({ report, dark }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b last:border-0 transition cursor-pointer ${
        dark
          ? "border-[#1E3A5F] hover:bg-[#1E3A5F]/50"
          : "border-slate-100 hover:bg-slate-50"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          dark ? "bg-[#0F1B2D]" : "bg-[#EEF2FF]"
        }`}
      >
        🧪
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            dark ? "text-white" : "text-slate-800"
          }`}
        >
          {report.title}
        </p>
        {/* <p
          className={`text-xs truncate ${
            dark ? "text-slate-400" : "text-slate-400"
          }`}
        >
          {report.doctor}
        </p> */}
      </div>

      <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded-full bg-[#EEF2FF] text-[#2D3580] font-medium">
        {report.category}
      </span>

      {/* <span
        className={`hidden md:block text-xs w-20 text-right ${
          dark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {report.date}
      </span> */}

      {/* <span
        className={`hidden lg:block text-xs w-16 text-right ${
          dark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {report.size}
      </span> */}

      <button className="text-slate-300 hover:text-yellow-400 transition">
        ★
      </button>
    </div>
  );
}