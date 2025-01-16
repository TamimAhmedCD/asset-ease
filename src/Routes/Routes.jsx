import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import JoinHR from "../Pages/Register/JoinHR/JoinHR";
import Login from "../Pages/Login/Login";
// import DashboardLayoutB from "../Layouts/DashboardLayout";
import DashboardLayoutBasic from "../Layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hr-register",
        element: <JoinHR />,
      },
      {
        path: "/employee-register",
        element: <JoinHR />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayoutBasic></DashboardLayoutBasic>
  }
]);
