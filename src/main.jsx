import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/members.css";
import "./styles/gallery.css";
import "./styles/music.css";
import "./styles/layout.css";
import "./styles/animations.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/S2U-project-fan">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
