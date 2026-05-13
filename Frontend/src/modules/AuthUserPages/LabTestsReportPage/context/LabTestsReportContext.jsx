// context/LabTestsReportContext.jsx
import apiClient from "@/lib/apiClient";
import React, { createContext, useContext, useEffect, useState } from "react";

const ReportContext = createContext();

const seedReports = [
  {
    id: 1,
    name: "CBC Report",
    doctor: "Dr. Sharma",
    type: "Blood",
    date: "Today",
    size: "2.1 MB",
    starred: false,
  },
  {
    id: 2,
    name: "Lipid Profile",
    doctor: "Dr. Roy",
    type: "Heart",
    date: "Yesterday",
    size: "1.4 MB",
    starred: false,
  },
];

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);

  const [navKey, setNavKey] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [dark, setDark] = useState(false);

  const [sideOpen, setSideOpen] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);

  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderName, setFolderName] = useState("");

  const [loading, setLoading] = useState(false);

  const openReport = (r) => {
    setSelected(r);
    setDetailOpen(true);
  };

  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get("/api/documents");

      console.log("documents: ", res);

      setReports(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async () => {
    try {
      const res = await apiClient.get("/api/folders/all-folders");

      console.log("folders: ", res);

      setFolders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStar = async (id) => {
    try {
      const res = await apiClient.patch(`/api/reports/${id}/star`);

      setReports((prev) =>
        prev.map((report) => (report._id === id ? res.data : report)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteReport = (id) => {
  //   setReports((prev) => prev.filter((r) => r.id !== id));
  // };

  const uploadReport = async (file, folderId, title, category) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folderId", folderId);
      formData.append("title", title);
      formData.append("category", category);

      const res = await apiClient.post("/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReports((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const createFolder = async (name, parentFolder = null) => {
    try {
      const res = await apiClient.post("/api/folders", {
        name,
        parentFolder,
      });

      setFolders((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDocumentsByFolder = async (folderId) => {
    try {
      setLoading(true);

      const res = await apiClient.get(`/api/documents/folder/${folderId}`);

      setReports(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const filteredReports = reports.filter((r) => {
  //   const matchesSearch =
  //     r.name.toLowerCase().includes(search.toLowerCase()) ||
  //     r.doctor.toLowerCase().includes(search.toLowerCase());

  //   const matchesTab =
  //     navKey === "all"
  //       ? true
  //       : navKey === "starred"
  //         ? r.starred
  //         : navKey === "uploaded"
  //           ? true
  //           : true;

  //   return matchesSearch && matchesTab;
  // });

  useEffect(() => {
    if (selectedFolder) {
      getDocumentsByFolder(selectedFolder);
    } else {
      fetchReports();
    }
    fetchFolders();
  }, [selectedFolder]);

  return (
    <ReportContext.Provider
      value={{
        reports,
        // filteredReports,
        selected,
        setSelected,
        navKey,
        setNavKey,
        search,
        setSearch,
        view,
        setView,
        dark,
        setDark,
        sideOpen,
        setSideOpen,
        detailOpen,
        setDetailOpen,
        uploadOpen,
        setUploadOpen,
        folderOpen,
        setFolderOpen,
        folders,
        createFolder,
        openReport,
        toggleStar,
        uploadReport,
        selectedFolder,
        setSelectedFolder,
        folderName,
        setFolderName,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export const useReports = () => useContext(ReportContext);
