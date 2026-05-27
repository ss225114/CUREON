import React, { useEffect, useMemo, useState } from "react";
import SpecialtyCard from "./components/SpecialtyCard";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/apiClient";
const CATEGORIES = [
  { label: "All", path: "/specialties/all" },
  { label: "Women's health", path: "/specialties/womens-health" },
  { label: "Skin & hair", path: "/specialties/skin-hair" },
  { label: "Mental health", path: "/specialties/mental-health" },
  { label: "Child health", path: "/specialties/child-health" },
  { label: "Heart & lungs", path: "/specialties/heart-lungs" },
  { label: "Bone & joints", path: "/specialties/bone-joints" },
  { label: "Eyes & ENT", path: "/specialties/eyes-ent" },
];

const SPECIALTIES = [
  {
    icon: "🌿",
    name: "Ayurveda",
    desc: "Herbal medicine, holistic healing, wellness",
    rating: "4.7",
    reviews: "1.2K",
    modes: ["Video", "Chat", "In-clinic"],
    iconBgL: "bg-lime-100",
    iconBgD: "bg-lime-900",
    category: "All",
  },
  {
    icon: "❤️",
    name: "Cardiology",
    desc: "Heart health, BP, cholesterol",
    rating: "4.8",
    reviews: "980",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-red-100",
    iconBgD: "bg-red-900",
    category: "Heart & lungs",
  },
  {
    icon: "🦷",
    name: "Dentistry",
    desc: "Tooth pain, cleaning, oral care",
    rating: "4.7",
    reviews: "1.5K",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-cyan-100",
    iconBgD: "bg-cyan-900",
    category: "All",
  },
  {
    icon: "🌿",
    name: "Dermatology",
    desc: "Acne, rashes, pigmentation, eczema",
    rating: "4.8",
    reviews: "2.8K",
    modes: ["Video", "Chat"],
    iconBgL: "bg-green-100",
    iconBgD: "bg-green-900",
    category: "Skin & hair",
  },
  {
    icon: "🚑",
    name: "Emergency Medicine",
    desc: "Urgent care, trauma, emergency treatment",
    rating: "4.9",
    reviews: "860",
    modes: ["In-clinic"],
    iconBgL: "bg-red-100",
    iconBgD: "bg-red-900",
    category: "All",
  },
  {
    icon: "🦻",
    name: "ENT",
    desc: "Ear, nose, throat concerns",
    rating: "4.6",
    reviews: "740",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-indigo-100",
    iconBgD: "bg-indigo-900",
    category: "Eyes & ENT",
  },
  {
    icon: "🔬",
    name: "Endocrinology",
    desc: "Diabetes, thyroid, hormones",
    rating: "4.7",
    reviews: "1.1K",
    modes: ["Video", "Chat"],
    iconBgL: "bg-teal-100",
    iconBgD: "bg-teal-900",
    category: "All",
  },
  {
    icon: "👨‍⚕️",
    name: "Family Medicine",
    desc: "Primary care for all age groups",
    rating: "4.7",
    reviews: "1.8K",
    modes: ["Video", "Chat", "In-clinic"],
    iconBgL: "bg-teal-100",
    iconBgD: "bg-teal-900",
    category: "All",
  },
  {
    icon: "🩺",
    name: "General Physician",
    desc: "Fever, infections, routine checkups",
    rating: "4.9",
    reviews: "3.2K",
    modes: ["Video", "Chat", "In-clinic"],
    iconBgL: "bg-pink-100",
    iconBgD: "bg-pink-900",
    category: "All",
  },
  {
    icon: "🫀",
    name: "Gastroenterology",
    desc: "Acidity, IBS, liver health",
    rating: "4.8",
    reviews: "820",
    modes: ["Video", "Chat"],
    iconBgL: "bg-lime-100",
    iconBgD: "bg-lime-900",
    category: "Gut health",
  },
  {
    icon: "🩸",
    name: "Gynaecology",
    desc: "Periods, PCOS, fertility, women's health",
    rating: "4.7",
    reviews: "1.4K",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-rose-100",
    iconBgD: "bg-rose-900",
    category: "Women's health",
  },
  {
    icon: "💊",
    name: "Homeopathy",
    desc: "Alternative medicine and holistic care",
    rating: "4.5",
    reviews: "920",
    modes: ["Video", "Chat"],
    iconBgL: "bg-purple-100",
    iconBgD: "bg-purple-900",
    category: "All",
  },
  {
    icon: "🧬",
    name: "Internal Medicine",
    desc: "Adult diseases, chronic illness management",
    rating: "4.8",
    reviews: "1.9K",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-sky-100",
    iconBgD: "bg-sky-900",
    category: "All",
  },
  {
    icon: "🧠",
    name: "Neurology",
    desc: "Brain, nerves, stroke, migraine treatment",
    rating: "4.8",
    reviews: "1.1K",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-violet-100",
    iconBgD: "bg-violet-900",
    category: "Mental health",
  },
  {
    icon: "🧠",
    name: "Neurosurgery",
    desc: "Brain and spine surgery specialists",
    rating: "4.9",
    reviews: "540",
    modes: ["In-clinic"],
    iconBgL: "bg-gray-100",
    iconBgD: "bg-gray-900",
    category: "Mental health",
  },
  {
    icon: "🤰",
    name: "Obstetrics",
    desc: "Pregnancy care, childbirth, maternal health",
    rating: "4.8",
    reviews: "1.3K",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-rose-100",
    iconBgD: "bg-rose-900",
    category: "Women's health",
  },
  {
    icon: "👁️",
    name: "Ophthalmology",
    desc: "Eye strain, vision, infections",
    rating: "4.7",
    reviews: "690",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-cyan-100",
    iconBgD: "bg-cyan-900",
    category: "Eyes & ENT",
  },
  {
    icon: "🎗️",
    name: "Oncology",
    desc: "Cancer diagnosis and treatment",
    rating: "4.9",
    reviews: "760",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-red-100",
    iconBgD: "bg-red-900",
    category: "All",
  },
  {
    icon: "🦴",
    name: "Orthopaedics",
    desc: "Bone, joint, spine, sports injuries",
    rating: "4.6",
    reviews: "870",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-orange-100",
    iconBgD: "bg-orange-900",
    category: "Bone & joints",
  },
  {
    icon: "⚕️",
    name: "Other",
    desc: "General specialist consultations",
    rating: "4.5",
    reviews: "500",
    modes: ["Video", "Chat"],
    iconBgL: "bg-gray-100",
    iconBgD: "bg-gray-900",
    category: "All",
  },
  {
    icon: "🔬",
    name: "Pathology",
    desc: "Lab testing, diagnostics, disease analysis",
    rating: "4.7",
    reviews: "690",
    modes: ["In-clinic"],
    iconBgL: "bg-amber-100",
    iconBgD: "bg-amber-900",
    category: "All",
  },
  {
    icon: "👶",
    name: "Paediatrics",
    desc: "Child health, growth, vaccinations",
    rating: "4.8",
    reviews: "2.1K",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-yellow-100",
    iconBgD: "bg-yellow-900",
    category: "Child health",
  },
  {
    icon: "🧠",
    name: "Mental Wellness",
    desc: "Stress, anxiety, mental wellness support",
    rating: "4.9",
    reviews: "1.9K",
    modes: ["Video", "Chat"],
    iconBgL: "bg-purple-100",
    iconBgD: "bg-purple-900",
    category: "Mental health",
  },
  {
    icon: "🫁",
    name: "Pulmonology",
    desc: "Asthma, COPD, breathing issues",
    rating: "4.7",
    reviews: "760",
    modes: ["Video", "In-clinic"],
    iconBgL: "bg-sky-100",
    iconBgD: "bg-sky-900",
    category: "Heart & lungs",
  },
  {
    icon: "🩻",
    name: "Radiology",
    desc: "X-rays, scans, imaging diagnostics",
    rating: "4.6",
    reviews: "610",
    modes: ["In-clinic"],
    iconBgL: "bg-cyan-100",
    iconBgD: "bg-cyan-900",
    category: "All",
  },
  {
    icon: "🌱",
    name: "Unani",
    desc: "Traditional healing and herbal medicine",
    rating: "4.5",
    reviews: "430",
    modes: ["Video", "Chat", "In-clinic"],
    iconBgL: "bg-emerald-100",
    iconBgD: "bg-emerald-900",
    category: "All",
  },
];

