import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const primaryColor = "#293379";
  const floatingBoxColor = "#1a2059";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-6 sm:px-8 lg:px-16 mt-15 transition-colors duration-300">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="max-w-2xl text-gray-900 dark:text-gray-100 space-y-8 transition-colors duration-300">
          {/* Header with Badge */}
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your Personal
              <span className="block bg-clip-text text-transparent font-bold bg-[#293379] dark:bg-blue-400">
                Health Companion
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-light transition-colors duration-300">
              Experience the future of healthcare with Curomate. Our intelligent
              platform streamlines medical appointments, provides smart
              medication reminders, and keeps your health journey organized and
              stress-free.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Instant Medical Consultation",
                "Smart Appointment Scheduling",
                "Medication Reminders",
                "Health Progress Tracking",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center "
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#293379] dark:bg-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            {/* Curomate New Banner */}
            <div className="text-center mt-2">
              <Link to="/chat">
                <span className="text-2xl lg:text-3xl font-extrabold text-[#293379] dark:text-blue-400 cursor-pointer">
                  Avail your Curomate today!
                </span>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-2xl font-bold mb-1 text-[#293379] dark:text-blue-400">
                  24/7
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Always Available
                </div>
                <div
                  className="w-8 h-0.5 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>

              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-2xl font-bold mb-1 text-[#293379] dark:text-blue-400">
                  99.9%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  Medical Accuracy
                </div>
                <div
                  className="w-8 h-0.5 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Enhanced Dashboard */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-96 h-96">
            {/* Improved Background Orb */}
            <div
              className="absolute inset-0 rounded-full filter blur-2xl dark:opacity-55 opacity-30 transition-opacity duration-500"
              style={{
                background: `radial-gradient(closest-side, ${primaryColor}30, transparent 40%)`,
              }}
            />

            {/* Main Dashboard Card */}
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-3xl p-8 shadow-xl z-10 transition-colors duration-300">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-8">
                <div
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: primaryColor }}
                >
                  <span className="dark:text-blue-300 transition-colors duration-300">
                    Health Dashboard
                  </span>
                </div>
              </div>

              {/* Enhanced Dashboard Grid */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  {
                    img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
                    label: "Consult",
                    stat: "12 Today",
                  },
                  {
                    img: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
                    label: "Meds",
                    stat: "3 Pending",
                  },
                  {
                    img: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
                    label: "Schedule",
                    stat: "5 Upcoming",
                  },
                  {
                    img: "https://cdn-icons-png.flaticon.com/512/3373/3373480.png",
                    label: "Reports",
                    stat: "12 Reports",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer group relative overflow-hidden
                      bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm
                      hover:shadow-md hover:scale-[1.03] dark:hover:border-blue-500"
                  >
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}08, ${primaryColor}04)`,
                      }}
                    />

                    <div className="relative z-10">
                      <div className="mb-3 flex justify-center">
                        <div className="p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                          <img
                            src={item.img}
                            alt={item.label}
                            className="w-8 h-8 object-contain"
                            style={{
                              filter:
                                "drop-shadow(0 6px 12px rgba(0,0,0,0.12))",
                            }}
                          />
                        </div>
                      </div>

                      <div className="text-gray-800 dark:text-gray-100 text-sm font-semibold mb-1 transition-colors duration-300">
                        {item.label}
                      </div>

                      <div className="text-xs font-medium text-[#293379] dark:text-blue-400 transition-colors duration-300">
                        {item.stat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl rotate-12 transform transition-all duration-500 z-0
                dark:mix-blend-screen mix-blend-multiply"
              style={{
                background: `linear-gradient(180deg, ${floatingBoxColor}, rgba(26,32,89,0.6))`,
                // filter: "blur(14px)",
                opacity: "1",
                boxShadow: `0 20px 50px ${floatingBoxColor}40`,
              }}
            />

            <div
              className="absolute -bottom-8 -left-8 w-20 h-20 rounded-2xl -rotate-12 transform transition-all duration-700 z-0
                dark:mix-blend-screen mix-blend-multiply"
              style={{
                background: `linear-gradient(180deg, rgba(26,32,89,0.85), rgba(26,32,89,0.6))`,
                // filter: "blur(12px)",
                opacity: "1",
                boxShadow: `0 16px 40px ${floatingBoxColor}40`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
