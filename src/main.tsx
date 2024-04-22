import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/base.scss";
import { router } from "./routes/router";
import { SessionIdContextProvider } from "./context/SessionIdContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionIdContextProvider>
      <RouterProvider router={router} />
    </SessionIdContextProvider>
  </React.StrictMode>
);
