import React, { useState } from "react";
import { motion } from "framer-motion";
import { DoctorsProvider } from "./context/DoctorsContext";
import DoctorsHeader from "./components/DoctorsHeader";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

// Main Content Component
function DoctorsContent() {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = () => {
    setShowSearchResults(true);
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById("search-results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden pb-8">
        <DoctorsHeader />
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Results Section */}
      <div id="search-results">
        {showSearchResults ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SearchResults />
          </motion.div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#293379] dark:text-white mb-6">
                Find Your Perfect Doctor
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                Search for doctors by name, specialty, or location. Use filters
                to narrow down your search and find the right healthcare
                professional for your needs.
              </p>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-[#293379] dark:text-blue-400 mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Verified Doctors
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-[#016b61] dark:text-green-400 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Availability
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    95%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Patient Satisfaction
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-3xl font-bold text-center text-[#293379] dark:text-white mb-12">
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Search & Filter",
                    description:
                      "Find doctors by specialty, location, availability, and ratings",
                    color: "from-[#293379] to-blue-600",
                  },
                  {
                    step: "02",
                    title: "Compare & Choose",
                    description:
                      "View detailed profiles, patient reviews, and consultation fees",
                    color: "from-[#016b61] to-green-600",
                  },
                  {
                    step: "03",
                    title: "Book Instantly",
                    description: "Secure your appointment with no booking fees",
                    color: "from-purple-600 to-pink-600",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
                    <div className="relative bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full">
                      <div
                        className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r ${item.color} text-white text-2xl font-bold mb-6`}
                      >
                        {item.step}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-[#293379] to-[#016b61] 
                           text-white font-semibold rounded-xl hover:from-[#3a4a9c] 
                           hover:to-[#027d70] transition-all duration-300 transform 
                           hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl
                           text-lg"
                >
                  Start Searching for Doctors
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <footer className="bg-[#293379] dark:bg-gray-900 backdrop-blur-md text-white/90 p-8 mt-auto shadow-inner transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section — Brand + Motto */}
          <div>
            <h2 className="text-xl font-bold mb-2">Cureon</h2>
            <p className="text-white/70 dark:text-gray-300 text-sm">
              Empowering your medical health journey with care, technology, and
              compassion, one step at-a-time.
            </p>
            <p className="text-white/60 dark:text-gray-400 text-xs mt-3">
              Designed with{" "}
              <i className="fa-solid fa-heart text-[#fa003f] dark:text-red-400"></i>{" "}
              for your health
            </p>
          </div>

          {/* Right Section — Contact + Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-white/80 dark:text-gray-300">
              <i className="fa-solid fa-mobile"></i> +91 00000 00000
            </p>
            <p className="text-sm text-white/80 dark:text-gray-300">
              <i className="fa-solid fa-envelope"></i> support@cureon.com
            </p>
            <p className="text-sm text-white/80 dark:text-gray-300">
              <i className="fa-solid fa-location-dot"></i> 123 Health Street,
              Kolkata, India
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-3 mt-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-black transition-all duration-300"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] transition-all duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Policy Links Row */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 dark:text-gray-300 mt-10">
          <a
            href="#"
            className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-[#fa003f] dark:hover:text-red-400 transition-colors"
          >
            Cookie Policy
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 dark:border-gray-600 mt-1 pt-3 text-center text-white/70 dark:text-gray-400 text-xs">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Cureon</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Main Export
export default function DoctorsPage() {
  return (
    <DoctorsProvider>
      <DoctorsContent />
    </DoctorsProvider>
  );
}