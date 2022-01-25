import React, { useEffect, useState } from "react";
import { MapLoading } from "../Components/MapLoading";
import { SearchAddress } from "../Components/SearchAddress";
import { MapWrapper } from "../Containers/MapWrapper";
import { useCreateFarm } from "../hooks/useCreateFarm";
import { Color } from "../Components/Color";

interface propsInitMap {
  alt: number | null;
  lat: number;
  lng: number;
}

const CreateFarm = () => {
  // Defionimos el color inicial de la aplicación
  const [color, setColor] = useState("#ff00cc");
  // Definimos el estado para almacenar la dirección
  const [searchValue, setSearchValue] = useState("");
  // Definimos la posición del mapa
  const { mapPosition, setMapPosition } = useCreateFarm({
    alt: 0,
    lat: 0,
    lng: 0,
  });
  const permissionGeo = () => {
    window.navigator.geolocation.getCurrentPosition((geoPosition) => {
      setMapPosition({
        alt: geoPosition.coords.altitude,
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude,
      });
    });
  };
  useEffect(() => {
    permissionGeo();
  }, []);

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const handleChangeColor = (value: string) => {
    setColor(value);
  };

  const handleSend = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchValue }, function (results, status) {
      if (status == "OK") {
        const resultGeoPosition = results?.[0];
        if (resultGeoPosition) {
          setMapPosition((oldCurrentPosition): propsInitMap => {
            return {
              alt: oldCurrentPosition.alt,
              lat: resultGeoPosition.geometry.location.lat(),
              lng: resultGeoPosition.geometry.location.lng(),
            };
          });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  if (mapPosition.lat === 0) {
    return (
      <div>
        <p>Debes permitir acceder a tu ubicación</p>
        <button onClick={permissionGeo}>Dar Permiso</button>
      </div>
    );
  }
  return (
    <>
      <MapWrapper
        alt={mapPosition.alt}
        lat={mapPosition.lat}
        lng={mapPosition.lng}
      />
      <SearchAddress
        value={searchValue}
        handleChange={handleChange}
        handleSend={handleSend}
      />
      <Color color={color} handleChangeColor={handleChangeColor} />
    </>
  );
};

export { CreateFarm };
