// components/FolderModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReports } from "../context/LabTestsReportContext";

export default function FolderModal() {
  const { folderOpen, setFolderOpen, createFolder, dark } = useReports();

  const [folderName, setFolderName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!folderOpen) {
      setFolderName("");
    }
  }, [folderOpen]);

  const handleCreate = async () => {
    const name = folderName.trim();

    if (!name) return;

    try {
      setLoading(true);

      await createFolder(name, null);

      setFolderName("");

      setFolderOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {folderOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFolderOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              scale: 0.96,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.96,
              opacity: 0,
            }}
            className={`w-full max-w-md rounded-3xl shadow-2xl ${
              dark ? "bg-[#1A2B42]" : "bg-white"
            }`}
          >
            {/* Header */}
            <div
              className="
                px-6 py-5
                border-b
                border-slate-200
                dark:border-[#1E3A5F]
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h2
                  className={`font-semibold ${
                    dark ? "text-white" : "text-slate-800"
                  }`}
                >
                  New Folder
                </h2>

                {/* {selectedFolder && (
                  <p
                    className={`text-xs mt-1 ${
                      dark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Creating inside selected
                    folder
                  </p>
                )} */}
              </div>

              <button
                onClick={() => setFolderOpen(false)}
                className={`
                  text-lg
                  ${dark ? "text-slate-300" : "text-slate-600"}
                `}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <input
                type="text"
                placeholder="Folder name..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreate();
                  }
                }}
                className={`w-full px-4 py-3 rounded-2xl border outline-none text-sm ${
                  dark
                    ? "bg-[#111C2E] border-[#1E3A5F] text-white placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-300 text-slate-700"
                }`}
              />

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() => setFolderOpen(false)}
                  className={`py-3 rounded-2xl border text-sm transition ${
                    dark
                      ? "border-[#1E3A5F] text-white hover:bg-[#111C2E]"
                      : "border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="
                    py-3
                    rounded-2xl
                    bg-[#2D3580]
                    text-white
                    text-sm
                    font-medium
                    transition
                    hover:opacity-90
                    disabled:opacity-50
                  "
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
