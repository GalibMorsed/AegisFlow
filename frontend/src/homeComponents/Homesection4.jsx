import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

const defaultCenter = [20.5937, 78.9629];

// LOCATION PIN ICON
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const MapClickHandler = ({ onSelect }) => {
  const map = useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        map.flyTo([lat, lng], 13, { animate: true, duration: 1.5 });

        onSelect({
          lat,
          lng,
          locationName: data.display_name,
        });
      } catch {
        onSelect({
          lat,
          lng,
          locationName: "Unknown Location",
        });
      }
    },
  });

  return null;
};

const HomeSection4 = ({ onMapClick, cameras }) => {
  const [cameraLocation, setCameraLocation] = useState(null);

  return (
    <section className="px-[16%] py-8 bg-blue-100 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Click Anywhere on the Map to Add Camera
      </h2>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          className="w-full h-[450px] rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler
            onSelect={(loc) => {
              setCameraLocation(loc);
              onMapClick(loc);
            }}
          />

          {/* SHOW SAVED DB CAMERAS */}
          {cameras.map((cam, i) => (
            <Marker key={i} position={[cam.lat, cam.lng]} icon={pinIcon}>
              <Popup>
                <b>{cam.name}</b> <br />
                {cam.location}
              </Popup>
            </Marker>
          ))}

          {/* SHOW NEW CAMERA PIN */}
          {cameraLocation && (
            <Marker
              position={[cameraLocation.lat, cameraLocation.lng]}
              icon={pinIcon}
            >
              <Popup>{cameraLocation.locationName}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
