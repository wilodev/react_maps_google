import { useState } from "react";

interface propsInitMap {
  alt: number | null;
  lat: number;
  lng: number;
}

const useCreateFarm = ({ alt, lat, lng }: propsInitMap) => {
  const [mapPosition, setMapPosition] = useState<propsInitMap>({
    alt,
    lat,
    lng,
  });

  return { mapPosition, setMapPosition };
};

export { useCreateFarm };
