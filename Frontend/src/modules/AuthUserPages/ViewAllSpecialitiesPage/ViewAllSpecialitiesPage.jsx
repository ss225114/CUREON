import React, { useState } from 'react'
import SpecialtyCard from './components/SpecialtyCard';
import { useNavigate } from 'react-router-dom';
const CATEGORIES = [
  { label: "All",            path: "/specialties/all" },
  { label: "Women's health", path: "/specialties/womens-health" },
  { label: "Skin & hair",    path: "/specialties/skin-hair" },
  { label: "Mental health",  path: "/specialties/mental-health" },
  { label: "Child health",   path: "/specialties/child-health" },
  { label: "Heart & lungs",  path: "/specialties/heart-lungs" },
  { label: "Gut health",     path: "/specialties/gut-health" },
  { label: "Bone & joints",  path: "/specialties/bone-joints" },
  { label: "Eyes & ENT",     path: "/specialties/eyes-ent" },
];

const SPECIALTIES = [
  {
    icon: "🩺", name: "General physician", desc: "Fever, infections, routine checkups",
    price: "₹199", wait: "~5 min",  rating: "4.9", reviews: "3.2K",
    badge: "Available now", badgeL: "bg-green-100 text-green-800", badgeD: "bg-green-900 text-green-200",
    modes: ["Video", "Chat", "In-clinic"], iconBgL: "bg-pink-100", iconBgD: "bg-pink-900",
    category: "All",
  },
  {
    icon: "🌿", name: "Dermatology", desc: "Acne, rashes, pigmentation, eczema",
    price: "₹349", wait: "~10 min", rating: "4.8", reviews: "2.8K",
    badge: "Popular", badgeL: "bg-blue-100 text-blue-800", badgeD: "bg-blue-900 text-blue-200",
    modes: ["Video", "Chat"], iconBgL: "bg-green-100", iconBgD: "bg-green-900",
    category: "Skin & hair",
  },
  {
    icon: "🧠", name: "Mental wellness", desc: "Anxiety, depression, stress, sleep",
    price: "₹499", wait: "~8 min",  rating: "4.9", reviews: "1.9K",
    badge: "Available now", badgeL: "bg-green-100 text-green-800", badgeD: "bg-green-900 text-green-200",
    modes: ["Video", "Chat"], iconBgL: "bg-purple-100", iconBgD: "bg-purple-900",
    category: "Mental health",
  },
  {
    icon: "👶", name: "Paediatrics", desc: "Child health, vaccinations, growth",
    price: "₹299", wait: "~12 min", rating: "4.8", reviews: "2.1K",
    badge: "Popular", badgeL: "bg-blue-100 text-blue-800", badgeD: "bg-blue-900 text-blue-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-amber-100", iconBgD: "bg-amber-900",
    category: "Child health",
  },
  {
    icon: "🩸", name: "Gynaecology", desc: "Periods, PCOS, pregnancy, fertility",
    price: "₹399", wait: "~15 min", rating: "4.7", reviews: "1.4K",
    badge: "Available now", badgeL: "bg-green-100 text-green-800", badgeD: "bg-green-900 text-green-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-rose-100", iconBgD: "bg-rose-900",
    category: "Women's health",
  },
  {
    icon: "❤️", name: "Cardiology", desc: "Heart health, BP, cholesterol",
    price: "₹599", wait: "~20 min", rating: "4.8", reviews: "980",
    badge: "New", badgeL: "bg-purple-100 text-purple-800", badgeD: "bg-purple-900 text-purple-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-blue-100", iconBgD: "bg-blue-900",
    category: "Heart & lungs",
  },
  {
    icon: "🔬", name: "Endocrinology", desc: "Diabetes, thyroid, hormones",
    price: "₹499", wait: "~18 min", rating: "4.7", reviews: "1.1K",
    badge: "Available now", badgeL: "bg-green-100 text-green-800", badgeD: "bg-green-900 text-green-200",
    modes: ["Video", "Chat"], iconBgL: "bg-teal-100", iconBgD: "bg-teal-900",
    category: "All",
  },
  {
    icon: "🦴", name: "Orthopaedics", desc: "Joint pain, spine, sports injuries",
    price: "₹449", wait: "~25 min", rating: "4.6", reviews: "870",
    badge: "Popular", badgeL: "bg-blue-100 text-blue-800", badgeD: "bg-blue-900 text-blue-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-orange-100", iconBgD: "bg-orange-900",
    category: "Bone & joints",
  },
  {
    icon: "🫁", name: "Pulmonology", desc: "Asthma, COPD, breathing issues",
    price: "₹449", wait: "~20 min", rating: "4.7", reviews: "760",
    badge: "Available now", badgeL: "bg-green-100 text-green-800", badgeD: "bg-green-900 text-green-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-sky-100", iconBgD: "bg-sky-900",
    category: "Heart & lungs",
  },
  {
    icon: "👁️", name: "Ophthalmology", desc: "Eye strain, vision, infections",
    price: "₹399", wait: "~15 min", rating: "4.7", reviews: "690",
    badge: "Popular", badgeL: "bg-blue-100 text-blue-800", badgeD: "bg-blue-900 text-blue-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-cyan-100", iconBgD: "bg-cyan-900",
    category: "Eyes & ENT",
  },
  {
    icon: "🫀", name: "Gastroenterology", desc: "Acidity, IBS, liver health",
    price: "₹499", wait: "~22 min", rating: "4.8", reviews: "820",
    badge: "Available now", badgeL: "bg-green-100 text-green-800", badgeD: "bg-green-900 text-green-200",
    modes: ["Video", "Chat"], iconBgL: "bg-lime-100", iconBgD: "bg-lime-900",
    category: "Gut health",
  },
  {
    icon: "🦻", name: "ENT", desc: "Ear, nose, throat concerns",
    price: "₹349", wait: "~12 min", rating: "4.6", reviews: "740",
    badge: "Popular", badgeL: "bg-blue-100 text-blue-800", badgeD: "bg-blue-900 text-blue-200",
    modes: ["Video", "In-clinic"], iconBgL: "bg-indigo-100", iconBgD: "bg-indigo-900",
    category: "Eyes & ENT",
  },
];

