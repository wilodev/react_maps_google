import { useState, useEffect } from "react";

interface Polygon {
  id: string;
  name: string;
  color: string;
  description: string;
  paths: [];
  area: number;
}
interface Coords {
  alt: number | null;
  lat: number;
  lng: number;
}
interface propsInitMap {
  coords: Coords;
  drawerOptions: Object;
  polygons: Polygon[];
  zoom: number;
  loading: boolean;
  error: boolean;
}
const initialState: propsInitMap = {
  coords: {
    alt: 0,
    lat: 0,
    lng: 0,
  },
  drawerOptions: {
    mode: null,
    color: import.meta.env.VITE_COLOR,
    active: false,
  },
  zoom: 7,
  polygons: [],
  loading: false,
  error: false,
};

// Este código es si se desea usar un hook inicial
// Creamos el estado inicial de una Granja
const useInitialFarm = (coords: Coords) => {
  initialState.coords.alt = coords.alt;
  initialState.coords.lat = coords.lat;
  initialState.coords.lng = coords.lng;
  //const [state, setState] = useState(initialState);
  /**
   * Función para añadir las coordenadas
   * @param payload
   */
  // const addCoords = (payload: Coords) => {
  //   setState({
  //     ...state,
  //     coords: { alt: payload.alt, lat: payload.lat, lng: payload.lng },
  //   });
  // };
  /**
   * Función para añadir poligonos a una granja
   * @param payload
   */
  // const addPolygon = (payload: Polygon) => {
  //   setState({
  //     ...state,
  //     polygons: [...state.polygons, payload],
  //   });
  // };
  /**
   * Función para cambiar o agregar el zoom del mapa
   * @param payload
   */
  // const addZoom = (payload: number) => {
  //   setState({
  //     ...state,
  //     zoom: payload,
  //   });
  // };

  // const addDrawerOptions = (payload: Object) => {
  //   setState({
  //     ...state,
  //     drawerOptions: payload,
  //   });
  // };
  // Efecto inicial que carga lo que nos de como valor defecto
  // TODO: Esto cuando se conecte con el API Backend
  // useEffect(() => {
  //   addCoords({
  //     alt: coords.alt,
  //     lat: coords.lat,
  //     lng: coords.lng,
  //   });
  // TODO: Este código sirve para sacar la geoposición del cliente si no tenemos nada en el backend
  // window.navigator.geolocation.getCurrentPosition((currentPosition) => {
  //   console.log("papu las coordenadas son", currentPosition);
  //   if (currentPosition.coords) {
  //     addCoords({
  //       alt: currentPosition.coords.altitude,
  //       lat: currentPosition.coords.latitude,
  //       lng: currentPosition.coords.longitude,
  //     });
  //   }
  // });
  // }, []);
  //return { state, addCoords, addZoom, addPolygon, addDrawerOptions };
  return { ...initialState };
};

export { useInitialFarm };
