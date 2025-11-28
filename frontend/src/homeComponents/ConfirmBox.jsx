import React from "react";

const ConfirmBox = ({ text, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-5 rounded-xl w-[300px] text-center shadow-xl">
        <p className="text-lg font-semibold mb-4">{text}</p>

        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 rounded bg-gray-300" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
