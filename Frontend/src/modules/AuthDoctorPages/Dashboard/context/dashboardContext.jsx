import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  // Load mock data
  useEffect(() => {
    const loadMockData = async () => {
      setIsLoading(true);

      // Mock doctor data
      const mockDoctorData = {
        id: "doc_001",
        fullName: "Dr. Sarah Johnson",
        email: "sarah.johnson@medical.com",
        specialization: ["Cardiology", "Internal Medicine"],
        degree: "MD",
        doctorLicenseNo: "MED123456",
        experience: "12 years",
        hospital: "City General Hospital",
        phone: "+1 (555) 123-4567",
        consultationFee: "$150",
        rating: 4.8,
        totalPatients: 1245,
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1",
      };

      // Mock appointments
      const mockAppointments = [
        {
          id: "apt_001",
          patientName: "John Smith",
          patientAge: 45,
          appointmentTime: "2024-01-15T10:00:00",
          duration: 30,
          type: "Follow-up",
          status: "confirmed",
          symptoms: ["Chest pain", "Shortness of breath"],
          notes: "Previous heart condition, needs ECG",
        },
        {
          id: "apt_002",
          patientName: "Emma Wilson",
          patientAge: 32,
          appointmentTime: "2024-01-15T11:00:00",
          duration: 45,
          type: "New Patient",
          status: "pending",
          symptoms: ["Headache", "Dizziness"],
          notes: "Migraine history",
        },
        {
          id: "apt_003",
          patientName: "Robert Chen",
          patientAge: 58,
          appointmentTime: "2024-01-15T14:30:00",
          duration: 60,
          type: "Consultation",
          status: "confirmed",
          symptoms: ["High BP", "Fatigue"],
          notes: "Medication review needed",
        },
        {
          id: "apt_004",
          patientName: "Lisa Rodriguez",
          patientAge: 29,
          appointmentTime: "2024-01-16T09:15:00",
          duration: 30,
          type: "Check-up",
          status: "cancelled",
          symptoms: ["Annual check-up"],
          notes: "Regular health screening",
        },
      ];

      // Mock documents
      const mockDocuments = [
        {
          id: "doc_001",
          patientName: "John Smith",
          documentType: "Prescription",
          date: "2024-01-10",
          fileSize: "2.4 MB",
          category: "Cardiology",
        },
        {
          id: "doc_002",
          patientName: "Emma Wilson",
          documentType: "Lab Report",
          date: "2024-01-08",
          fileSize: "1.8 MB",
          category: "Neurology",
        },
        {
          id: "doc_003",
          patientName: "Robert Chen",
          documentType: "ECG Report",
          date: "2024-01-05",
          fileSize: "3.2 MB",
          category: "Cardiology",
        },
        {
          id: "doc_004",
          patientName: "Lisa Rodriguez",
          documentType: "X-Ray",
          date: "2024-01-03",
          fileSize: "4.1 MB",
          category: "Radiology",
        },
      ];

      // Mock blogs
      const mockBlogs = [
        {
          id: "blog_001",
          title: "Latest Advances in Neurology",
          author: "Dr. Michael Chen",
          date: "2024-01-12",
          readTime: "5 min",
          category: "Neurology",
          image:
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format&fit=crop",
        },
        {
          id: "blog_002",
          title: "Managing Stress in Modern Healthcare",
          author: "Dr. Sarah Miller",
          date: "2024-01-10",
          readTime: "4 min",
          category: "Mental Health",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop",
        },
        {
          id: "blog_003",
          title: "Telemedicine: The Future of Healthcare",
          author: "Dr. James Wilson",
          date: "2024-01-08",
          readTime: "6 min",
          category: "Technology",
          image:
            "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&auto=format&fit=crop",
        },
        {
          id: "blog_004",
          title: "Nutrition Tips for Heart Health",
          author: "Dr. Emily Brown",
          date: "2024-01-05",
          readTime: "3 min",
          category: "Nutrition",
          image:
            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&auto=format&fit=crop",
        },
      ];

      // Simulate API delay
      setTimeout(() => {
        setDoctorData(mockDoctorData);
        setAppointments(mockAppointments);
        setDocuments(mockDocuments);
        setBlogs(mockBlogs);
        setIsLoading(false);
      }, 1000);
    };

    loadMockData();
  }, []);

  const value = {
    doctorData,
    appointments,
    documents,
    blogs,
    isDarkMode,
    toggleDarkMode,
    isLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
