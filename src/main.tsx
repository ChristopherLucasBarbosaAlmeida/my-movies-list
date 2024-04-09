import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/base.scss";
import { router } from "./routes/router";
import { SessionContextProvider } from "./context/SessionContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </React.StrictMode>
);
