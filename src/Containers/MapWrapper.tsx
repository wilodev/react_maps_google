import React, { useContext, useCallback, useState, useEffect } from "react";
import { CoordsContext } from "../context/CoordsContext";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { MapLoading } from "../components/MapLoading";
// Cargamos las librerias
const libraries: any = ["drawing"];
// Estilo del contenedor
const containerStyle = {
  width: "100%",
  height: "700px",
};
function MapWrapper({ data }) {
  // Se extrae el valor de las coordenadas inicales
  const { state, dispatch } = useContext(CoordsContext);
  // Se crea la instancia del Map
  const [mapInstance, setMapInstance] = useState(null);
  // Constante de la posición incial del mapa
  //const center = { lat: state.coords.lat, lng: state.coords.lat };
  /**
   * Begin Function
   */
  // Función para cargar el mapa
  const onLoad = useCallback(function callback(map) {
    setMapInstance(map);
  }, []);
  // Función para desmontar el mapa
  const onUnmount = useCallback(function callback(map) {
    setMapInstance(null);
  }, []);
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      dispatch({
        type: "ADD_DRAWER",
        payload: {
          mode: window.google.maps.drawing.OverlayType.POLYGON,
          color: data.polygonColor,
          active: true,
        },
      });
    }
  }, [data]);
  // Instancia del Mapa
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_MAP_API}`,
    libraries,
  });
  // Cambiar Zoom del mapa
  const handleChangeZoom = () => {
    if (mapInstance) {
      // Cambiamos el zoom del estado
      dispatch({ type: "ADD_ZOOM", payload: mapInstance.getZoom() });
    }
  };

  const handleChangeDrag = () => {
    if (mapInstance) {
      // Cambiamos las coordenadas
      dispatch({
        type: "ADD_COORDS",
        payload: {
          alt: state.coords.alt,
          lat: mapInstance.getCenter().lat(),
          lng: mapInstance.getCenter().lng(),
        },
      });
    }
  };
  // Terminar de dibujar un poligono
  const handleCompletePolygon = (dataPolygon: any) => {
    const pathsPolygon = dataPolygon
      .getPath()
      .getArray()
      .map((items: any) => {
        return { lat: items.lat(), lng: items.lng() };
      });
    dispatch({
      type: "ADD_DRAWER",
      payload: {
        mode: null,
        color: import.meta.env.VITE_COLOR,
        active: false,
      },
    });
    dispatch({
      type: "ADD_POLYGON",
      payload: {
        id: new Date(),
        name: data.polygonName,
        color: state.drawerOptions.color,
        description: data.polygonDescription,
        paths: pathsPolygon,
        area: google.maps.geometry.spherical
          .computeArea(dataPolygon.getPath())
          .toFixed(2),
      },
    });
    // Eliminamos el poligono
    dataPolygon.setMap(null);
  };
  // Cambiar el centro del mapa
  // TODO: Función a futuro para rastrear el cambio de posición en el mapa
  // const handleCenterChange = () => {
  //   if (mapInstance) {
  //     if (mapInstance.center.lat() !== state.coords.lat) {
  //       const locationsPath = new google.maps.LatLng(
  //         mapInstance.center.lat(),
  //         mapInstance.center.lng()
  //       );
  //       const elevator = new google.maps.ElevationService();
  //       elevator
  //         .getElevationForLocations({
  //           locations: [locationsPath],
  //         })
  //         .then((result) => {
  //           if (result.results.length > 0) {
  //             addCoords({
  //               alt: result.results[0].elevation,
  //               lat: mapInstance.center.lat(),
  //               lng: mapInstance.center.lng(),
  //             });
  //           }
  //         });
  //     }
  //   }
  // };
  /**
   * End Function
   */
  if (isLoaded && state.coords.lat !== 0) {
    const center = { lat: state.coords.lat, lng: state.coords.lng };
    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={state.zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onZoomChanged={handleChangeZoom}
          onDragEnd={handleChangeDrag}
        >
          <DrawingManager
            onPolygonComplete={handleCompletePolygon}
            options={{
              drawingControl: false,
              drawingMode: state.drawerOptions.mode,
              polygonOptions: {
                fillColor: state.drawerOptions.color,
                strokeColor: state.drawerOptions.color,
              },
            }}
          />
          {/* Creamos los poligonos */}
          {/* Listado de los poligonos */}
          {state.polygons.length > 0 &&
            state.polygons.map((item: any) => {
              return (
                <Polygon
                  key={item.id}
                  path={item.paths}
                  // onDragEnd={handleEditDragPolygon}
                  // onMouseUp={handleEditPolygon}
                  options={{
                    strokeColor: item.color,
                    fillColor: item.color,
                  }}
                />
              );
            })}
        </GoogleMap>
      </>
    );
  }
  return <MapLoading />;
}

export { MapWrapper };
