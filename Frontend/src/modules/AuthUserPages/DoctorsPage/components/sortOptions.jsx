import { FaSort, FaStar, FaClock, FaMoneyBillWave, FaFire } from "react-icons/fa";
import { useDoctors } from "../context/DoctorsContext";

export default function SortOptions() {
  const { sortBy, updateSort } = useDoctors();

  const sortOptions = [
    { id: "relevance", label: "Relevance", icon: <FaFire /> },
    { id: "rating", label: "Rating", icon: <FaStar /> },
    { id: "experience", label: "Experience", icon: <FaClock /> },
    { id: "fee_low", label: "Fee: Low to High", icon: <FaMoneyBillWave /> },
    { id: "fee_high", label: "Fee: High to Low", icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaSort className="h-5 w-5 text-[#293379] dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Sort By
        </h3>
      </div>

      <div className="space-y-2">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => updateSort(option.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${sortBy === option.id
                ? "bg-gradient-to-r from-[#293379]/20 to-[#016b61]/20 dark:from-[#293379]/30 dark:to-[#016b61]/30 text-[#293379] dark:text-blue-400 border border-[#293379]/20 dark:border-blue-900/30"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <div className={`p-2 rounded-lg ${sortBy === option.id
                ? "bg-[#293379] text-white dark:bg-blue-600"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
              {option.icon}
            </div>
            <span className="font-medium">{option.label}</span>
            {sortBy === option.id && (
              <div className="ml-auto h-2 w-2 rounded-full bg-[#016b61]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}