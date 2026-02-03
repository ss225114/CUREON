import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
import apiClient from "@/lib/apiClient";
// import { i } from "framer-motion/dist/types.d-BJcRxCew";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

const parseUserData = () => {
  try {
    if (user) {
      // If user is a string (from localStorage), parse it
      if (typeof user === "string") {
        return JSON.parse(user);
      }
      // If it's already an object
      return user;
    }
    return null;
  } catch (err) {
    console.error("Error parsing user data:", err);
    return null;
  }
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  // Mock user data - replace with API call
  // const mockUserData = {
  //   id: "1",
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   phone: "+1 (555) 123-4567",
  //   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  //   dateOfBirth: "1990-05-15",
  //   gender: "Male",
  //   bloodGroup: "O+",
  //   height: "175 cm",
  //   weight: "70 kg",
  //   emergencyContact: {
  //     name: "Jane Smith",
  //     phone: "+1 (555) 987-6543",
  //     relationship: "Spouse",
  //   },
  //   medicalConditions: ["Hypertension", "Asthma"],
  //   allergies: ["Penicillin", "Peanuts"],
  //   medications: [
  //     { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
  //     { name: "Ventolin", dosage: "100mcg", frequency: "As needed" },
  //   ],
  //   appointments: [
  //     {
  //       id: 1,
  //       doctor: "Dr. Smith",
  //       date: "2024-12-20",
  //       time: "10:00 AM",
  //       type: "Follow-up",
  //     },
  //     {
  //       id: 2,
  //       doctor: "Dr. Johnson",
  //       date: "2024-12-25",
  //       time: "2:30 PM",
  //       type: "Check-up",
  //     },
  //   ],
  //   lastLogin: "2024-12-01 14:30",
  //   accountCreated: "2023-01-15",
  // };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = await apiClient.get("/user/profile");

      // In real implementation:
      // const response = await axios.get('/api/profile');
      // setProfile(response.data);

      console.log(data);

      setProfile(data.data);
      if (data.data.userData) {
        setIsProfileComplete(true);
      }
      setError(null);
    } catch (err) {
      setError("Failed to load profile");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // const updateProfile = async (updates) => {
  //   try {
  //     setLoading(true);
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     // In real implementation:
  //     // const response = await axios.put('/api/profile', updates);
  //     // setProfile(response.data);

  //     const data = await apiClient.put("/user/profile/update", updates);

  //     console.log(data);

  //     setProfile((prev) => ({ ...prev, ...updates }));
  //     return { success: true };
  //   } catch (err) {
  //     setError("Failed to update profile");
  //     return { success: false, error: err.message };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);

      console.log("📤 updateProfile payload:", updates);

      const res = await apiClient.post("/user/profile/update", updates);

      console.log("✅ Backend response:", res.data);

      setProfile(res.data);

      // 🔁 REFRESH PROFILE FROM SERVER
      // await fetchProfile();

      return { success: true };
    } catch (err) {
      console.error("❌ Update profile error:", err);
      setError("Failed to update profile");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateAvatar = async (avatarUrl) => {
    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProfile((prev) => ({ ...prev, avatar: avatarUrl }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const completeProfile = async (profileData) => {
    try {
      setLoading(true);

      console.log("Complete profile payload:", profileData);

      // Send to backend via SAME update API
      const response = await apiClient.post(
        "/user/profile/update",
        profileData,
      );

      console.log("Backend response:", response.data);

      // Update local state with backend data
      setProfile(response.data.data);
      setIsProfileComplete(true);

      return { success: true };
    } catch (err) {
      console.error("Complete profile error:", err);
      setError("Failed to complete profile");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update local state
  // const updatedProfile = {
  //   ...userData,
  //   ...completeProfileData,
  //   isProfileComplete: true,
  // };

  useEffect(() => {
    fetchProfile();
  }, []);

  const value = {
    profile,
    loading,
    error,
    updateProfile,
    completeProfile,
    updateAvatar,
    refreshProfile: fetchProfile,
    isProfileComplete,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
