import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
  ]);

  export default router;
  