import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import useAxiosPublic from "./../Hooks/useAxiosPublic";
import useAuth from "./../Hooks/useAuth";
import { useMemo, useState } from "react";
import { IoListSharp } from "react-icons/io5";
import AssetList from "../Pages/HRDashboard/AssetList/AssetList";

export default function DashboardLayoutBasic() {
  const [role, setRole] = useState("");

  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  axiosPublic.get(`/user/${user.email}`).then((res) => {
    const role = res.data.role;
    console.log(role);
    setRole(role);
  });

  const NAVIGATION =
    role === "HR"
      ? [
          {
            kind: "header",
            title: "Main items",
          },
          {
            segment: "dashboard",
            title: "Dashboard",
            icon: <DashboardIcon />,
          },
          {
            segment: "asset-list",
            title: "Asset List",
            icon: <ShoppingCartIcon />,
          },
          {
            segment: "asset-list",
            title: "Asset List",
            icon: <ShoppingCartIcon />,
          },
          {
            kind: "divider",
          },
        ]
      : [
          {
            kind: "header",
            title: "Main items",
          },
          {
            segment: "dashboard",
            title: "Dashboard",
            icon: <DashboardIcon />,
          },
          {
            segment: "asset-list",
            title: "Asset List",
            icon: <IoListSharp />,
          },
          {
            kind: "divider",
          },
        ];

  function useDemoRouter(initialPath) {
    const [pathname, setPathname] = useState(initialPath);

    const router = useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
      };
    }, [pathname]);

    return router;
  }

  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider navigation={NAVIGATION} router={router}>
      <DashboardLayout>
        <PageContainer>
          {router.pathname === "/asset-list" && <AssetList></AssetList>}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
