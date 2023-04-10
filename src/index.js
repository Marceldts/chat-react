import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase";
import { Suspense } from "react";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
defineCustomElements(window);

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={"Conectando..."}>
      <App />
    </Suspense>
  </FirebaseAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
