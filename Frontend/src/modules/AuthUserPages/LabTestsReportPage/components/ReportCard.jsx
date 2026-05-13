// components/ReportCard.jsx
import React from "react";
import { useReports } from "../context/LabTestsReportContext";

export default function ReportCard({ report }) {
  const {
    dark,
    toggleStar,
  } = useReports();

  return (
    <div
      className={`rounded-2xl border shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden ${
        dark
          ? "bg-[#1A2B42] border-[#1E3A5F]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="h-1.5 bg-[#2D3580]" />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              dark ? "bg-[#0F1B2D]" : "bg-[#EEF2FF]"
            }`}
          >
            🧪
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleStar(report.id);
            }}
            className={`transition ${
              report.starred
                ? "text-yellow-400"
                : "text-slate-300 hover:text-yellow-400"
            }`}
          >
            ★
          </button>
        </div>

        <h3
          className={`text-sm font-semibold truncate ${
            dark ? "text-white" : "text-slate-800"
          }`}
        >
          {report.title}
        </h3>

        {/* <p
          className={`text-xs mt-1 truncate ${
            dark ? "text-slate-400" : "text-slate-400"
          }`}
        >
          {report.doctor}
        </p> */}

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs px-2 py-1 rounded-full bg-[#EEF2FF] text-[#2D3580] font-medium">
            {report.category}
          </span>

          {/* <span
            className={`text-xs ${
              dark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {report.date}
          </span> */}
        </div>
      </div>
    </div>
  );
}