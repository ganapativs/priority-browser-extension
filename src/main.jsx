import React from "react";
import ReactDOM from "react-dom/client";
import { Theme, ThemePanel } from "@radix-ui/themes";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme accentColor="teal" grayColor="slate" radius="full" appearance="dark">
      <App />
      <ThemePanel defaultOpen={false} />
    </Theme>
  </React.StrictMode>
);
