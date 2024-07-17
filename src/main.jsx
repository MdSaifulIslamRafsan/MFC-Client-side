import React from "react";
import ReactDOM from "react-dom/client";
import router from "./Routes/Routes";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./UserProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
