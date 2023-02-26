import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import translationsAZ from "locales/translationsAZ.json";
import { ScrollToTop } from "components";
import { store } from "store";
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
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);
