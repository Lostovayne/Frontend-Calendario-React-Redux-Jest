import React from "react";
import ReactDOM from "react-dom/client";
import CalendarApp from "./CalendarApp.jsx";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <CalendarApp />
        </BrowserRouter>
    </React.StrictMode>
);
