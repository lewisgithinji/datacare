import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/index.css"; // Use alias for consistency
import { AuthProvider } from "@/contexts/AuthContext"; // Use the full-featured AuthProvider

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
