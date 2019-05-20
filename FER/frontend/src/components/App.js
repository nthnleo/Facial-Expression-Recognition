import React from "react";
import ReactDOM from "react-dom";
import WebCam1 from "./WebCam1";

const App = () => (
  <WebCam1/>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
