import React, { useState, useEffect, useRef } from "react";

const HomeSection1 = ({ onAddCamera, selectedCoords }) => {
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
    lat: "",
    lng: "",
    stream: null,
  });

  // ✨ 4 second delay after clicking map
  useEffect(() => {
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
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [selectedCoords]);

  // backup location if needed
  useEffect(() => {
    if (!showForm) return;

    if (!camera.lat || !camera.lng) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCamera((prev) => ({
          ...prev,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          location: `${pos.coords.latitude}, ${pos.coords.longitude}`,
        }));
      });
    }
  }, [showForm, camera.lat, camera.lng]);

  // load preview + device list
  useEffect(() => {
    if (!showForm) return;

    navigator.mediaDevices.enumerateDevices().then((all) => {
      const cams = all.filter((d) => d.kind === "videoinput");
      setDeviceList(cams);

      const firstCam = cams[0];
      if (!firstCam) return;

      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: firstCam.deviceId } })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;

          setCamera((prev) => ({
            ...prev,
            deviceId: firstCam.deviceId,
            label: firstCam.label,
            groupId: firstCam.groupId,
            kind: firstCam.kind,
            stream,
          }));
        });
    });

    return () => camera.stream?.getTracks().forEach((t) => t.stop());
  }, [showForm]);

  // update preview if camera changes
  useEffect(() => {
    if (!camera.deviceId || !showForm) return;

    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: camera.deviceId } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCamera((prev) => ({ ...prev, stream }));
      });
  }, [camera.deviceId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    camera.stream?.getTracks().forEach((t) => t.stop());
    onAddCamera(camera);
    setShowForm(false);
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-9 rounded-xl w-[380px] relative z-[10000]">
        <button
          onClick={() => {
            camera.stream?.getTracks().forEach((t) => t.stop());
            setShowForm(false);
          }}
          className="absolute top-2 right-3"
        >
          ✖
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Camera Name"
            value={camera.name}
            onChange={(e) => setCamera({ ...camera, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={camera.location}
            onChange={(e) => setCamera({ ...camera, location: e.target.value })}
          />

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

          {camera.stream && (
            <video
              ref={videoRef}
              className="w-full h-40 bg-black rounded"
              autoPlay
              muted
            />
          )}

          <input className="border p-2" readOnly value={camera.lat} />
          <input className="border p-2" readOnly value={camera.lng} />

          <button className="bg-blue-600 text-white rounded p-2">
            Save Camera
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeSection1;
