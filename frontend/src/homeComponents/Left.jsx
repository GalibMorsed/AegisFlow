import React from "react";

const LeftSide = ({ user, tasks }) => {
  return (
    <div className="border rounded-lg p-4 space-y-4 w-[380px]">
      {/* Profile */}
      <div className="border p-4 rounded-lg space-y-2 bg-gray-50">
        <div className="w-20 h-20 border rounded-full mx-auto bg-gray-200"></div>

        <p className="text-xl font-bold text-center">{user?.name}</p>
        <p className="text-center text-gray-600">Email: {user?.email}</p>

        <button className="border px-4 py-1 rounded w-full bg-green-300 hover:bg-green-400 transition">
          Edit Profile
        </button>
      </div>

      {/* Tasks */}
      <div className="border p-4 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Tasks</h2>
          <button className="border px-3 rounded text-xl bg-green-200 hover:bg-green-300 transition">
            +
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {tasks?.length === 0 && (
            <p className="text-gray-500">No tasks yet...</p>
          )}

          {tasks?.map((t) => (
            <div
              key={t._id}
              className="flex justify-between bg-white border px-3 py-2 rounded shadow-sm"
            >
              <div>
                <p className="font-semibold">{t.status}</p>
                <p className="text-sm text-gray-500">Cam {t.camera}</p>
              </div>
              <p className="text-sm">
                {t.startTime} - {t.endTime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
