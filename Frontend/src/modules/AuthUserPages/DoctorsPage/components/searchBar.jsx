import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FaSearch, FaMapMarkerAlt, FaTimes, FaUserMd, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDoctors } from "../context/DoctorsContext";

// Portal component for dropdown
const DropdownPortal = ({ children, buttonRef }) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [buttonRef]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default function SearchBar({ onSearch }) {
  const { searchDoctors, getSearchSuggestions } = useDoctors();
  const [query, setQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [location, setLocation] = useState("Bangalore");
  const [tempLocation, setTempLocation] = useState("Bangalore");
  const [suggestions, setSuggestions] = useState([]);
  
  const locationButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const locations = [
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
  ];

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close location dropdown
      if (
        locationButtonRef.current &&
        !locationButtonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
      
      // Close search suggestions
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when clicking escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (showLocationDropdown) {
          setShowLocationDropdown(false);
        }
        if (showSearchSuggestions) {
          setShowSearchSuggestions(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showLocationDropdown, showSearchSuggestions]);

  // Handle input change with debounce for suggestions
  useEffect(() => {
    if (query.trim()) {
      const suggestionsList = getSearchSuggestions(query);
      setSuggestions(suggestionsList);
      setShowSearchSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSearchSuggestions(false);
    }
  }, [query, getSearchSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchDoctors(query);
      setShowSearchSuggestions(false);
      if (onSearch) {
        onSearch(query);
      }
    }
  };

  // Handle Enter key in search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setTempLocation(loc);
    setShowLocationDropdown(false);
  };

  const handleQuickSearch = (specialty) => {
    setQuery(specialty);
    searchDoctors(specialty);
    setShowSearchSuggestions(false);
    if (onSearch) {
      onSearch(specialty);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    searchDoctors(suggestion);
    setShowSearchSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      setShowSearchSuggestions(true);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* Search Input with Suggestions */}
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => query.trim() && setShowSearchSuggestions(true)}
                  placeholder="Search doctors, specialties, clinics..."
                  className="w-full pl-12 pr-10 py-4 bg-gray-50 dark:bg-gray-700 
                           text-gray-800 dark:text-white 
                           placeholder-gray-500 dark:placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-[#293379] dark:focus:ring-blue-500
                           rounded-xl text-lg border border-gray-300 dark:border-gray-600
                           hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setShowSearchSuggestions(false);
                      if (onSearch) onSearch("");
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2
                             text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                             transition-colors"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                )}

                {/* Search Suggestions Dropdown */}
                {showSearchSuggestions && suggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 
                             rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 
                             overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Suggestions
                      </p>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 
                                   transition-colors flex items-center gap-3 text-gray-800 dark:text-gray-200"
                        >
                          {suggestion.includes("Dr.") ? (
                            <FaUserMd className="h-4 w-4 text-[#293379]" />
                          ) : (
                            <FaBuilding className="h-4 w-4 text-[#016b61]" />
                          )}
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Location Selector */}
              <div className="relative">
                <button
                  ref={locationButtonRef}
                  type="button"
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-700 
                           text-gray-800 dark:text-white rounded-xl hover:bg-gray-100 
                           dark:hover:bg-gray-600 transition-colors min-w-[200px]
                           border border-gray-300 dark:border-gray-600
                           hover:border-gray-400 dark:hover:border-gray-500
                           focus:outline-none focus:ring-2 focus:ring-[#016b61] dark:focus:ring-green-500
                           relative z-10"
                >
                  <FaMapMarkerAlt className="h-5 w-5 text-[#016b61] dark:text-green-400 flex-shrink-0" />
                  <span className="font-medium truncate">{location}</span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform duration-200 ${showLocationDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={!query.trim()}
                className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform 
                         hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2
                         ${
                           query.trim()
                             ? "bg-gradient-to-r from-[#293379] to-[#016b61] text-white hover:from-[#3a4a9c] hover:to-[#027d70] shadow-lg hover:shadow-xl"
                             : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                         }`}
              >
                <FaSearch className="h-5 w-5" />
                Search
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                Popular searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Dermatologist",
                  "Pediatrician",
                  "Gynecologist/Obstetrician",
                  "General Physician",
                  "Dentist",
                ].map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => handleQuickSearch(specialty)}
                    className="px-4 py-2.5 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 
                               dark:from-blue-900/20 dark:to-indigo-900/20
                               text-[#293379] dark:text-blue-400 
                               rounded-full hover:from-blue-100 hover:to-indigo-100
                               dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30
                               border border-blue-200 dark:border-blue-800
                               hover:border-blue-300 dark:hover:border-blue-700
                               transition-all duration-300 font-medium"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Location Dropdown Portal */}
      {showLocationDropdown && (
        <DropdownPortal buttonRef={locationButtonRef}>
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
                     border border-gray-200 dark:border-gray-700 
                     overflow-hidden"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="Search location..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 
                           text-gray-800 dark:text-white rounded-lg border border-gray-300 
                           dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#016b61]"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {locations
                .filter((loc) =>
                  loc.toLowerCase().includes(tempLocation.toLowerCase()),
                )
                .map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLocationSelect(loc)}
                    className={`w-full text-left px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 
                             transition-colors flex items-center gap-3
                             ${
                               location === loc
                                 ? "bg-gradient-to-r from-[#016b61]/10 to-[#293379]/10 text-[#293379] dark:text-blue-400 font-semibold"
                                 : "text-gray-800 dark:text-gray-200"
                             }`}
                  >
                    <FaMapMarkerAlt
                      className={`h-4 w-4 ${location === loc ? "text-[#016b61]" : "text-gray-400"}`}
                    />
                    <span>{loc}</span>
                    {location === loc && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-[#016b61]" />
                    )}
                  </button>
                ))}
              {locations.filter((loc) =>
                loc.toLowerCase().includes(tempLocation.toLowerCase()),
              ).length === 0 && (
                <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No locations found
                </div>
              )}
            </div>
          </motion.div>
        </DropdownPortal>
      )}
    </>
  );
}