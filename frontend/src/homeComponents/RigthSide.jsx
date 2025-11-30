import React from "react";

const RigthSide = () => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Add Events */}
      <div className="border p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Add Events</h2>
          <button className="border bg-purple-200 px-4 rounded">Add</button>
        </div>

        {/* two text areas */}
        <textarea className="border w-full h-20"></textarea>
        <textarea className="border w-full h-20"></textarea>
      </div>

      {/* Add Staff */}
      <div className="border p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Add Staffs</h2>
          <button className="border px-3 rounded text-xl">+</button>
        </div>

        <input className="border w-full" placeholder="Location :" />
        <input className="border w-full" placeholder="Camera Name :" />
        <input className="border w-full" placeholder="Staff ID :" />
        <input className="border w-full" placeholder="Staff Name :" />

        <div className="h-20 border rounded"></div>
      </div>
    </div>
  );
};

export default RigthSide;
