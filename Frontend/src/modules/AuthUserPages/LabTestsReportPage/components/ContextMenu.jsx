// components/ContextMenu.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContextMenu({
  open,
  x,
  y,
  dark,
  onClose,
  onDelete,
  onStar,
}) {
  const menu = [
    { label: "Download", action: onClose },
    { label: "Share", action: onClose },
    { label: "Star / Unstar", action: onStar },
    { label: "Delete", action: onDelete, danger: true },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ left: x, top: y }}
            className={`fixed w-52 rounded-2xl shadow-2xl border overflow-hidden ${
              dark
                ? "bg-[#1A2B42] border-[#1E3A5F]"
                : "bg-white border-slate-100"
            }`}
          >
            {menu.map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className={`w-full px-4 py-3 text-left text-sm transition ${
                  item.danger
                    ? "text-red-500 hover:bg-red-50"
                    : dark
                    ? "text-white hover:bg-[#24344D]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}