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
import AllRequest from "./../Pages/HRDashboard/AllRequest/AllRequest";
import MyEmployeeList from "../Pages/HRDashboard/MyEmployeeList/MyEmployeeList";
import AddEmployee from "../Pages/HRDashboard/AddEmployee/AddEmployee";
import MyTeam from "../Pages/EmployeeDashboard/MyTeam/MyTeam";
import RequestAsset from "../Pages/EmployeeDashboard/RequestAsset/RequestAsset";
import MyRequestedAssets from "../Pages/EmployeeDashboard/MyRequestedAssets/MyRequestedAssets";
import UpdateAsset from "../Pages/HRDashboard/UpdateAsset/UpdateAsset";
import Payment from "../Pages/HRDashboard/Payment/Payment";
import MyProfile from "../Pages/Profile/Profile";

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
        element: <Dashboard></Dashboard>,
      },
      {
        path: "asset-list",
        element: <AssetList></AssetList>,
      },
      {
        path: "add-an-asset",
        element: <AddAsset></AddAsset>,
      },
      {
        path: "all-request",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "my-employee-list",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "add-an-employee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "update-asset/:id",
        element: <UpdateAsset></UpdateAsset>,
        loader: ({params}) => fetch(`https://asset-ease-seven.vercel.app/assets/${params.id}`)
      },

      // Employee Routes
      {
        path: "my-requested-assets",
        element: <MyRequestedAssets></MyRequestedAssets>,
      },
      {
        path: "my-team",
        element: <MyTeam></MyTeam>,
      },
      {
        path: "request-for-an-asset",
        element: <RequestAsset></RequestAsset>,
        loader: () => fetch("https://asset-ease-seven.vercel.app/assets"),
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
]);
