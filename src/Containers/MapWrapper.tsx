import { ReactElement, useState, useRef, useEffect } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
// Componentes Custom
import { MapLoading } from "../Components/MapLoading";
import { MapError } from "../Components/MapError";
import { Map } from "../Containers/Map";
import { Color } from "../Components/Color";

const renderMap = (status: Status): ReactElement => {
  if (status === Status.FAILURE) {
    return <MapError />;
  }
  return <MapLoading />;
};

interface propsInitMap {
  alt: number | null;
  lat: number;
  lng: number;
}

const MapWrapper = ({ alt, lat, lng }: propsInitMap) => {
  const center = { lat: lat, lng: lng };
  const zoom = 15;
  return (
    <>
      <Wrapper
        apiKey={"AIzaSyDhVvioLNKzEi1utl5viZHlTdJTO4Sc-rI"}
        render={renderMap}
      >
        {lat !== 0 && <Map center={center} zoom={zoom} isDrawing={true} />}
      </Wrapper>
    </>
  );
};

export { MapWrapper };
