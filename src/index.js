import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import reportWebVitals from "./reportWebVitals";
ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
