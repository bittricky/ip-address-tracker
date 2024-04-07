import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import locationArrow from "../images/icon-location.svg";

type MapControllerProps = {
  center: LatLngExpression;
};

type MapProps = {
  position: LatLngExpression;
};

const locationIcon = new L.Icon({
  iconUrl: locationArrow.src,
  iconSize: [25, 32],
});

const MapController: React.FC<MapControllerProps> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

export const Map: React.FC<MapProps> = ({ position }) => {
  if (!position) return null;

  return (
    <div className="h-[calc(100vh-215px)]" data-testid="mapView">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={locationIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <MapController center={position} />
      </MapContainer>
    </div>
  );
};

Map.displayName = "Map";

export default Map;
