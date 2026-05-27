function ModeTag({ label, dark }) {
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-md border ${
      dark ? "border-gray-600 text-gray-400" : "border-gray-200 text-gray-500"
    }`}>
      {label}
    </span>
  );
}
export default ModeTag