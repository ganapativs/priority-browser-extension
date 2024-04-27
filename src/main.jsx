import React from "react";
import ReactDOM from "react-dom/client";
import FontFaceObserver from "fontfaceobserver";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

/// Show the body once the fonts are loaded
const schibstedGroteskObserver = new FontFaceObserver("Schibsted Grotesk");
const OutfitObserver = new FontFaceObserver("Outfit");

Promise.all([
  schibstedGroteskObserver.load(null, 250),
  OutfitObserver.load(null, 250),
])
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    document.body.style.display = "block";
  });

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
