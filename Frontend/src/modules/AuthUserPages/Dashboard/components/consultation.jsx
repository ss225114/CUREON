import React from "react";

const Consultation = () => {
  const specialties = [
    {
      title: "Period doubts or Pregnancy",
      description: "Expert guidance on menstrual health",
      icon: "🩺",
      color: "from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-pink-200 dark:border-pink-900",
    },
    {
      title: "Acne or skin issues",
      description: "Professional advice for clear skin",
      icon: "🔬",
      color: "from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-blue-200 dark:border-blue-900",
    },
    {
      title: "Tooth pain or cavity",
      description: "Bleeding gums issue Bad breath Tooth sensitivity pain",
      icon: "💊",
      color: "from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-purple-200 dark:border-purple-900",
    },
    {
      title: "Cold, cough or fever",
      description: "Quick relief for common illnesses",
      icon: "🌡",
      color: "from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-green-200 dark:border-green-900",
    },
    {
      title: "Child health",
      description: "Pediatric care for your little ones",
      icon: "👶",
      color: "from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-yellow-200 dark:border-yellow-900",
    },
    {
      title: "Mental wellness",
      description: "Support for depression & anxiety",
      icon: "🧠",
      color: "from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-indigo-200 dark:border-indigo-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            Consult Top Doctors Online for{" "}
            <span className="text-[#293379] dark:text-blue-300">
              Any Health Concern
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Private online consultations with verified doctors in all
            specialties
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Circular Card */}
              <div
                className={`w-36 h-36 bg-gradient-to-br ${specialty.color} rounded-full shadow-md hover:shadow-lg border ${specialty.borderColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105`}
              >
                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {specialty.icon}
                </div>
              </div>

              {/* Text Section */}
              <div className="px-2">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 leading-tight min-h-[40px] flex items-center justify-center transition-colors duration-300">
                  {specialty.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight transition-colors duration-300">
                  {specialty.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <button
            className="bg-[#293379] hover:bg-[#1f2b6b] dark:bg-blue-700 dark:hover:bg-blue-600 
                           text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 
                           transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
          >
            View All Specialties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