const SPECIALTY_MAP = {
  AYURVEDA: "Ayurveda",
  CARDIOLOGY: "Cardiology",
  DENTISTRY: "Dentistry",
  DERMATOLOGY: "Dermatology",
  EMERGENCY_MEDICINE: "Emergency Medicine",
  ENT: "ENT",
  FAMILY_MEDICINE: "Family Medicine",
  GENERAL_PHYSICIAN: "General Physician",
  GYNECOLOGY: "Gynaecology",
  HOMEOPATHY: "Homeopathy",
  INTERNAL_MEDICINE: "Internal Medicine",
  NEUROLOGY: "Neurology",
  NEUROSURGERY: "Neurosurgery",
  OBSTETRICS: "Obstetrics",
  ONCOLOGY: "Oncology",
  ORTHOPEDICS: "Orthopaedics",
  OTHER: "Other",
  PATHOLOGY: "Pathology",
  PEDIATRICS: "Paediatrics",
  PSYCHOLOGY: "Mental Wellness",
  PULMONOLOGY: "Pulmonology",
  RADIOLOGY: "Radiology",
  UNANI: "Unani",
  OPHTHALMOLOGY: "Ophthalmology",
  GASTROENTEROLOGY: "Gastroenterology",
  ENDOCRINOLOGY: "Endocrinology",
  NEPHROLOGY: "Nephrology",
  UROLOGY: "Urology",
  HEMATOLOGY: "Hematology",
  RHEUMATOLOGY: "Rheumatology",
  GENERAL_SURGERY: "General Surgery",
  PLASTIC_SURGERY: "Plastic Surgery",
  VASCULAR_SURGERY: "Vascular Surgery",
  ANESTHESIOLOGY: "Anesthesiology",
  INFECTIOUS_DISEASE: "Infectious Disease",
  SPORTS_MEDICINE: "Sports Medicine",
  PAIN_MANAGEMENT: "Pain Management",
  ORTHODONTICS: "Orthodontics",
};