const ViewAllSpecialitiesPage = () => {
  const [dark, setDark]                     = useState(false);
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate                            = useNavigate();

  const handleCategory = (cat) => {
    setActiveCategory(cat.label);
    navigate(cat.path);
  };

  const filtered = SPECIALTIES.filter((sp) => {
    const matchSearch =
      search === "" ||
      sp.name.toLowerCase().includes(search.toLowerCase()) ||
      sp.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || sp.category === activeCategory;
    return matchSearch && matchCat;
  });

  // ── Shared theme tokens ──
  const pageBg   = dark ? "bg-gray-900"  : "bg-gradient-to-b from-blue-50 to-white";
  const cardBg   = dark ? "bg-gray-800"  : "bg-white";
  const cardBdr  = dark ? "border-gray-700" : "border-gray-100";
  const textPri  = dark ? "text-white"   : "text-gray-900";
  const textSec  = dark ? "text-gray-400": "text-gray-500";
  const inputCls = dark
    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500 focus:ring-blue-500"
    : "bg-white border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-blue-200";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${pageBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Top bar: title + dark/light toggle ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${dark ? "text-white" : "text-[#1B3A5C]"}`}>
              All Specialties
            </h1>
            <p className={`text-sm mt-1 ${textSec}`}>Find the right specialist for your health concern</p>
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
            <span className="hidden sm:inline">{dark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>

        {/* ── Search ── */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by specialty, symptom or condition..."
            className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm outline-none focus:ring-2 transition ${inputCls}`}
          />
        </div>

        {/* ── Trust stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { num: "500+", lbl: "Verified doctors" },
            { num: "30+",  lbl: "Specialties" },
            { num: "4.8★", lbl: "Avg rating" },
            { num: "50K+", lbl: "Consultations" },
          ].map((s) => (
            <div key={s.lbl} className={`rounded-2xl py-3 px-2 text-center border ${cardBg} ${cardBdr}`}>
              <p className={`text-lg font-bold ${dark ? "text-blue-400" : "text-blue-700"}`}>{s.num}</p>
              <p className={`text-[11px] mt-0.5 leading-tight ${textSec}`}>{s.lbl}</p>
            </div>
          ))}
        </div>

        

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
            <span className={`font-normal ml-1 ${textSec}`}>({filtered.length})</span>
          </p>
          <button className={`text-xs ${dark ? "text-blue-400" : "text-blue-600"}`}>Sort by: Popular ▾</button>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {filtered.map((sp) => (
              <SpecialtyCard
                key={sp.name}
                sp={sp}
                dark={dark}
                onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(sp.name)}`)}
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
            <p className="text-white text-sm font-semibold">Not sure which specialty to choose?</p>
            <p className="text-[#7BAFD4] text-xs mt-1">Ask Curomate — our AI health assistant will guide you</p>
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
}

export default ViewAllSpecialitiesPage
