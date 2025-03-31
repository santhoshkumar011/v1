// import L from "leaflet";
// import {useEffect} from "react";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// useEffect(() => {
//   if (!mapContainerRef.current || mapInstanceRef.current) return;

//   mapInstanceRef.current = L.map(mapContainerRef.current).setView([12.7568, 79.6570], 13);

//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution: "© OpenStreetMap contributors",
//     maxZoom: 19,
//   }).addTo(mapInstanceRef.current);

//   const customIcon = L.icon({
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//     iconSize: [25, 41], // Default size
//     iconAnchor: [12, 41], // Positioning
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   L.marker([12.946895, 79.673360], { icon: customIcon })
//     .addTo(mapInstanceRef.current)
//     .bindPopup("Rajalakshmi Engineering College")
//     .openPopup();
// }, []);

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Ensure you import the Leaflet styles
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const LocationForm = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapContainerRef.current).setView([12.7568, 79.6570], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    const customIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([12.946895, 79.673360], { icon: customIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup("Rajalakshmi Engineering College")
      .openPopup();
  }, []);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />;
};
export default LocationForm;