const ViewAllSpecialitiesPage = () => {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [specialities, setSpecialities] = useState([]);
  const navigate = useNavigate();

  const getSpecialities = async () => {
    const res = await apiClient.get("/feature/specializations");

    const backendSpecialities = res.data.data;

    console.log(backendSpecialities);
    console.log(SPECIALTIES.length);

    const filteredSpecialities = SPECIALTIES.filter((item) =>
      backendSpecialities.some(
        (backendItem) =>
          SPECIALTY_MAP[backendItem]?.toLowerCase() === item.name.toLowerCase(),
      ),
    );

    console.log(filteredSpecialities);
    setSpecialities(filteredSpecialities);
  };

  useEffect(() => {
    getSpecialities();
  }, []);

  const handleCategory = (cat) => {
    setActiveCategory(cat.label);
  };

  const filtered = useMemo(() => {
  return specialities.filter((sp) => {
    const matchSearch =
      search === "" ||
      sp.name.toLowerCase().includes(search.toLowerCase()) ||
      sp.desc.toLowerCase().includes(search.toLowerCase());

    const matchCat =
      activeCategory === "All" || sp.category === activeCategory;

    return matchSearch && matchCat;
  });
}, [specialities, search, activeCategory]);

  // ── Shared theme tokens ──
  const pageBg = dark
    ? "bg-gray-900"
    : "bg-gradient-to-b from-blue-50 to-white";
  const cardBg = dark ? "bg-gray-800" : "bg-white";
  const cardBdr = dark ? "border-gray-700" : "border-gray-100";
  const textPri = dark ? "text-white" : "text-gray-900";
  const textSec = dark ? "text-gray-400" : "text-gray-500";
  const inputCls = dark
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:ring-blue-500"
    : "bg-white border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-blue-200";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${pageBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* ── Top bar: title + dark/light toggle ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1
              className={`text-2xl font-bold tracking-tight ${dark ? "text-white" : "text-[#1B3A5C]"}`}
            >
              All Specialties
            </h1>
            <p className={`text-sm mt-1 ${textSec}`}>
              Find the right specialist for your health concern
            </p>
          </div>

          {/* Day / Night toggle — matches the moon icon in your Cureon navbar */}
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              dark
                ? "bg-gray-800 border-gray-600 text-yellow-300 hover:bg-gray-700"
                : "bg-white border-gray-200 text-gray-500 hover:border-blue-300"
            }`}
          >
            <span className="text-base leading-none">{dark ? "☀️" : "🌙"}</span>
            <span className="hidden sm:inline">
              {dark ? "Light mode" : "Dark mode"}
            </span>
          </button>
        </div>

        {/* ── Search ── */}
        {/* <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by specialty, symptom or condition..."
            className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none focus:ring-2 transition ${inputCls}`}
          />
        </div> */}

        {/* ── Trust stats ── */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { num: "500+", lbl: "Verified doctors" },
            { num: "30+", lbl: "Specialties" },
            { num: "4.8★", lbl: "Avg rating" },
            { num: "50K+", lbl: "Consultations" },
          ].map((s) => (
            <div
              key={s.lbl}
              className={`rounded-2xl py-3 px-2 text-center border ${cardBg} ${cardBdr}`}
            >
              <p
                className={`text-lg font-bold ${dark ? "text-blue-400" : "text-blue-700"}`}
              >
                {s.num}
              </p>
              <p className={`text-[11px] mt-0.5 leading-tight ${textSec}`}>
                {s.lbl}
              </p>
            </div>
          ))}
        </div> */}

        {/* ── Category chips — each navigates to its own route ── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              onClick={() => handleCategory(c)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all ${
                activeCategory === c.label
                  ? "bg-[#1B3A5C] text-blue-100 border-[#1B3A5C]"
                  : dark
                    ? "bg-gray-800 text-gray-300 border-gray-600 hover:border-blue-400"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ── Specialties grid ── */}
        <div className="flex justify-between items-center mb-3">
          <p className={`text-sm font-semibold ${textPri}`}>
            {activeCategory === "All" ? "All specialties" : activeCategory}
            <span className={`font-normal ml-1 ${textSec}`}>
              ({filtered.length})
            </span>
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {filtered.map((sp) => (
              <SpecialtyCard
                key={sp.name}
                sp={sp}
                dark={dark}
                onClick={() =>
                  navigate(`/doctors?specialty=${encodeURIComponent(sp.name)}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 text-sm mb-8 ${textSec}`}>
            No specialties found for &quot;{search}&quot;
          </div>
        )}

        {/* ── Curomate CTA — #1B3A5C bg, white button (matches screenshot) ── */}
        <div className="bg-[#1B3A5C] rounded-2xl px-5 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-white text-sm font-semibold">
              Not sure which specialty to choose?
            </p>
            <p className="text-[#7BAFD4] text-xs mt-1">
              Ask Curomate — our AI health assistant will guide you
            </p>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="bg-white text-[#1B3A5C] text-sm font-semibold rounded-xl px-5 py-2.5 hover:bg-blue-50 active:scale-95 transition-all whitespace-nowrap"
          >
            Ask Curomate →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllSpecialitiesPage;
