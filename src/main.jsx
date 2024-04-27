import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

/**
 * TODO
 * - Logo
 * analytics?
 * bmc
 * theme monochrome
 * - Add favicon
 * - Add icons
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
