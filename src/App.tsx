import { useEffect, useState, useCallback } from "react";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
// Importamos los hooks para usar el estado de las coordenadas
import { useCreateFarm } from "./hooks/useCreateFarm";
// Importamos el contexto globa
import { ContextCoords } from "./context/contextCoords";

// Estilo del contenedor
const containerStyle = {
  width: "100%",
  height: "700px",
};

const libraries = ["drawing"];
const App = () => {
  // Constante para el map
  const { mapPosition, setMapPosition } = useCreateFarm({
    alt: 0,
    lat: 0,
    lng: 0,
  });
  // Carga del mapa
  const [defaultCursor, setDefaultCursor] = useState(null);
  // Caragamos la isntancia del mapa
  const [mapInstance, setMapInstance] = useState(null);
  // Color para el dibujo
  const [colorShape, setColorShape] = useState("#00ffcc");
  // Plygons List
  const [listPolygon, setListPolygon] = useState<any>([]);
  // Constante para crear un potrero
  const [createPolygon, setCreatePolygon] = useState(false);
  // Llamamos a buscar la geoposición
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((geoPosition) => {
      setMapPosition({
        alt: geoPosition.coords.altitude,
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude,
      });
    });
  }, []);

  // Cargamos el mapa
  const onLoad = useCallback(function callback(map) {
    //setDefaultCursor(window.google.maps.drawing.OverlayType.POLYGON);
    setMapInstance(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMapInstance(null);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDhVvioLNKzEi1utl5viZHlTdJTO4Sc-rI",
    libraries,
  });

  const onPolygonComplete = (polygon: any) => {
    setDefaultCursor(null);
    console.log(polygon);
  };

  const onCircleComplete = (circle: any) => {
    console.log(circle);
  };

  const onRectangleComplete = (rectangle: any) => {
    console.log(rectangle);
  };

  if (mapPosition.lng === 0) {
    return (
      <div>
        <p> Debes dar permiso</p>
      </div>
    );
  }
  const center = {
    lat: mapPosition.lat,
    lng: mapPosition.lng,
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  if (!isLoaded) {
    return <div>Esperando</div>;
  }

  const handleComplete = (data: any) => {
    // setDefaultCursor(window.google.maps.drawing.OverlayType.POLYGON);
    setDefaultCursor(null);
    const pathsPolygon = data
      .getPath()
      .getArray()
      .map((items: any) => {
        return { lat: items.lat(), lng: items.lng() };
      });
    data.setMap(null);
    const dataPolygon = {
      id: Math.floor(Date.now() / 1000),
      name: "Polygon Uno",
      color: colorShape,
      paths: pathsPolygon,
      area: google.maps.geometry.spherical
        .computeArea(data.getPath())
        .toFixed(2),
    };
    console.log(
      "el area del poligono es",
      google.maps.geometry.spherical.computeArea(data.getPath()).toFixed(2)
    );
    setListPolygon((oldListPolygon: any) => [...oldListPolygon, dataPolygon]);
    setDefaultCursor(null);
    setCreatePolygon(!createPolygon);
  };

  const handleEditDragPolygon = (data: any) => {
    console.log("termine de mover", data);
  };

  const handleEditPolygon = (data: any) => {
    console.log("termine de editar", data);
  };
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <DrawingManager
          onPolygonComplete={handleComplete}
          options={{
            drawingControl: false,
            // drawingControlOptions: {
            //   position: window.google.maps.ControlPosition.TOP_CENTER,
            //   drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            // },
            polygonOptions: {
              fillColor: colorShape,
              strokeColor: colorShape,
            },
            drawingMode: defaultCursor,
          }}
        />
        {/* Listado de los poligonos */}
        {listPolygon.length > 0 &&
          listPolygon.map((item: any) => {
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
              >
                <p style={{ zIndex: 99999, color: "#fff" }}>Editar</p>
                <p style={{ zIndex: 99999, color: "#fff" }}>Borrar</p>
              </Polygon>
            );
          })}
      </GoogleMap>
      <div className="">
        {!createPolygon && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setCreatePolygon(true);
            }}
          >
            Crear potrero
          </button>
        )}
      </div>
      {createPolygon && (
        <div>
          <label className="form-label">Nombre Potrero</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" />
          </div>

          <label className="form-label">Color del potrero</label>
          <div className="input-group mb-3">
            <input
              type="color"
              className="form-control"
              value={colorShape}
              onChange={() => setColorShape((oldColor) => event?.target.value)}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={() =>
              setDefaultCursor(window.google.maps.drawing.OverlayType.POLYGON)
            }
          >
            Empezar
          </button>
        </div>
      )}
    </>
  ) : (
    <div>
      <p>Cargando ...</p>
    </div>
  );
};

export default App;
