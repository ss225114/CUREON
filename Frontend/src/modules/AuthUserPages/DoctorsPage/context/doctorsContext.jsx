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

  // Mock data
  const mockDoctors = [
    {
      id: 1,
      name: "Dr. K.A. Mohan",
      specialization: "Dentist",
      experience: "57 years experience overall",
      location: "Domlur, Bangalore",
      clinic: "Dental DeCare",
      availability: "Available Today",
      fee: "500",
      rating: 93,
      patientStories: 76,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrMohan",
      gender: "Male",
    },
    {
      id: 2,
      name: "Dr. Sumanth Shetty",
      specialization: "Dentist",
      experience: "27 years experience overall",
      location: "Koramangala, Bangalore",
      clinic: "Chisel Dental",
      availability: "Available Today",
      fee: "300",
      rating: 96,
      patientStories: 4779,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrShetty",
      gender: "Male",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      experience: "15 years experience overall",
      location: "Indiranagar, Bangalore",
      clinic: "Skin Care Clinic",
      availability: "Available Tomorrow",
      fee: "700",
      rating: 94,
      patientStories: 1200,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrPriya",
      gender: "Female",
    },
    {
      id: 4,
      name: "Dr. Arjun Reddy",
      specialization: "Pediatrician",
      experience: "22 years experience overall",
      location: "Whitefield, Bangalore",
      clinic: "Kids Health Center",
      availability: "Available Today",
      fee: "600",
      rating: 95,
      patientStories: 2500,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrArjun",
      gender: "Male",
    },
    {
      id: 5,
      name: "Dr. Anjali Mehta",
      specialization: "Gynecologist/Obstetrician",
      experience: "18 years experience overall",
      location: "JP Nagar, Bangalore",
      clinic: "Women's Wellness Center",
      availability: "Available Today",
      fee: "800",
      rating: 97,
      patientStories: 3200,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrAnjali",
      gender: "Female",
    },
    {
      id: 6,
      name: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      experience: "35 years experience overall",
      location: "HSR Layout, Bangalore",
      clinic: "City Health Clinic",
      availability: "Available Tomorrow",
      fee: "400",
      rating: 92,
      patientStories: 1800,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrRajesh",
      gender: "Male",
    },
  ];

  // Get search suggestions (for dropdown)
  const getSearchSuggestions = (query = "") => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions = new Set();

    mockDoctors.forEach((doctor) => {
      if (doctor.specialization.toLowerCase().includes(lowerQuery)) {
        suggestions.add(doctor.specialization);
      }
      if (doctor.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(doctor.name);
      }
      if (doctor.clinic.toLowerCase().includes(lowerQuery)) {
        suggestions.add(doctor.clinic);
      }
    });

    // Add common specialties
    const commonSpecialties = [
      "Dermatologist",
      "Pediatrician",
      "Gynecologist",
      "General Physician",
      "Dentist",
      "Cardiologist",
      "Neurologist",
      "Orthopedic",
      "Psychiatrist",
    ];

    commonSpecialties.forEach((specialty) => {
      if (specialty.toLowerCase().includes(lowerQuery)) {
        suggestions.add(specialty);
      }
    });

    return Array.from(suggestions).slice(0, 5); // Return top 5 suggestions
  };

  // Filter doctors for main search
  const filterDoctors = (query = "") => {
    if (!query.trim()) {
      return mockDoctors;
    }

    const lowerQuery = query.toLowerCase();
    return mockDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(lowerQuery) ||
        doctor.specialization.toLowerCase().includes(lowerQuery) ||
        doctor.location.toLowerCase().includes(lowerQuery) ||
        doctor.clinic.toLowerCase().includes(lowerQuery),
    );
  };

  const fetchDoctors = async (query = "") => {
    try {
      setLoading(true);
      setSearchQuery(query);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filtered = filterDoctors(query);
      setFilteredDoctors(filtered);
      setDoctors(mockDoctors);
      setError(null);
    } catch (err) {
      setError("Failed to load doctors");
      console.error("Doctors fetch error:", err);
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
  };

  return (
    <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>
  );
};