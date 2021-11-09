import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./contexts/appContext";
import { pub, sub, subOnce, subLast } from "./lib/channelManager";
import apiService from "./services/apiService";
// declare const window: any;

const ChannelManager = { pub, sub, subOnce, subLast };

const initValue = {
  title: "local freeman title",
  id: "app1",
  ChannelManager,
  apiService,
};
ReactDOM.render(
  <React.StrictMode>
    <AppProvider initValue={initValue}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
