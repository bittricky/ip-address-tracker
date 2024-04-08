"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import locationArrow from "../images/icon-location.svg";

type MapControllerProps = {
  center: LatLngExpression;
};

type Map = {
  position: LatLngExpression;
};

const locationIcon = new L.Icon({
  iconUrl: locationArrow.src,
  iconSize: [25, 32],
});

const MapContainerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const TileLayerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);

const MarkerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);

const PopupNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  {
    ssr: false,
  }
);

const MapController = dynamic(
  () => import("./MapController").then((mod) => mod.MapController),
  {
    ssr: false,
  }
);

export const Map: React.FC<Map> = ({ position }) => {
  if (!position) return null;

  return (
    <div className="relative h-[calc(100vh-215px)]" data-testid="mapView">
      <MapContainerNoSSR
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 9 }}
      >
        <TileLayerNoSSR
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerNoSSR position={position} icon={locationIcon}>
          <PopupNoSSR>You are here!</PopupNoSSR>
        </MarkerNoSSR>
        <MapController center={position} />
      </MapContainerNoSSR>
    </div>
  );
};

Map.displayName = "Map";

export default Map;
