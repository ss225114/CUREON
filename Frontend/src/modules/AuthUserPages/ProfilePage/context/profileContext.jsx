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
      if (typeof user === "string") {
        return JSON.parse(user);
      }
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


  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = await apiClient.get("/user/profile");

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

// const updateAvatar = async (formData) => {
//   try {
//     const response = await fetch('/api/users/avatar', {
//       method: 'POST',
//       headers: {
//         // Don't set Content-Type header - let browser set it with boundary
//         'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your auth token
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Upload failed');
//     }

//     const data = await response.json();
    
//     // Update local state with new avatar URL
//     setProfile(prev => ({
//       ...prev,
//       avatar: data.avatarUrl
//     }));

//     return { 
//       success: true, 
//       avatarUrl: data.avatarUrl,
//       message: data.message 
//     };
//   } catch (error) {
//     console.error('Avatar upload error:', error);
//     return { 
//       success: false, 
//       message: error.message 
//     };
//   }
// };

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
