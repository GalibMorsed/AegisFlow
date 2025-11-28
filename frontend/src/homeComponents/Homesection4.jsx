import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const defaultCenter = [20.5937, 78.9629];

// LOCATION PIN ICON (keeps your previous pin)
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

/* MapClickHandler - handles user clicks to add camera location */
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

        map.flyTo([lat, lng], 13, { animate: true, duration: 1.2 });

        onSelect({
          lat,
          lng,
          locationName: data.display_name || "Unknown Location",
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

/* MapController - moves map when searchLocation changes */
const MapController = ({ searchLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (searchLocation) {
      // Nominatim returns lat/lon as strings
      const lat = Number(searchLocation.lat);
      const lon = Number(searchLocation.lon);
      if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
        map.flyTo([lat, lon], 12, { animate: true, duration: 1.2 });
      }
    }
  }, [searchLocation, map]);

  return null;
};

const HomeSection4 = ({ onMapClick, cameras = [] }) => {
  const [cameraLocation, setCameraLocation] = useState(null);

  // search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // controls width & button visibility
  const [searchLocation, setSearchLocation] = useState(null); // selected from search results
  const [searchMarker, setSearchMarker] = useState(null); // marker for searched location
  const inputRef = useRef(null);

  // handle actual search (Nominatim)
  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const top = data[0];
        setSearchLocation(top);
        setSearchMarker({
          lat: Number(top.lat),
          lng: Number(top.lon),
          display_name: top.display_name || top.display_name || q,
        });
      } else {
        alert("Location not found.");
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Error while searching. Try again.");
    }
  };

  // keyboard handler: Enter to search, Esc to collapse/clear
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      // keep expanded so user sees result
    } else if (e.key === "Escape") {
      collapseAndClear();
    }
  };

  const collapseAndClear = () => {
    setIsExpanded(false);
    setSearchQuery("");
    // optionally remove search marker but keep cameras intact
    setSearchMarker(null);
    setSearchLocation(null);
    // blur input so it visually collapses
    if (inputRef.current) inputRef.current.blur();
  };

  // When map is clicked we want parent to add camera and also show temp marker
  const handleMapSelect = (loc) => {
    setCameraLocation(loc);
    if (onMapClick) onMapClick(loc);
  };

  return (
    <section className="px-[12%] py-8 bg-white mb-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Click Anywhere on the Map to Add Camera
      </h2>

      {/* Search bar container */}
      <div className="relative mb-4 flex items-center">
        <div
          className={`relative transition-all duration-300 ease-in-out flex items-center ${
            isExpanded ? "w-full" : "w-[38%]"
          }`}
          style={{ minWidth: 220 }}
        >
          {/* Search input */}
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyDown}
            aria-label="Search location"
            placeholder="Search for a location (e.g. 'Mumbai, Bangalore')"
            className={`w-full placeholder:text-slate-400 px-4 py-3 rounded-lg shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ${
              isExpanded ? "bg-white" : "bg-white/90"
            }`}
            onClick={() => setIsExpanded(true)}
          />

          {/* Search button (visible only when expanded) */}
          <button
            onClick={handleSearch}
            aria-label="Search"
            className={`ml-3 px-4 py-2 rounded-lg font-medium shadow-md transition-all duration-250 transform ${
              isExpanded
                ? "opacity-100 pointer-events-auto translate-x-0 bg-indigo-600 text-white hover:bg-indigo-700"
                : "opacity-0 pointer-events-none translate-x-3"
            }`}
            title="Search"
          >
            {/* magnifier icon */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </div>
          </button>
        </div>
      </div>

      {/* Map container */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-slate-100">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          className="w-full h-[480px] rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapController searchLocation={searchLocation} />

          <MapClickHandler onSelect={handleMapSelect} />

          {/* Render saved DB cameras */}
          {Array.isArray(cameras) &&
            cameras.map((cam, i) => (
              <Marker
                key={cam.id ?? i}
                position={[cam.lat, cam.lng]}
                icon={pinIcon}
              >
                <Popup>
                  <div className="font-semibold">{cam.name}</div>
                  <div className="text-xs">{cam.location}</div>
                </Popup>
              </Marker>
            ))}

          {/* Marker for cameraLocation (map click) */}
          {cameraLocation && (
            <Marker
              key={`new-${cameraLocation.lat}-${cameraLocation.lng}`}
              position={[cameraLocation.lat, cameraLocation.lng]}
              icon={pinIcon}
            >
              <Popup>{cameraLocation.locationName}</Popup>
            </Marker>
          )}

          {/* Marker for search result */}
          {searchMarker && (
            <Marker
              key={`search-${searchMarker.lat}-${searchMarker.lng}`}
              position={[searchMarker.lat, searchMarker.lng]}
              icon={pinIcon}
            >
              <Popup>
                <div className="max-w-xs">
                  <div className="font-semibold text-slate-800">
                    {searchMarker.display_name}
                  </div>
                  <div className="text-xs mt-1 text-slate-500">
                    Lat: {searchMarker.lat.toFixed(6)}, Lng:{" "}
                    {searchMarker.lng.toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
