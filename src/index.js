import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {} from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import translationsAZ from "locales/translationsAZ.json";
import { ScrollToTop } from "components";
import "./index.css";
import App from "./App";

i18n.use(initReactI18next).init({
  resources: {
    az: {
      translation: translationsAZ,
    },
  },
  lng: "az",
  fallbackLng: "az",
  interpolation: {
    escapeValue: false,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
