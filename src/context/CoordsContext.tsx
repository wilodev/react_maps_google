import { createContext } from "react";
// Importamos el reducer
import { useReducerFarm } from "../hooks/useReducerFarm";
// Importamos el estado inicial
import { useInitialFarm } from "../hooks/useInitialFarm";
const CoordsContext = createContext<any>({});

const CoordsContextProvider = (props: any) => {
  const initialState = useInitialFarm(props.coordsBackend);
  const { state, dispatch } = useReducerFarm(initialState);
  return (
    <CoordsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CoordsContext.Provider>
  );
};

export { CoordsContextProvider, CoordsContext };
