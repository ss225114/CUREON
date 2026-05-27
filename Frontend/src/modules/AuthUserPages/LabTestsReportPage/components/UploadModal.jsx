// components/UploadModal.jsx
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useReports } from "../context/LabTestsReportContext";

export default function UploadModal() {
  const {
    uploadOpen,
    setUploadOpen,
    uploadReport,
    selectedFolder,
    dark,
  } = useReports();

  const [file, setFile] = useState(null);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("Other");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!uploadOpen) {
      setFile(null);
      setTitle("");
      setCategory("Other");
    }
  }, [uploadOpen]);

  /*
    Upload Handler
  */
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      console.log(file);

      await uploadReport(
        file,
        selectedFolder || null,
        title || file.name,
        category
      );

      setUploadOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {uploadOpen && (
        <motion.div
          className="
            fixed inset-0 z-50
            bg-black/50
            flex items-center justify-center
            p-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() =>
            setUploadOpen(false)
          }
        >
          <motion.div
            onClick={(e) =>
              e.stopPropagation()
            }
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
              dark
                ? "bg-[#1A2B42]"
                : "bg-white"
            }`}
          >
            {/* Header */}
            <div
              className="
                px-6 py-5
                border-b
                border-slate-200
                dark:border-[#1E3A5F]
                flex justify-between
                items-center
              "
            >
              <div>
                <h2
                  className={`font-semibold ${
                    dark
                      ? "text-white"
                      : "text-slate-800"
                  }`}
                >
                  Upload Report
                </h2>

                {selectedFolder && (
                  <p
                    className={`text-xs mt-1 ${
                      dark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Uploading into selected
                    folder
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  setUploadOpen(false)
                }
                className={`text-lg ${
                  dark
                    ? "text-slate-300"
                    : "text-slate-700"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Title */}
              <div className="mb-4">
                <label
                  className={`block text-sm mb-2 ${
                    dark
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  Report Title
                </label>

                <input
                  type="text"
                  placeholder="Enter report title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className={`w-full px-4 py-3 rounded-2xl border outline-none text-sm ${
                    dark
                      ? "bg-[#111C2E] border-[#1E3A5F] text-white placeholder:text-slate-500"
                      : "bg-slate-50 border-slate-300 text-slate-700"
                  }`}
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  className={`block text-sm mb-2 ${
                    dark
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className={`w-full px-4 py-3 rounded-2xl border outline-none text-sm ${
                    dark
                      ? "bg-[#111C2E] border-[#1E3A5F] text-white"
                      : "bg-slate-50 border-slate-300 text-slate-700"
                  }`}
                >
                  <option>
                    Blood Test
                  </option>

                  <option>
                    Prescription
                  </option>

                  <option>X-Ray</option>

                  <option>MRI</option>

                  <option>CT Scan</option>

                  <option>Other</option>
                </select>
              </div>

              {/* File Upload */}
              <label
                className={`
                  border-2 border-dashed
                  rounded-3xl
                  p-10
                  text-center
                  cursor-pointer
                  block
                  transition
                  ${
                    dark
                      ? "border-[#1E3A5F] text-slate-400 hover:bg-[#111C2E]"
                      : "border-slate-300 text-slate-500 hover:bg-slate-50"
                  }
                `}
              >
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  hidden
                  onChange={(e) =>
                    setFile(
                      e.target.files[0]
                    )
                  }
                />

                <div className="text-4xl mb-3">
                  ⬆
                </div>

                <p className="text-sm font-medium">
                  {file
                    ? file.name
                    : "Drag & drop files here"}
                </p>

                <p className="text-xs mt-1">
                  PDF, PNG, JPG, JPEG
                </p>
              </label>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() =>
                    setUploadOpen(false)
                  }
                  className={`py-3 rounded-2xl border text-sm transition ${
                    dark
                      ? "border-[#1E3A5F] text-white hover:bg-[#111C2E]"
                      : "border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpload}
                  disabled={!file || loading}
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
                  {loading
                    ? "Uploading..."
                    : "Upload"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}