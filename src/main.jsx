import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthContext from "./Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" />
          
        </HelmetProvider>
      </QueryClientProvider>
    </AuthContext>
  </StrictMode>
);
