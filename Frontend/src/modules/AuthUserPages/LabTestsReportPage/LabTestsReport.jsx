import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ReportCard from "./components/ReportCard";
import ReportRow from "./components/ReportRow";
import DetailModal from "./components/DetailModal";
import UploadModal from "./components/UploadModal";
import FolderModal from "./components/FolderModal";
import ContextMenu from "./components/ContextMenu";
import TrustBar from "./components/TrustBar";

import {
  ReportProvider,
  useReports,
} from "./context/LabTestsReportContext";

export function LabTestsReportContent() {
  const {
    dark,
    view,
    setView,
    reports,
    openReport,
    folderName
  } = useReports();

  return (
    <div
      className={`min-h-screen ${
        dark ? "bg-[#0F1B2D]" : "bg-[#F6F8FC]"
      } transition-colors`}
    >
      <Navbar />

      <div className="relative">
        <Sidebar />

        <main className="lg:ml-64 min-h-[calc(100vh-56px)]">
          <div className="max-w-[1400px] mx-auto p-4 lg:p-6">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-5">
              <h1
                className={`font-semibold ${
                  dark ? "text-white" : "text-slate-800"
                }`}
              >
                {folderName.toUpperCase() || "Reports"}
              </h1>

              <div className="flex gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`px-4 py-2 rounded-xl text-sm ${
                    view === "grid"
                      ? "bg-[#2D3580] text-white"
                      : dark
                      ? "border border-[#1E3A5F] text-white"
                      : "border border-slate-200 text-slate-700"
                  }`}
                >
                  Grid
                </button>

                <button
                  onClick={() => setView("list")}
                  className={`px-4 py-2 rounded-xl text-sm ${
                    view === "list"
                      ? "bg-[#2D3580] text-white"
                      : dark
                      ? "border border-[#1E3A5F] text-white"
                      : "border border-slate-200 text-slate-700"
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Grid */}
            {view === "grid" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => openReport(r)}
                  >
                    <ReportCard report={r} />
                  </div>
                ))}
              </div>
            )}

            {/* List */}
            {view === "list" && (
              <div
                className={`rounded-2xl overflow-hidden border ${
                  dark
                    ? "bg-[#1A2B42] border-[#1E3A5F]"
                    : "bg-white border-slate-100"
                }`}
              >
                {reports.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => openReport(r)}
                  >
                    <ReportRow report={r} />
                  </div>
                ))}
              </div>
            )}

            <TrustBar />
          </div>
        </main>
      </div>

      {/* Modals */}
      <DetailModal />
      <UploadModal />
      <FolderModal />
      <ContextMenu />
    </div>
  );
}

export default function LabTestsReport() {
  return (
    <ReportProvider>
      <LabTestsReportContent />
    </ReportProvider>
  );
}