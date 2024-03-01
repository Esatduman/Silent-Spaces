import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import 'bootstrap/dist/css/bootstrap.css'; // CSS here added btw - Esat 
import firebase_cfg from "./firebase_cfg.js";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebase_cfg);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
