import apiClient from "@/lib/apiClient";
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

// Mock data for pending doctor verification requests
const mockPendingRequests = [
  {
    id: "REQ-001",
    doctorId: "DOC-101",
    doctorName: "Dr. Michael Chen",
    specialization: "Cardiology",
    email: "michael.chen@hospital.com",
    phone: "+1 (555) 123-4567",
    experience: "8 years",
    hospital: "City Heart Institute",
    qualifications: ["MD Cardiology", "FACC"],
    licenseNumber: "LIC-12345",
    submittedDate: "2026-02-15",
    isActive: false,
    // documents: [
    //   { name: "Medical License", url: "#", verified: false },
    //   { name: "ID Proof", url: "#", verified: false },
    //   { name: "Degree Certificate", url: "#", verified: false },
    // ],
    consultationFee: "$200",
    availableDays: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: "REQ-002",
    doctorId: "DOC-102",
    doctorName: "Dr. Sarah Williams",
    specialization: "Pediatrics",
    email: "sarah.williams@childrens.org",
    phone: "+1 (555) 234-5678",
    experience: "12 years",
    hospital: "Children's Medical Center",
    qualifications: ["MD Pediatrics", "FAAP"],
    licenseNumber: "LIC-67890",
    submittedDate: "2026-02-14",
    isActive: false,
    // documents: [
    //   { name: "Medical License", url: "#", verified: false },
    //   { name: "ID Proof", url: "#", verified: false },
    //   { name: "Board Certification", url: "#", verified: false },
    // ],
    consultationFee: "$180",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: "REQ-003",
    doctorId: "DOC-103",
    doctorName: "Dr. James Rodriguez",
    specialization: "Neurology",
    email: "j.rodriguez@neurocare.com",
    phone: "+1 (555) 345-6789",
    experience: "15 years",
    hospital: "Advanced Neurology Center",
    qualifications: ["MD Neurology", "PhD Neuroscience"],
    licenseNumber: "LIC-24680",
    submittedDate: "2026-02-13",
    isActive: false,
    // documents: [
    //   { name: "Medical License", url: "#", verified: false },
    //   { name: "ID Proof", url: "#", verified: false },
    //   { name: "Fellowship Certificate", url: "#", verified: false },
    // ],
    consultationFee: "$250",
    availableDays: ["Monday", "Thursday", "Friday"],
  },
  {
    id: "REQ-004",
    doctorId: "DOC-104",
    doctorName: "Dr. Priya Patel",
    specialization: "Dermatology",
    email: "priya.patel@skinclinic.com",
    phone: "+1 (555) 456-7890",
    experience: "6 years",
    hospital: "Skin & Laser Clinic",
    qualifications: ["MD Dermatology", "FAAD"],
    licenseNumber: "LIC-13579",
    submittedDate: "2026-02-12",
    isActive: false,
    // documents: [
    //   { name: "Medical License", url: "#", verified: false },
    //   { name: "ID Proof", url: "#", verified: false },
    //   { name: "Residency Certificate", url: "#", verified: false },
    // ],
    consultationFee: "$190",
    availableDays: ["Wednesday", "Friday", "Saturday"],
  },
];

// Mock data for all doctors (verified and pending)
const mockAllDoctors = [
  ...mockPendingRequests,
  {
    id: "REQ-005",
    doctorId: "DOC-105",
    doctorName: "Dr. Emily Thompson",
    specialization: "Gynecology",
    email: "emily.t@womenshealth.com",
    phone: "+1 (555) 567-8901",
    experience: "10 years",
    hospital: "Women's Health Center",
    qualifications: ["MD OB/GYN", "FACOG"],
    licenseNumber: "LIC-97531",
    submittedDate: "2026-02-10",
    isActive: true,
    verifiedDate: "2026-02-12",
    // documents: [],
    consultationFee: "$220",
    availableDays: ["Monday", "Tuesday", "Thursday"],
  },
  {
    id: "REQ-006",
    doctorId: "DOC-106",
    doctorName: "Dr. Robert Kim",
    specialization: "Orthopedics",
    email: "r.kim@orthocare.com",
    phone: "+1 (555) 678-9012",
    experience: "14 years",
    hospital: "Orthopedic Institute",
    qualifications: ["MD Orthopedics", "FAAOS"],
    licenseNumber: "LIC-86420",
    submittedDate: "2026-02-08",
    isActive: true,
    verifiedDate: "2026-02-11",
    // documents: [],
    consultationFee: "$275",
    availableDays: ["Tuesday", "Wednesday", "Friday"],
  },
];

