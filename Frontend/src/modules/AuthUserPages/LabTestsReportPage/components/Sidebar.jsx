// components/Sidebar.jsx
import React, { useState } from "react";
import SidebarActions from "./SidebarActions";

import {
  FaChevronRight,
  FaChevronDown,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa";

import { useReports } from "../context/LabTestsReportContext";

const items = [
  { key: "all", label: "All Reports" },
  { key: "starred", label: "Starred" },
];

export default function Sidebar() {
  const {
    dark,
    navKey,
    setNavKey,
    sideOpen,
    setSideOpen,
    setUploadOpen,
    setFolderOpen,
    folders,
    reports,
    selectedFolder,
    setSelectedFolder,
    setFolderName,
  } = useReports();

  const [expandedFolders, setExpandedFolders] =
    useState({});

  // Toggle folder expand/collapse
  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  /*
    Recursive Folder Rendering
  */
  const renderFolders = (
    parentFolder = null,
    level = 0
  ) => {
    return folders
      .filter((folder) => {
        if (parentFolder === null) {
          return (
            folder.parentFolder === null ||
            folder.parentFolder === undefined
          );
        }

        return (
          folder.parentFolder === parentFolder
        );
      })
      .map((folder) => {
        const isExpanded =
          expandedFolders[folder._id];

        const hasChildren = folders.some(
          (f) =>
            f.parentFolder === folder._id
        );

        const isSelected =
          selectedFolder === folder._id;

        return (
          <div key={folder._id}>
            {/* Folder Item */}
            <div
              onClick={() => {
                setSelectedFolder(folder._id);
                setFolderName(folder.name);
                setNavKey("folder");
                setSideOpen(false);
              }}
              className={`
                flex items-center gap-2
                px-3 py-2
                rounded-xl
                cursor-pointer
                transition-all
                text-sm
                ${
                  isSelected
                    ? "bg-[#2D3580] text-white"
                    : dark
                    ? "text-slate-300 hover:bg-[#1E3A5F]/50"
                    : "text-slate-700 hover:bg-slate-100"
                }
              `}
              style={{
                marginLeft: `${level * 12}px`,
              }}
            >
              {/* Expand Button */}
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(folder._id);
                  }}
                  className="text-xs"
                >
                  {isExpanded ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </button>
              ) : (
                <div className="w-3" />
              )}

              {/* Folder Icon */}
              <div className="text-sm">
                {isExpanded ? (
                  <FaFolderOpen />
                ) : (
                  <FaFolder />
                )}
              </div>

              {/* Folder Name */}
              <span className="truncate">
                {folder.name}
              </span>
            </div>

            {/* Children */}
            {isExpanded &&
              renderFolders(
                folder._id,
                level + 1
              )}
          </div>
        );
      });
  };

  return (
    <>
      {sideOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSideOpen(false)}
        />
      )}

      <aside
        className={`fixed top-14 left-0 z-30 h-[calc(100vh-56px)] w-64 border-r transition-transform duration-300 overflow-y-auto
        ${
          dark
            ? "bg-[#111C2E] border-[#1E3A5F]"
            : "bg-white border-slate-200"
        }
        ${
          sideOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >
        <div className="p-4">
          {/* Sidebar Actions */}
          <SidebarActions
            onUpload={() => setUploadOpen(true)}
            onNewFolder={() => setFolderOpen(true)}
          />

          {/* Static Navigation */}
          <div className="mt-5 space-y-1">
            {items.map((item) => {
              const active =
                navKey === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setNavKey(item.key);
                    setSelectedFolder(null);
                    setSideOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition
                  ${
                    active
                      ? "bg-[#2D3580] text-white"
                      : dark
                      ? "text-slate-300 hover:bg-[#1E3A5F]/50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}

                  {/* Starred Count */}
                  {item.key === "starred" && (
                    <span className="ml-2 text-xs opacity-70">
                      (
                      {
                        reports.filter(
                          (r) =>
                            r.isStarred
                        ).length
                      }
                      )
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Folder Tree */}
          <div className="mt-6">
            <div
              className={`text-xs font-semibold uppercase tracking-wider mb-3
              ${
                dark
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Folders
            </div>

            <div className="space-y-1">
              {renderFolders()}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}