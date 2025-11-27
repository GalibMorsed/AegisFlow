import React, { useState, useEffect, useRef } from "react";

const HomeSection1 = ({
  onAddCamera,
  selectedCoords,
  editingCamera,
  closeEdit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const videoRef = useRef(null);

  const [camera, setCamera] = useState({
    name: "",
    location: "",
    type: "Device Camera",
    deviceId: "",
    label: "",
    groupId: "",
    kind: "",
    ip: "",
    lat: "",
    lng: "",
    stream: null,
  });

  //
  // OPEN FORM LOGIC
  //

  useEffect(() => {
    // 1. EDIT MODE (open instantly)
    if (editingCamera) {
      // keep preview and stream clean
      const { stream, ...rest } = editingCamera;
      setCamera(rest);
      setShowForm(true);
      return;
    }

    // 2. ADD NEW CAMERA (delay 4 secs)
    if (selectedCoords) {
      const { lat, lng, locationName } = selectedCoords;

      setCamera((prev) => ({
        ...prev,
        lat,
        lng,
        location: locationName,
      }));

      const timer = setTimeout(() => {
        setShowForm(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selectedCoords, editingCamera]);

  //
  // BACKUP BROWSER GEO
  //
  useEffect(() => {
    if (!showForm) return;
    if (!camera.lat || !camera.lng) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCamera((prev) => ({
          ...prev,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }));
      });
    }
  }, [showForm, camera.lat, camera.lng]);

  //
  // LOAD DEVICE CAMERA + PREVIEW
  //
  useEffect(() => {
    if (!showForm) return;
    if (camera.type !== "Device Camera") return;

    const loadCam = async () => {
      const all = await navigator.mediaDevices.enumerateDevices();
      const cams = all.filter((d) => d.kind === "videoinput");
      setDeviceList(cams);

      const first = cams[0];
      if (!first) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: first.deviceId },
      });

      if (videoRef.current) videoRef.current.srcObject = stream;

      setCamera((prev) => ({
        ...prev,
        deviceId: first.deviceId,
        label: first.label,
        groupId: first.groupId,
        kind: first.kind,
        stream,
      }));
    };

    loadCam();

    return () => camera.stream?.getTracks().forEach((t) => t.stop());
  }, [showForm, camera.type]);

  //
  // SWITCH CAMERA PREVIEW
  //
  useEffect(() => {
    if (!showForm) return;
    if (camera.type !== "Device Camera") return;
    if (!camera.deviceId) return;

    navigator.mediaDevices
      .getUserMedia({
        video: { deviceId: camera.deviceId },
      })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCamera((prev) => ({ ...prev, stream }));
      });
  }, [camera.deviceId, camera.type, showForm]);

  //
  // SUBMIT
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    camera.stream?.getTracks().forEach((t) => t.stop());
    onAddCamera(camera);
    setShowForm(false);
    closeEdit?.();
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-xl w-[380px] relative z-[10000]">
        <button
          onClick={() => {
            camera.stream?.getTracks().forEach((t) => t.stop());
            setShowForm(false);
            closeEdit?.();
          }}
          className="absolute top-2 right-3"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-2">
          {editingCamera ? "Edit Camera" : "Add Camera"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Camera Name"
            className="border p-2 rounded"
            value={camera.name}
            onChange={(e) => setCamera({ ...camera, name: e.target.value })}
          />

          <input
            placeholder="Location"
            className="border p-2 rounded"
            value={camera.location}
            onChange={(e) => setCamera({ ...camera, location: e.target.value })}
          />

          {/* Camera Type */}
          <select
            className="border p-2 rounded"
            value={camera.type}
            onChange={(e) =>
              setCamera((prev) => ({
                ...prev,
                type: e.target.value,
                stream: null,
              }))
            }
          >
            <option value="Device Camera">Device Camera</option>
            <option value="IP Camera">IP Camera</option>
            <option value="CCTV">CCTV</option>
          </select>

          {/* IP CAMERA */}
          {camera.type === "IP Camera" && (
            <input
              className="border p-2 rounded"
              placeholder="Camera IP URL"
              value={camera.ip}
              onChange={(e) => setCamera({ ...camera, ip: e.target.value })}
            />
          )}

          {/* DEVICE SELECTOR */}
          {camera.type === "Device Camera" && (
            <select
              className="border p-2 rounded"
              value={camera.deviceId}
              onChange={(e) => {
                const d = deviceList.find(
                  (dev) => dev.deviceId === e.target.value
                );

                setCamera((prev) => ({
                  ...prev,
                  deviceId: d.deviceId,
                  label: d.label,
                  groupId: d.groupId,
                  kind: d.kind,
                }));
              }}
            >
              {deviceList.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || "Camera"}
                </option>
              ))}
            </select>
          )}

          {/* ALWAYS RENDER VIDEO TAG */}
          {camera.type === "Device Camera" && (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-40 bg-black rounded"
            />
          )}

          <input className="border p-2" value={camera.lat} readOnly />
          <input className="border p-2" value={camera.lng} readOnly />

          <button className="bg-blue-600 text-white p-2 rounded">
            {editingCamera ? "Update Camera" : "Save Camera"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeSection1;
