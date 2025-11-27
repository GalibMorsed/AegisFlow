import React, { useState, useEffect, useRef } from "react";

const HomeSection1 = ({
  onAddCamera,
  selectedCoords,
  resetCoords,
  editingCamera,
  closeEdit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const videoRef = useRef(null);

  const [camera, setCamera] = useState({
    name: "",
    location: "",
    type: "IP Camera",
    deviceId: "",
    label: "",
    groupId: "",
    kind: "",
    lat: "",
    lng: "",
    stream: null,
  });

  // ------------------ EDIT MODE LOADING ------------------
  useEffect(() => {
    if (editingCamera) {
      const { stream, ...rest } = editingCamera;
      setCamera(rest);
      setShowForm(true);
    }
  }, [editingCamera]);

  // ------------------ FROM MAP CLICK ------------------
  useEffect(() => {
    if (selectedCoords) {
      setCamera((prev) => ({
        ...prev,
        lat: selectedCoords.lat,
        lng: selectedCoords.lng,
        location: selectedCoords.locationName,
      }));
      setShowForm(true);
      resetCoords();
    }
  }, [selectedCoords]);

  // ------------------ START CAMERA STREAM ------------------
  useEffect(() => {
    if (showForm && camera.type === "Device Camera") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(async (stream) => {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const cams = devices.filter((d) => d.kind === "videoinput");

          setDeviceList(cams);

          // set default camera info
          const d = cams[0];
          if (d) {
            setCamera((prev) => ({
              ...prev,
              deviceId: d.deviceId,
              label: d.label,
              groupId: d.groupId,
              kind: d.kind,
              stream,
            }));
          }

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      if (camera.stream) {
        camera.stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [showForm, camera.type]);

  // ------------------ SUBMIT ------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (camera.stream) {
      camera.stream.getTracks().forEach((t) => t.stop());
    }

    onAddCamera(camera);
    setShowForm(false);
    closeEdit?.();
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-xl w-[380px] relative">
        <button
          type="button"
          onClick={() => {
            if (camera.stream) {
              camera.stream.getTracks().forEach((t) => t.stop());
            }
            setShowForm(false);
            closeEdit?.();
          }}
          className="absolute top-2 right-3"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-3">
          {editingCamera ? "Edit Camera" : "Add Camera"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Camera Name"
            className="border p-2 rounded"
            value={camera.name}
            onChange={(e) => setCamera({ ...camera, name: e.target.value })}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="border p-2 rounded"
            value={camera.location}
            onChange={(e) => setCamera({ ...camera, location: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={camera.type}
            onChange={(e) =>
              setCamera({ ...camera, type: e.target.value, stream: null })
            }
          >
            <option value="IP Camera">IP Camera</option>
            <option value="Device Camera">Device Camera</option>
            <option value="CCTV">CCTV</option>
          </select>

          {/* ------------------ IP CAMERA ------------------ */}
          {camera.type === "IP Camera" && (
            <input
              name="ip"
              placeholder="Camera URL / IP"
              className="border p-2 rounded"
              value={camera.ip || ""}
              onChange={(e) => setCamera({ ...camera, ip: e.target.value })}
              required
            />
          )}

          {/* ------------------ DEVICE CAMERA ------------------ */}
          {camera.type === "Device Camera" && (
            <>
              <select
                className="border p-2 rounded"
                value={camera.deviceId}
                onChange={(e) => {
                  const d = deviceList.find(
                    (dev) => dev.deviceId === e.target.value
                  );
                  setCamera({
                    ...camera,
                    deviceId: d.deviceId,
                    label: d.label,
                    groupId: d.groupId,
                    kind: d.kind,
                  });
                }}
              >
                {deviceList.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || "Unknown Camera"}
                  </option>
                ))}
              </select>

              {camera.stream && (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-40 bg-black rounded"
                />
              )}
            </>
          )}

          {/* ------------------ COORDS ------------------ */}
          <input
            className="border p-2 bg-gray-100"
            value={camera.lat}
            readOnly
          />
          <input
            className="border p-2 bg-gray-100"
            value={camera.lng}
            readOnly
          />

          <button type="submit" className="bg-blue-600 text-white rounded p-2">
            {editingCamera ? "Update Camera" : "Save Camera"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeSection1;
