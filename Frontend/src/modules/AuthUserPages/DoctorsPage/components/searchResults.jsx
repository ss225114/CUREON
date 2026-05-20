import React from "react";
import { useDoctors } from "../context/DoctorsContext";
import DoctorCard from "./DoctorCard";
import { FaSearch, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa";

export default function SearchResults() {
  const { doctors, loading, error, searchQuery, refreshDoctors, filters } = useDoctors();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <div className="h-16 w-16 border-4 border-[#293379] dark:border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Finding best doctors for you...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16">
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <FaExclamationTriangle className="h-16 w-16 text-red-500 dark:text-red-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md">
          {error}
        </p>
        <button
          onClick={() => refreshDoctors(searchQuery)}
          className="px-8 py-3 bg-[#293379] dark:bg-blue-700 hover:bg-[#3a4a9c] dark:hover:bg-blue-600 
                   text-white rounded-xl flex items-center gap-3 font-medium transition-colors"
        >
          <FaSyncAlt />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#293379] dark:text-white">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Recommended Doctors"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {doctors.length} doctors found {(filters.location === "Others" || filters.location === "") ? "" : "in " + filters.location}
          </p>
        </div>

        <button
          onClick={() => refreshDoctors(searchQuery)}
          className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                   rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors 
                   flex items-center gap-2 font-medium"
        >
          <FaSyncAlt />
          Refresh Results
        </button>
      </div>

      {/* Main Content - Doctor Cards */}
      <div>
        {doctors.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
              <FaSearch className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : "No doctors found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              We couldn't find any doctors matching your search criteria. Try
              adjusting your search terms or browse our popular specialties.
            </p>
            <button
              onClick={() => refreshDoctors()}
              className="px-8 py-3 bg-gradient-to-r from-[#016b61] to-[#293379] 
                       hover:from-[#027d70] hover:to-[#3a4a9c] 
                       text-white rounded-xl font-semibold transition-all duration-300
                       shadow-lg hover:shadow-xl"
            >
              Browse All Doctors
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {/* {doctors.length > 0 && (
          <div className="mt-12 text-center">
            <button
              className="px-10 py-4 bg-gradient-to-r from-[#293379]/10 to-[#016b61]/10 
                             hover:from-[#293379]/20 hover:to-[#016b61]/20 
                             text-[#293379] dark:text-blue-400 
                             rounded-xl font-semibold transition-all duration-300
                             border border-[#293379]/20 dark:border-blue-900/30
                             hover:border-[#293379]/40 dark:hover:border-blue-900/50
                             text-lg"
            >
              Show more doctors near me
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}