import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
