import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Order from "./components/Order/Order";
import PrivetRouter from "./PrivetRouter/PrivetRouter";
import Profile from "./components/Profile/Profile";
import Confident from "./components/Confident/Confident";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/order",
        element: (
          <PrivetRouter>
            <Order></Order>
          </PrivetRouter>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/confident", element: <Confident></Confident> },
      {
        path: "/profile",
        element: (
          <PrivetRouter>
            <Profile></Profile>
          </PrivetRouter>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
