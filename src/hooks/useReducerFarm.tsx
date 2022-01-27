import { useReducer } from "react";

// Acciones de los reducers
const reducerFarm = (state: any, action: any) => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: action.payload,
        error: false,
      };
    }
    case "ERROR": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "ADD_POLYGON": {
      return {
        ...state,
        polygons: [...state.polygons, action.payload],
      };
    }
    case "ADD_COORDS": {
      return {
        ...state,
        coords: action.payload,
      };
    }
    case "ADD_ZOOM": {
      return {
        ...state,
        zoom: action.payload,
      };
    }
    case "ADD_DRAWER": {
      return {
        ...state,
        drawerOptions: action.payload,
      };
    }
    default:
      return state;
  }
};

const useReducerFarm = (initialState: any) => {
  const [state, dispatch] = useReducer(reducerFarm, initialState);
  return { state, dispatch };
};

export { useReducerFarm };
