import App from "src/App.tsx";
import "src/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/customer-portal">
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
