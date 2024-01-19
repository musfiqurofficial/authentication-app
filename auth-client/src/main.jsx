import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleAuthProvider } from "./context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleAuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GoogleAuthProvider>
  </React.StrictMode>
);
