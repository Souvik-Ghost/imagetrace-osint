import React from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ data }) {
  if (!data) return null;
  const position = [data.lat, data.lng];

  return (
    <div className="glass-card">
      <h2>3. Map Location</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{data.name}</p>
      <div style={{ marginTop: '0.5rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <MapContainer center={position} zoom={10} style={{ height: "260px", width: "100%", zIndex: 1 }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={position} />
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
