import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import controllers from "./controllers";

export const HandleContext = React.createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HandleContext.Provider value={controllers}>
      <App />
    </HandleContext.Provider>
  </React.StrictMode>
);