// Mock data for users
const mockUsers = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "Patient",
    registeredDate: "2026-01-15",
    lastActive: "2026-02-15 14:30",
    status: "active",
    totalAppointments: 5,
  },
  {
    id: "USR-002",
    name: "Emma Watson",
    email: "emma.w@email.com",
    role: "Patient",
    registeredDate: "2026-01-20",
    lastActive: "2026-02-15 11:45",
    status: "active",
    totalAppointments: 3,
  },
  {
    id: "USR-003",
    name: "Dr. Michael Chen",
    email: "michael.chen@hospital.com",
    role: "Doctor (Pending)",
    registeredDate: "2026-02-15",
    lastActive: "2026-02-15 09:20",
    status: "pending",
    totalAppointments: 0,
  },
];

export const DashboardProvider = ({ children }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [users, setUsers] = useState(mockUsers);
  const [viewMode, setViewMode] = useState("pending"); // pending, doctors, users
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getPendingRequests = async() => {
    try {
      const data = await apiClient.get("/admin/pending-verifications");
      console.log(data);
      if (data.data.success) {
        setPendingRequests(data.data.pending);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const getAllDoctors = async() => {
    try {
      const data = await apiClient.get("/admin/all-doctors");
      console.log(data);
      if (data.data.success) {
        setAllDoctors(data.data.doctors);
        console.log(allDoctors);
        
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getPendingRequests();
    getAllDoctors();
  }, []) 

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const acceptRequest = async(requestId) => {
    setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
    const data = {
      doc_id: requestId,
      status: true,
    }
    const response = await apiClient.post("/admin/verify-doctor", data);
    console.log(response);
    setAllDoctors((prev) =>
      prev.map((doctor) => {
        if (doctor.id === requestId) {
          return {
            ...doctor,
            isActive: true,
          };
        }
        return doctor;
      }),
    );
    getAllDoctors();
    getPendingRequests();
  };

  const rejectRequest = (requestId, reason) => {
    setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
    setAllDoctors((prev) =>
      prev.map((doctor) => {
        if (doctor.id === requestId) {
          return {
            ...doctor,
            status: "rejected",
            rejectedDate: new Date().toISOString().split("T")[0],
            rejectionReason: reason,
          };
        }
        return doctor;
      }),
    );
  };

  const filteredDoctors = useMemo(() => {
    let filtered = allDoctors;

    if (searchQuery) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.specialization
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((doctor) => doctor.status === filterStatus);
    }

    return filtered;
  }, [allDoctors, searchQuery, filterStatus]);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    return filtered;
  }, [users, searchQuery, filterStatus]);

  const stats = useMemo(
    () => ({
      totalPending: pendingRequests.length,
      totalDoctors: allDoctors.filter((d) => d.isActive === true).length,
      totalUsers: users.length,
      totalRejected: allDoctors.filter((d) => d.isActive === false).length,
      newToday: pendingRequests?.filter(
        (req) => req.submittedDate === new Date().toISOString().split("T")[0],
      ).length,
    }),
    [pendingRequests, allDoctors, users],
  );

  const value = {
    pendingRequests,
    allDoctors: filteredDoctors,
    users: filteredUsers,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    stats,
    acceptRequest,
    rejectRequest,
    getGreeting,
    currentTime,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
