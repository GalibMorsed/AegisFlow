import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";

const defaultCenter = [20.5937, 78.9629];

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

        map.flyTo([lat, lng], 13, {
          animate: true,
          duration: 1.5,
        });

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

const HomeSection4 = ({ onMapClick }) => {
  const [cameraLocation, setCameraLocation] = useState(null);

  return (
    <section className="px-[16%] py-8 bg-blue-100 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Click Anywhere on the Map to Add Camera
      </h2>

      <div className="rounded-xl overflow-hidden shadow-lg relative">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          className="w-full h-[450px] rounded-xl z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler
            onSelect={(loc) => {
              setCameraLocation(loc);
              onMapClick(loc);
            }}
          />

          {cameraLocation && (
            <Marker position={[cameraLocation.lat, cameraLocation.lng]}>
              <Popup>{cameraLocation.locationName}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
