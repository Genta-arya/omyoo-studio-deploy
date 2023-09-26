import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Loader from "react-spinners/FadeLoader";

import customMarkerIcon from "../../../Asset/marker.png";

const ContactMap = () => {
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  const markerPosition = {
    lat: -1.8276226454104454,
    lng: 109.98249520037444,
  };
  const centerCoordinates = [-1.8276226454104454, 109.98249520037444];

  const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const handleMarkerClick = () => {
    const lat = centerCoordinates[0];
    const lng = centerCoordinates[1];
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      "_blank"
    );
  };


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000); 
  }, []);

  return (
    <div
      style={{
        height: "300px",
        width: "500px",
        border: "2px solid #000",
        marginTop: "40px",
        padding: "2px",
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader color="#36d7b7" height={40} width={40} />
        </div>
      ) : (
        <MapContainer
          center={markerPosition}
          zoom={15}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={markerPosition}
            icon={customIcon}
            eventHandlers={{ click: handleMarkerClick }}
          >
            <Popup>OmYoo Company</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default ContactMap;
