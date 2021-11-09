import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./contexts/appContext";

export const microApp = (baseUrl, props, container) => {
  const fullyQualifiedBaseUrl = new URL(
    baseUrl,
    window.location.origin
  ).toString();
  // @ts-ignore
  __webpack_public_path__ = fullyQualifiedBaseUrl;
  const App = require("./App").default;
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider initValue={props}>
        <App />
      </AppProvider>
    </React.StrictMode>,
    container
  );
};
