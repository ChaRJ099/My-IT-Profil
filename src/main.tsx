import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles.scss";
import App from "./App.tsx";
import { CVProvider } from "./context/CVContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </StrictMode>
);
