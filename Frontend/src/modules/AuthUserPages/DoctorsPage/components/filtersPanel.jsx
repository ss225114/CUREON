import { FaFilter, FaUser, FaClock, FaComment, FaCalendarCheck } from "react-icons/fa";
import { useDoctors } from "../context/DoctorsContext";

export default function FiltersPanel() {
  const { filters, updateFilters } = useDoctors();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaFilter className="h-5 w-5 text-[#293379] dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h3>
      </div>

      <div className="space-y-6">
        {/* Gender Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaUser className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Gender
            </h4>
          </div>
          <div className="space-y-2">
            {["", "Male", "Female"].map((gender) => (
              <button
                key={gender || "all"}
                onClick={() => updateFilters({ gender: gender === filters.gender ? "" : gender })}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filters.gender === gender
                    ? "bg-[#293379] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {gender || "All Genders"}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaClock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Experience
            </h4>
          </div>
          <div className="space-y-2">
            {["", "5", "10", "15", "20"].map((exp) => (
              <button
                key={exp || "any"}
                onClick={() => updateFilters({ experience: exp === filters.experience ? "" : exp })}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filters.experience === exp
                    ? "bg-[#016b61] text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {exp ? `${exp}+ years` : "Any Experience"}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Stories Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaComment className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Patient Stories
            </h4>
          </div>
          <button
            onClick={() => updateFilters({ patientStories: !filters.patientStories })}
            className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${filters.patientStories
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            <span>100+ Patient Stories</span>
            <div className={`h-4 w-4 rounded border ${filters.patientStories
                ? "bg-[#293379] border-[#293379]"
                : "border-gray-400 dark:border-gray-500"
              }`}>
              {filters.patientStories && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Availability Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaCalendarCheck className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Availability
            </h4>
          </div>
          <button
            onClick={() => updateFilters({ availability: !filters.availability })}
            className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${filters.availability
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            <span>Available Today</span>
            <div className={`h-4 w-4 rounded border ${filters.availability
                ? "bg-[#016b61] border-[#016b61]"
                : "border-gray-400 dark:border-gray-500"
              }`}>
              {filters.availability && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Clear All Button */}
        <button
          onClick={() => updateFilters({
            gender: "",
            experience: "",
            patientStories: false,
            availability: false,
          })}
          className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 
                   text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 
                   dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}