import React from "react";
import { motion } from "framer-motion";

const ConfirmBox = ({ text, onCancel, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-end sm:items-center z-[9999]"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white p-5 rounded-t-2xl sm:rounded-xl w-full max-w-sm sm:w-[340px] text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-base sm:text-lg font-semibold mb-5">{text}</p>

        <div className="flex justify-center gap-4">
          <button
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmBox;
