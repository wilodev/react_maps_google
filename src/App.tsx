import React, { useState } from "react";
import FormPolygon from "./containers/FormPolygon";
import { MapWrapper } from "./containers/MapWrapper";
// Se importa el contexto o estado global
import { CoordsContextProvider } from "./context/CoordsContext";
function App() {
  // Estado inicial de creación del formulario o edición
  const [formActive, setFormActive] = useState(false);
  // Estado del fomurlario
  const [dataForm, setDataForm] = useState({});
  // Constante que viene con las coordenadas del país desde el backend
  const coordsBackend = { alt: 0, lat: -1.5815134, lng: -78.4770432 };

  /**
   * Begin Function
   */
  const handleCreatePolygon = (dataForm: Object) => {
    setFormActive(false);
    setDataForm(dataForm);
  };
  /**
   * End Function
   */
  return (
    <>
      <CoordsContextProvider coordsBackend={coordsBackend}>
        <MapWrapper data={dataForm} />
        {!formActive && (
          <button
            className="btn btn-primary"
            onClick={() => setFormActive(true)}
          >
            Crear Potrero
          </button>
        )}
        {formActive && <FormPolygon handleForm={handleCreatePolygon} />}
      </CoordsContextProvider>
    </>
  );
}

export default App;
