import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextCoords } from "./context/contextCoords";

ReactDOM.render(
  <React.StrictMode>
    <ContextCoords.Provider value={{ alt: 0, lat: 0, lng: 0 }}>
      <App />
    </ContextCoords.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
