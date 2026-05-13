import apiClient from "@/lib/apiClient";
import React, { createContext, useContext, useState, useEffect } from "react";

const DoctorsContext = createContext();

export const useDoctors = () => {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error("useDoctors must be used within DoctorsProvider");
  }
  return context;
};

export const DoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState({
    gender: "",
    minFee: 100,
    maxFee: "",
    minRating: "",
    location: "",
    name: "",
    specialization: "",
    useSimilarity: false,
  });

  // Mock data
  // const mockDoctors = [
  //   {
  //     id: 1,
  //     name: "Dr. K.A. Mohan",
  //     specialization: "Dentist",
  //     experience: "57 years experience overall",
  //     location: "Domlur, Bangalore",
  //     clinic: "Dental DeCare",
  //     availability: "Available Today",
  //     fee: "500",
  //     rating: 93,
  //     patientStories: 76,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrMohan",
  //     gender: "Male",
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Sumanth Shetty",
  //     specialization: "Dentist",
  //     experience: "27 years experience overall",
  //     location: "Koramangala, Bangalore",
  //     clinic: "Chisel Dental",
  //     availability: "Available Today",
  //     fee: "300",
  //     rating: 96,
  //     patientStories: 4779,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrShetty",
  //     gender: "Male",
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Priya Sharma",
  //     specialization: "Dermatologist",
  //     experience: "15 years experience overall",
  //     location: "Indiranagar, Bangalore",
  //     clinic: "Skin Care Clinic",
  //     availability: "Available Tomorrow",
  //     fee: "700",
  //     rating: 94,
  //     patientStories: 1200,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrPriya",
  //     gender: "Female",
  //   },
  //   {
  //     id: 4,
  //     name: "Dr. Arjun Reddy",
  //     specialization: "Pediatrician",
  //     experience: "22 years experience overall",
  //     location: "Whitefield, Bangalore",
  //     clinic: "Kids Health Center",
  //     availability: "Available Today",
  //     fee: "600",
  //     rating: 95,
  //     patientStories: 2500,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrArjun",
  //     gender: "Male",
  //   },
  //   {
  //     id: 5,
  //     name: "Dr. Anjali Mehta",
  //     specialization: "Gynecologist/Obstetrician",
  //     experience: "18 years experience overall",
  //     location: "JP Nagar, Bangalore",
  //     clinic: "Women's Wellness Center",
  //     availability: "Available Today",
  //     fee: "800",
  //     rating: 97,
  //     patientStories: 3200,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrAnjali",
  //     gender: "Female",
  //   },
  //   {
  //     id: 6,
  //     name: "Dr. Rajesh Kumar",
  //     specialization: "General Physician",
  //     experience: "35 years experience overall",
  //     location: "HSR Layout, Bangalore",
  //     clinic: "City Health Clinic",
  //     availability: "Available Tomorrow",
  //     fee: "400",
  //     rating: 92,
  //     patientStories: 1800,
  //     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrRajesh",
  //     gender: "Male",
  //   },
  // ];

  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    // Trigger search with filters
    fetchDoctors(searchQuery, updated);
  };

  const sortDoctors = (docs, sortType) => {
    let sorted = [...docs];

    switch (sortType) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;

      // case "experience":
      //   sorted.sort((a, b) => {
      //     const expA = parseInt(a.experience);
      //     const expB = parseInt(b.experience);
      //     return expB - expA;
      //   });
      //   break;

      case "fee_low":
        sorted.sort((a, b) => Number(a.consultationFee) - Number(b.consultationFee));
        break;

      case "fee_high":
        sorted.sort((a, b) => Number(b.consultationFee) - Number(a.consultationFee));
        break;

      // case "relevance":
      default:
        // keep original order (or later ML ranking)
        break;
    }

    return sorted;
  };

  const updateSort = (sortType) => {
    setSortBy(sortType);

    // re-fetch with new sort
    fetchDoctors(searchQuery, filters, sortType);
  };

  // const getDoctors = async() => {
  //   const data = await apiClient.get("/feature/all-doctors");

  //   return data.data;
  // }

  // Get search suggestions (for dropdown)
  
  const getSearchSuggestions = async(query) => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions = new Set();

    // const docs = await getDoctors();

    // docs.forEach((doctor) => {
    //   // if (doctor.specialization.toLowerCase().includes(lowerQuery)) {
    //   //   suggestions.add(doctor.specialization);
    //   // }
    //   if (doctor.fullName.toLowerCase().includes(lowerQuery)) {
    //     suggestions.add(doctor.fullName);
    //   }
    //   // if (doctor.clinic.toLowerCase().includes(lowerQuery)) {
    //   //   suggestions.add(doctor.clinic);
    //   // }
    // });

    // Add common specialties
    const commonSpecialties = [
      "Dermatology",
      "Pediatrics",
      "Gynecology",
      "General Physician",
      "Dentistry",
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Psychiatry",
    ];

    commonSpecialties.forEach((specialty) => {
      if (specialty.toLowerCase().includes(lowerQuery)) {
        suggestions.add(specialty);
      }
    });

    return Array.from(suggestions).slice(0, 5); // Return top 5 suggestions
  };

  const fetchDoctors = async (
    query,
    activeFilters = filters,
    activeSort = sortBy,
  ) => {
    try {
      setLoading(true);
      setSearchQuery(query);

      // 🔹 Build payload for backend
      const payload = {
        specialization: activeFilters.specialization || "",
        name: activeFilters.name || "",
        location: activeFilters.location === "Others" ? "" : activeFilters.location,
        minFee: activeFilters.minFee,
        maxFee: activeFilters.maxFee,
        minRating: activeFilters.minRating,
        gender: activeFilters.gender || "",
        useSimilarity: activeFilters.useSimilarity,
      };

      console.log("API Payload:", payload);

      // 🔹 API call
      const data = await apiClient.post("/feature/find-doctors", payload);

      console.log(data);

      // 🔹 Apply frontend sort (optional)
      const sorted = sortDoctors(data.data, activeSort);

      setFilteredDoctors(sorted);
      setDoctors(data.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const searchDoctors = (query) => {
    fetchDoctors(query);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors: filteredDoctors,
    loading,
    error,
    searchQuery,
    searchDoctors,
    refreshDoctors: fetchDoctors,
    getSearchSuggestions,
    filters,
    updateFilters,
    sortBy,
    updateSort,
    setSearchQuery,
  };

  return (
    <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>
  );
};

// Filter doctors for main search

// const fetchDoctors = async (query = "") => {
//   try {
//     setLoading(true);
//     setSearchQuery(query);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const filtered = filterDoctors(query);
//     setFilteredDoctors(filtered);
//     setDoctors(mockDoctors);
//     setError(null);
//   } catch (err) {
//     setError("Failed to load doctors");
//     console.error("Doctors fetch error:", err);
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchDoctors = async (query = "", activeFilters = filters) => {
//   try {
//     setLoading(true);
//     setSearchQuery(query);

//     await new Promise((resolve) => setTimeout(resolve, 500));

//     let filtered = filterDoctors(query);

//     // 🔥 Apply filters
//     if (activeFilters.gender.length > 0) {
//       filtered = filtered.filter((doc) =>
//         activeFilters.gender.includes(doc.gender),
//       );
//     }

//     if (activeFilters.minFee) {
//       filtered = filtered.filter(
//         (doc) => Number(doc.fee) >= Number(activeFilters.minFee),
//       );
//     }

//     if (activeFilters.maxFee) {
//       filtered = filtered.filter(
//         (doc) => Number(doc.fee) <= Number(activeFilters.maxFee),
//       );
//     }

//     setFilteredDoctors(filtered);
//     setDoctors(mockDoctors);
//     setError(null);
//   } catch (err) {
//     setError("Failed to load doctors");
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchDoctors = async (
//   query = "",
//   activeFilters = filters,
//   activeSort = sortBy,
// ) => {
//   try {
//     setLoading(true);
//     setSearchQuery(query);

//     await new Promise((resolve) => setTimeout(resolve, 500));

//     let filtered = filterDoctors(query);

//     // 🔹 Apply filters (if added earlier)
//     if (activeFilters?.gender?.length > 0) {
//       filtered = filtered.filter((doc) =>
//         activeFilters.gender.includes(doc.gender),
//       );
//     }

//     // 🔥 APPLY SORT HERE
//     const sorted = sortDoctors(filtered, activeSort);

//     setFilteredDoctors(sorted);
//     setDoctors(mockDoctors);
//     setError(null);
//   } catch (err) {
//     setError("Failed to load doctors");
//   } finally {
//     setLoading(false);
//   }
// };
