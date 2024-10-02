import App from "src/App.tsx";
import "src/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/firebird">
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
