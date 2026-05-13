import apiClient from "@/lib/apiClient";
import { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock doctor profile data
  // const mockDoctorProfile = {
  //   id: "doc_001",
  //   personalInfo: {
  //     fullName: "Dr. Sarah Johnson",
  //     email: "sarah.johnson@medical.com",
  //     phone: "+1 (555) 123-4567",
  //     dateOfBirth: "1980-05-15",
  //     address: "123 Medical Center, New York, NY 10001",
  //     // profileImage: "",
  //   },
  //   professionalInfo: {
  //     degree: "MD",
  //     specialization: ["Cardiology", "Internal Medicine"],
  //     doctorLicenseNo: "MED123456",
  //     govtId: "A123456789012",
  //     experience: "12 years",
  //     hospital: "City General Hospital",
  //     department: "Cardiology",
  //     consultationFee: "$150",
  //     languages: ["English", "Spanish", "French"],
  //     bio: "Board-certified cardiologist with 12+ years of experience in treating heart conditions. Specialized in interventional cardiology and preventive care.",
  //   },
  //   education: [
  //     {
  //       id: "edu_001",
  //       degree: "MD",
  //       institution: "Harvard Medical School",
  //       year: "2008-2012",
  //       description: "Doctor of Medicine",
  //     },
  //     {
  //       id: "edu_002",
  //       degree: "Residency",
  //       institution: "Johns Hopkins Hospital",
  //       year: "2012-2015",
  //       description: "Internal Medicine Residency",
  //     },
  //     {
  //       id: "edu_003",
  //       degree: "Fellowship",
  //       institution: "Mayo Clinic",
  //       year: "2015-2017",
  //       description: "Cardiology Fellowship",
  //     },
  //   ],
  //   experience: [
  //     {
  //       id: "exp_001",
  //       position: "Senior Cardiologist",
  //       hospital: "City General Hospital",
  //       duration: "2017-Present",
  //       description: "Lead interventional cardiology department",
  //     },
  //     {
  //       id: "exp_002",
  //       position: "Cardiologist",
  //       hospital: "Mount Sinai Hospital",
  //       duration: "2015-2017",
  //       description: "Specialized in cardiac catheterization",
  //     },
  //   ],
  //   certifications: [
  //     {
  //       id: "cert_001",
  //       name: "Board Certification in Cardiology",
  //       issuer: "American Board of Internal Medicine",
  //       year: "2016",
  //       validUntil: "2026",
  //     },]
  //     {
  //       id: "cert_002",
  //       name: "Advanced Cardiac Life Support (ACLS)",
  //       issuer: "American Heart Association",
  //       year: "2022",
  //       validUntil: "2024",
  //     },
  //     {
  //       id: "cert_003",
  //       name: "Interventional Cardiology Certification",
  //       issuer: "Society for Cardiovascular Angiography",
  //       year: "2018",
  //       validUntil: "2028",
  //     },
  //   ],
  //   // availability: {
  //   //   workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //   //   workingHours: "9:00 AM - 5:00 PM",
  //   //   consultationTypes: ["In-person", "Video Call", "Phone Call"],
  //   //   emergencyContact: "+1 (555) 987-6543",
  //   // },
  //   // statistics: {
  //   //   totalPatients: 1245,
  //   //   successRate: "94.2%",
  //   //   averageRating: 4.8,
  //   //   yearsExperience: 12,
  //   //   monthlyConsultations: 85,
  //   //   patientSatisfaction: "96%",
  //   // },
  //   socialLinks: {
  //     linkedin: "https://linkedin.com/in/drsarahjohnson",
  //     twitter: "https://twitter.com/drsarahj",
  //     researchGate: "https://researchgate.net/profile/sarah_johnson",
  //   },
  // };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // setDoctorProfile(mockDoctorProfile);
      getDoctorData();
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getDoctorData = async() => {
    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 500));

      const data = await apiClient.get("/doctor/profile");

      console.log(data);

      setDoctorData(data.data.doctor);
      if (data.data.docData) {
        setDoctorProfile(data.data.docData);
        // setIsProfileComplete(true);
      }
      // setError(null);
    } catch (err) {
      // setError("Failed to load profile");
      console.error("Profile fetch error:", err);
    } 
  }

  const updateProfile = async(updatedProfile, updatedDoctorData) => {
    setDoctorProfile((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
    const profile = await apiClient.post("/doctor/profile/update", updatedProfile);
    const data = await apiClient.post("/doctor/model/update", updatedDoctorData)

    getDoctorData();
  };

  const value = {
    doctorProfile,
    updateProfile,
    isLoading,
    isEditing,
    setIsEditing,
    activeTab,
    setActiveTab,
    doctorData
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
