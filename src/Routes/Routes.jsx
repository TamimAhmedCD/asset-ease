import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import JoinHR from "../Pages/Register/JoinHR/JoinHR";
import Login from "../Pages/Login/Login";
import DashboardLayoutBasic from "../Layouts/Dashboard/DashboardLayout";
import JoinEmployee from "../Pages/Register/JoinEmployee/JoinEmployee";
import PrivateRoute from "./PrivateRoute";
import AssetList from "../Pages/HRDashboard/AssetList/AssetList";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddAsset from "../Pages/HRDashboard/AddAsset/AddAsset";

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
        element: <JoinEmployee />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayoutBasic></DashboardLayoutBasic>
      </PrivateRoute>
    ),
    children: [
      // HR routes
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "asset-list",
        element: <AssetList></AssetList>,
      },
      {
        path: "add-an-asset",
        element: <AddAsset></AddAsset>,
      },
    ],
  },
]);
