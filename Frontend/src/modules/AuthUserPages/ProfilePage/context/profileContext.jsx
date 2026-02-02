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
      if(data.data.userData) {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In real implementation:
      // const response = await axios.put('/api/profile', updates);
      // setProfile(response.data);

      const data = await apiClient.put("/user/profile/update", updates);

      console.log(data);

      setProfile((prev) => ({ ...prev, ...updates }));
      return { success: true };
    } catch (err) {
      setError("Failed to update profile");
      return { success: false, error: err.message };
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
    const response = await apiClient.post("/user/profile/update", profileData);

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
    refreshProfile: fetchProfile, isProfileComplete
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "@/modules/Auth/context/authContext";

// const API_BASE_URL = "http://localhost:3000/api";

// const ProfileContext = createContext();

// export const useProfile = () => {
//   const context = useContext(ProfileContext);
//   if (!context) {
//     throw new Error("useProfile must be used within ProfileProvider");
//   }
//   return context;
// };

// export const ProfileProvider = ({ children }) => {
//   const { user, token } = useAuth(); // Get user data from AuthContext
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isProfileComplete, setIsProfileComplete] = useState(false);

//   // Parse user data from AuthContext
//   const parseUserData = () => {
//     try {
//       if (user) {
//         // If user is a string (from localStorage), parse it
//         if (typeof user === "string") {
//           return JSON.parse(user);
//         }
//         // If it's already an object
//         return user;
//       }
//       return null;
//     } catch (err) {
//       console.error("Error parsing user data:", err);
//       return null;
//     }
//   };

//   // Check if profile is complete
//   const checkProfileCompletion = (profileData) => {
//     if (!profileData) return false;

//     const requiredFields = [
//       "phone",
//       "dateOfBirth",
//       "gender",
//       "bloodGroup",
//       "height",
//       "weight",
//       "emergencyContact",
//     ];

//     const hasEmergencyContact =
//       profileData.emergencyContact &&
//       profileData.emergencyContact.name &&
//       profileData.emergencyContact.phone;

//     // Profile is complete if all required fields are filled
//     const isComplete = requiredFields.every((field) => {
//       if (field === "emergencyContact") {
//         return hasEmergencyContact;
//       }
//       return profileData[field] && profileData[field].toString().trim() !== "";
//     });

//     return isComplete;
//   };

//   // Fetch profile from API
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const userData = parseUserData();

//       if (!userData || !token) {
//         // If no user is logged in, set empty profile
//         setProfile(null);
//         setIsProfileComplete(false);
//         setError(null);
//         return;
//       }

//       try {
//         // Try to fetch profile from API
//         const response = await axios.get(`${API_BASE_URL}/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const profileData = response.data;
//         const complete = checkProfileCompletion(profileData);

//         // Merge with basic user data from auth
//         const fullProfile = {
//           ...userData,
//           ...profileData,
//           isProfileComplete: complete,
//         };

//         setProfile(fullProfile);
//         setIsProfileComplete(complete);
//         setError(null);
//       } catch (apiError) {
//         // If 404 or no profile exists, create minimal profile
//         if (
//           apiError.response?.status === 404 ||
//           apiError.response?.status === 400
//         ) {
//           const minimalProfile = {
//             ...userData,
//             avatar: null,
//             isProfileComplete: false,
//             lastLogin: new Date().toISOString(),
//             accountCreated: userData.createdAt || new Date().toISOString(),
//             // All other fields will be null/undefined initially
//             phone: null,
//             dateOfBirth: null,
//             gender: null,
//             bloodGroup: null,
//             height: null,
//             weight: null,
//             emergencyContact: null,
//             medicalConditions: [],
//             allergies: [],
//             medications: [],
//             appointments: [],
//           };

//           setProfile(minimalProfile);
//           setIsProfileComplete(false);
//           setError(null);
//         } else {
//           throw apiError;
//         }
//       }
//     } catch (err) {
//       console.error("Profile fetch error:", err);
//       setError("Failed to load profile");

//       // Even on error, show minimal user data
//       const userData = parseUserData();
//       if (userData) {
//         setProfile({
//           ...userData,
//           isProfileComplete: false,
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Complete profile with user-entered data
//   const completeProfile = async (profileData) => {
//     try {
//       setLoading(true);

//       const userData = parseUserData();
//       if (!userData || !token) {
//         throw new Error("User not authenticated");
//       }

//       const completeProfileData = {
//         userId: userData.id || userData._id,
//         email: userData.email,
//         ...profileData,
//         completedAt: new Date().toISOString(),
//       };

//       // Send to backend API
//       const response = await axios.post(
//         `${API_BASE_URL}/profile/complete`,
//         completeProfileData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       // Update local state
//       const updatedProfile = {
//         ...userData,
//         ...completeProfileData,
//         isProfileComplete: true,
//       };

//       setProfile(updatedProfile);
//       setIsProfileComplete(true);

//       return {
//         success: true,
//         data: response.data,
//         profile: updatedProfile,
//       };
//     } catch (err) {
//       console.error("Error completing profile:", err);
//       return {
//         success: false,
//         error: err.response?.data?.message || "Failed to save profile",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update specific profile fields
//   const updateProfile = async (updates) => {
//     try {
//       setLoading(true);

//       if (!token) {
//         throw new Error("User not authenticated");
//       }

//       const response = await axios.patch(`${API_BASE_URL}/profile`, updates, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const updatedProfile = {
//         ...profile,
//         ...updates,
//         isProfileComplete: checkProfileCompletion({ ...profile, ...updates }),
//       };

//       setProfile(updatedProfile);
//       setIsProfileComplete(updatedProfile.isProfileComplete);

//       return { success: true, data: response.data };
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upload avatar (simplified version)
//   const updateAvatar = async (avatarUrl) => {
//     try {
//       setLoading(true);

//       if (!token) {
//         throw new Error("User not authenticated");
//       }

//       const response = await axios.patch(
//         `${API_BASE_URL}/profile/avatar`,
//         { avatar: avatarUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       setProfile((prev) => ({
//         ...prev,
//         avatar: avatarUrl,
//       }));

//       return { success: true, data: response.data };
//     } catch (err) {
//       console.error("Error updating avatar:", err);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh profile data
//   const refreshProfile = () => {
//     fetchProfile();
//   };

//   // Initialize when auth changes
//   useEffect(() => {
//     if (user && token) {
//       fetchProfile();
//     } else {
//       setProfile(null);
//       setLoading(false);
//       setIsProfileComplete(false);
//     }
//   }, [user, token]);

//   const value = {
//     profile,
//     loading,
//     error,
//     isProfileComplete,
//     updateProfile,
//     completeProfile,
//     updateAvatar,
//     refreshProfile,
//     fetchProfile,
//   };

//   return (
//     <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
//   );
// };
