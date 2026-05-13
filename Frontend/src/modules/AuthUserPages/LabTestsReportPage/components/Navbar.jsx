import React from "react";
import { useReports } from "../context/LabTestsReportContext";

export default function Navbar() {
  const {
    dark,
    setDark,
    search,
    setSearch,
    sideOpen,
    setSideOpen,
  } = useReports();

  return (
    <nav
      className={`sticky top-0 z-40 border-b ${
        dark ? "bg-[#111C2E] border-[#1E3A5F]" : "bg-white border-slate-200"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center gap-3 justify-between">
        <button
          onClick={() => setSideOpen(!sideOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-500"
        >
          ☰
        </button>

        <span className="font-bold text-[34px] leading-none text-[#2D3580] mr-2">
          Cureon 
        </span>

        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full px-5 py-2 rounded-full border text-sm outline-none ${
              dark
                ? "bg-[#1A2B42] border-[#1E3A5F] text-white placeholder:text-slate-500"
                : "bg-slate-50 border-slate-300 text-slate-700 placeholder:text-slate-400"
            }`}
          />
        </div>

        <button
          onClick={() => setDark(!dark)}
          className={`w-9 h-9 rounded-full border text-sm ${
            dark
              ? "border-[#1E3A5F] text-yellow-300"
              : "border-slate-200 text-slate-500"
          }`}
        >
          {dark ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
}