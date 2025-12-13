import React from "react";

const Services = () => {
  const services = [
    {
      title: "Find Doctors",
      description: "Book appointments with top specialists near you",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      stats: "Connect within 60 seconds",
      buttonText: "Book Now",
      bgColor: "bg-blue-50 dark:bg-gray-800/50",
    },
    {
      title: "Lab Tests",
      description: "Safe and trusted lab tests with accurate results",
      image:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      stats: "Home collection available",
      buttonText: "Get Tested",
      bgColor: "bg-green-50 dark:bg-gray-800/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight transition-colors duration-300">
            Our Premium Healthcare Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Access world-class healthcare solutions from the comfort of your
            home.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative rounded-3xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ${service.bgColor}`}
            >
              <div className="relative p-6 sm:p-8 flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed flex-1 text-sm sm:text-base transition-colors duration-300">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-[#293379] dark:bg-blue-400 rounded-full" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    {service.stats}
                  </span>
                </div>

                {/* Button */}
                <button className="w-full bg-[#293379] hover:bg-[#1f2a63] dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base">
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    {service.buttonText}
                    <span className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20 lg:mt-24 px-2">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-6 sm:px-10 py-6 sm:py-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#293379] dark:bg-blue-400 rounded-full" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base transition-colors duration-300">
                24/7 Available Support
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#293379] dark:bg-blue-400 rounded-full" />
              <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base transition-colors duration-300">
                100% Secure & Confidential
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
