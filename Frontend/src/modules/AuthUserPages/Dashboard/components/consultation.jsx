import React from "react";
import { useNavigate } from "react-router-dom";

import pregnancyImg from "@/assets/static/specialities/pregnancy.png";
import skinImg from "@/assets/static/specialities/skin.png";
import dentalImg from "@/assets/static/specialities/dental.png";
import feverImg from "@/assets/static/specialities/fever.png";
import childImg from "@/assets/static/specialities/child.png";
import mentalImg from "@/assets/static/specialities/mental.png";

const Consultation = () => {
  const navigate = useNavigate();

  const openPage = () => {
    navigate("/all-specializations");
  };

  const openDoctorsPage = () => {
    navigate("/find-doctors");
  };

  const specialties = [
    {
      title: "Period doubts or Pregnancy",
      description: "Expert guidance on menstrual health",
      image: pregnancyImg,
      color: "from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-pink-200 dark:border-pink-900",
    },
    {
      title: "Acne or skin issues",
      description: "Professional advice for clear skin",
      image: skinImg,
      color: "from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-blue-200 dark:border-blue-900",
    },
    {
      title: "Tooth pain or cavity",
      description: "Bleeding gums, bad breath and tooth sensitivity treatment",
      image: dentalImg,
      color: "from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-purple-200 dark:border-purple-900",
    },
    {
      title: "Cold, cough or fever",
      description: "Quick relief for common illnesses",
      image: feverImg,
      color: "from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-green-200 dark:border-green-900",
    },
    {
      title: "Child health",
      description: "Pediatric care for your little ones",
      image: childImg,
      color: "from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-yellow-200 dark:border-yellow-900",
    },
    {
      title: "Mental wellness",
      description:
        "Professional support for stress, anxiety and emotional wellness",
      image: mentalImg,
      color: "from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700",
      borderColor: "border-indigo-200 dark:border-indigo-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Specialties */}
        <div className="mb-16">
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="
          min-w-[260px]
          max-w-[260px]
          bg-white/85 dark:bg-gray-800/85
          backdrop-blur-md
          rounded-3xl
          p-6
          shadow-md
          hover:shadow-2xl
          border border-white/50 dark:border-gray-700
          transition-all duration-300
          hover:-translate-y-2
          group
          flex flex-col items-center text-center
          snap-start
        "
              >
                {/* Illustration Circle */}
                <div
                  className={`w-36 h-36 rounded-full bg-gradient-to-br ${specialty.color}
          border ${specialty.borderColor}
          flex items-center justify-center
          shadow-lg mb-5 overflow-hidden
          group-hover:scale-105 transition-all duration-300`}
                >
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    className="w-32 h-32 object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  {specialty.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                  {specialty.description}
                </p>

                {/* Badge */}
                <button
                  onClick={openDoctorsPage}
                  className="
    mt-5 px-4 py-2 rounded-full
    bg-[#293379]/10 dark:bg-blue-500/10
    text-[#293379] dark:text-blue-300
    text-xs font-semibold
    hover:bg-[#293379] hover:text-white
    dark:hover:bg-blue-600 dark:hover:text-white
    transition-all duration-300
    cursor-pointer
  "
                >
                  Consult Online
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <button
            onClick={openPage}
            className="bg-[#293379] hover:bg-[#1f2b6b]
            dark:bg-blue-700 dark:hover:bg-blue-600
            text-white font-semibold py-4 px-12 rounded-lg
            transition-all duration-300 transform hover:scale-105
            shadow-lg hover:shadow-xl text-lg"
          >
            View All Specialties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Consultation;