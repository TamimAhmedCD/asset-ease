import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import useAxiosPublic from "./../Hooks/useAxiosPublic";
import useAuth from "./../Hooks/useAuth";
import { useMemo, useState } from "react";
import { IoListSharp } from "react-icons/io5";
import AssetList from "../Pages/HRDashboard/AssetList/AssetList";
import { FaAddressCard, FaThList } from "react-icons/fa";
import { MdFormatListBulletedAdd, MdOutlinePendingActions } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";

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
            icon: <FaThList className="text-center text-lg"/>            ,
          },
          {
            segment: "add-an-asset",
            title: "Add an Asset",
            icon: <MdFormatListBulletedAdd className="text-xl text-center"/>,
          },
          {
            segment: "all-request",
            title: "All Requests",
            icon: <MdOutlinePendingActions className="text-xl text-center"/>,
          },
          {
            segment: "my-employee-list",
            title: "My Employee List",
            icon: <BiSolidUserAccount className="text-xl text-center"/>
            ,
          },
          {
            segment: "add-an-employee",
            title: "Add an Employee",
            icon: <FaAddressCard className="text-center text-xl" />
            ,
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
