import ModeTag from "./ModeTag";

function SpecialtyCard({ sp, dark, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 cursor-pointer border transition-all duration-200 flex flex-col gap-2 ${
        dark
          ? "bg-gray-800 border-gray-700 hover:border-blue-400"
          : "bg-white border-gray-100 hover:border-blue-400 hover:shadow-sm"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${dark ? sp.iconBgD : sp.iconBgL}`}>
          {sp.icon}
        </div>
        <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${dark ? sp.badgeD : sp.badgeL}`}>
          {sp.badge}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
        ★ {sp.rating}
        <span className={`font-normal ${dark ? "text-gray-500" : "text-gray-400"}`}>· {sp.reviews} reviews</span>
      </div>
      <div>
        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-800"}`}>{sp.name}</p>
        <p className={`text-xs leading-relaxed mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>{sp.desc}</p>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <span className={`text-sm font-semibold ${dark ? "text-blue-400" : "text-blue-700"}`}>{sp.price}</span>
        <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{sp.wait} wait</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-1">
        {sp.modes.map((m) => <ModeTag key={m} label={m} dark={dark} />)}
      </div>
    </div>
  );
}
export default SpecialtyCard
