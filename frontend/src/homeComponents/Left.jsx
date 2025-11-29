import React, { useState } from "react";

const Left = ({ user, tasks }) => {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="border rounded-lg p-4 space-y-4 w-[350px]">
      {/* Profile */}
      <div className="border p-4 rounded-lg space-y-2">
        <div className="w-20 h-20 border rounded-full mx-auto"></div>

        <p className="text-xl font-bold text-center">
          {user?.name || "Loading..."}
        </p>

        <p className="text-center">{user?.email}</p>

        <button className="border px-4 py-1 rounded w-full bg-green-200">
          Edit
        </button>
      </div>

      {/* Tasks */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-3">Tasks</h2>

        {/* Tasks list */}
        <div className="mt-4 space-y-2">
          {!tasks?.length && (
            <p className="text-gray-500 text-sm">No tasks added yet</p>
          )}

          {tasks?.map((t) => (
            <div
              key={t._id}
              className="flex justify-between border p-2 rounded"
            >
              <p>{t.title}</p>
              <span className="text-gray-500 text-sm">{t.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Left;
