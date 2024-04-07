import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

export type MapControllerProps = {
  center: LatLngExpression;
};

export const MapController: React.FC<MapControllerProps> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};
