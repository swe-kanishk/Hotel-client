import React, { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure Leaflet default icon
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 10); // Adjust zoom level as needed
    }
  }, [center, map]);

  return null; // This component does not render anything by itself
}

export default function MapComponent({ center }) {
  return (
    <MapContainer
      center={center || [51.505, -0.09]} // Default to London if center prop is not provided
      zoom={center ? 10 : 2} // Adjust zoom level based on whether center prop is provided
      scrollWheelZoom={false} // Disable scroll zoom
      style={{ height: '400px', width: '100%' }} // Adjust size as needed
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center} />}
      <Map center={center} />
    </MapContainer>
  );
}
